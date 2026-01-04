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
  <div class="flex items-center justify-center h-screen bg-[var(--background)]">
    <p class="text-[var(--muted-foreground)] text-[var(--font-size-sm)]">Loading guest list...</p>
  </div>
</template>
