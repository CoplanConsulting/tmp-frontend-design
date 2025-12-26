<script setup lang="ts">
import {
  Calendar as CalendarIcon,
  Hotel,
  MapPin,
  Plus,
  ChevronLeft,
  Printer,
  Download,
  Share2,
  Pencil
} from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { format } from 'date-fns'
import {
  getDaysWithEvents,
  type DayWithDetails,
  getDayOfWeek,
  getDateShort,
  getLocation,
  formatDisplayDate
} from '~/utils/mockData'

definePageMeta({
  layout: 'default'
})

// Get days with events for tour-1
const rawDays = getDaysWithEvents('tour-1')

// Enrich days with derived UI fields
interface EnrichedDay extends DayWithDetails {
  dayOfWeek: string
  dateShort: string
  location: string
  isEmpty: boolean
}

const daysEvents = computed<EnrichedDay[]>(() => {
  return rawDays.map(day => ({
    ...day,
    dayOfWeek: getDayOfWeek(day.date),
    dateShort: getDateShort(day.date),
    location: getLocation(day.city, day.state),
    isEmpty: !day.event, // No event = empty day
  }))
})

// Right panel state management
type PanelView = 'placeholder' | 'add-event' | 'event-detail'

const currentView = ref<PanelView>('placeholder')
const selectedDay = ref<EnrichedDay | null>(null)
const selectedDate = ref<string | null>(null)

// Form validation schema for Add Event
const formSchema = toTypedSchema(z.object({
  eventName: z.string().min(1, 'Event name is required').max(100),
  eventType: z.string().min(1, 'Event type is required'),
  venue: z.string().min(1, 'Venue is required').max(200),
  location: z.string().min(1, 'Location is required').max(200),
  startDate: z.date({
    required_error: 'Start date is required',
  }),
  endDate: z.date({
    required_error: 'End date is required',
  }),
  showTime: z.string().min(1, 'Show time is required'),
  capacity: z.string().min(1, 'Capacity is required'),
  description: z.string().max(500).optional(),
  notes: z.string().max(1000).optional(),
}))

const { handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit((values) => {
  console.log('Form submitted:', values)
  // Handle form submission
  currentView.value = 'placeholder'
  resetForm()
})

const eventTypes = [
  { value: 'concert', label: 'Concert' },
  { value: 'travel', label: 'Travel Day' },
  { value: 'rehearsal', label: 'Rehearsal' },
  { value: 'meet-greet', label: 'Meet & Greet' },
  { value: 'press', label: 'Press Event' },
]

// Panel actions
const showAddEvent = (date: string) => {
  currentView.value = 'add-event'
  selectedDate.value = date
  selectedDay.value = null
}

const showEventDetail = (day: EnrichedDay) => {
  if (!day.isEmpty && day.event) {
    currentView.value = 'event-detail'
    selectedDay.value = day
    selectedDate.value = null
  }
}

const closePanelView = () => {
  currentView.value = 'placeholder'
  selectedDay.value = null
  selectedDate.value = null
  resetForm()
}

// Computed properties for event details
const selectedEventDetails = computed(() => {
  if (!selectedDay.value || selectedDay.value.isEmpty || !selectedDay.value.event) {
    return null
  }

  const day = selectedDay.value
  const event = day.event!
  const venue = day.venue
  const hotel = day.hotel

  // Build a schedule from event data
  const schedule: Array<{ time: string; activity: string }> = []

  if (event.loadIn) schedule.push({ time: event.loadIn, activity: 'Load-In' })
  if (event.lunch) schedule.push({ time: event.lunch, activity: `Lunch at venue (${event.lunchCount || 0} people)` })
  if (event.soundCheck) schedule.push({ time: event.soundCheck, activity: 'Sound Check' })
  if (event.dinner) schedule.push({ time: event.dinner, activity: `Dinner at venue (${event.dinnerCount || 0} people)` })
  if (event.doors) schedule.push({ time: event.doors, activity: 'Doors open' })
  if (event.showTime) schedule.push({ time: event.showTime, activity: 'Show begins' })
  if (event.curfew) schedule.push({ time: event.curfew, activity: 'Curfew' })

  return {
    id: day.id,
    fullDate: formatDisplayDate(day.date),
    dayType: day.dayType.toUpperCase(),
    location: `${day.location} • ${day.timezone}`,
    showTime: event.showTime || 'TBD',
    showLength: event.setLength ? `${event.setLength} mins` : 'TBD',
    schedule,
    returnInfo: (event.returnToHotelAfterSoundcheck || event.returnToHotelAfterShow) ? {
      afterSoundcheck: event.returnToHotelAfterSoundcheck ? 'Yes' : 'No',
      afterShow: event.returnToHotelAfterShow ? 'Yes' : 'No',
    } : undefined,
    venue: venue ? {
      name: venue.name,
      address: venue.address || 'N/A',
      city: `${venue.city}, ${venue.state} ${venue.postalCode || ''}`,
      phone: venue.phone || 'N/A',
      capacity: venue.capacity || 0,
      type: venue.type || 'N/A',
    } : {
      name: 'N/A',
      address: 'N/A',
      city: 'N/A',
      phone: 'N/A',
      capacity: 0,
      type: 'N/A',
    },
    hotel: hotel ? {
      name: hotel.name,
      address: hotel.address || 'N/A',
      city: `${hotel.city}, ${hotel.state} ${hotel.postalCode || ''}`,
      phone: hotel.phone || 'N/A',
      contact: 'TBD', // Not in new schema
      distanceToVenue: 'N/A', // Not in new schema
      amenities: hotel.amenities || [],
    } : undefined,
    notes: event.notes || day.notes,
  }
})
</script>

<template>
  <div class="flex flex-1 gap-0 bg-gray-50 h-[calc(100vh-6rem)] -m-4">
        <!-- Left Panel: Days List -->
        <div class="w-[300px] border-r border-gray-200 bg-white overflow-y-auto">
          <div class="p-6">
            <!-- Header -->
            <div class="flex items-center justify-between mb-6">
              <Button variant="outline" size="sm" class="gap-2 border-gray-300">
                <CalendarIcon class="h-4 w-4" />
                Today
              </Button>
              <Button variant="outline" size="sm" class="gap-2 border-gray-300">
                <CalendarIcon class="h-4 w-4" />
                Go To
              </Button>
            </div>

            <!-- Days List -->
            <div class="space-y-4">
              <template v-for="day in daysEvents" :key="day.id">
                <!-- Empty Day with Add Event Button -->
                <div v-if="day.isEmpty" class="flex items-center gap-4">
                  <div class="flex flex-col items-center justify-center w-[52px] h-[52px] rounded-md border border-gray-300 bg-white flex-shrink-0">
                    <span class="text-xs font-semibold text-gray-900 leading-none">{{ day.dayOfWeek }}</span>
                    <span class="text-xs text-gray-600 leading-none mt-1">{{ day.dateShort }}</span>
                  </div>
                  <Button
                    class="gap-2 bg-black text-white hover:bg-gray-800"
                    @click="showAddEvent(day.date)"
                  >
                    <Plus class="h-4 w-4" />
                    Add Event
                  </Button>
                </div>

                <!-- Event Card -->
                <div
                  v-else
                  class="flex items-start gap-4 cursor-pointer hover:bg-gray-50 -mx-2 px-2 py-2 rounded-md transition-colors"
                  @click="showEventDetail(day)"
                >
                  <div class="flex flex-col items-center justify-center w-[52px] h-[52px] rounded-md border border-gray-300 bg-white flex-shrink-0">
                    <span class="text-xs font-semibold text-gray-900 leading-none">{{ day.dayOfWeek }}</span>
                    <span class="text-xs text-gray-600 leading-none mt-1">{{ day.dateShort }}</span>
                  </div>
                  <div class="flex-1 pt-1">
                    <h3 class="text-lg font-semibold text-gray-900 leading-tight">
                      {{ day.location }}
                    </h3>
                    <p class="text-sm text-gray-500 mt-1">
                      {{ day.venue?.name || 'Venue TBD' }}
                    </p>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>

        <!-- Right Panel: Utility Space -->
        <div class="flex-1 overflow-y-auto bg-gray-50">
          <!-- Placeholder View -->
          <div v-if="currentView === 'placeholder'" class="flex items-center justify-center h-full p-8">
            <div class="text-center max-w-md">
              <div class="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <CalendarIcon class="h-8 w-8 text-gray-400" />
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">No Selection</h3>
              <p class="text-sm text-gray-500">
                Click on an event to view details or use the "+ Add Event" button to create a new event
              </p>
            </div>
          </div>

          <!-- Add Event Form View -->
          <div v-else-if="currentView === 'add-event'" class="p-8">
            <div class="max-w-4xl">
              <div class="flex items-center justify-between mb-6">
                <div>
                  <h2 class="text-2xl font-bold text-gray-900">Add Event</h2>
                  <p class="text-sm text-gray-500 mt-1">Create a new event for {{ selectedDate }}</p>
                </div>
                <Button variant="ghost" size="sm" @click="closePanelView">
                  Close
                </Button>
              </div>

              <Card class="border border-gray-200 bg-white">
                <CardContent class="p-6">
                  <form @submit="onSubmit" class="space-y-8">
                    <!-- Event Information Section -->
                    <div class="space-y-4">
                      <div>
                        <h3 class="text-base font-semibold text-gray-900 mb-1">Event Information</h3>
                        <p class="text-sm text-gray-500">Basic details about the event</p>
                      </div>

                      <div class="grid grid-cols-2 gap-4">
                        <FormField v-slot="{ componentField }" name="eventName">
                          <FormItem>
                            <FormLabel class="text-sm font-medium text-gray-900">Event Name</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="e.g., Opening Night Concert"
                                v-bind="componentField"
                                class="border-gray-300"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        </FormField>

                        <FormField v-slot="{ componentField }" name="eventType">
                          <FormItem>
                            <FormLabel class="text-sm font-medium text-gray-900">Event Type</FormLabel>
                            <Select v-bind="componentField">
                              <FormControl>
                                <SelectTrigger class="border-gray-300">
                                  <SelectValue placeholder="Select event type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem
                                  v-for="type in eventTypes"
                                  :key="type.value"
                                  :value="type.value"
                                >
                                  {{ type.label }}
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        </FormField>
                      </div>
                    </div>

                    <!-- Location & Venue Section -->
                    <div class="space-y-4">
                      <div>
                        <h3 class="text-base font-semibold text-gray-900 mb-1">Location & Venue</h3>
                        <p class="text-sm text-gray-500">Where the event will take place</p>
                      </div>

                      <div class="grid grid-cols-2 gap-4">
                        <FormField v-slot="{ componentField }" name="venue">
                          <FormItem>
                            <FormLabel class="text-sm font-medium text-gray-900">Venue Name</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="e.g., Madison Square Garden"
                                v-bind="componentField"
                                class="border-gray-300"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        </FormField>

                        <FormField v-slot="{ componentField }" name="location">
                          <FormItem>
                            <FormLabel class="text-sm font-medium text-gray-900">Location</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="e.g., New York, NY"
                                v-bind="componentField"
                                class="border-gray-300"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        </FormField>
                      </div>
                    </div>

                    <!-- Date & Time Section -->
                    <div class="space-y-4">
                      <div>
                        <h3 class="text-base font-semibold text-gray-900 mb-1">Date & Time</h3>
                        <p class="text-sm text-gray-500">Schedule details for the event</p>
                      </div>

                      <div class="grid grid-cols-3 gap-4">
                        <FormField v-slot="{ componentField }" name="startDate">
                          <FormItem class="flex flex-col">
                            <FormLabel class="text-sm font-medium text-gray-900">Start Date</FormLabel>
                            <Popover>
                              <PopoverTrigger as-child>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    :class="[
                                      'w-full justify-start text-left font-normal border-gray-300',
                                      !componentField.modelValue && 'text-gray-500',
                                    ]"
                                  >
                                    <CalendarIcon class="mr-2 h-4 w-4 text-gray-500" />
                                    {{
                                      componentField.modelValue
                                        ? format(componentField.modelValue, 'PPP')
                                        : 'Pick a date'
                                    }}
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent class="w-auto p-0">
                                <Calendar v-model="componentField.modelValue" />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        </FormField>

                        <FormField v-slot="{ componentField }" name="endDate">
                          <FormItem class="flex flex-col">
                            <FormLabel class="text-sm font-medium text-gray-900">End Date</FormLabel>
                            <Popover>
                              <PopoverTrigger as-child>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    :class="[
                                      'w-full justify-start text-left font-normal border-gray-300',
                                      !componentField.modelValue && 'text-gray-500',
                                    ]"
                                  >
                                    <CalendarIcon class="mr-2 h-4 w-4 text-gray-500" />
                                    {{
                                      componentField.modelValue
                                        ? format(componentField.modelValue, 'PPP')
                                        : 'Pick a date'
                                    }}
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent class="w-auto p-0">
                                <Calendar v-model="componentField.modelValue" />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        </FormField>

                        <FormField v-slot="{ componentField }" name="showTime">
                          <FormItem>
                            <FormLabel class="text-sm font-medium text-gray-900">Show Time</FormLabel>
                            <FormControl>
                              <Input
                                type="time"
                                v-bind="componentField"
                                class="border-gray-300"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        </FormField>
                      </div>
                    </div>

                    <!-- Capacity Section -->
                    <div class="space-y-4">
                      <div>
                        <h3 class="text-base font-semibold text-gray-900 mb-1">Capacity</h3>
                        <p class="text-sm text-gray-500">Venue capacity information</p>
                      </div>

                      <div class="grid grid-cols-2 gap-4">
                        <FormField v-slot="{ componentField }" name="capacity">
                          <FormItem>
                            <FormLabel class="text-sm font-medium text-gray-900">Expected Capacity</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="e.g., 5,000"
                                v-bind="componentField"
                                class="border-gray-300"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        </FormField>
                      </div>
                    </div>

                    <!-- Additional Information Section -->
                    <div class="space-y-4">
                      <div>
                        <h3 class="text-base font-semibold text-gray-900 mb-1">Additional Information</h3>
                        <p class="text-sm text-gray-500">Optional details and notes</p>
                      </div>

                      <FormField v-slot="{ componentField }" name="description">
                        <FormItem>
                          <FormLabel class="text-sm font-medium text-gray-900">Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Brief description of the event..."
                              v-bind="componentField"
                              class="border-gray-300 resize-none h-20"
                            />
                          </FormControl>
                          <FormDescription class="text-xs text-gray-500">
                            Maximum 500 characters
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      </FormField>

                      <FormField v-slot="{ componentField }" name="notes">
                        <FormItem>
                          <FormLabel class="text-sm font-medium text-gray-900">Internal Notes</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Add any internal notes or special requirements..."
                              v-bind="componentField"
                              class="border-gray-300 resize-none h-24"
                            />
                          </FormControl>
                          <FormDescription class="text-xs text-gray-500">
                            These notes are for internal use only
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      </FormField>
                    </div>

                    <!-- Form Actions -->
                    <div class="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                      <Button variant="outline" type="button" class="border-gray-300" @click="closePanelView">
                        Cancel
                      </Button>
                      <Button type="submit" class="bg-black text-white hover:bg-gray-800 px-8">
                        Create Event
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          <!-- Event Detail View -->
          <div v-else-if="currentView === 'event-detail' && selectedEventDetails" class="h-full overflow-y-auto">
            <!-- Action Bar -->
            <div class="flex items-center justify-between px-8 py-4 border-b border-gray-200 bg-white">
              <Button variant="ghost" size="sm" class="gap-2" @click="closePanelView">
                <ChevronLeft class="h-4 w-4" />
                Close
              </Button>
              <div class="flex items-center gap-2">
                <Button variant="outline" size="sm" class="gap-2 border-gray-300">
                 <Pencil class="h-4 w-4" />
                 Edit
                </Button>
                <Button variant="outline" size="sm" class="gap-2 border-gray-300">
                  <Printer class="h-4 w-4" />
                  Print
                </Button>
                <Button variant="outline" size="sm" class="gap-2 border-gray-300">
                  <Download class="h-4 w-4" />
                  Download PDF
                </Button>
                <Button variant="outline" size="sm" class="gap-2 border-gray-300">
                  <Share2 class="h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>

            <!-- Hero Banner -->
            <div class="bg-gradient-to-br from-slate-800 to-slate-900 text-white px-8 py-12 text-center">
              <h1 class="text-4xl font-bold mb-2">{{ selectedEventDetails.fullDate }}</h1>
              <p class="text-xl font-semibold uppercase tracking-wide mb-3">{{ selectedEventDetails.dayType }}</p>
              <p class="text-lg">{{ selectedEventDetails.location }}</p>
            </div>

            <!-- Content Grid -->
            <div class="grid grid-cols-2 gap-6 p-8">
              <!-- Left Column: Show Info -->
              <div class="space-y-6">
                <!-- Show Info Card -->
                <Card class="border border-gray-200 bg-white">
                  <CardContent class="p-6">
                    <h2 class="text-sm font-semibold uppercase tracking-wide text-gray-600 mb-6">Show Info</h2>

                    <div v-if="selectedEventDetails.showTime !== 'TBD'" class="mb-8">
                      <div class="flex items-baseline gap-2 mb-2">
                        <span class="text-xs font-medium uppercase text-gray-600">Showtime</span>
                      </div>
                      <div class="flex items-baseline gap-2">
                        <span class="text-4xl font-bold text-gray-900">{{ selectedEventDetails.showTime }}</span>
                        <span class="text-sm text-gray-500">Length: {{ selectedEventDetails.showLength }}</span>
                      </div>
                    </div>

                    <!-- Schedule -->
                    <div v-if="selectedEventDetails.schedule.length > 0" class="border-t border-gray-200 pt-6 space-y-3">
                      <div
                        v-for="(item, index) in selectedEventDetails.schedule"
                        :key="index"
                        class="flex items-center gap-4"
                      >
                        <span class="text-sm font-semibold text-gray-900 w-24">{{ item.time }}</span>
                        <span class="text-sm text-gray-700">{{ item.activity }}</span>
                      </div>
                    </div>
                    <div v-else class="border-t border-gray-200 pt-6">
                      <p class="text-sm text-gray-400 italic">No schedule details available</p>
                    </div>
                  </CardContent>
                </Card>

                <!-- Return to Hotel Card -->
                <Card v-if="selectedEventDetails.returnInfo" class="border border-gray-200 bg-white">
                  <CardContent class="p-6">
                    <h2 class="text-sm font-semibold uppercase tracking-wide text-gray-600 mb-6">Return to Hotel</h2>
                    <div class="space-y-3">
                      <div class="flex items-center justify-between">
                        <span class="text-sm font-medium text-gray-700">After Soundcheck:</span>
                        <span class="text-sm font-semibold text-gray-900">{{ selectedEventDetails.returnInfo.afterSoundcheck }}</span>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="text-sm font-medium text-gray-700">After Show:</span>
                        <span class="text-sm font-semibold text-gray-900">{{ selectedEventDetails.returnInfo.afterShow }}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <!-- Notes Card -->
                <Card class="border border-gray-200 bg-white">
                  <CardContent class="p-6">
                    <h2 class="text-sm font-semibold uppercase tracking-wide text-gray-600 mb-4">Notes</h2>
                    <p v-if="selectedEventDetails.notes" class="text-sm text-gray-700">
                      {{ selectedEventDetails.notes }}
                    </p>
                    <p v-else class="text-sm text-gray-400 italic">No notes for this event</p>
                  </CardContent>
                </Card>
              </div>

              <!-- Right Column: Venue, Hotel, Travel Info -->
              <div class="space-y-6">
                <!-- Venue Info Card -->
                <Card v-if="selectedEventDetails.venue.name !== 'N/A'" class="border border-gray-200 bg-white">
                  <CardContent class="p-6">
                    <h2 class="text-sm font-semibold uppercase tracking-wide text-gray-600 mb-4">Venue Info</h2>
                    <div class="space-y-4">
                      <div>
                        <h3 class="text-lg font-bold text-gray-900 mb-1">{{ selectedEventDetails.venue.name }}</h3>
                        <p class="text-sm text-gray-600">{{ selectedEventDetails.venue.address }}</p>
                        <p class="text-sm text-gray-600">{{ selectedEventDetails.venue.city }}</p>
                        <p class="text-sm text-gray-600 mt-2">{{ selectedEventDetails.venue.phone }}</p>
                      </div>
                      <div class="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div>
                          <p class="text-xs font-medium uppercase text-gray-600">Capacity</p>
                          <p class="text-lg font-bold text-gray-900">{{ selectedEventDetails.venue.capacity.toLocaleString() }}</p>
                        </div>
                        <div>
                          <p class="text-xs font-medium uppercase text-gray-600">Type</p>
                          <p class="text-lg font-bold text-gray-900">{{ selectedEventDetails.venue.type }}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <!-- Hotel Info Card -->
                <Card v-if="selectedEventDetails.hotel" class="border border-gray-200 bg-white">
                  <CardContent class="p-6">
                    <h2 class="text-sm font-semibold uppercase tracking-wide text-gray-600 mb-4">Hotel Info</h2>
                    <div class="space-y-4">
                      <div>
                        <h3 class="text-lg font-bold text-gray-900 mb-1">{{ selectedEventDetails.hotel.name }}</h3>
                        <p class="text-sm text-gray-600">{{ selectedEventDetails.hotel.address }}</p>
                        <p class="text-sm text-gray-600">{{ selectedEventDetails.hotel.city }}</p>
                        <p class="text-sm text-gray-600 mt-2">{{ selectedEventDetails.hotel.phone }}</p>
                      </div>
                      <div v-if="selectedEventDetails.hotel.amenities && selectedEventDetails.hotel.amenities.length > 0" class="pt-4 border-t border-gray-200">
                        <div class="flex flex-wrap gap-2">
                          <Badge
                            v-for="amenity in selectedEventDetails.hotel.amenities"
                            :key="amenity"
                            variant="secondary"
                            class="text-xs"
                          >
                            {{ amenity }}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
  </div>
</template>
