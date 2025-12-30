<script setup lang="ts">
import type { Component } from 'vue'

/**
 * EmptyState Component
 *
 * Replaces 20+ duplicated empty state cards across the app.
 * Provides a consistent empty state UI with icon, title, description, and action button.
 */

const props = withDefaults(
  defineProps<{
    icon: Component
    title: string
    description: string
    dashed?: boolean
  }>(),
  {
    dashed: false
  }
)
</script>

<template>
  <div :class="['empty-state', { 'empty-state--dashed': props.dashed }]">
    <div class="empty-state__content">
      <div class="empty-state__icon-wrapper">
        <component :is="props.icon" class="empty-state__icon" />
      </div>
      <h3 class="empty-state__title">{{ props.title }}</h3>
      <p class="empty-state__description">{{ props.description }}</p>
      <div v-if="$slots.action" class="empty-state__action">
        <slot name="action" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Component structure styles using BEM-ish naming */
.empty-state {
  border-radius: 0.5rem; /* rounded-lg */
}

.empty-state--dashed {
  border: 2px dashed rgb(209 213 219); /* border-2 border-dashed border-gray-300 */
  background-color: white;
}

/* Dark mode override for dashed variant */
:deep(.dark) .empty-state--dashed {
  border-color: rgb(55 65 81); /* dark:border-gray-700 */
  background-color: rgb(17 24 39); /* dark:bg-gray-900 */
}

.empty-state__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem; /* py-16 px-8 */
}

.empty-state__icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem; /* w-16 */
  height: 4rem; /* h-16 */
  border-radius: 9999px; /* rounded-full */
  background-color: rgb(243 244 246); /* bg-gray-100 */
  margin-bottom: 1.5rem; /* mb-6 */
}

/* Dark mode override for icon wrapper */
:deep(.dark) .empty-state__icon-wrapper {
  background-color: rgb(55 65 81); /* dark:bg-gray-700 */
}

.empty-state__icon {
  height: 2rem; /* h-8 */
  width: 2rem; /* w-8 */
  color: rgb(75 85 99); /* text-gray-600 */
}

/* Dark mode override for icon */
:deep(.dark) .empty-state__icon {
  color: rgb(156 163 175); /* dark:text-gray-400 */
}

.empty-state__title {
  font-size: 1.25rem; /* text-xl */
  font-weight: 700; /* font-bold */
  color: rgb(17 24 39); /* text-gray-900 */
  margin-bottom: 0.5rem; /* mb-2 */
}

/* Dark mode override for title */
:deep(.dark) .empty-state__title {
  color: rgb(243 244 246); /* dark:text-gray-100 */
}

.empty-state__description {
  font-size: 0.875rem; /* text-sm */
  color: rgb(75 85 99); /* text-gray-600 */
  text-align: center;
  max-width: 28rem; /* max-w-md */
  margin-bottom: 2rem; /* mb-8 */
}

/* Dark mode override for description */
:deep(.dark) .empty-state__description {
  color: rgb(156 163 175); /* dark:text-gray-400 */
}

.empty-state__action {
  /* Action slot container - no styles needed, button handles its own styling */
}
</style>
