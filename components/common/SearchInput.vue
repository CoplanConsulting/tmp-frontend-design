<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import { Input } from '~/components/ui/input'

/**
 * SearchInput Component
 *
 * Replaces 15+ duplicated search bar patterns across the app.
 * Provides a consistent search input with icon and styling.
 */

const props = withDefaults(
  defineProps<{
    placeholder?: string
  }>(),
  {
    placeholder: 'Search...'
  }
)

const modelValue = defineModel<string>()
</script>

<template>
  <div class="search-input-wrapper">
    <Search class="search-input-icon" />
    <Input
      v-model="modelValue"
      type="text"
      :placeholder="props.placeholder"
      class="search-input-field"
    />
  </div>
</template>

<style scoped>
/* Component-specific layout styles (NOT global utilities) */
.search-input-wrapper {
  position: relative;
  flex: 1;
  max-width: 28rem; /* max-w-md = 28rem */
}

.search-input-icon {
  position: absolute;
  left: 0.75rem; /* left-3 = 12px */
  top: 50%;
  transform: translateY(-50%);
  height: 1rem; /* h-4 = 16px */
  width: 1rem;  /* w-4 = 16px */
  color: rgb(156 163 175); /* text-gray-400 */
  pointer-events: none;
}

.search-input-field {
  padding-left: 2.5rem; /* pl-10 = 40px */
  border-color: rgb(229 231 235); /* border-gray-200 */
}
</style>
