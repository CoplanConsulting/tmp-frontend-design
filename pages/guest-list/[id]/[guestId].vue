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
    approved: 'bg-green-100 text-green-800 border-green-200',
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    declined: 'bg-red-100 text-red-800 border-red-200'
  }
  return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-800 border-gray-200'
}

const getStatusText = (status: string) => {
  return status.charAt(0).toUpperCase() + status.slice(1)
}
</script>

<template>
  <!-- Rest of template unchanged except minor fixes below -->
  <!-- ... (sidebar same as before) ... -->

  <div v-if="guest && event" class="flex flex-1 flex-col gap-6 p-6 bg-gray-50">
    <!-- Page Header -->
    <div class="flex items-start justify-between">
      <div class="flex items-center gap-3">
        <Badge class="bg-black text-white font-bold text-xs px-3 py-1.5 hover:bg-black">
          {{ event.day?.dayOfWeek }} {{ event.day?.dateShort }}
        </Badge>
        <div>
          <h1 class="text-2xl font-bold text-gray-900">{{ event.day?.location }}</h1>
          <p class="text-sm text-gray-600 mt-0.5">{{ event.venue?.name ?? 'TBD' }}</p>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <Button variant="outline" class="text-gray-900" as-child>
          <NuxtLink :to="`/days/${event.dayId}`">Event Details</NuxtLink>
        </Button>
        <Button class="bg-black text-white hover:bg-gray-800" as-child>
          <NuxtLink :to="`/events/${guest.eventId}`">Edit Event</NuxtLink>
        </Button>
      </div>
    </div>

    <!-- Guest Details Card (unchanged content, just safe access) -->
    <!-- Use guest.email ?? 'N/A', guest.requestorName, etc. as before -->

    <!-- Back button fixed -->
    <Button variant="outline" as-child>
      <NuxtLink :to="`/guest-list/${guest.eventId}`">
        Back to Guest List
      </NuxtLink>
    </Button>
  </div>

  <div v-else class="flex flex-1 flex-col items-center justify-center p-6 bg-gray-50">
    <p class="text-gray-600">{{ guest ? 'Event not found' : 'Guest not found' }}</p>
  </div>
</template>