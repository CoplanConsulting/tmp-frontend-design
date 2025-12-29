<script setup lang="ts">
interface FieldConfig {
  key: string              // path to value, e.g. 'loadInDetails' or 'catering.buyout'
  label: string            // display label
  type?: 'text' | 'email' | 'tel' | 'date' | 'time' | 'number' | 'textarea'
  placeholder?: string
  fullWidth?: boolean      // span full width (default for textarea)
  readOnly?: boolean       // some fields may be view-only (e.g. venue info)
}

interface SectionConfig {
  title?: string           // optional section header within accordion
  fields: FieldConfig[]
}

interface Props {
  value: string            // accordion item value for open/close state
  title: string            // accordion trigger text
  data: Record<string, any> | null
  sections: SectionConfig[] // grouped fields with optional section headers
  isEditMode: boolean
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

// Check if section has any visible data in view mode
function hasSectionData(section: SectionConfig): boolean {
  if (props.isEditMode) return true
  return section.fields.some(field => {
    const value = getNestedValue(props.data, field.key)
    return value !== null && value !== undefined && value !== ''
  })
}

// Check if entire accordion has any data
const hasAnyData = computed(() => {
  if (props.isEditMode) return true
  return props.sections.some(section => hasSectionData(section))
})
</script>

<template>
  <AccordionItem
    :value="value"
    class="border border-gray-200/80 bg-white rounded-lg mb-4 px-6 shadow-sm hover:shadow-md transition-shadow data-[state=open]:shadow-md data-[state=open]:pb-6 data-[state=open]:border-gray-300"
  >
    <AccordionTrigger class="py-5 text-base font-semibold text-gray-900 hover:no-underline">
      {{ title }}
    </AccordionTrigger>
    <AccordionContent class="pt-4">
      <div v-if="hasAnyData" class="space-y-6">
        <template v-for="(section, sectionIdx) in sections" :key="sectionIdx">
          <div v-if="hasSectionData(section)">
            <!-- Section header if provided -->
            <h3 v-if="section.title" class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
              {{ section.title }}
            </h3>

            <Transition name="edit-fade" mode="out-in">
              <!-- VIEW MODE -->
              <div v-if="!isEditMode" key="view" class="grid gap-y-3" style="grid-template-columns: auto 1fr; column-gap: 1.5rem;">
                <template v-for="field in section.fields" :key="field.key">
                  <template v-if="getNestedValue(data, field.key)">
                    <span class="text-sm text-gray-600 font-medium text-right uppercase">{{ field.label }}</span>
                    <span class="text-sm text-gray-900 whitespace-pre-wrap">{{ getNestedValue(data, field.key) || '—' }}</span>
                  </template>
                </template>
              </div>

              <!-- EDIT MODE -->
              <div v-else key="edit" class="space-y-4" role="group" :aria-label="`Edit ${section.title || title}`">
                <div v-for="field in section.fields" :key="field.key">
                  <Label :for="`${title}-${field.key}`" class="text-xs text-gray-500 uppercase tracking-wider mb-2">{{ field.label }}</Label>

                  <!-- Read-only fields stay as text -->
                  <p v-if="field.readOnly" class="text-sm text-gray-900">
                    {{ getNestedValue(data, field.key) || '—' }}
                  </p>

                  <!-- Textarea for multiline -->
                  <Textarea
                    v-else-if="field.type === 'textarea'"
                    :id="`${title}-${field.key}`"
                    :model-value="getNestedValue(localData, field.key)"
                    @update:model-value="(v) => setNestedValue(localData!, field.key, v)"
                    :placeholder="field.placeholder"
                    :aria-label="`${field.label} for ${title}`"
                    rows="2"
                    class="text-sm resize-y"
                  />

                  <!-- Input for everything else -->
                  <Input
                    v-else
                    :id="`${title}-${field.key}`"
                    :type="field.type || 'text'"
                    :model-value="getNestedValue(localData, field.key)"
                    @update:model-value="(v) => setNestedValue(localData!, field.key, v)"
                    :placeholder="field.placeholder"
                    :aria-label="`${field.label} for ${title}`"
                    class="text-sm"
                  />
                </div>
              </div>
            </Transition>

            <!-- Separator between sections -->
            <div v-if="sectionIdx < sections.length - 1 && hasSectionData(sections[sectionIdx + 1])" class="pt-6 border-t border-gray-200 mt-6"></div>
          </div>
        </template>
      </div>

      <!-- Empty State -->
      <div v-else class="text-sm text-gray-500">
        No {{ title.toLowerCase() }} information available.
      </div>
    </AccordionContent>
  </AccordionItem>
</template>
