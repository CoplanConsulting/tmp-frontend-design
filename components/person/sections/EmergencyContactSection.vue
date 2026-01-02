<script setup lang="ts">
import { AlertCircle } from 'lucide-vue-next'
import type { Person } from '@/utils/mockData/types'

defineProps<{
  person: Person
  editable?: boolean
}>()
</script>

<template>
  <Card v-if="person.emergencyContact" class="border border-gray-200 bg-white">
    <CardHeader class="pb-3">
      <div class="flex items-center gap-2">
        <AlertCircle class="h-5 w-5 text-gray-600" />
        <CardTitle class="text-base font-bold text-gray-900">Emergency Contact</CardTitle>
      </div>
    </CardHeader>
    <CardContent class="space-y-3">
      <div>
        <p class="text-xs font-semibold text-gray-500 uppercase">Name</p>
        <p class="text-sm text-gray-900 mt-1">{{ person.emergencyContact.name }}</p>
      </div>
      <Separator v-if="person.emergencyContact.relationship" class="bg-slate-200" />
      <div v-if="person.emergencyContact.relationship">
        <p class="text-xs font-semibold text-gray-500 uppercase">Relationship</p>
        <p class="text-sm text-gray-900 mt-1">{{ person.emergencyContact.relationship }}</p>
      </div>
      <Separator v-if="person.emergencyContact.phone" class="bg-slate-200" />
      <div v-if="person.emergencyContact.phone">
        <p class="text-xs font-semibold text-gray-500 uppercase">Phone</p>
        <a :href="`tel:${person.emergencyContact.phone}`" class="text-sm text-blue-600 hover:underline mt-1 block">
          {{ person.emergencyContact.phone }}
        </a>
      </div>
      <Separator v-if="person.emergencyContact.email" class="bg-slate-200" />
      <div v-if="person.emergencyContact.email">
        <p class="text-xs font-semibold text-gray-500 uppercase">Email</p>
        <a :href="`mailto:${person.emergencyContact.email}`" class="text-sm text-blue-600 hover:underline mt-1 block break-all">
          {{ person.emergencyContact.email }}
        </a>
      </div>
    </CardContent>
  </Card>
</template>
