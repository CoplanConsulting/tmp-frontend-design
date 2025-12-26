<script setup lang="ts">
import { Filter, Search as SearchIcon, Plus, ChevronLeft, ChevronRight, ChevronsUpDown, Calendar, MapPin, Mic } from 'lucide-vue-next'
import { getCalendarDays, type CalendarDay } from '~/utils/mockData'
import { DAY_TYPE_CONFIG } from '~/utils/mockData/types'

definePageMeta({
  layout: 'default'
})

// Calendar state
const currentDate = ref(new Date(2025, 9, 1)) // October 2025 (month 9 = October)
const searchQuery = ref('')

// Get all calendar days for the tour
const tourCalendarDays = getCalendarDays('tour-1')

// Create a lookup map for quick access by date string
const calendarDayMap = computed(() => {
  const map = new Map<string, CalendarDay>()
  tourCalendarDays.forEach(day => {
    map.set(day.date, day)
  })
  return map
})

// Calendar grid generation
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

interface CalendarGridDay {
  date: Date
  dateString: string // YYYY-MM-DD
  day: number
  isCurrentMonth: boolean
  calendarData?: CalendarDay
}

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()

  // Get first day of month and number of days
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startDayOfWeek = firstDay.getDay()

  // Get previous month's last days
  const prevMonthLastDay = new Date(year, month, 0).getDate()
  const prevMonthDays = startDayOfWeek

  // Get next month's first days
  const totalCells = Math.ceil((daysInMonth + startDayOfWeek) / 7) * 7
  const nextMonthDays = totalCells - (daysInMonth + startDayOfWeek)

  const days: CalendarGridDay[] = []

  // Previous month days
  for (let i = prevMonthDays - 1; i >= 0; i--) {
    const date = new Date(year, month - 1, prevMonthLastDay - i)
    const dateString = formatDateToISO(date)
    days.push({
      date,
      dateString,
      day: date.getDate(),
      isCurrentMonth: false,
      calendarData: calendarDayMap.value.get(dateString)
    })
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i)
    const dateString = formatDateToISO(date)
    days.push({
      date,
      dateString,
      day: i,
      isCurrentMonth: true,
      calendarData: calendarDayMap.value.get(dateString)
    })
  }

  // Next month days
  for (let i = 1; i <= nextMonthDays; i++) {
    const date = new Date(year, month + 1, i)
    const dateString = formatDateToISO(date)
    days.push({
      date,
      dateString,
      day: i,
      isCurrentMonth: false,
      calendarData: calendarDayMap.value.get(dateString)
    })
  }

  return days
})

const currentMonthName = computed(() => {
  return currentDate.value.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
})

