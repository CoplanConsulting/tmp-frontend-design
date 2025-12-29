<script setup lang="ts">
import {
  Calendar as CalendarIcon,
  Hotel,
  MapPin,
  Users,
  Contact,
  Edit,
  Map,
  Save,
  X
} from 'lucide-vue-next'
import {
  getEventWithDetails,
  getEventListItems,
  getDayOfWeek,
  formatDisplayDate,
  getLocation
} from '~/utils/mockData'
import type { EventWithDetails } from '~/utils/mockData'
import EditableInfoCard from '~/components/editable/EditableInfoCard.vue'
import EditableAccordion from '~/components/editable/EditableAccordion.vue'
import FacilitiesAccordion from '~/components/editable/FacilitiesAccordion.vue'
import LaborCallTable from '~/components/editable/LaborCallTable.vue'

definePageMeta({
  layout: 'default'
})

const route = useRoute()
const eventId = computed(() => route.params.slug as string)

// Get all events for timeline sidebar
const timelineEvents = getEventListItems()

// Get current event details with all related data
const currentEvent = computed(() => {
  const event = getEventWithDetails(eventId.value)
  if (!event) return null

  return event
})

// Helper to format date for header display
const headerDate = computed(() => {
  if (!currentEvent.value?.day) return { dayOfWeek: '', dateShort: '' }
  return {
    dayOfWeek: getDayOfWeek(currentEvent.value.day.date),
    dateShort: currentEvent.value.day.date.slice(5).replace('-', '/')
  }
})

// Active tab
const activeTab = ref('Production')
const tabs = ['Schedule', 'Facilities', 'Production', 'Equipment', 'Logistics', 'Labor Call', 'Local Crew']

// Edit mode state
const isEditMode = ref(false)
const editableEvent = ref<EventWithDetails | null>(null)

// Toggle edit mode
function toggleEditMode() {
  if (isEditMode.value) {
    isEditMode.value = false
    editableEvent.value = null
  } else {
    editableEvent.value = structuredClone(currentEvent.value)
    isEditMode.value = true
  }
}

// Display event (editable or current)
const displayEvent = computed(() =>
  isEditMode.value ? editableEvent.value : currentEvent.value
)

// Field configurations for info cards
const contactFields = [
  { key: 'firstName', label: 'First Name', placeholder: 'First name' },
  { key: 'lastName', label: 'Last Name', placeholder: 'Last name' },
  { key: 'companyName', label: 'Company', placeholder: 'Company', fullWidth: true },
  { key: 'phone', label: 'Phone', type: 'tel' as const, placeholder: '555-555-5555' },
  { key: 'email', label: 'Email', type: 'email' as const, placeholder: 'email@example.com' },
]

const venueFields = [
  { key: 'name', label: 'Venue Name', fullWidth: true },
  { key: 'address', label: 'Street', fullWidth: true },
  { key: 'city', label: 'City' },
  { key: 'state', label: 'State' },
  { key: 'postalCode', label: 'Postal Code' },
  { key: 'phone', label: 'Phone', type: 'tel' as const },
]

const hotelFields = [
  { key: 'name', label: 'Hotel Name', fullWidth: true },
  { key: 'address', label: 'Street', fullWidth: true },
  { key: 'city', label: 'City' },
  { key: 'state', label: 'State' },
  { key: 'postalCode', label: 'Postal Code' },
  { key: 'phone', label: 'Phone', type: 'tel' as const },
  { key: 'confirmationNumber', label: 'Confirmation #' },
]

// Section configs for accordions
const productionSections = [
  {
    title: 'Venue Technical Info',
    fields: [
      { key: 'venue.stageDimensions', label: 'Stage Dimensions', readOnly: true },
      { key: 'venue.capacity', label: 'Capacity', type: 'number' as const, readOnly: true },
      { key: 'venue.loadInInfo', label: 'Load-In Info', type: 'textarea' as const, readOnly: true },
      { key: 'venue.powerInfo', label: 'Power', readOnly: true },
    ]
  },
  {
    title: 'Event Production',
    fields: [
      { key: 'production.loadInDetails', label: 'Load In', type: 'textarea' as const },
      { key: 'production.soundDetails', label: 'Sound', type: 'textarea' as const },
      { key: 'production.lightDetails', label: 'Lighting', type: 'textarea' as const },
      { key: 'production.backlineDetails', label: 'Backline', type: 'textarea' as const },
      { key: 'production.videoDetails', label: 'Video', type: 'textarea' as const },
      { key: 'production.stagingDetails', label: 'Staging', type: 'textarea' as const },
    ]
  }
]


