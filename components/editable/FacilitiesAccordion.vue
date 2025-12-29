<script setup lang="ts">
import type { EventFacilities } from '@/utils/mockData/types'

interface Props {
  facilities?: EventFacilities | null
  isEditMode: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:facilities': [facilities: EventFacilities]
}>()

// Deep clone for edit mode to prevent mutation
const localFacilities = ref<EventFacilities | null>(null)

// Initialize local data when entering edit mode
watch(() => props.isEditMode, (isEdit) => {
  if (isEdit) {
    localFacilities.value = props.facilities ? JSON.parse(JSON.stringify(props.facilities)) : {}
  }
}, { immediate: true })

// Update a nested field and emit changes
function updateField(path: string, value: any) {
  if (!localFacilities.value) return

  const keys = path.split('.')
  let current: any = localFacilities.value

  // Navigate to parent object
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {}
    }
    current = current[key]
  }

  // Set the value
  current[keys[keys.length - 1]] = value

  // Emit the full updated object
  emit('update:facilities', localFacilities.value)
}

// Get nested value safely
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

// Check if a section has any data to display
function hasSectionData(section: 'catering' | 'parking' | 'it' | 'dressingRooms' | 'greenRoom'): boolean {
  if (props.isEditMode) return true

  const data = props.facilities
  if (!data) return false

  switch (section) {
    case 'catering':
      return !!(
        data.catering?.breakfast?.time ||
        data.catering?.breakfast?.count ||
        data.catering?.breakfast?.notes ||
        data.catering?.lunch?.time ||
        data.catering?.lunch?.count ||
        data.catering?.lunch?.notes ||
        data.catering?.dinner?.time ||
        data.catering?.dinner?.count ||
        data.catering?.dinner?.notes ||
        data.catering?.specialRequests
      )
    case 'parking':
      return !!(data.parking?.trucks || data.parking?.buses || data.parking?.notes)
    case 'it':
      return !!(data.it?.requirements || data.it?.notes)
    case 'dressingRooms':
      return !!(getNestedValue(data, 'dressingRooms.count') || getNestedValue(data, 'dressingRooms.amenities'))
    case 'greenRoom':
      return !!(getNestedValue(data, 'greenRoom.available') || getNestedValue(data, 'greenRoom.amenities'))
    default:
      return false
  }
}

// Check if entire accordion has any data
const hasAnyData = computed(() => {
  if (props.isEditMode) return true
  return hasSectionData('catering') ||
         hasSectionData('parking') ||
         hasSectionData('it') ||
         hasSectionData('dressingRooms') ||
         hasSectionData('greenRoom')
})
</script>

