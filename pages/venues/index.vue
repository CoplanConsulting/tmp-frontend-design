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
  <div class="flex-1 p-8 bg-gray-50">
    <!-- Page Header -->
    <div class="flex items-start justify-between mb-6">
      <div>
        <div class="flex items-center gap-3">
          <h1 class="text-2xl font-bold text-gray-900">Venues</h1>
          <Badge variant="secondary" class="font-semibold text-sm">
            {{ venues.length }}
          </Badge>
        </div>
        <p class="text-sm text-gray-600 mt-1">Manage venue database with technical specs and contacts</p>
      </div>
      <Button class="bg-black text-white hover:bg-gray-800" @click="handleAddVenue">
        <Plus class="h-4 w-4 mr-2" />
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
          class="bg-black text-white hover:bg-gray-800 gap-2"
          @click="handleAddVenue"
        >
          <Plus class="h-4 w-4" />
          Add Your First Venue
        </Button>
      </template>
    </EmptyState>

    <!-- VENUES GRID (when data exists) -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <NuxtLink
        v-for="venue in venues"
        :key="venue.id"
        :to="`/venues/${venue.id}`"
        class="group"
      >
        <Card class="border border-gray-200 bg-white hover:shadow-lg transition-all cursor-pointer h-full">
          <CardContent class="p-6">
            <!-- Venue Icon & Name -->
            <div class="flex items-start gap-4 mb-4">
              <div class="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 group-hover:bg-gray-200 transition-colors">
                <Building2 class="h-6 w-6 text-gray-600" />
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="text-lg font-bold text-gray-900 group-hover:text-black transition-colors truncate">
                  {{ venue.name }}
                </h3>
                <div class="flex items-center gap-1.5 text-sm text-gray-600 mt-1">
                  <MapPin class="h-3.5 w-3.5 flex-shrink-0" />
                  <span class="truncate">{{ venue.city }}, {{ venue.state }}</span>
                </div>
              </div>
            </div>

            <!-- Venue Stats -->
            <div class="flex items-center gap-4 pt-4 border-t border-gray-100">
              <div class="flex items-center gap-2">
                <Users class="h-4 w-4 text-gray-400" />
                <span class="text-sm font-semibold text-gray-900">{{ venue.capacity?.toLocaleString() || 'N/A' }}</span>
              </div>
              <div class="text-xs text-gray-500">
                Capacity
              </div>
            </div>

            <!-- Quick Info -->
            <div class="mt-3 space-y-1">
              <p class="text-xs text-gray-600 truncate" v-if="venue.address">
                {{ venue.address }}
              </p>
              <p class="text-xs text-gray-500 truncate" v-if="venue.venueContactName">
                Contact: {{ venue.venueContactName }}
              </p>
            </div>
          </CardContent>
        </Card>
      </NuxtLink>
    </div>
  </div>
</template>
