<script setup lang="ts">
import {
  EyeOff,
  Building2,
  Users,
  AlertCircle
} from 'lucide-vue-next'

interface Props {
  sectionKey: string
  currentValue: string
  isRequired: boolean
  helpText: string
  privacyOptions: Array<{
    value: string
    label: string
    description: string
    icon: any
    color: string
    bgColor: string
    borderColor: string
  }>
  requiredLabel?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:value': [value: string]
}>()

// Handle privacy option change
function handleChange(newValue: string) {
  if (!props.isRequired) {
    emit('update:value', newValue)
  }
}

// Get the current selected option details
const currentOption = computed(() => {
  return props.privacyOptions.find(opt => opt.value === props.currentValue) || props.privacyOptions[1]
})
</script>

<template>
  <div class="space-y-4">
    <!-- Help Text -->
    <p class="privacy-help-text">{{ helpText }}</p>

    <!-- Privacy Options Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
      <button
        v-for="option in privacyOptions"
        :key="option.value"
        type="button"
        @click="handleChange(option.value)"
        :disabled="isRequired"
        :class="[
          'privacy-option-btn',
          currentValue === option.value
            ? `${option.borderColor} ${option.bgColor} privacy-option-btn--selected`
            : 'privacy-option-btn--inactive',
          isRequired && currentValue !== option.value
            ? 'privacy-option-btn--disabled-inactive'
            : isRequired
            ? 'privacy-option-btn--disabled'
            : 'privacy-option-btn--active'
        ]"
      >
        <component
          :is="option.icon"
          :class="[
            'h-5 w-5 shrink-0 mt-0.5',
            currentValue === option.value ? option.color : 'text-gray-400'
          ]"
        />
        <div class="text-left flex-1">
          <p
            :class="[
              'text-sm font-semibold',
              currentValue === option.value ? 'text-gray-900' : 'text-gray-600'
            ]"
          >
            {{ option.label }}
          </p>
          <p class="text-xs text-gray-500 mt-0.5">{{ option.description }}</p>
        </div>

        <!-- Selected Indicator -->
        <div
          v-if="currentValue === option.value"
          :class="['h-5 w-5 rounded-full flex items-center justify-center shrink-0', option.bgColor]"
        >
          <div :class="['h-3 w-3 rounded-full', option.color.replace('text-', 'bg-')]"></div>
        </div>
      </button>
    </div>

    <!-- Organization Override Warning -->
    <div v-if="isRequired" class="org-required-warning">
      <AlertCircle class="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
      <p class="text-xs text-amber-800">
        Your organization requires <strong>{{ currentOption.label }}</strong> sharing for this section. You cannot change this setting.
      </p>
    </div>
  </div>
</template>
