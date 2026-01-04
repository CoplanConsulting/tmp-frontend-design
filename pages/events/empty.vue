<script setup lang="ts">
import { Calendar, Plus } from 'lucide-vue-next'

definePageMeta({
  layout: 'default'
})

const handleAddEvent = () => {
  navigateTo('/events/add')
}
</script>

<template>
  <div class="flex-1 p-[var(--spacing-8)] bg-[var(--background)]">
    <!-- Page Header -->
    <div class="mb-[var(--spacing-6)]">
      <h1 class="text-[var(--font-size-2xl)] font-bold text-[var(--foreground)]">Events</h1>
      <p class="text-[var(--font-size-sm)] text-[var(--muted-foreground)] mt-[var(--spacing-1)]">Manage your tour schedule with shows, rehearsals, and travel days</p>
    </div>

    <!-- Empty State Card -->
    <Card class="border-2 border-dashed border-[var(--border)] bg-[var(--card)]">
      <div class="flex flex-col items-center justify-center py-[var(--spacing-16)] px-[var(--spacing-8)]">
        <div class="flex items-center justify-center w-[var(--spacing-16)] h-[var(--spacing-16)] rounded-full bg-[var(--muted)] mb-[var(--spacing-6)]">
          <Calendar class="h-[var(--spacing-8)] w-[var(--spacing-8)] text-[var(--muted-foreground)]" />
        </div>
        <h3 class="text-[var(--font-size-xl)] font-bold text-[var(--foreground)] mb-[var(--spacing-2)]">No events yet</h3>
        <p class="text-[var(--font-size-sm)] text-[var(--muted-foreground)] text-center max-w-md mb-[var(--spacing-8)]">
          Add your first event to start building your tour schedule. Track shows, rehearsals, travel days, and more
        </p>
        <Button
          class="bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--foreground)]/90 gap-[var(--spacing-2)] transition-colors duration-[var(--transition-duration-base)]"
          @click="handleAddEvent"
        >
          <Plus class="h-[var(--spacing-4)] w-[var(--spacing-4)]" />
          Add Your First Event
        </Button>
      </div>
    </Card>
  </div>
</template>
