<script setup lang="ts">
import { Trash2, Plus } from 'lucide-vue-next'
import type { LaborCall, LaborCallEntry } from '~/utils/mockData/types'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface Props {
  laborCall?: LaborCall | null
  isEditMode: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:laborCall': [laborCall: LaborCall]
}>()

// Deep clone for edit mode to prevent mutation
const localData = ref<LaborCall | null>(null)

// Initialize local data when entering edit mode
watch(() => props.isEditMode, (isEdit) => {
  if (isEdit) {
    localData.value = props.laborCall
      ? JSON.parse(JSON.stringify(props.laborCall))
      : { entries: [], currency: 'USD', totalCost: 0, notes: '' }
  }
}, { immediate: true })

// Currency options
const currencies = ['USD', 'CAD', 'EUR', 'GBP']

// Add new entry
function addEntry() {
  if (!localData.value) return

  localData.value.entries.push({
    time: '',
    call: '',
    type: '',
    count: 0,
    notes: ''
  })

  emit('update:laborCall', localData.value)
}

// Delete entry
function deleteEntry(index: number) {
  if (!localData.value) return

  localData.value.entries.splice(index, 1)
  emit('update:laborCall', localData.value)
}

// Update entry field
function updateEntry(index: number, field: keyof LaborCallEntry, value: any) {
  if (!localData.value) return

  localData.value.entries[index][field] = value as never
  emit('update:laborCall', localData.value)
}

// Update currency
function updateCurrency(value: any) {
  if (!localData.value || !value || typeof value !== 'string') return

  localData.value.currency = value
  emit('update:laborCall', localData.value)
}

// Update total cost
function updateTotalCost(value: string | number) {
  if (!localData.value) return

  localData.value.totalCost = typeof value === 'string' ? parseFloat(value) || 0 : value
  emit('update:laborCall', localData.value)
}

// Update notes
function updateNotes(value: string | number) {
  if (!localData.value) return

  localData.value.notes = String(value)
  emit('update:laborCall', localData.value)
}

// Check if we have any data to display
const hasData = computed(() => {
  if (props.isEditMode) return true
  return props.laborCall?.entries && props.laborCall.entries.length > 0
})
</script>