const equipmentSections = [
  {
    fields: [
      { key: 'soundDetails', label: 'Audio', type: 'textarea' as const },
      { key: 'lightDetails', label: 'Lighting', type: 'textarea' as const },
      { key: 'videoDetails', label: 'Video', type: 'textarea' as const },
      { key: 'backlineDetails', label: 'Backline', type: 'textarea' as const },
      { key: 'stagingDetails', label: 'Staging', type: 'textarea' as const },
    ]
  }
]

const logisticsSections = [
  {
    fields: [
      { key: 'airportNotes', label: 'Airport', type: 'textarea' as const },
      { key: 'groundTransport', label: 'Ground Transport', type: 'textarea' as const },
      { key: 'directions', label: 'Directions', type: 'textarea' as const },
      { key: 'areaBusiness', label: 'Area Business', type: 'textarea' as const },
      { key: 'areaRestaurants', label: 'Restaurants', type: 'textarea' as const },
      { key: 'pointsOfInterest', label: 'Points of Interest', type: 'textarea' as const },
    ]
  }
]

const localCrewSections = [
  {
    fields: [
      { key: 'union', label: 'Union' },
      { key: 'minimumIn', label: 'Minimum In', type: 'number' as const },
      { key: 'minimumOut', label: 'Minimum Out', type: 'number' as const },
      { key: 'penalties', label: 'Penalties', type: 'textarea' as const },
      { key: 'notes', label: 'Notes', type: 'textarea' as const },
    ]
  }
]

// Helper function for updating event fields
function updateEventField(field: string, value: any) {
  if (editableEvent.value) {
    (editableEvent.value as any)[field] = value
  }
}

// Keyboard handler for Escape key
function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isEditMode.value) {
    isEditMode.value = false
    editableEvent.value = null
  }
}

