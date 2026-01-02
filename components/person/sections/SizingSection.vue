<script setup lang="ts">
import { Shirt } from 'lucide-vue-next'
import type { Person } from '@/utils/mockData/types'

defineProps<{
  person: Person
  editable?: boolean
}>()

// Check if section has any clothing data
const hasData = (person: Person) => {
  return !!(person.clothing?.tshirt || person.clothing?.hoodie || person.clothing?.pants || person.clothing?.shoes || person.clothing?.jacket || person.clothing?.hat || person.clothing?.height || person.clothing?.weight)
}
</script>

<template>
  <Card v-if="hasData(person)" class="border border-gray-200 bg-white">
    <CardHeader class="pb-3">
      <div class="flex items-center gap-2">
        <Shirt class="h-5 w-5 text-gray-600" />
        <CardTitle class="text-base font-bold text-gray-900">Sizing Information</CardTitle>
      </div>
    </CardHeader>
    <CardContent class="space-y-3">
      <div v-if="person.clothing?.height || person.clothing?.weight" class="grid grid-cols-2 gap-3">
        <div v-if="person.clothing.height">
          <p class="text-xs font-semibold text-gray-500 uppercase">Height</p>
          <p class="text-sm text-gray-900 mt-1">{{ person.clothing.height }}</p>
        </div>
        <div v-if="person.clothing.weight">
          <p class="text-xs font-semibold text-gray-500 uppercase">Weight</p>
          <p class="text-sm text-gray-900 mt-1">{{ person.clothing.weight }}</p>
        </div>
      </div>
      <Separator v-if="(person.clothing?.height || person.clothing?.weight) && (person.clothing?.tshirt || person.clothing?.hoodie)" class="bg-slate-200" />
      <div v-if="person.clothing?.tshirt">
        <p class="text-xs font-semibold text-gray-500 uppercase">T-Shirt Size</p>
        <p class="text-sm text-gray-900 mt-1">{{ person.clothing.tshirt }}</p>
      </div>
      <Separator v-if="person.clothing?.tshirt && person.clothing?.hoodie" class="bg-slate-200" />
      <div v-if="person.clothing?.hoodie">
        <p class="text-xs font-semibold text-gray-500 uppercase">Hoodie Size</p>
        <p class="text-sm text-gray-900 mt-1">{{ person.clothing.hoodie }}</p>
      </div>
      <Separator v-if="person.clothing?.jacket" class="bg-slate-200" />
      <div v-if="person.clothing?.jacket">
        <p class="text-xs font-semibold text-gray-500 uppercase">Jacket Size</p>
        <p class="text-sm text-gray-900 mt-1">{{ person.clothing.jacket }}</p>
      </div>
      <Separator v-if="person.clothing?.pants" class="bg-slate-200" />
      <div v-if="person.clothing?.pants">
        <p class="text-xs font-semibold text-gray-500 uppercase">Pants Size</p>
        <p class="text-sm text-gray-900 mt-1">{{ person.clothing.pants }}</p>
      </div>
      <Separator v-if="person.clothing?.shoes" class="bg-slate-200" />
      <div v-if="person.clothing?.shoes">
        <p class="text-xs font-semibold text-gray-500 uppercase">Shoe Size</p>
        <p class="text-sm text-gray-900 mt-1">{{ person.clothing.shoes }}</p>
      </div>
      <Separator v-if="person.clothing?.hat" class="bg-slate-200" />
      <div v-if="person.clothing?.hat">
        <p class="text-xs font-semibold text-gray-500 uppercase">Hat Size</p>
        <p class="text-sm text-gray-900 mt-1">{{ person.clothing.hat }}</p>
      </div>
    </CardContent>
  </Card>
</template>