<template>
  <AccordionItem
    value="labor-call"
    class="border border-gray-200/80 bg-white rounded-lg mb-4 px-6 shadow-sm hover:shadow-md transition-shadow data-[state=open]:shadow-md data-[state=open]:pb-6 data-[state=open]:border-gray-300"
  >
    <AccordionTrigger class="py-5 text-base font-semibold text-gray-900 hover:no-underline">
      Labor Call
    </AccordionTrigger>
    <AccordionContent class="pt-4">
      <div v-if="hasData" class="space-y-6">
        <!-- Table -->
        <div class="rounded-md border border-gray-200">
          <Table>
            <TableHeader>
              <TableRow class="bg-gray-50">
                <TableHead class="font-semibold text-gray-700">Time</TableHead>
                <TableHead class="font-semibold text-gray-700">Call</TableHead>
                <TableHead class="font-semibold text-gray-700">Type</TableHead>
                <TableHead class="font-semibold text-gray-700">Count</TableHead>
                <TableHead class="font-semibold text-gray-700">Notes</TableHead>
                <TableHead v-if="isEditMode" class="font-semibold text-gray-700 w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <!-- VIEW MODE -->
              <template v-if="!isEditMode">
                <TableRow v-for="(entry, idx) in laborCall?.entries" :key="`view-${idx}`">
                  <TableCell class="font-medium">{{ entry.time }}</TableCell>
                  <TableCell>{{ entry.call }}</TableCell>
                  <TableCell>{{ entry.type }}</TableCell>
                  <TableCell>{{ entry.count }}</TableCell>
                  <TableCell class="max-w-[300px]">{{ entry.notes }}</TableCell>
                </TableRow>
              </template>

              <!-- EDIT MODE -->
              <template v-else>
                <TableRow v-for="(entry, idx) in localData?.entries" :key="`edit-${idx}`">
                  <TableCell>
                    <Input
                      type="time"
                      :model-value="entry.time"
                      @update:model-value="(v) => updateEntry(idx, 'time', v)"
                      :aria-label="`Labor call time for entry ${idx + 1}`"
                      class="text-sm w-[140px]"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      :model-value="entry.call"
                      @update:model-value="(v) => updateEntry(idx, 'call', v)"
                      placeholder="Load In"
                      :aria-label="`Call type for entry ${idx + 1}`"
                      class="text-sm"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      :model-value="entry.type"
                      @update:model-value="(v) => updateEntry(idx, 'type', v)"
                      placeholder="Loaders"
                      :aria-label="`Labor type for entry ${idx + 1}`"
                      class="text-sm"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      :model-value="entry.count"
                      @update:model-value="(v) => updateEntry(idx, 'count', typeof v === 'string' ? parseInt(v) || 0 : v)"
                      min="0"
                      :aria-label="`Labor count for entry ${idx + 1}`"
                      class="text-sm w-[80px]"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      :model-value="entry.notes"
                      @update:model-value="(v) => updateEntry(idx, 'notes', v)"
                      placeholder="Notes..."
                      :aria-label="`Notes for entry ${idx + 1}`"
                      class="text-sm"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      @click="deleteEntry(idx)"
                      :aria-label="`Delete entry ${idx + 1}`"
                      class="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 class="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              </template>
            </TableBody>
          </Table>
        </div>

        <!-- Add Row Button (Edit Mode Only) -->
        <Button
          v-if="isEditMode"
          variant="outline"
          size="sm"
          @click="addEntry"
          class="gap-2"
        >
          <Plus class="h-4 w-4" />
          Add Row
        </Button>

        <!-- Summary Section -->
        <div class="border-t border-gray-200 pt-6 space-y-4">
          <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Summary
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Currency Selector -->
            <div>
              <Label for="labor-currency" class="text-xs text-gray-500 uppercase tracking-wider mb-2">Currency</Label>

              <Transition name="edit-fade" mode="out-in">
                <!-- VIEW MODE -->
                <div v-if="!isEditMode" key="view" class="text-sm text-gray-900 font-medium">
                  {{ laborCall?.currency || 'USD' }}
                </div>

                <!-- EDIT MODE -->
                <Select
                  v-else
                  key="edit"
                  :model-value="localData?.currency || 'USD'"
                  @update:model-value="updateCurrency"
                >
                <SelectTrigger id="labor-currency" class="w-[180px]" aria-label="Select labor call currency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="curr in currencies" :key="curr" :value="curr">
                    {{ curr }}
                  </SelectItem>
                </SelectContent>
                </Select>
              </Transition>
            </div>

            <!-- Total Cost -->
            <div>
              <Label for="labor-cost" class="text-xs text-gray-500 uppercase tracking-wider mb-2">Total Cost</Label>

              <Transition name="edit-fade" mode="out-in">
                <!-- VIEW MODE -->
                <div v-if="!isEditMode" key="view" class="text-sm text-gray-900 font-medium">
                  {{ laborCall?.totalCost ? `${laborCall.currency} ${laborCall.totalCost.toLocaleString()}` : '—' }}
                </div>

                <!-- EDIT MODE -->
                <div v-else key="edit" class="flex items-center gap-2">
                <span class="text-sm text-gray-600">{{ localData?.currency }}</span>
                <Input
                  id="labor-cost"
                  type="number"
                  :model-value="localData?.totalCost"
                  @update:model-value="updateTotalCost"
                  placeholder="0"
                  min="0"
                  step="0.01"
                  aria-label="Total labor cost"
                  class="text-sm w-[180px]"
                />
                </div>
              </Transition>
            </div>
          </div>

          <!-- Notes -->
          <div v-if="isEditMode || laborCall?.notes">
            <Label for="labor-notes" class="text-xs text-gray-500 uppercase tracking-wider mb-2">Notes</Label>

            <Transition name="edit-fade" mode="out-in">
              <!-- VIEW MODE -->
              <p v-if="!isEditMode" key="view" class="text-sm text-gray-900 whitespace-pre-wrap">
                {{ laborCall?.notes || '—' }}
              </p>

              <!-- EDIT MODE -->
              <Textarea
                v-else
                key="edit"
                id="labor-notes"
                :model-value="localData?.notes"
                @update:model-value="updateNotes"
                placeholder="Additional notes about labor calls, rates, penalties, etc."
                aria-label="Labor call notes"
                rows="3"
                class="text-sm resize-y"
              />
            </Transition>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-sm text-gray-500">
        No labor call information available.
      </div>
    </AccordionContent>
  </AccordionItem>
</template>
