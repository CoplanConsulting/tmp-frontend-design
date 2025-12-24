<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <div class="flex items-start justify-between">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">{{ title }}</h1>
      <p v-if="description" class="text-sm text-gray-600 mt-0.5">{{ description }}</p>
    </div>

    <div v-if="$slots.actions" class="flex items-center gap-3">
      <slot name="actions" />
    </div>
  </div>
</template>
