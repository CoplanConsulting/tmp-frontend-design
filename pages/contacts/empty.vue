<script setup lang="ts">
import { UserPlus } from 'lucide-vue-next'

definePageMeta({
  layout: 'default'
})

const handleAddContact = () => {
  navigateTo('/contacts/add')
}
</script>

<template>
  <div class="flex flex-1 flex-col gap-[var(--spacing-6)]">
    <!-- Page Header -->
    <div class="flex flex-col gap-[var(--spacing-1)]">
      <h1 class="text-[length:var(--font-size-2xl)] font-bold text-[var(--foreground)]">Contacts Directory</h1>
      <p class="text-[length:var(--font-size-sm)] text-[var(--muted-foreground)]">Manage external contacts, promoters, and venue representatives</p>
    </div>

    <!-- Empty State Card -->
    <Card class="border-2 border-dashed border-[var(--border)] bg-[var(--card)]">
      <div class="flex flex-col items-center justify-center py-[var(--spacing-16)] px-[var(--spacing-8)]">
        <div class="flex items-center justify-center w-16 h-16 rounded-full bg-[var(--muted)] mb-[var(--spacing-6)]">
          <UserPlus class="h-8 w-8 text-[var(--muted-foreground)]" />
        </div>
        <h3 class="text-[length:var(--font-size-xl)] font-bold text-[var(--foreground)] mb-[var(--spacing-2)]">No contacts yet</h3>
        <p class="text-[length:var(--font-size-sm)] text-[var(--muted-foreground)] text-center max-w-md mb-[var(--spacing-8)]">
          Add your first contact to start building your network of promoters, venue managers, and industry professionals
        </p>
        <Button
          class="bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--foreground)]/90 gap-[var(--spacing-2)] transition-colors duration-[var(--transition-duration-base)]"
          @click="handleAddContact"
        >
          <UserPlus class="h-4 w-4" />
          Add Your First Contact
        </Button>
      </div>
    </Card>
  </div>
</template>
