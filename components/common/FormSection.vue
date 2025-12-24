<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <div class="space-y-4">
    <div>
      <h3 class="text-base font-semibold text-gray-900 mb-1">{{ title }}</h3>
      <p v-if="description" class="text-sm text-gray-500">{{ description }}</p>
    </div>

    <slot />
  </div>
</template>