function formatDateToISO(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function previousMonth() {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

function nextMonth() {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}

function goToToday() {
  currentDate.value = new Date()
}

function getDayTypeColor(dayType: CalendarDay['dayType']): string {
  const config = DAY_TYPE_CONFIG[dayType]
  return config?.color || 'bg-gray-400'
}

function getDayTypeLabel(dayType: CalendarDay['dayType']): string {
  const config = DAY_TYPE_CONFIG[dayType]
  return config?.label || dayType
}
</script>

<template>
  <div class="flex flex-1 flex-col gap-4">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-3xl font-bold text-gray-900">Calendar</h1>
      <div class="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Filter class="h-4 w-4 mr-2" />
          Filter
        </Button>
        <div class="relative">
          <SearchIcon class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            v-model="searchQuery"
            type="search"
            placeholder="Search Shows"
            class="pl-9 w-64"
          />
        </div>
        <Button size="sm" class="bg-black text-white hover:bg-black/90" as-child>
          <NuxtLink to="/events/add">
            <Plus class="h-4 w-4 mr-2" />
            Add Event
          </NuxtLink>
        </Button>
      </div>
    </div>

    <!-- Calendar Controls -->
    <div class="flex items-center justify-center gap-4 mb-6">
      <Button variant="ghost" size="icon" @click="previousMonth">
        <ChevronLeft class="h-5 w-5" />
      </Button>
      <Button variant="outline" size="sm" @click="goToToday">
        Today
      </Button>
      <Button variant="ghost" size="icon" @click="nextMonth">
        <ChevronRight class="h-5 w-5" />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline" size="sm">
            {{ currentMonthName }}
            <ChevronsUpDown class="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>January 2025</DropdownMenuItem>
          <DropdownMenuItem>February 2025</DropdownMenuItem>
          <DropdownMenuItem>March 2025</DropdownMenuItem>
          <DropdownMenuItem>April 2025</DropdownMenuItem>
          <DropdownMenuItem>May 2025</DropdownMenuItem>
          <DropdownMenuItem>June 2025</DropdownMenuItem>
          <DropdownMenuItem>July 2025</DropdownMenuItem>
          <DropdownMenuItem>August 2025</DropdownMenuItem>
          <DropdownMenuItem>September 2025</DropdownMenuItem>
          <DropdownMenuItem>October 2025</DropdownMenuItem>
          <DropdownMenuItem>November 2025</DropdownMenuItem>
          <DropdownMenuItem>December 2025</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <!-- Calendar Grid -->
    <div class="bg-white rounded-lg border overflow-hidden">
      <!-- Week headers -->
      <div class="grid grid-cols-7 border-b bg-muted/50">
        <div
          v-for="day in weekDays"
          :key="day"
          class="p-3 text-center text-sm font-semibold"
        >
          {{ day }}
        </div>
      </div>

      <!-- Calendar days -->
      <div class="grid grid-cols-7">
        <div
          v-for="(dayData, index) in calendarDays"
          :key="index"
          class="min-h-[120px] border-r border-b p-2 relative"
          :class="{
            'bg-muted/20': !dayData.isCurrentMonth
          }"
        >
          <div
            class="text-sm font-medium mb-1"
            :class="{
              'text-muted-foreground': !dayData.isCurrentMonth,
              'text-foreground': dayData.isCurrentMonth
            }"
          >
            {{ dayData.day }}
          </div>

          <!-- If this day has tour data -->
          <div v-if="dayData.calendarData" class="space-y-1">
            <!-- Event with linking -->
            <NuxtLink
              v-if="dayData.calendarData.hasEvent && dayData.calendarData.eventId"
              :to="`/events/advance/${dayData.calendarData.eventId}`"
              class="block text-xs px-2 py-1.5 rounded font-medium hover:opacity-80 transition-opacity"
              :class="getDayTypeColor(dayData.calendarData.dayType)"
            >
              <div class="flex items-start gap-1">
                <Mic class="h-3 w-3 mt-0.5 flex-shrink-0" v-if="dayData.calendarData.dayType === 'Show Day'" />
                <Calendar class="h-3 w-3 mt-0.5 flex-shrink-0" v-else />
                <div class="flex-1 min-w-0">
                  <div class="font-semibold truncate">{{ dayData.calendarData.venueName }}</div>
                  <div class="flex items-center gap-1 text-[10px] opacity-90">
                    <MapPin class="h-2.5 w-2.5 flex-shrink-0" />
                    <span class="truncate">{{ dayData.calendarData.location }}</span>
                  </div>
                </div>
              </div>
            </NuxtLink>

            <!-- Non-event day (Travel, Off, etc.) -->
            <div
              v-else
              class="text-xs px-2 py-1.5 rounded font-medium"
              :class="getDayTypeColor(dayData.calendarData.dayType)"
            >
              <div class="flex items-start gap-1">
                <Calendar class="h-3 w-3 mt-0.5 flex-shrink-0" />
                <div class="flex-1 min-w-0">
                  <div class="font-semibold truncate">{{ getDayTypeLabel(dayData.calendarData.dayType) }}</div>
                  <div class="flex items-center gap-1 text-[10px] opacity-90">
                    <MapPin class="h-2.5 w-2.5 flex-shrink-0" />
                    <span class="truncate">{{ dayData.calendarData.location }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Legend -->
    <div class="flex items-center justify-center gap-6 mt-6 flex-wrap">
      <div
        v-for="(config, type) in DAY_TYPE_CONFIG"
        :key="type"
        class="flex items-center gap-2"
      >
        <div
          class="w-4 h-4 rounded"
          :class="config.color"
        />
        <span class="text-sm text-muted-foreground">{{ config.label }}</span>
      </div>
    </div>
  </div>
</template>
