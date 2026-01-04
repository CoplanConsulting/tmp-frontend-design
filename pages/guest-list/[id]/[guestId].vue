<script setup lang="ts">
import { Calendar, Edit, Printer, Trash2, MapPin } from 'lucide-vue-next'
import { getGuestById, getEventListItems, getEventWithDetails } from '~/utils/mockData'

definePageMeta({
  layout: 'default'
})

const route = useRoute()
const guestId = computed(() => route.params.guestId as string)

// Reactive guest and related event
const guest = computed(() => {
  const id = guestId.value
  return id ? getGuestById(id) : undefined
})

const event = computed(() => {
  return guest.value ? getEventWithDetails(guest.value.eventId) : undefined
})

const eventListItems = getEventListItems()

const getStatusClass = (status: string) => {
  const classes = {
    approved: 'bg-green-50 text-green-800 border-green-200 dark:bg-green-950 dark:text-green-200 dark:border-green-800',
    pending: 'bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-200 dark:border-yellow-800',
    declined: 'bg-red-50 text-red-800 border-red-200 dark:bg-red-950 dark:text-red-200 dark:border-red-800'
  }
  return classes[status as keyof typeof classes] || 'bg-[var(--muted)] text-[var(--foreground)] border-[var(--border)]'
}

const getStatusText = (status: string) => {
  return status.charAt(0).toUpperCase() + status.slice(1)
}
</script>

<template>
  <!-- Rest of template unchanged except minor fixes below -->
  <!-- ... (sidebar same as before) ... -->

  <div v-if="guest && event" class="flex flex-1 flex-col gap-[var(--spacing-6)] p-[var(--spacing-6)] bg-[var(--background)]">
    <!-- Page Header -->
    <div class="flex items-start justify-between">
      <div class="flex items-center gap-[var(--spacing-3)]">
        <Badge class="bg-[var(--foreground)] text-[var(--background)] font-bold text-[var(--font-size-xs)] px-[var(--spacing-3)] py-1.5 hover:bg-[var(--foreground)]">
          {{ event.day?.dayOfWeek }} {{ event.day?.dateShort }}
        </Badge>
        <div>
          <h1 class="text-[var(--font-size-2xl)] font-bold text-[var(--foreground)]">{{ event.day?.location }}</h1>
          <p class="text-[var(--font-size-sm)] text-[var(--muted-foreground)] mt-[var(--spacing-1)]">{{ event.venue?.name ?? 'TBD' }}</p>
        </div>
      </div>

      <div class="flex items-center gap-[var(--spacing-3)]">
        <Button variant="outline" class="text-[var(--foreground)] transition-colors duration-[var(--transition-duration-base)]" as-child>
          <NuxtLink :to="`/days/${event.dayId}`">Event Details</NuxtLink>
        </Button>
        <Button class="bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--foreground)]/90 transition-colors duration-[var(--transition-duration-base)]" as-child>
          <NuxtLink :to="`/events/${guest.eventId}`">Edit Event</NuxtLink>
        </Button>
      </div>
    </div>

    <!-- TODO: Guest Details Card to be implemented -->
    <!-- Use DetailCard.vue component with guest information -->
    <Card class="border border-[var(--border)] bg-[var(--card)]">
      <CardHeader>
        <CardTitle class="text-[var(--font-size-lg)] font-bold text-[var(--foreground)]">Guest Details</CardTitle>
      </CardHeader>
      <CardContent class="space-y-[var(--spacing-4)]">
        <div class="grid grid-cols-2 gap-[var(--spacing-4)]">
          <div>
            <p class="text-[var(--font-size-xs)] font-semibold text-[var(--muted-foreground)] uppercase tracking-wide mb-[var(--spacing-1)]">Name</p>
            <p class="text-[var(--font-size-sm)] text-[var(--foreground)]">{{ guest.name ?? 'N/A' }}</p>
          </div>
          <div>
            <p class="text-[var(--font-size-xs)] font-semibold text-[var(--muted-foreground)] uppercase tracking-wide mb-[var(--spacing-1)]">Email</p>
            <p class="text-[var(--font-size-sm)] text-[var(--foreground)]">{{ guest.email ?? 'N/A' }}</p>
          </div>
          <div>
            <p class="text-[var(--font-size-xs)] font-semibold text-[var(--muted-foreground)] uppercase tracking-wide mb-[var(--spacing-1)]">Status</p>
            <Badge :class="getStatusClass(guest.status)" class="text-[var(--font-size-xs)]">{{ getStatusText(guest.status) }}</Badge>
          </div>
          <div>
            <p class="text-[var(--font-size-xs)] font-semibold text-[var(--muted-foreground)] uppercase tracking-wide mb-[var(--spacing-1)]">Requestor</p>
            <p class="text-[var(--font-size-sm)] text-[var(--foreground)]">{{ guest.requestorName ?? 'N/A' }}</p>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Back button fixed -->
    <Button variant="outline" class="transition-colors duration-[var(--transition-duration-base)]" as-child>
      <NuxtLink :to="`/guest-list/${guest.eventId}`">
        Back to Guest List
      </NuxtLink>
    </Button>
  </div>

  <div v-else class="flex flex-1 flex-col items-center justify-center p-[var(--spacing-6)] bg-[var(--background)]">
    <p class="text-[var(--muted-foreground)] text-[var(--font-size-sm)]">{{ guest ? 'Event not found' : 'Guest not found' }}</p>
  </div>
</template>