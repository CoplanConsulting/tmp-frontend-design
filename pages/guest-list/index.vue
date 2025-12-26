<script setup lang="ts">
import { getEventListItems } from '~/utils/mockData'

definePageMeta({
  layout: 'default'
})

// Get the first event and redirect to it
const eventListItems = getEventListItems()
const firstEventId = eventListItems[0]?.id

if (firstEventId) {
  navigateTo(`/guest-list/${firstEventId}`, { replace: true })
} else {
  // Fallback if no events exist
  navigateTo('/dashboard', { replace: true })
}
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <p class="text-gray-600">Loading guest list...</p>
  </div>
</template>
