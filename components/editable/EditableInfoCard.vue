<script setup lang="ts">
import type { Component } from 'vue'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface FieldConfig {
  key: string // path to value, e.g. 'firstName' or 'address.city'
  label: string // display label
  type?: 'text' | 'email' | 'tel' | 'date' | 'number' // input type, default 'text'
  placeholder?: string
  fullWidth?: boolean // span both columns in grid
}

interface Props {
  title: string
  icon: Component
  data: Record<string, any> | null
  fields: FieldConfig[]
  isEditMode: boolean
  helperText?: string // e.g. "💡 In production: Search contacts database"
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:data': [data: Record<string, any>]
}>()

// Deep clone for edit mode to prevent mutation
const localData = ref<Record<string, any> | null>(null)

// Initialize local data when entering edit mode
watch(() => props.isEditMode, (isEdit) => {
  if (isEdit) {
    localData.value = props.data ? JSON.parse(JSON.stringify(props.data)) : {}
  }
}, { immediate: true })

// Get nested value from object using dot notation path
function getNestedValue(obj: any, path: string): any {
  if (!obj) return undefined

  const keys = path.split('.')
  let value = obj

  for (const key of keys) {
    if (value === null || value === undefined) return undefined
    value = value[key]
  }

  return value
}

// Set nested value in object using dot notation path
function setNestedValue(obj: any, path: string, value: any): void {
  if (!obj) return

  const keys = path.split('.')
  const lastKey = keys.pop()

  if (!lastKey) return

  let current = obj

  // Navigate to the parent object, creating intermediate objects as needed
  for (const key of keys) {
    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {}
    }
    current = current[key]
  }

  // Set the final value
  current[lastKey] = value

  // Emit the updated data
  emit('update:data', obj)
}

// Format value for display
function formatDisplayValue(value: any): string {
  if (value === null || value === undefined || value === '') return '—'
  if (typeof value === 'number') return value.toLocaleString()
  return String(value)
}

// Smart display lines for view mode
interface DisplayLine {
  text: string
  isHeading: boolean
  hasSpacing: boolean // mb-3 spacing
  hasTopMargin: boolean // mt-2 spacing
}

const displayLines = computed<DisplayLine[]>(() => {
  if (!props.data) return []

  const lines: DisplayLine[] = []
  const hasFirstName = props.fields.some(f => f.key === 'firstName')
  const hasLastName = props.fields.some(f => f.key === 'lastName')
  const hasCity = props.fields.some(f => f.key === 'city')
  const hasState = props.fields.some(f => f.key === 'state')
  const hasPostal = props.fields.some(f => f.key === 'postalCode')

  // Line 1: Main heading (name or venue name or hotel name)
  if (hasFirstName && hasLastName) {
    // Contact card: combine firstName + lastName
    const firstName = getNestedValue(props.data, 'firstName')
    const lastName = getNestedValue(props.data, 'lastName')
    const fullName = [firstName, lastName].filter(Boolean).join(' ')
    lines.push({ text: fullName || 'TBD', isHeading: true, hasSpacing: false, hasTopMargin: false })
  } else {
    // Venue/Hotel card: use 'name' field
    const name = getNestedValue(props.data, 'name')
    lines.push({ text: formatDisplayValue(name), isHeading: true, hasSpacing: false, hasTopMargin: false })
  }

  // Remaining lines based on card type
  for (const field of props.fields) {
    // Skip fields already handled
    if (field.key === 'firstName' || field.key === 'lastName' || field.key === 'name') continue

    // Skip city/state/postal individually - we'll combine them
    if (field.key === 'city' || field.key === 'state' || field.key === 'postalCode') continue

    // Company name gets spacing (mb-3)
    if (field.key === 'companyName') {
      const value = getNestedValue(props.data, field.key)
      if (value) {
        lines.push({ text: formatDisplayValue(value), isHeading: false, hasSpacing: true, hasTopMargin: false })
      }
      continue
    }

    // Address field
    if (field.key === 'address') {
      const value = getNestedValue(props.data, field.key)
      if (value) {
        lines.push({ text: formatDisplayValue(value), isHeading: false, hasSpacing: false, hasTopMargin: false })
      }
      continue
    }

    // Other fields (phone, email, confirmationNumber, etc.)
    const value = getNestedValue(props.data, field.key)
    if (value) {
      // Phone gets mt-2 if it comes after address
      const hasTopMargin = field.key === 'phone' && props.fields.some(f => f.key === 'address')
      lines.push({ text: formatDisplayValue(value), isHeading: false, hasSpacing: false, hasTopMargin })
    }
  }

  // Add combined city, state, postal line (after address, before phone)
  if (hasCity || hasState || hasPostal) {
    const city = getNestedValue(props.data, 'city')
    const state = getNestedValue(props.data, 'state')
    const postal = getNestedValue(props.data, 'postalCode')

    const parts = []
    if (city && state) {
      parts.push(`${city}, ${state}`)
    } else if (city) {
      parts.push(city)
    } else if (state) {
      parts.push(state)
    }

    if (postal) {
      parts.push(postal)
    }

    if (parts.length > 0) {
      // Insert after address line
      const addressIndex = lines.findIndex(l => l.text.includes('Dr.') || l.text.includes('St'))
      if (addressIndex >= 0) {
        lines.splice(addressIndex + 1, 0, {
          text: parts.join(' '),
          isHeading: false,
          hasSpacing: false,
          hasTopMargin: false
        })
      } else {
        lines.push({ text: parts.join(' '), isHeading: false, hasSpacing: false, hasTopMargin: false })
      }
    }
  }

  return lines
})
</script>

