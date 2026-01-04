<script setup lang="ts">
import { Filter, Plus, Clock, Users } from 'lucide-vue-next'
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
  <div class="flex-1 p-[var(--spacing-8)] bg-[var(--background)]">
    <!-- Page Header -->
    <div class="flex items-center justify-between mb-[var(--spacing-6)]">
      <h1 class="text-[var(--font-size-3xl)] font-bold text-[var(--foreground)]">Events</h1>

      <div class="flex items-center gap-[var(--spacing-3)]">
        <Button variant="outline" class="gap-[var(--spacing-2)] border-[var(--border)]">
          <Filter class="h-[var(--spacing-4)] w-[var(--spacing-4)]" />
          Filter
        </Button>

        <SearchInput
          v-model="searchQuery"
          placeholder="Search Shows"
        />

        <Button class="gap-[var(--spacing-2)] bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--foreground)]/90 transition-colors duration-[var(--transition-duration-base)]" as-child>
          <a href="/events/add">
            <Plus class="h-[var(--spacing-4)] w-[var(--spacing-4)]" />
            Add Event
          </a>
        </Button>
      </div>
    </div>

    <!-- Tabs -->
    <Tabs default-value="all" class="w-full">
      <TabsList class="bg-[var(--card)]">
        <TabsTrigger value="all">All Events</TabsTrigger>
        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
        <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
      </TabsList>

      <TabsContent value="all" class="space-y-[var(--spacing-4)] mt-[var(--spacing-6)]">
        <Card v-for="event in eventList" :key="event.id" class="border border-[var(--border)] bg-[var(--card)]">
          <CardContent class="p-[var(--spacing-6)]">
            <!-- Header Row -->
            <div class="flex items-start justify-between mb-[var(--spacing-6)]">
              <div>
                <h3 class="text-[var(--font-size-2xl)] font-bold text-[var(--foreground)] leading-tight">
                  {{ event.day ? formatDisplayDate(event.day.date) : 'TBD' }} - {{ event.day ? getLocation(event.day.city, event.day.state) : 'TBD' }}
                </h3>
                <p class="text-[var(--font-size-sm)] text-[var(--muted-foreground)] mt-[var(--spacing-2)]">
                  {{ event.venue?.name ?? 'TBD' }}
                </p>
              </div>

              <div class="flex items-center gap-[var(--spacing-3)] flex-shrink-0">
                <Button variant="outline" class="border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors duration-[var(--transition-duration-base)]" as-child>
                  <NuxtLink :to="`/events/advance/${event.id}`">Advance</NuxtLink>
                </Button>
                <Button variant="outline" class="border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors duration-[var(--transition-duration-base)]" as-child>
                  <NuxtLink :to="`/guest-list/${event.id}`">Guest List</NuxtLink>
                </Button>
                <Button class="bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--foreground)]/90 transition-colors duration-[var(--transition-duration-base)]" as-child>
                  <NuxtLink :to="event.day ? `/days/${event.day.date}` : '#'">View Details</NuxtLink>
                </Button>
              </div>
            </div>

            <!-- Metadata Row -->
            <div class="grid grid-cols-4 gap-[var(--spacing-8)]">
              <!-- Status -->
              <div>
                <p class="text-[var(--font-size-xs)] text-[var(--muted-foreground)] mb-[var(--spacing-2)] font-medium">Status</p>
                <div class="flex items-center gap-[var(--spacing-2)]">
                  <div :class="[getStatusColor(event.day?.status ?? 'pending'), 'h-2.5 w-2.5 rounded-full']"></div>
                  <span class="text-[var(--font-size-base)] font-semibold text-[var(--foreground)] capitalize">
                    {{ event.day?.status ?? 'Pending' }}
                  </span>
                </div>
              </div>

              <!-- Capacity -->
              <div>
                <p class="text-[var(--font-size-xs)] text-[var(--muted-foreground)] mb-[var(--spacing-2)] font-medium">Capacity</p>
                <div class="flex items-center gap-[var(--spacing-2)]">
                  <Users class="h-[var(--spacing-4)] w-[var(--spacing-4)] text-[var(--muted-foreground)]" />
                  <span class="text-[var(--font-size-base)] font-semibold text-[var(--foreground)]">
                    {{ event.capacity ?? event.venue?.capacity ?? 'TBD' }}
                  </span>
                </div>
              </div>

              <!-- Show Time -->
              <div>
                <p class="text-[var(--font-size-xs)] text-[var(--muted-foreground)] mb-[var(--spacing-2)] font-medium">Show Time</p>
                <div class="flex items-center gap-[var(--spacing-2)]">
                  <Clock class="h-[var(--spacing-4)] w-[var(--spacing-4)] text-[var(--muted-foreground)]" />
                  <span class="text-[var(--font-size-base)] font-semibold text-[var(--foreground)]">
                    {{ event.showTime ?? 'TBD' }}
                  </span>
                </div>
              </div>

              <!-- Advance Status -->
              <div>
                <p class="text-[var(--font-size-xs)] text-[var(--muted-foreground)] mb-[var(--spacing-2)] font-medium">Advance Status</p>
                <div class="flex items-center gap-[var(--spacing-2)]">
                  <div :class="[getAdvanceStatusColor(event.advanceStatus), 'h-2.5 w-2.5 rounded-full']"></div>
                  <span class="text-[var(--font-size-base)] font-semibold text-[var(--foreground)]">
                    {{ getAdvanceStatusText(event.advanceStatus) }}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="upcoming" class="mt-[var(--spacing-6)]">
        <p class="text-[var(--muted-foreground)]">Upcoming events will be shown here.</p>
      </TabsContent>

      <TabsContent value="completed" class="mt-[var(--spacing-6)]">
        <p class="text-[var(--muted-foreground)]">Completed events will be shown here.</p>
      </TabsContent>

      <TabsContent value="cancelled" class="mt-[var(--spacing-6)]">
        <p class="text-[var(--muted-foreground)]">Cancelled events will be shown here.</p>
      </TabsContent>
    </Tabs>
  </div>
</template>
