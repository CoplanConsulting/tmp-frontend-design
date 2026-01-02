<script setup lang="ts">
import { User } from 'lucide-vue-next'
import type { Person } from '@/utils/mockData/types'

defineProps<{
  person: Person
  editable?: boolean
}>()
</script>

<template>
  <div class="flex items-start gap-4">
    <Avatar class="h-16 w-16 border-2 border-gray-200">
      <AvatarFallback class="text-xl bg-gray-100 text-gray-700 font-semibold">
        {{ person.firstName.charAt(0) }}{{ person.lastName.charAt(0) }}
      </AvatarFallback>
    </Avatar>
    <div>
      <h1 class="text-2xl font-bold text-gray-900">
        {{ person.firstName }}
        <span v-if="person.middleName" class="text-gray-600">{{ person.middleName }}</span>
        {{ person.lastName }}
      </h1>
      <div class="flex items-center gap-3 mt-2">
        <p class="text-sm text-gray-600">{{ person.role }}</p>
        <Badge variant="outline" class="text-xs font-semibold">
          {{ person.department }}
        </Badge>
      </div>
    </div>
  </div>
</template>
