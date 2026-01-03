<script setup lang="ts">
import { Building2, MapPin, Plus, Users } from 'lucide-vue-next'
import { venues } from '@/utils/mockData'

definePageMeta({
  layout: 'default'
})

// Handle add venue click
const handleAddVenue = () => {
  navigateTo('/venues/add')
}
</script>

<template>
  <div class="flex-1 p-[var(--spacing-8)] bg-[var(--background)]">
    <!-- Page Header -->
    <div class="flex items-start justify-between mb-[var(--spacing-6)]">
      <div>
        <div class="flex items-center gap-[var(--spacing-3)]">
          <h1 class="text-[var(--font-size-2xl)] font-bold text-[var(--foreground)]">Venues</h1>
          <Badge variant="secondary" class="font-semibold text-[var(--font-size-sm)]">
            {{ venues.length }}
          </Badge>
        </div>
        <p class="text-[var(--font-size-sm)] text-[var(--muted-foreground)] mt-[var(--spacing-1)]">
          Manage venue database with technical specs and contacts
        </p>
      </div>
      <Button
        class="bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--foreground)]/90 transition-colors duration-[var(--transition-duration-base)]"
        @click="handleAddVenue"
      >
        <Plus class="h-4 w-4 mr-[var(--spacing-2)]" />
        Add Venue
      </Button>
    </div>

    <!-- TRUE EMPTY STATE: No venues exist at all -->
    <EmptyState
      v-if="venues.length === 0"
      :icon="MapPin"
      title="No venues yet"
      description="Add your first venue to build your database of performance spaces with technical specs, contacts, and logistics"
      dashed
    >
      <template #action>
        <Button
          class="bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--foreground)]/90 gap-[var(--spacing-2)] transition-colors duration-[var(--transition-duration-base)]"
          @click="handleAddVenue"
        >
          <Plus class="h-4 w-4" />
          Add Your First Venue
        </Button>
      </template>
    </EmptyState>

    <!-- VENUES GRID (when data exists) -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--spacing-6)]">
      <NuxtLink
        v-for="venue in venues"
        :key="venue.id"
        :to="`/venues/${venue.id}`"
        class="group"
      >
        <Card class="border border-[var(--border)] bg-[var(--card)] hover:shadow-[var(--shadow-lg)] transition-all duration-[var(--transition-duration-base)] cursor-pointer h-full">
          <CardContent class="p-[var(--spacing-6)]">
            <!-- Venue Icon & Name -->
            <div class="flex items-start gap-[var(--spacing-4)] mb-[var(--spacing-4)]">
              <div class="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-[var(--radius-lg)] bg-[var(--muted)] border border-[var(--border)] group-hover:bg-[var(--muted)]/80 transition-colors duration-[var(--transition-duration-base)]">
                <Building2 class="h-6 w-6 text-[var(--muted-foreground)]" />
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="text-[var(--font-size-lg)] font-bold text-[var(--foreground)] group-hover:text-[var(--foreground)] transition-colors duration-[var(--transition-duration-base)] truncate">
                  {{ venue.name }}
                </h3>
                <div class="flex items-center gap-[var(--spacing-1\.5)] text-[var(--font-size-sm)] text-[var(--muted-foreground)] mt-[var(--spacing-1)]">
                  <MapPin class="h-3.5 w-3.5 flex-shrink-0" />
                  <span class="truncate">{{ venue.city }}, {{ venue.state }}</span>
                </div>
              </div>
            </div>

            <!-- Venue Stats -->
            <div class="flex items-center gap-[var(--spacing-4)] pt-[var(--spacing-4)] border-t border-[var(--border)]">
              <div class="flex items-center gap-[var(--spacing-2)]">
                <Users class="h-4 w-4 text-[var(--muted-foreground)]/60" />
                <span class="text-[var(--font-size-sm)] font-semibold text-[var(--foreground)]">
                  {{ venue.capacity?.toLocaleString() || 'N/A' }}
                </span>
              </div>
              <div class="text-[var(--font-size-xs)] text-[var(--muted-foreground)]">
                Capacity
              </div>
            </div>

            <!-- Quick Info -->
            <div class="mt-[var(--spacing-3)] space-y-[var(--spacing-1)]">
              <p class="text-[var(--font-size-xs)] text-[var(--muted-foreground)] truncate" v-if="venue.address">
                {{ venue.address }}
              </p>
              <p class="text-[var(--font-size-xs)] text-[var(--muted-foreground)]/80 truncate" v-if="venue.venueContactName">
                Contact: {{ venue.venueContactName }}
              </p>
            </div>
          </CardContent>
        </Card>
      </NuxtLink>
    </div>
  </div>
</template>
