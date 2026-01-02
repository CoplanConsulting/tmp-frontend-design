<script setup lang="ts">
import { Globe } from 'lucide-vue-next'
import type { Person } from '@/utils/mockData/types'

defineProps<{
  person: Person
  editable?: boolean
}>()

// Check if section has any data
const hasData = (person: Person) => {
  return !!(person.passportCountry || person.passportNumber || person.passportExpDate || person.nationality || person.driversLicense || person.knownTravelerNumber || person.globalEntryNumber)
}
</script>

<template>
  <Card v-if="hasData(person)" class="border border-gray-200 bg-white">
    <CardHeader class="pb-3">
      <div class="flex items-center gap-2">
        <Globe class="h-5 w-5 text-gray-600" />
        <CardTitle class="text-base font-bold text-gray-900">Travel Documents</CardTitle>
      </div>
    </CardHeader>
    <CardContent class="space-y-3">
      <div v-if="person.passportCountry">
        <p class="text-xs font-semibold text-gray-500 uppercase">Passport Country</p>
        <p class="text-sm text-gray-900 mt-1">{{ person.passportCountry }}</p>
      </div>
      <Separator v-if="person.passportNumber" class="bg-slate-200" />
      <div v-if="person.passportNumber">
        <p class="text-xs font-semibold text-gray-500 uppercase">Passport Number</p>
        <p class="text-sm text-gray-900 mt-1">{{ person.passportNumber }}</p>
      </div>
      <Separator v-if="person.passportExpDate" class="bg-slate-200" />
      <div v-if="person.passportExpDate">
        <p class="text-xs font-semibold text-gray-500 uppercase">Expiration Date</p>
        <p class="text-sm text-gray-900 mt-1">{{ person.passportExpDate }}</p>
      </div>
      <Separator v-if="person.nationality" class="bg-slate-200" />
      <div v-if="person.nationality">
        <p class="text-xs font-semibold text-gray-500 uppercase">Nationality</p>
        <p class="text-sm text-gray-900 mt-1">{{ person.nationality }}</p>
      </div>
      <Separator v-if="person.knownTravelerNumber" class="bg-slate-200" />
      <div v-if="person.knownTravelerNumber">
        <p class="text-xs font-semibold text-gray-500 uppercase">TSA PreCheck / Known Traveler Number</p>
        <p class="text-sm text-gray-900 mt-1">{{ person.knownTravelerNumber }}</p>
      </div>
      <Separator v-if="person.globalEntryNumber" class="bg-slate-200" />
      <div v-if="person.globalEntryNumber">
        <p class="text-xs font-semibold text-gray-500 uppercase">Global Entry Number</p>
        <p class="text-sm text-gray-900 mt-1">{{ person.globalEntryNumber }}</p>
      </div>
      <Separator v-if="person.driversLicense" class="bg-slate-200" />
      <div v-if="person.driversLicense">
        <p class="text-xs font-semibold text-gray-500 uppercase">Driver's License</p>
        <p class="text-sm text-gray-900 mt-1">{{ person.driversLicense.number }} ({{ person.driversLicense.state }})</p>
      </div>
    </CardContent>
  </Card>
</template>