<template>
  <Card class="border border-gray-200 bg-white isolate">
    <CardHeader class="pb-3">
      <div class="flex items-center justify-between relative">
        <CardTitle class="text-sm font-medium text-gray-600 z-10 relative">{{ title }}</CardTitle>
        <div class="absolute right-2 top-2 size-20 opacity-10 -z-10">
          <component :is="icon" class="h-24 w-24 text-gray-600" />
        </div>
      </div>
    </CardHeader>
    <CardContent class="relative z-10">
      <!-- Empty state when no data -->
      <div v-if="!data && !isEditMode" class="text-center py-8 text-gray-400">
        <p class="text-sm">No data available</p>
      </div>

      <Transition v-else name="edit-fade" mode="out-in">
        <!-- VIEW MODE: Original clean display style -->
        <div v-if="!isEditMode" key="view">
          <template v-for="(line, index) in displayLines" :key="index">
            <!-- Heading line -->
            <h3 v-if="line.isHeading" class="text-lg font-semibold text-gray-900 mb-2">
              {{ line.text }}
            </h3>
            <!-- Regular text line -->
            <p v-else class="text-sm text-gray-600" :class="{ 'mb-3': line.hasSpacing, 'mt-2': line.hasTopMargin }">
              {{ line.text }}
            </p>
          </template>
        </div>

        <!-- EDIT MODE: Labeled inputs -->
        <div v-else key="edit" class="space-y-3" role="group" :aria-label="`Edit ${title}`">
          <div
            v-for="field in fields"
            :key="field.key"
            :class="{ 'col-span-2': field.fullWidth }"
          >
            <Label :for="`${title}-${field.key}`" class="text-xs text-gray-500 mb-1 block">{{ field.label }}</Label>
            <Input
              :id="`${title}-${field.key}`"
              :type="field.type || 'text'"
              :placeholder="field.placeholder"
              :model-value="getNestedValue(localData, field.key)"
              @update:model-value="(v) => setNestedValue(localData!, field.key, v)"
              :aria-label="`${field.label} for ${title}`"
              class="text-sm bg-secondary"
            />
          </div>
          <p v-if="helperText" class="text-xs text-gray-400 italic mt-2" role="note">{{ helperText }}</p>
        </div>
      </Transition>
    </CardContent>
  </Card>
</template>
