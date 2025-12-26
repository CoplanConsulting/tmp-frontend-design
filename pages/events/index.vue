<script setup lang="ts">
import { Filter, Search, Plus, Clock, Users } from 'lucide-vue-next'
import { events, getEventWithDetails, formatDisplayDate, getLocation } from '~/utils/mockData'
import type { EventWithDetails } from '~/utils/mockData'

definePageMeta({
  layout: 'default'
})

const activeTab = ref('all')
const searchQuery = ref('')

// Get all events with full details (day, venue, hotel, etc.)
const eventList = computed(() => {
  return events.map(event => getEventWithDetails(event.id)!)
})

const getStatusColor = (status: string) => {
  const colors = {
    'confirmed': 'bg-green-500',
    'pending': 'bg-yellow-500',
    'cancelled': 'bg-red-500',
    'rescheduled': 'bg-orange-500'
  }
  return colors[status as keyof typeof colors] || 'bg-gray-400'
}

const getAdvanceStatusColor = (status: string) => {
  const colors = {
    'in-progress': 'bg-yellow-500',
    'not-started': 'bg-gray-400',
    'completed': 'bg-green-500'
  }
  return colors[status as keyof typeof colors] || 'bg-gray-400'
}

const getAdvanceStatusText = (status: string) => {
  const text = {
    'in-progress': 'In Progress',
    'not-started': 'Not Started',
    'completed': 'Completed'
  }
  return text[status as keyof typeof text] || status
}
</script>

<template>
        <!-- Page Header -->
        <div class="flex items-center justify-between">
          <h1 class="text-3xl font-bold text-gray-900">Events</h1>

          <div class="flex items-center gap-3">
            <Button variant="outline" class="gap-2">
              <Filter class="h-4 w-4" />
              Filter
            </Button>

            <div class="relative">
              <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                v-model="searchQuery"
                placeholder="Search Shows"
                class="pl-9 w-64"
              />
            </div>

            <Button class="gap-2 bg-black text-white hover:bg-gray-800" as-child>
              <a href="/events/add">
                <Plus class="h-4 w-4" />
                Add Event
              </a>
            </Button>
          </div>
        </div>

        <!-- Tabs -->
        <Tabs default-value="all" class="w-full">
          <TabsList class="bg-white">
            <TabsTrigger value="all">All Events</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value="all" class="space-y-4 mt-6">
            <Card v-for="event in eventList" :key="event.id" class="border border-gray-200 bg-white">
              <CardContent class="p-6">
                <!-- Header Row -->
                <div class="flex items-start justify-between mb-6">
                  <div>
                    <h3 class="text-2xl font-bold text-gray-900 leading-tight">
                      {{ event.day ? formatDisplayDate(event.day.date) : 'TBD' }} - {{ event.day ? getLocation(event.day.city, event.day.state) : 'TBD' }}
                    </h3>
                    <p class="text-sm text-gray-500 mt-1.5">
                      {{ event.venue?.name ?? 'TBD' }}
                    </p>
                  </div>

                  <div class="flex items-center gap-3 flex-shrink-0">
                    <Button variant="outline" class="border-gray-300 text-gray-900 hover:bg-gray-50" as-child>
                      <NuxtLink :to="`/events/advance/${event.id}`">Advance</NuxtLink>
                    </Button>
                    <Button variant="outline" class="border-gray-300 text-gray-900 hover:bg-gray-50" as-child>
                      <NuxtLink :to="`/guest-list/${event.id}`">Guest List</NuxtLink>
                    </Button>
                    <Button class="bg-black text-white hover:bg-gray-800" as-child>
                      <NuxtLink :to="event.day ? `/days/${event.day.date}` : '#'">View Details</NuxtLink>
                    </Button>
                  </div>
                </div>

                <!-- Metadata Row -->
                <div class="grid grid-cols-4 gap-8">
                  <!-- Status -->
                  <div>
                    <p class="text-xs text-gray-600 mb-2 font-medium">Status</p>
                    <div class="flex items-center gap-2">
                      <div :class="[getStatusColor(event.day?.status ?? 'pending'), 'h-2.5 w-2.5 rounded-full']"></div>
                      <span class="text-base font-semibold text-gray-900 capitalize">
                        {{ event.day?.status ?? 'Pending' }}
                      </span>
                    </div>
                  </div>

                  <!-- Capacity -->
                  <div>
                    <p class="text-xs text-gray-600 mb-2 font-medium">Capacity</p>
                    <div class="flex items-center gap-2">
                      <Users class="h-4 w-4 text-gray-600" />
                      <span class="text-base font-semibold text-gray-900">
                        {{ event.capacity ?? event.venue?.capacity ?? 'TBD' }}
                      </span>
                    </div>
                  </div>

                  <!-- Show Time -->
                  <div>
                    <p class="text-xs text-gray-600 mb-2 font-medium">Show Time</p>
                    <div class="flex items-center gap-2">
                      <Clock class="h-4 w-4 text-gray-600" />
                      <span class="text-base font-semibold text-gray-900">
                        {{ event.showTime ?? 'TBD' }}
                      </span>
                    </div>
                  </div>

                  <!-- Advance Status -->
                  <div>
                    <p class="text-xs text-gray-600 mb-2 font-medium">Advance Status</p>
                    <div class="flex items-center gap-2">
                      <div :class="[getAdvanceStatusColor(event.advanceStatus), 'h-2.5 w-2.5 rounded-full']"></div>
                      <span class="text-base font-semibold text-gray-900">
                        {{ getAdvanceStatusText(event.advanceStatus) }}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upcoming">
            <p class="text-gray-500">Upcoming events will be shown here.</p>
          </TabsContent>

          <TabsContent value="completed">
            <p class="text-gray-500">Completed events will be shown here.</p>
          </TabsContent>

          <TabsContent value="cancelled">
            <p class="text-gray-500">Cancelled events will be shown here.</p>
          </TabsContent>
        </Tabs>
</template>
