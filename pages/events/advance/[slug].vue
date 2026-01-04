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
  <div class="flex flex-1 gap-0 bg-[var(--background)] h-[calc(100vh-4rem)]">
    <!-- Timeline Sidebar -->
    <div class="w-[var(--sidebar-width)] border-r border-[var(--border)] bg-[var(--card)] overflow-y-auto">
      <div class="p-[var(--spacing-6)]">
        <!-- Header -->
        <div class="flex items-center justify-between mb-[var(--spacing-6)]">
          <Button variant="outline" size="sm" class="gap-[var(--spacing-2)] border-[var(--border)]">
            <CalendarIcon class="h-[var(--spacing-4)] w-[var(--spacing-4)]" />
            Today
          </Button>
          <Button variant="outline" size="sm" class="gap-[var(--spacing-2)] border-[var(--border)]">
            <Map class="h-[var(--spacing-4)] w-[var(--spacing-4)]" />
            Go To
          </Button>
        </div>

        <!-- Days List -->
        <div class="space-y-[var(--spacing-4)]">
          <NuxtLink
            v-for="event in timelineEvents"
            :key="event.id"
            :to="`/events/advance/${event.id}`"
            class="flex items-start gap-[var(--spacing-4)] cursor-pointer hover:bg-[var(--muted)] -mx-[var(--spacing-2)] px-[var(--spacing-2)] py-[var(--spacing-2)] rounded-md transition-colors duration-[var(--transition-duration-fast)]"
            :class="{ 'bg-[var(--muted)]': event.id === eventId }"
          >
            <div class="flex flex-col items-center justify-center w-[52px] h-[52px] rounded-md border border-[var(--border)] bg-secondary flex-shrink-0">
              <span class="text-[var(--font-size-xs)] font-semibold text-[var(--foreground)] leading-none">{{ event.dayOfWeek }}</span>
              <span class="text-[var(--font-size-xs)] text-[var(--muted-foreground)] leading-none mt-[var(--spacing-1)]">{{ event.dateShort }}</span>
            </div>
            <div class="flex-1 pt-[var(--spacing-1)]">
              <h3 class="text-[var(--font-size-lg)] font-semibold text-[var(--foreground)] leading-tight">
                {{ event.location }}
              </h3>
              <p class="text-[var(--font-size-sm)] text-[var(--muted-foreground)] mt-[var(--spacing-1)]">
                {{ event.venueName }}
              </p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden bg-[var(--background)]">
      <header class="flex items-center gap-[var(--spacing-4)] border-b border-[var(--border)] bg-[var(--card)] py-[var(--spacing-3)] px-[var(--spacing-6)]">
        <div class="flex flex-col gap-[var(--spacing-3)]">
          <div class="flex items-center gap-[var(--spacing-2)] text-[var(--font-size-sm)] text-muted-foreground mb-[var(--spacing-2)]">
            <span class="px-[var(--spacing-2)] py-0.5 bg-primary/10 text-primary rounded font-medium">{{ headerDate.dayOfWeek }}</span>
            <span>•</span>
            <span>{{ headerDate.dateShort }}</span>
          </div>

          <div>
            <h1 class="text-[var(--font-size-4xl)] font-semibold text-[var(--foreground)]">
              {{ currentEvent?.day ? getLocation(currentEvent.day.city, currentEvent.day.state) : 'Event' }}
            </h1>
            <p class="text-[var(--font-size-sm)] text-[var(--muted-foreground)]">{{ currentEvent?.venue?.name ?? 'TBD' }}</p>
          </div>
        </div>
        <div class="ml-auto flex items-center gap-[var(--spacing-2)]">
          <Button
            v-if="isEditMode"
            size="sm"
            variant="outline"
            class="border-[var(--border)]"
            @click="isEditMode = false; editableEvent = null"
          >
            <X class="h-[var(--spacing-4)] w-[var(--spacing-4)] mr-[var(--spacing-2)]" />
            Cancel
          </Button>
          <Button
            size="sm"
            class="bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--foreground)]/90 transition-colors duration-[var(--transition-duration-base)]"
            @click="toggleEditMode"
          >
            <Edit v-if="!isEditMode" class="h-[var(--spacing-4)] w-[var(--spacing-4)] mr-[var(--spacing-2)]" />
            <Save v-else class="h-[var(--spacing-4)] w-[var(--spacing-4)] mr-[var(--spacing-2)]" />
            {{ isEditMode ? 'Save Changes' : 'Edit Event' }}
          </Button>
        </div>
      </header>

      <main class="flex-1 overflow-y-auto p-[var(--spacing-8)]">
        <div v-if="currentEvent">
          <!-- Info Cards Grid -->
          <div class="grid grid-cols-2 gap-[var(--spacing-4)] mb-[var(--spacing-6)]">
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
          <div class="space-y-[var(--spacing-4)] mb-[var(--spacing-8)]">
            <Accordion type="multiple" :default-value="['production', 'facilities']" class="w-full">
              <!-- Schedule Accordion -->
              <AccordionItem value="schedule" class="border border-[var(--border)] bg-[var(--card)] rounded-lg mb-[var(--spacing-4)] px-[var(--spacing-6)] shadow-sm hover:shadow-md transition-shadow data-[state=open]:shadow-md data-[state=open]:border-[var(--border)] data-[state=open]:pb-[var(--spacing-6)]">
                <AccordionTrigger class="py-[var(--spacing-5)] text-[var(--font-size-base)] font-semibold text-[var(--foreground)] hover:no-underline">
                  Schedule
                </AccordionTrigger>
                <AccordionContent class="pt-[var(--spacing-4)]">
                  <div v-if="currentEvent.showTime || currentEvent.loadIn || currentEvent.soundCheck || currentEvent.doors">
                    <!-- Showtime Section -->
                    <div v-if="currentEvent.showTime" class="pb-[var(--spacing-6)] mb-[var(--spacing-6)] border-b border-[var(--border)]">
                      <div class="text-[var(--font-size-xs)] font-semibold text-[var(--muted-foreground)] uppercase tracking-wider mb-[var(--spacing-3)]">Showtime</div>
                      <div class="text-5xl font-bold text-[var(--foreground)] mb-[var(--spacing-2)] tracking-tight">{{ currentEvent.showTime }}</div>
                      <div v-if="currentEvent.setLength" class="text-[var(--font-size-sm)] text-[var(--muted-foreground)] font-medium">
                        Length: {{ currentEvent.setLength }}mins
                      </div>
                    </div>

                    <!-- Timeline Section -->
                    <div class="grid gap-y-[var(--spacing-3)]" style="grid-template-columns: auto 1fr; column-gap: 1.5rem; align-items: baseline;">
                      <template v-if="currentEvent.crewDepartHotel">
                        <div class="text-right">
                          <span class="text-[var(--font-size-lg)] font-bold text-[var(--foreground)] tabular-nums">{{ currentEvent.crewDepartHotel }}</span>
                        </div>
                        <div>
                          <span class="text-[var(--font-size-sm)] text-[var(--muted-foreground)]">Crew departs hotel for venue</span>
                        </div>
                      </template>

                      <template v-if="currentEvent.lunch">
                        <div class="text-right">
                          <span class="text-[var(--font-size-lg)] font-bold text-[var(--foreground)] tabular-nums">{{ currentEvent.lunch }}</span>
                        </div>
                        <div>
                          <span class="text-[var(--font-size-sm)] text-[var(--muted-foreground)]">Lunch at venue</span>
                        </div>
                      </template>

                      <template v-if="currentEvent.loadIn">
                        <div class="text-right">
                          <span class="text-[var(--font-size-lg)] font-bold text-[var(--foreground)] tabular-nums">{{ currentEvent.loadIn }}</span>
                        </div>
                        <div>
                          <span class="text-[var(--font-size-sm)] text-[var(--muted-foreground)]">Load-In</span>
                        </div>
                      </template>

                      <template v-if="currentEvent.soundCheck">
                        <div class="text-right">
                          <span class="text-[var(--font-size-lg)] font-bold text-[var(--foreground)] tabular-nums">{{ currentEvent.soundCheck }}</span>
                        </div>
                        <div>
                          <span class="text-[var(--font-size-sm)] text-[var(--muted-foreground)]">Sound Check</span>
                        </div>
                      </template>

                      <template v-if="currentEvent.dinner">
                        <div class="text-right">
                          <span class="text-[var(--font-size-lg)] font-bold text-[var(--foreground)] tabular-nums">{{ currentEvent.dinner }}</span>
                        </div>
                        <div>
                          <span class="text-[var(--font-size-sm)] text-[var(--muted-foreground)]">Dinner at venue</span>
                        </div>
                      </template>

                      <template v-if="currentEvent.doors">
                        <div class="text-right">
                          <span class="text-[var(--font-size-lg)] font-bold text-[var(--foreground)] tabular-nums">{{ currentEvent.doors }}</span>
                        </div>
                        <div>
                          <span class="text-[var(--font-size-sm)] text-[var(--muted-foreground)]">Doors open</span>
                        </div>
                      </template>

                      <template v-if="currentEvent.showTime">
                        <div class="text-right">
                          <span class="text-[var(--font-size-lg)] font-bold text-[var(--foreground)] tabular-nums">{{ currentEvent.showTime }}</span>
                        </div>
                        <div>
                          <span class="text-[var(--font-size-sm)] text-[var(--muted-foreground)]">The Big Show begins</span>
                        </div>
                      </template>

                      <template v-if="currentEvent.showEnds">
                        <div class="text-right">
                          <span class="text-[var(--font-size-lg)] font-bold text-[var(--foreground)] tabular-nums">{{ currentEvent.showEnds }}</span>
                        </div>
                        <div>
                          <span class="text-[var(--font-size-sm)] text-[var(--muted-foreground)]">Show ends</span>
                        </div>
                      </template>

                      <template v-if="currentEvent.loadOut">
                        <div class="text-right">
                          <span class="text-[var(--font-size-lg)] font-bold text-[var(--foreground)] tabular-nums">{{ currentEvent.loadOut }}</span>
                        </div>
                        <div>
                          <span class="text-[var(--font-size-sm)] text-[var(--muted-foreground)]">Load Out begins</span>
                        </div>
                      </template>
                    </div>
                  </div>
                  <div v-else class="text-[var(--font-size-sm)] text-[var(--muted-foreground)]">
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
        <div v-else class="text-center py-[var(--spacing-12)] text-[var(--muted-foreground)]">
          Event not found.
        </div>
      </main>
    </div>
  </div>
</template>