// Add/remove keyboard listener
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="flex flex-1 gap-0 bg-gray-50 h-[calc(100vh-4rem)]">
        <!-- Timeline Sidebar -->
        <div class="w-[300px] border-r border-gray-200 bg-white overflow-y-auto">
          <div class="p-6">
            <!-- Header -->
            <div class="flex items-center justify-between mb-6">
              <Button variant="outline" size="sm" class="gap-2 border-gray-300">
                <CalendarIcon class="h-4 w-4" />
                Today
              </Button>
              <Button variant="outline" size="sm" class="gap-2 border-gray-300">
                <Map class="h-4 w-4" />
                Go To
              </Button>
            </div>

            <!-- Days List -->
            <div class="space-y-4">
              <NuxtLink
                v-for="event in timelineEvents"
                :key="event.id"
                :to="`/events/advance/${event.id}`"
                class="flex items-start gap-4 cursor-pointer hover:bg-gray-50 -mx-2 px-2 py-2 rounded-md transition-colors"
                :class="{ 'bg-gray-100': event.id === eventId }"
              >
                <div class="flex flex-col items-center justify-center w-[52px] h-[52px] rounded-md border border-gray-200 bg-secondary flex-shrink-0">
                  <span class="text-xs font-semibold text-gray-900 leading-none">{{ event.dayOfWeek }}</span>
                  <span class="text-xs text-gray-600 leading-none mt-1">{{ event.dateShort }}</span>
                </div>
                <div class="flex-1 pt-1">
                  <h3 class="text-lg font-semibold text-gray-900 leading-tight">
                    {{ event.location }}
                  </h3>
                  <p class="text-sm text-gray-500 mt-1">
                    {{ event.venueName }}
                  </p>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="flex-1 flex flex-col overflow-hidden bg-gray-50">
          <header class="flex items-center gap-4 border-b border-gray-200 bg-white py-3 px-6">
            <div class="flex items-center gap-3">
              <div class="flex flex-col items-center justify-center w-[52px] h-[52px] rounded-md border border-gray-300 bg-white flex-shrink-0">
                <span class="text-xs font-semibold text-gray-900 leading-none">{{ headerDate.dayOfWeek }}</span>
                <span class="text-xs text-gray-600 leading-none mt-1">{{ headerDate.dateShort }}</span>
              </div>
              <div>
                <h1 class="text-4xl font-semibold text-gray-900">
                  {{ currentEvent?.day ? getLocation(currentEvent.day.city, currentEvent.day.state) : 'Event' }}
                </h1>
                <p class="text-sm text-gray-500">{{ currentEvent?.venue?.name ?? 'TBD' }}</p>
              </div>
            </div>
            <div class="ml-auto flex items-center gap-2">
              <Button
                v-if="isEditMode"
                size="sm"
                variant="outline"
                @click="isEditMode = false; editableEvent = null"
              >
                <X class="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button
                size="sm"
                class="bg-black text-white hover:bg-gray-800"
                @click="toggleEditMode"
              >
                <Edit v-if="!isEditMode" class="h-4 w-4 mr-2" />
                <Save v-else class="h-4 w-4 mr-2" />
                {{ isEditMode ? 'Save Changes' : 'Edit Event' }}
              </Button>
            </div>
          </header>

          <main class="flex-1 overflow-y-auto p-8">
            <div v-if="currentEvent">
              <!-- Info Cards Grid -->
              <div class="grid grid-cols-2 gap-4 mb-6">
                <EditableInfoCard
                  title="Day of Show Contact"
                  :icon="Contact"
                  :data="displayEvent?.dayOfShowContact ?? null"
                  :fields="contactFields"
                  :is-edit-mode="isEditMode"
                  helper-text="💡 In production: Search existing contacts"
                  @update:data="(c) => updateEventField('dayOfShowContact', c)"
                />

                <EditableInfoCard
                  title="Promoter"
                  :icon="Users"
                  :data="displayEvent?.promoter ?? null"
                  :fields="contactFields"
                  :is-edit-mode="isEditMode"
                  helper-text="💡 In production: Search existing contacts"
                  @update:data="(p) => updateEventField('promoter', p)"
                />

                <EditableInfoCard
                  title="Venue"
                  :icon="MapPin"
                  :data="displayEvent?.venue ?? null"
                  :fields="venueFields"
                  :is-edit-mode="isEditMode"
                  helper-text="💡 In production: Search venues database"
                  @update:data="(v) => updateEventField('venue', v)"
                />

                <EditableInfoCard
                  title="Hotel"
                  :icon="Hotel"
                  :data="displayEvent?.hotel ?? null"
                  :fields="hotelFields"
                  :is-edit-mode="isEditMode"
                  @update:data="(h) => updateEventField('hotel', h)"
                />
              </div>

              <!-- Event Details Accordions -->
              <div class="space-y-4 mb-8">
                <Accordion type="multiple" :default-value="['production', 'facilities']" class="w-full">
                  <!-- Schedule Accordion -->
                  <AccordionItem value="schedule" class="border border-gray-200/80 bg-white rounded-lg mb-4 px-6 shadow-sm hover:shadow-md transition-shadow data-[state=open]:shadow-md data-[state=open]:pb-6 data-[state=open]:border-gray-300">
                    <AccordionTrigger class="py-5 text-base font-semibold text-gray-900 hover:no-underline">
                      Schedule
                    </AccordionTrigger>
                    <AccordionContent class="pt-4">
                      <div v-if="currentEvent.showTime || currentEvent.loadIn || currentEvent.soundCheck || currentEvent.doors">
                        <!-- Showtime Section -->
                        <div v-if="currentEvent.showTime" class="pb-6 mb-6 border-b border-gray-200">
                          <div class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Showtime</div>
                          <div class="text-5xl font-bold text-gray-900 mb-2 tracking-tight">{{ currentEvent.showTime }}</div>
                          <div v-if="currentEvent.setLength" class="text-sm text-gray-600 font-medium">
                            Length: {{ currentEvent.setLength }}mins
                          </div>
                        </div>

                        <!-- Timeline Section -->
                        <div class="grid gap-y-3" style="grid-template-columns: auto 1fr; column-gap: 1.5rem; align-items: baseline;">
                          <template v-if="currentEvent.crewDepartHotel">
                            <div class="text-right">
                              <span class="text-lg font-bold text-gray-900 tabular-nums">{{ currentEvent.crewDepartHotel }}</span>
                            </div>
                            <div>
                              <span class="text-sm text-gray-700">Crew departs hotel for venue</span>
                            </div>
                          </template>

                          <template v-if="currentEvent.lunch">
                            <div class="text-right">
                              <span class="text-lg font-bold text-gray-900 tabular-nums">{{ currentEvent.lunch }}</span>
                            </div>
                            <div>
                              <span class="text-sm text-gray-700">Lunch at venue</span>
                            </div>
                          </template>

                          <template v-if="currentEvent.loadIn">
                            <div class="text-right">
                              <span class="text-lg font-bold text-gray-900 tabular-nums">{{ currentEvent.loadIn }}</span>
                            </div>
                            <div>
                              <span class="text-sm text-gray-700">Load-In</span>
                            </div>
                          </template>

                          <template v-if="currentEvent.soundCheck">
                            <div class="text-right">
                              <span class="text-lg font-bold text-gray-900 tabular-nums">{{ currentEvent.soundCheck }}</span>
                            </div>
                            <div>
                              <span class="text-sm text-gray-700">Sound Check</span>
                            </div>
                          </template>

                          <template v-if="currentEvent.dinner">
                            <div class="text-right">
                              <span class="text-lg font-bold text-gray-900 tabular-nums">{{ currentEvent.dinner }}</span>
                            </div>
                            <div>
                              <span class="text-sm text-gray-700">Dinner at venue</span>
                            </div>
                          </template>

                          <template v-if="currentEvent.doors">
                            <div class="text-right">
                              <span class="text-lg font-bold text-gray-900 tabular-nums">{{ currentEvent.doors }}</span>
                            </div>
                            <div>
                              <span class="text-sm text-gray-700">Doors open</span>
                            </div>
                          </template>

                          <template v-if="currentEvent.showTime">
                            <div class="text-right">
                              <span class="text-lg font-bold text-gray-900 tabular-nums">{{ currentEvent.showTime }}</span>
                            </div>
                            <div>
                              <span class="text-sm text-gray-700">The Big Show begins</span>
                            </div>
                          </template>

                          <template v-if="currentEvent.showEnds">
                            <div class="text-right">
                              <span class="text-lg font-bold text-gray-900 tabular-nums">{{ currentEvent.showEnds }}</span>
                            </div>
                            <div>
                              <span class="text-sm text-gray-700">Show ends</span>
                            </div>
                          </template>

                          <template v-if="currentEvent.loadOut">
                            <div class="text-right">
                              <span class="text-lg font-bold text-gray-900 tabular-nums">{{ currentEvent.loadOut }}</span>
                            </div>
                            <div>
                              <span class="text-sm text-gray-700">Load Out begins</span>
                            </div>
                          </template>
                        </div>
                      </div>
                      <div v-else class="text-sm text-gray-500">
                        No schedule information available.
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <!-- Production Accordion -->
                  <EditableAccordion
                    value="production"
                    title="Production"
                    :data="displayEvent"
                    :sections="productionSections"
                    :is-edit-mode="isEditMode"
                    @update:data="(d) => Object.assign(editableEvent || {}, d)"
                  />

                  <!-- Facilities Accordion -->
                  <FacilitiesAccordion
                    :facilities="displayEvent?.facilities ?? null"
                    :is-edit-mode="isEditMode"
                    @update:facilities="(f) => updateEventField('facilities', f)"
                  />

                  <!-- Equipment Accordion -->
                  <EditableAccordion
                    value="equipment"
                    title="Equipment"
                    :data="displayEvent?.production ?? null"
                    :sections="equipmentSections"
                    :is-edit-mode="isEditMode"
                    @update:data="(d) => updateEventField('production', d)"
                  />

                  <!-- Logistics Accordion -->
                  <EditableAccordion
                    value="logistics"
                    title="Logistics"
                    :data="displayEvent?.logistics ?? null"
                    :sections="logisticsSections"
                    :is-edit-mode="isEditMode"
                    @update:data="(d) => updateEventField('logistics', d)"
                  />

                  <!-- Local Crew Accordion -->
                  <EditableAccordion
                    value="local-crew"
                    title="Local Crew"
                    :data="displayEvent?.localCrew ?? null"
                    :sections="localCrewSections"
                    :is-edit-mode="isEditMode"
                    @update:data="(d) => updateEventField('localCrew', d)"
                  />

                  <!-- Labor Call Table -->
                  <LaborCallTable
                    :labor-call="displayEvent?.laborCall"
                    :is-edit-mode="isEditMode"
                    @update:labor-call="(l) => updateEventField('laborCall', l)"
                  />
                </Accordion>
              </div>

            </div>
            <div v-else class="text-center py-12 text-gray-500">
              Event not found.
            </div>
          </main>
        </div>
  </div>
</template>
