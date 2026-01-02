<script setup>
import 'temporal-polyfill/global'
import { ScheduleXCalendar } from '@schedule-x/vue'
import { createCalendar, createViewMonthGrid } from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'
import { getCalendarDays } from '~/utils/mockData'

definePageMeta({
  layout: 'default'
})

const router = useRouter()

// Get mock calendar days
const tourCalendarDays = getCalendarDays('tour-1')

// Transform to schedule-x events
const events = tourCalendarDays.map(day => ({
  id: day.eventId || `day-${day.date}`,
  title: day.venueName || day.dayType,
  start: Temporal.PlainDate.from(day.date),
  end: Temporal.PlainDate.from(day.date),
  _eventId: day.eventId, // Store for click handling
}))

const calendarApp = createCalendar({
  selectedDate: Temporal.PlainDate.from('2025-10-01'),
  views: [createViewMonthGrid()],
  events,
  callbacks: {
    onEventClick(calendarEvent) {
      // Only navigate if event has an eventId (show days)
      if (calendarEvent._eventId) {
        router.push(`/events/advance/${calendarEvent._eventId}`)
      }
    },
  },
})
</script>

<template>
  <div class="flex flex-1 flex-col gap-4">
    <h1 class="text-3xl font-bold text-gray-900">Calendar</h1>

    <ClientOnly>
      <div style="width: 100%; height: 800px;">
        <ScheduleXCalendar :calendar-app="calendarApp" />
      </div>
    </ClientOnly>
  </div>
</template>
