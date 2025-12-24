<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
  title: string
  value: string | number
  subtitle?: string
  icon?: Component
}>()
</script>

<template>
  <Card class="border border-gray-200 bg-white">
    <CardContent class="p-6">
      <div class="flex items-center justify-between mb-2">
        <p class="text-sm font-medium text-gray-600">{{ title }}</p>
        <component v-if="icon" :is="icon" class="h-5 w-5 text-gray-400" />
      </div>
      <div>
        <p class="text-3xl font-bold text-gray-900">{{ value }}</p>
        <p v-if="subtitle" class="text-sm text-gray-600 mt-1">{{ subtitle }}</p>
      </div>
    </CardContent>
  </Card>
</template>