<template>
  <AccordionItem
    value="facilities"
    class="border border-gray-200/80 bg-white rounded-lg mb-4 px-6 shadow-sm hover:shadow-md transition-shadow data-[state=open]:shadow-md data-[state=open]:pb-6 data-[state=open]:border-gray-300"
  >
    <AccordionTrigger class="py-5 text-base font-semibold text-gray-900 hover:no-underline">
      Facilities
    </AccordionTrigger>
    <AccordionContent class="pt-4">
      <div v-if="hasAnyData" class="space-y-6">

        <!-- CATERING SECTION -->
        <div v-if="hasSectionData('catering')">
          <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Catering
          </h3>

          <Transition name="edit-fade" mode="out-in">
            <!-- VIEW MODE -->
            <div v-if="!isEditMode" key="view" class="grid gap-y-3" style="grid-template-columns: auto 1fr; column-gap: 1.5rem;">
            <template v-if="facilities?.catering?.breakfast?.time">
              <span class="text-sm text-gray-600 font-medium text-right uppercase"></span>
              <span class="text-sm text-gray-900">{{ facilities.catering.breakfast.time }}</span>
            </template>
            <template v-if="facilities?.catering?.breakfast?.count">
              <span class="text-sm text-gray-600 font-medium text-right uppercase">Breakfast Count</span>
              <span class="text-sm text-gray-900">{{ facilities.catering.breakfast.count }}</span>
            </template>
            <template v-if="facilities?.catering?.breakfast?.notes">
              <span class="text-sm text-gray-600 font-medium text-right uppercase">Breakfast Notes</span>
              <span class="text-sm text-gray-900 whitespace-pre-wrap">{{ facilities.catering.breakfast.notes }}</span>
            </template>

            <template v-if="facilities?.catering?.lunch?.time">
              <span class="text-sm text-gray-600 font-medium text-right uppercase">Lunch Time</span>
              <span class="text-sm text-gray-900">{{ facilities.catering.lunch.time }}</span>
            </template>
            <template v-if="facilities?.catering?.lunch?.count">
              <span class="text-sm text-gray-600 font-medium text-right uppercase">Lunch Count</span>
              <span class="text-sm text-gray-900">{{ facilities.catering.lunch.count }}</span>
            </template>
            <template v-if="facilities?.catering?.lunch?.notes">
              <span class="text-sm text-gray-600 font-medium text-right uppercase">Lunch Notes</span>
              <span class="text-sm text-gray-900 whitespace-pre-wrap">{{ facilities.catering.lunch.notes }}</span>
            </template>

            <template v-if="facilities?.catering?.dinner?.time">
              <span class="text-sm text-gray-600 font-medium text-right uppercase">Dinner Time</span>
              <span class="text-sm text-gray-900">{{ facilities.catering.dinner.time }}</span>
            </template>
            <template v-if="facilities?.catering?.dinner?.count">
              <span class="text-sm text-gray-600 font-medium text-right uppercase">Dinner Count</span>
              <span class="text-sm text-gray-900">{{ facilities.catering.dinner.count }}</span>
            </template>
            <template v-if="facilities?.catering?.dinner?.notes">
              <span class="text-sm text-gray-600 font-medium text-right uppercase">Dinner Notes</span>
              <span class="text-sm text-gray-900 whitespace-pre-wrap">{{ facilities.catering.dinner.notes }}</span>
            </template>

            <template v-if="facilities?.catering?.specialRequests">
              <span class="text-sm text-gray-600 font-medium text-right uppercase">Special Requests</span>
              <span class="text-sm text-gray-900 whitespace-pre-wrap">{{ facilities.catering.specialRequests }}</span>
            </template>
            </div>

            <!-- EDIT MODE -->
            <div v-else key="edit" class="space-y-4" role="group" aria-label="Edit Catering Information">
            <div class="grid gap-4 grid-cols-3">
              <div>
                <Label for="breakfast-time" class="text-xs text-gray-500 uppercase tracking-wider mb-2">Breakfast Time</Label>
                <Input
                  id="breakfast-time"
                  type="time"
                  :model-value="localFacilities?.catering?.breakfast?.time"
                  @update:model-value="(v) => updateField('catering.breakfast.time', v)"
                  aria-label="Breakfast time"
                  class="text-sm"
                />
              </div>
              <div>
                <Label for="breakfast-count" class="text-xs text-gray-500 uppercase tracking-wider mb-2">Count</Label>
                <Input
                  id="breakfast-count"
                  type="number"
                  :model-value="localFacilities?.catering?.breakfast?.count"
                  @update:model-value="(v) => updateField('catering.breakfast.count', v)"
                  placeholder="0"
                  aria-label="Breakfast count"
                  class="text-sm"
                />
              </div>
              <div>
                <Label for="breakfast-notes" class="text-xs text-gray-500 uppercase tracking-wider mb-2">Notes</Label>
                <Input
                  id="breakfast-notes"
                  :model-value="localFacilities?.catering?.breakfast?.notes"
                  @update:model-value="(v) => updateField('catering.breakfast.notes', v)"
                  placeholder="Dietary requirements, etc."
                  aria-label="Breakfast notes"
                  class="text-sm"
                />
              </div>
            </div>

            <div class="grid gap-4 grid-cols-3">
              <div>
                <Label for="lunch-time" class="text-xs text-gray-500 uppercase tracking-wider mb-2">Lunch Time</Label>
                <Input
                  id="lunch-time"
                  type="time"
                  :model-value="localFacilities?.catering?.lunch?.time"
                  @update:model-value="(v) => updateField('catering.lunch.time', v)"
                  aria-label="Lunch time"
                  class="text-sm"
                />
              </div>
              <div>
                <Label for="lunch-count" class="text-xs text-gray-500 uppercase tracking-wider mb-2">Count</Label>
                <Input
                  id="lunch-count"
                  type="number"
                  :model-value="localFacilities?.catering?.lunch?.count"
                  @update:model-value="(v) => updateField('catering.lunch.count', v)"
                  placeholder="0"
                  aria-label="Lunch count"
                  class="text-sm"
                />
              </div>
              <div>
                <Label for="lunch-notes" class="text-xs text-gray-500 uppercase tracking-wider mb-2">Notes</Label>
                <Input
                  id="lunch-notes"
                  :model-value="localFacilities?.catering?.lunch?.notes"
                  @update:model-value="(v) => updateField('catering.lunch.notes', v)"
                  placeholder="Dietary requirements, etc."
                  aria-label="Lunch notes"
                  class="text-sm"
                />
              </div>
            </div>

            <div class="grid gap-4 grid-cols-3">
              <div>
                <Label for="dinner-time" class="text-xs text-gray-500 uppercase tracking-wider mb-2">Dinner Time</Label>
                <Input
                  id="dinner-time"
                  type="time"
                  :model-value="localFacilities?.catering?.dinner?.time"
                  @update:model-value="(v) => updateField('catering.dinner.time', v)"
                  aria-label="Dinner time"
                  class="text-sm"
                />
              </div>
              <div>
                <Label for="dinner-count" class="text-xs text-gray-500 uppercase tracking-wider mb-2">Count</Label>
                <Input
                  id="dinner-count"
                  type="number"
                  :model-value="localFacilities?.catering?.dinner?.count"
                  @update:model-value="(v) => updateField('catering.dinner.count', v)"
                  placeholder="0"
                  aria-label="Dinner count"
                  class="text-sm"
                />
              </div>
              <div>
                <Label for="dinner-notes" class="text-xs text-gray-500 uppercase tracking-wider mb-2">Notes</Label>
                <Input
                  id="dinner-notes"
                  :model-value="localFacilities?.catering?.dinner?.notes"
                  @update:model-value="(v) => updateField('catering.dinner.notes', v)"
                  placeholder="Dietary requirements, etc."
                  aria-label="Dinner notes"
                  class="text-sm"
                />
              </div>
            </div>

            <div>
              <Label for="catering-special" class="text-xs text-gray-500 uppercase tracking-wider mb-2">Special Requests</Label>
              <Textarea
                id="catering-special"
                :model-value="localFacilities?.catering?.specialRequests"
                @update:model-value="(v) => updateField('catering.specialRequests', v)"
                placeholder="Allergies, dietary restrictions, special arrangements..."
                aria-label="Catering special requests"
                rows="2"
                class="text-sm resize-y"
              />
            </div>
            </div>
          </Transition>
        </div>

        <!-- PARKING SECTION -->
        <div v-if="hasSectionData('parking')">
          <div v-if="hasSectionData('catering')" class="pt-6 border-t border-gray-200 mb-6"></div>
          <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Parking
          </h3>

          <Transition name="edit-fade" mode="out-in">
            <!-- VIEW MODE -->
            <div v-if="!isEditMode" key="view" class="grid gap-y-3" style="grid-template-columns: auto 1fr; column-gap: 1.5rem;">
              <template v-if="facilities?.parking?.trucks">
                <span class="text-sm text-gray-600 font-medium text-right uppercase">Trucks</span>
                <span class="text-sm text-gray-900 whitespace-pre-wrap">{{ facilities.parking.trucks }}</span>
              </template>
              <template v-if="facilities?.parking?.buses">
                <span class="text-sm text-gray-600 font-medium text-right uppercase">Buses</span>
                <span class="text-sm text-gray-900 whitespace-pre-wrap">{{ facilities.parking.buses }}</span>
              </template>
              <template v-if="facilities?.parking?.notes">
                <span class="text-sm text-gray-600 font-medium text-right uppercase">Notes</span>
                <span class="text-sm text-gray-900 whitespace-pre-wrap">{{ facilities.parking.notes }}</span>
              </template>
            </div>

            <!-- EDIT MODE -->
            <div v-else key="edit" class="space-y-4" role="group" aria-label="Edit Parking Information">
            <div>
              <Label for="parking-trucks" class="text-xs text-gray-500 uppercase tracking-wider mb-2">Trucks</Label>
              <Input
                id="parking-trucks"
                :model-value="localFacilities?.parking?.trucks"
                @update:model-value="(v) => updateField('parking.trucks', v)"
                placeholder="e.g., 2 semis arriving 10am"
                aria-label="Truck parking information"
                class="text-sm"
              />
            </div>
            <div>
              <Label for="parking-buses" class="text-xs text-gray-500 uppercase tracking-wider mb-2">Buses</Label>
              <Input
                id="parking-buses"
                :model-value="localFacilities?.parking?.buses"
                @update:model-value="(v) => updateField('parking.buses', v)"
                placeholder="e.g., 1 bus overnight parking"
                aria-label="Bus parking information"
                class="text-sm"
              />
            </div>
            <div>
              <Label for="parking-notes" class="text-xs text-gray-500 uppercase tracking-wider mb-2">Notes</Label>
              <Textarea
                id="parking-notes"
                :model-value="localFacilities?.parking?.notes"
                @update:model-value="(v) => updateField('parking.notes', v)"
                placeholder="Load-in access, security, restrictions..."
                aria-label="Parking notes"
                rows="2"
                class="text-sm resize-y"
              />
            </div>
            </div>
          </Transition>
        </div>

        <!-- IT/CONNECTIVITY SECTION -->
        <div v-if="hasSectionData('it')">
          <div v-if="hasSectionData('catering') || hasSectionData('parking')" class="pt-6 border-t border-gray-200 mb-6"></div>
          <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            IT / Connectivity
          </h3>

          <Transition name="edit-fade" mode="out-in">
            <!-- VIEW MODE -->
            <div v-if="!isEditMode" key="view" class="grid gap-y-3" style="grid-template-columns: auto 1fr; column-gap: 1.5rem;">
              <template v-if="facilities?.it?.requirements">
                <span class="text-sm text-gray-600 font-medium text-right uppercase">Requirements</span>
                <span class="text-sm text-gray-900 whitespace-pre-wrap">{{ facilities.it.requirements }}</span>
              </template>
              <template v-if="facilities?.it?.notes">
                <span class="text-sm text-gray-600 font-medium text-right uppercase">Notes</span>
                <span class="text-sm text-gray-900 whitespace-pre-wrap">{{ facilities.it.notes }}</span>
              </template>
            </div>

            <!-- EDIT MODE -->
            <div v-else key="edit" class="space-y-4" role="group" aria-label="Edit IT and Connectivity Information">
            <div>
              <Label for="it-requirements" class="text-xs text-gray-500 uppercase tracking-wider mb-2">Requirements</Label>
              <Textarea
                id="it-requirements"
                :model-value="localFacilities?.it?.requirements"
                @update:model-value="(v) => updateField('it.requirements', v)"
                placeholder="e.g., Need hardline ethernet for merch, WiFi network for ticketing..."
                aria-label="IT requirements"
                rows="2"
                class="text-sm resize-y"
              />
            </div>
            <div>
              <Label for="it-notes" class="text-xs text-gray-500 uppercase tracking-wider mb-2">Notes</Label>
              <Textarea
                id="it-notes"
                :model-value="localFacilities?.it?.notes"
                @update:model-value="(v) => updateField('it.notes', v)"
                placeholder="WiFi credentials, bandwidth info, restrictions..."
                aria-label="IT notes"
                rows="2"
                class="text-sm resize-y"
              />
            </div>
            </div>
          </Transition>
        </div>

        <!-- DRESSING ROOMS SECTION -->
        <div v-if="hasSectionData('dressingRooms')">
          <div v-if="hasSectionData('catering') || hasSectionData('parking') || hasSectionData('it')" class="pt-6 border-t border-gray-200 mb-6"></div>
          <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Dressing Rooms
          </h3>

          <Transition name="edit-fade" mode="out-in">
            <!-- VIEW MODE -->
            <div v-if="!isEditMode" key="view" class="grid gap-y-3" style="grid-template-columns: auto 1fr; column-gap: 1.5rem;">
              <template v-if="getNestedValue(facilities, 'dressingRooms.count')">
                <span class="text-sm text-gray-600 font-medium text-right uppercase">Count</span>
                <span class="text-sm text-gray-900">{{ getNestedValue(facilities, 'dressingRooms.count') }}</span>
              </template>
              <template v-if="getNestedValue(facilities, 'dressingRooms.amenities')">
                <span class="text-sm text-gray-600 font-medium text-right uppercase">Amenities</span>
                <span class="text-sm text-gray-900 whitespace-pre-wrap">{{ getNestedValue(facilities, 'dressingRooms.amenities') }}</span>
              </template>
            </div>

            <!-- EDIT MODE -->
            <div v-else key="edit" class="space-y-4" role="group" aria-label="Edit Dressing Rooms Information">
            <div>
              <Label for="dressing-count" class="text-xs text-gray-500 uppercase tracking-wider mb-2">Count</Label>
              <Input
                id="dressing-count"
                type="number"
                :model-value="getNestedValue(localFacilities, 'dressingRooms.count')"
                @update:model-value="(v) => updateField('dressingRooms.count', v)"
                placeholder="0"
                aria-label="Dressing rooms count"
                class="text-sm"
              />
            </div>
            <div>
              <Label for="dressing-amenities" class="text-xs text-gray-500 uppercase tracking-wider mb-2">Amenities</Label>
              <Textarea
                id="dressing-amenities"
                :model-value="getNestedValue(localFacilities, 'dressingRooms.amenities')"
                @update:model-value="(v) => updateField('dressingRooms.amenities', v)"
                placeholder="Showers, mirrors, furniture, climate control..."
                aria-label="Dressing rooms amenities"
                rows="2"
                class="text-sm resize-y"
              />
            </div>
            </div>
          </Transition>
        </div>

        <!-- GREEN ROOM SECTION -->
        <div v-if="hasSectionData('greenRoom')">
          <div v-if="hasSectionData('catering') || hasSectionData('parking') || hasSectionData('it') || hasSectionData('dressingRooms')" class="pt-6 border-t border-gray-200 mb-6"></div>
          <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Green Room
          </h3>

          <Transition name="edit-fade" mode="out-in">
            <!-- VIEW MODE -->
            <div v-if="!isEditMode" key="view" class="grid gap-y-3" style="grid-template-columns: auto 1fr; column-gap: 1.5rem;">
              <template v-if="getNestedValue(facilities, 'greenRoom.available')">
                <span class="text-sm text-gray-600 font-medium text-right uppercase">Available</span>
                <span class="text-sm text-gray-900">{{ getNestedValue(facilities, 'greenRoom.available') }}</span>
              </template>
              <template v-if="getNestedValue(facilities, 'greenRoom.amenities')">
                <span class="text-sm text-gray-600 font-medium text-right uppercase">Amenities</span>
                <span class="text-sm text-gray-900 whitespace-pre-wrap">{{ getNestedValue(facilities, 'greenRoom.amenities') }}</span>
              </template>
            </div>

            <!-- EDIT MODE -->
            <div v-else key="edit" class="space-y-4" role="group" aria-label="Edit Green Room Information">
            <div>
              <Label for="greenroom-available" class="text-xs text-gray-500 uppercase tracking-wider mb-2">Available</Label>
              <Input
                id="greenroom-available"
                :model-value="getNestedValue(localFacilities, 'greenRoom.available')"
                @update:model-value="(v) => updateField('greenRoom.available', v)"
                placeholder="Yes / No / Shared"
                aria-label="Green room availability"
                class="text-sm"
              />
            </div>
            <div>
              <Label for="greenroom-amenities" class="text-xs text-gray-500 uppercase tracking-wider mb-2">Amenities</Label>
              <Textarea
                id="greenroom-amenities"
                :model-value="getNestedValue(localFacilities, 'greenRoom.amenities')"
                @update:model-value="(v) => updateField('greenRoom.amenities', v)"
                placeholder="Seating, refreshments, TV, Wi-Fi..."
                aria-label="Green room amenities"
                rows="2"
                class="text-sm resize-y"
              />
            </div>
            </div>
          </Transition>
        </div>

      </div>

      <!-- Empty State -->
      <div v-else class="text-sm text-gray-500">
        No facilities information available.
      </div>
    </AccordionContent>
  </AccordionItem>
</template>
