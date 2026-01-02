<script setup lang="ts">
import { Phone, Mail, MapPin } from 'lucide-vue-next'
import type { Person } from '@/utils/mockData/types'

defineProps<{
  person: Person
  editable?: boolean
}>()

// Helper to format address
const formatAddress = (address?: { street: string; line2?: string; city: string; state: string; zip: string; country?: string }) => {
  if (!address) return null
  const parts = [
    address.street,
    address.line2,
    `${address.city}, ${address.state} ${address.zip}`,
    address.country
  ].filter(Boolean)
  return parts.join('\n')
}
</script>

<template>
  <Card class="border border-gray-200 bg-white">
    <CardHeader class="pb-3">
      <div class="flex items-center gap-2">
        <Phone class="h-5 w-5 text-gray-600" />
        <CardTitle class="text-base font-bold text-gray-900">Contact Information</CardTitle>
      </div>
    </CardHeader>
    <CardContent class="space-y-3">
      <div v-if="person.email">
        <p class="text-xs font-semibold text-gray-500 uppercase">Email</p>
        <a :href="`mailto:${person.email}`" class="text-sm text-blue-600 hover:underline mt-1 block break-all">
          {{ person.email }}
        </a>
      </div>
      <Separator v-if="person.email && person.phone" class="bg-slate-200" />
      <div v-if="person.phone">
        <p class="text-xs font-semibold text-gray-500 uppercase">Phone</p>
        <a :href="`tel:${person.phone}`" class="text-sm text-blue-600 hover:underline mt-1 block">
          {{ person.phone }}
        </a>
      </div>
      <Separator v-if="person.address" class="bg-slate-200" />
      <div v-if="person.address">
        <p class="text-xs font-semibold text-gray-500 uppercase">Address</p>
        <p class="text-sm text-gray-900 mt-1 whitespace-pre-line">{{ formatAddress(person.address) }}</p>
      </div>
      <div v-if="!person.email && !person.phone && !person.address">
        <p class="text-sm text-gray-500 italic">No contact information available</p>
      </div>
    </CardContent>
  </Card>
</template>
