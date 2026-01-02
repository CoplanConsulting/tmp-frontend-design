<script setup lang="ts">
import { Hotel, Bus, Plane } from 'lucide-vue-next'
import type { Person } from '@/utils/mockData/types'

defineProps<{
  person: Person
  editable?: boolean
}>()

// Check if section has any preference data
const hasData = (person: Person) => {
  return !!(person.hotelPrefs || person.busPrefs || person.flightPrefs || person.frequentFlyer?.length)
}
</script>

<template>
  <Card v-if="hasData(person)" class="border border-gray-200 bg-white">
    <CardHeader class="pb-3">
      <div class="flex items-center gap-2">
        <Hotel class="h-5 w-5 text-gray-600" />
        <CardTitle class="text-base font-bold text-gray-900">Tour Preferences</CardTitle>
      </div>
    </CardHeader>
    <CardContent class="space-y-4">
      <!-- Hotel Preferences -->
      <div v-if="person.hotelPrefs">
        <p class="text-xs font-semibold text-gray-500 uppercase mb-2">Hotel Preferences</p>
        <div class="space-y-2">
          <div v-if="person.hotelPrefs.roomType" class="flex items-center justify-between text-sm">
            <span class="text-gray-600">Room Type:</span>
            <span class="text-gray-900 font-medium capitalize">{{ person.hotelPrefs.roomType }}</span>
          </div>
          <div v-if="person.hotelPrefs.smoking !== undefined" class="flex items-center justify-between text-sm">
            <span class="text-gray-600">Smoking:</span>
            <span class="text-gray-900 font-medium">{{ person.hotelPrefs.smoking ? 'Yes' : 'No' }}</span>
          </div>
        </div>
      </div>

      <!-- Bus Preferences -->
      <Separator v-if="person.hotelPrefs && person.busPrefs" class="bg-slate-200" />
      <div v-if="person.busPrefs">
        <p class="text-xs font-semibold text-gray-500 uppercase mb-2">Bus Preferences</p>
        <div class="space-y-2">
          <div v-if="person.busPrefs.bunkSide" class="flex items-center justify-between text-sm">
            <span class="text-gray-600">Bunk Side:</span>
            <span class="text-gray-900 font-medium capitalize">{{ person.busPrefs.bunkSide }}</span>
          </div>
          <div v-if="person.busPrefs.bunkLevel" class="flex items-center justify-between text-sm">
            <span class="text-gray-600">Bunk Level:</span>
            <span class="text-gray-900 font-medium capitalize">{{ person.busPrefs.bunkLevel }}</span>
          </div>
          <div v-if="person.busPrefs.bunkPosition" class="flex items-center justify-between text-sm">
            <span class="text-gray-600">Bunk Position:</span>
            <span class="text-gray-900 font-medium capitalize">{{ person.busPrefs.bunkPosition }}</span>
          </div>
        </div>
      </div>

      <!-- Flight Preferences -->
      <Separator v-if="(person.hotelPrefs || person.busPrefs) && person.flightPrefs" class="bg-slate-200" />
      <div v-if="person.flightPrefs">
        <p class="text-xs font-semibold text-gray-500 uppercase mb-2">Flight Preferences</p>
        <div class="space-y-2">
          <div v-if="person.flightPrefs.seat" class="flex items-center justify-between text-sm">
            <span class="text-gray-600">Seat Preference:</span>
            <span class="text-gray-900 font-medium capitalize">{{ person.flightPrefs.seat }}</span>
          </div>
          <div v-if="person.flightPrefs.time" class="flex items-center justify-between text-sm">
            <span class="text-gray-600">Preferred Time:</span>
            <span class="text-gray-900 font-medium uppercase">{{ person.flightPrefs.time }}</span>
          </div>
          <div v-if="person.flightPrefs.meal" class="flex items-center justify-between text-sm">
            <span class="text-gray-600">Meal Preference:</span>
            <span class="text-gray-900 font-medium capitalize">{{ person.flightPrefs.meal.replace(/_/g, ' ') }}</span>
          </div>
          <div v-if="person.flightPrefs.notes" class="mt-2">
            <p class="text-xs text-gray-600 italic">{{ person.flightPrefs.notes }}</p>
          </div>
        </div>
      </div>

      <!-- Frequent Flyer Programs -->
      <Separator v-if="person.frequentFlyer?.length" class="bg-slate-200" />
      <div v-if="person.frequentFlyer?.length">
        <p class="text-xs font-semibold text-gray-500 uppercase mb-2">Frequent Flyer Programs</p>
        <div class="space-y-2">
          <div v-for="(ff, idx) in person.frequentFlyer" :key="idx" class="flex items-center justify-between text-sm">
            <span class="text-gray-600">{{ ff.airline }}:</span>
            <span class="text-gray-900 font-mono">{{ ff.accountNumber }}</span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
