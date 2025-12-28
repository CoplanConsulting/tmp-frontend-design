<script setup lang="ts">
import {
  Calendar as CalendarIcon,
  Hotel,
  MapPin,
  Users,
  Contact,
  Edit,
  Map
} from 'lucide-vue-next'
import {
  getEventWithDetails,
  getEventListItems,
  getDayOfWeek,
  formatDisplayDate,
  getLocation,
  getFullName
} from '~/utils/mockData'
import type { EventWithDetails } from '~/utils/mockData'

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
                <div class="flex flex-col items-center justify-center w-[52px] h-[52px] rounded-md border border-gray-300 bg-white flex-shrink-0">
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
            <div class="ml-auto">
              <Button size="sm" class="bg-black text-white hover:bg-gray-800">
                <Edit class="h-4 w-4 mr-2" />
                Edit Event
              </Button>
            </div>
          </header>

          <main class="flex-1 overflow-y-auto p-8">
            <div v-if="currentEvent">
              <!-- Info Cards Grid -->
              <div class="grid grid-cols-2 gap-4 mb-6">
                
                <!-- Day of Show Contact Card -->
                <Card class="border border-gray-200 bg-white">
                  <CardHeader class="pb-3">
                    <div class="flex items-center justify-between relative">
                      <CardTitle class="text-sm font-medium text-gray-600">Day of Show Contact</CardTitle>
                     <div class="absolute right-2 top-2 size-20 opacity-10"> <Contact class="h-24 w-24 text-gray-600" /></div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">
                      {{ currentEvent.dayOfShowContact ? getFullName(currentEvent.dayOfShowContact) : 'TBD' }}
                    </h3>
                    <p v-if="currentEvent.dayOfShowContact?.companyName" class="text-sm text-gray-600 mb-3">{{ currentEvent.dayOfShowContact.companyName }}</p>
                    <p v-if="currentEvent.dayOfShowContact?.phone" class="text-sm text-gray-600">{{ currentEvent.dayOfShowContact.phone }}</p>
                    <p v-if="currentEvent.dayOfShowContact?.email" class="text-sm text-gray-600">{{ currentEvent.dayOfShowContact.email }}</p>
                  </CardContent>
                </Card>

                <!-- Promoter Card -->
                <Card class="border border-gray-200 bg-white">
                  <CardHeader class="pb-3">
                    <div class="flex items-center justify-between relative">
                      <CardTitle class="text-sm font-medium text-gray-600">Promoter</CardTitle>
                      <div class="absolute right-2 top-2 size-20 opacity-10"><Users class="h-24 w-24 text-gray-600" /></div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">
                      {{ currentEvent.promoter ? getFullName(currentEvent.promoter) : 'TBD' }}
                    </h3>
                    <p v-if="currentEvent.promoter?.companyName" class="text-sm text-gray-600 mb-3">{{ currentEvent.promoter.companyName }}</p>
                    <p v-if="currentEvent.promoter?.phone" class="text-sm text-gray-600">{{ currentEvent.promoter.phone }}</p>
                    <p v-if="currentEvent.promoter?.email" class="text-sm text-gray-600">{{ currentEvent.promoter.email }}</p>
                  </CardContent>
                </Card>

                <!-- Venue Card -->
                <Card class="border border-gray-200 bg-white">
                  <CardHeader class="pb-3">
                    <div class="flex items-center justify-between relative">
                      <CardTitle class="text-sm font-medium text-gray-600">Venue</CardTitle>
                      
                       <div class="absolute right-2 top-2 size-20 opacity-10"><MapPin class="h-24 w-24 text-gray-600" /></div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ currentEvent.venue?.name ?? 'TBD' }}</h3>
                    <p v-if="currentEvent.venue?.address" class="text-sm text-gray-600">{{ currentEvent.venue.address }}</p>
                    <p v-if="currentEvent.venue?.city" class="text-sm text-gray-600">{{ currentEvent.venue.city }}, {{ currentEvent.venue.state }} {{ currentEvent.venue.postalCode }}</p>
                    <p v-if="currentEvent.venue?.phone" class="text-sm text-gray-600 mt-2">{{ currentEvent.venue.phone }}</p>
                  </CardContent>
                </Card>

                <!-- Hotel Card -->
                <Card class="border border-gray-200 bg-white">
                  <CardHeader class="pb-3">
                    <div class="flex items-center justify-between relative">
                      <CardTitle class="text-sm font-medium text-gray-600">Hotel</CardTitle>
                      <div class="absolute right-2 top-2 size-20 opacity-10"><Hotel class="h-24 w-24 text-gray-600" /></div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ currentEvent.hotel?.name ?? 'TBD' }}</h3>
                    <p v-if="currentEvent.hotel?.address" class="text-sm text-gray-600">{{ currentEvent.hotel.address }}</p>
                    <p v-if="currentEvent.hotel?.city" class="text-sm text-gray-600">{{ currentEvent.hotel.city }}, {{ currentEvent.hotel.state }} {{ currentEvent.hotel.postalCode }}</p>
                    <p v-if="currentEvent.hotel?.phone" class="text-sm text-gray-600 mt-2">{{ currentEvent.hotel.phone }}</p>
                    <p v-if="currentEvent.hotel?.confirmationNumber" class="text-sm text-gray-600 mt-2">
                      Confirmation: {{ currentEvent.hotel.confirmationNumber }}
                    </p>
                  </CardContent>
                </Card>

                
              </div>

              <!-- Event Details Accordions -->
              <div class="space-y-3 mb-8">
                <Accordion type="single" collapsible default-value="schedule" class="w-full">
                  <!-- Schedule Accordion -->
                  <AccordionItem value="schedule" class="border border-gray-200 bg-white rounded-lg mb-3 px-6 data-[state=open]:pb-6">
                    <AccordionTrigger class="py-4 text-base font-semibold text-gray-900 hover:no-underline">
                      Schedule
                    </AccordionTrigger>
                    <AccordionContent class="pt-4">
                      <div v-if="currentEvent.showTime || currentEvent.loadIn || currentEvent.soundCheck || currentEvent.doors">
                        <!-- Showtime Section -->
                        <div v-if="currentEvent.showTime" class=" pb-6 mb-6 border-b border-dashed border-gray-300">
                          <div class="text-xs font-medium text-gray-600 uppercase tracking-wide mb-2">Showtime</div>
                          <div class="text-4xl font-bold text-gray-900 mb-1">{{ currentEvent.showTime }}</div>
                          <div v-if="currentEvent.setLength" class="text-sm text-gray-600">
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
                  <AccordionItem value="production" class="border border-gray-200 bg-white rounded-lg mb-3 px-6 data-[state=open]:pb-6">
                    <AccordionTrigger class="py-4 text-base font-semibold text-gray-900 hover:no-underline">
                      Production
                    </AccordionTrigger>
                    <AccordionContent class="pt-4">
                      <div class="space-y-6">
                        <!-- Venue Technical Info -->
                        <div v-if="currentEvent.venue">
                          <h3 class="text-sm font-semibold text-gray-900 mb-3">Venue Technical Information</h3>
                          <div class="space-y-3">
                            <div v-if="currentEvent.venue.stageDimensions" class="flex">
                              <div class="w-40 text-sm text-gray-600 font-medium">STAGE DIMENSIONS</div>
                              <div class="flex-1 text-sm text-gray-900">{{ currentEvent.venue.stageDimensions }}</div>
                            </div>
                            <div v-if="currentEvent.venue.capacity" class="flex">
                              <div class="w-40 text-sm text-gray-600 font-medium">CAPACITY</div>
                              <div class="flex-1 text-sm text-gray-900">{{ currentEvent.venue.capacity }}</div>
                            </div>
                            <div v-if="currentEvent.venue.loadInInfo" class="flex">
                              <div class="w-40 text-sm text-gray-600 font-medium">LOAD IN INFO</div>
                              <div class="flex-1 text-sm text-gray-900 whitespace-pre-wrap">{{ currentEvent.venue.loadInInfo }}</div>
                            </div>
                            <div v-if="currentEvent.venue.powerInfo" class="flex">
                              <div class="w-40 text-sm text-gray-600 font-medium">POWER</div>
                              <div class="flex-1 text-sm text-gray-900">{{ currentEvent.venue.powerInfo }}</div>
                            </div>
                            <div v-if="currentEvent.venue.dressingRoomInfo" class="flex">
                              <div class="w-40 text-sm text-gray-600 font-medium">DRESSING ROOMS</div>
                              <div class="flex-1 text-sm text-gray-900 whitespace-pre-wrap">{{ currentEvent.venue.dressingRoomInfo }}</div>
                            </div>
                            <div v-if="currentEvent.venue.greenRoomInfo" class="flex">
                              <div class="w-40 text-sm text-gray-600 font-medium">GREEN ROOM</div>
                              <div class="flex-1 text-sm text-gray-900 whitespace-pre-wrap">{{ currentEvent.venue.greenRoomInfo }}</div>
                            </div>
                          </div>
                        </div>

                        <!-- Event Production Details -->
                        <div v-if="currentEvent.loadInDetails || currentEvent.soundDetails || currentEvent.lightDetails || currentEvent.securityDetails" class="pt-6 border-t border-gray-200">
                          <h3 class="text-sm font-semibold text-gray-900 mb-3">Event Production Details</h3>
                          <div class="space-y-3">
                            <div v-if="currentEvent.loadInDetails" class="flex">
                              <div class="w-40 text-sm text-gray-600 font-medium">LOAD IN</div>
                              <div class="flex-1 text-sm text-gray-900 whitespace-pre-wrap">{{ currentEvent.loadInDetails }}</div>
                            </div>
                            <div v-if="currentEvent.soundDetails" class="flex">
                              <div class="w-40 text-sm text-gray-600 font-medium">SOUND</div>
                              <div class="flex-1 text-sm text-gray-900 whitespace-pre-wrap">{{ currentEvent.soundDetails }}</div>
                            </div>
                            <div v-if="currentEvent.lightDetails" class="flex">
                              <div class="w-40 text-sm text-gray-600 font-medium">LIGHTING</div>
                              <div class="flex-1 text-sm text-gray-900 whitespace-pre-wrap">{{ currentEvent.lightDetails }}</div>
                            </div>
                            <div v-if="currentEvent.securityDetails" class="flex">
                              <div class="w-40 text-sm text-gray-600 font-medium">SECURITY</div>
                              <div class="flex-1 text-sm text-gray-900 whitespace-pre-wrap">{{ currentEvent.securityDetails }}</div>
                            </div>
                            <div v-if="currentEvent.cateringDetails" class="flex">
                              <div class="w-40 text-sm text-gray-600 font-medium">CATERING</div>
                              <div class="flex-1 text-sm text-gray-900 whitespace-pre-wrap">{{ currentEvent.cateringDetails }}</div>
                            </div>
                            <div v-if="currentEvent.meetAndGreet" class="flex">
                              <div class="w-40 text-sm text-gray-600 font-medium">MEET & GREET</div>
                              <div class="flex-1 text-sm text-gray-900 whitespace-pre-wrap">{{ currentEvent.meetAndGreet }}</div>
                            </div>
                          </div>
                        </div>

                        <!-- Notes -->
                        <div v-if="currentEvent.notes" class="pt-6 border-t border-gray-200">
                          <h3 class="text-sm font-semibold text-gray-900 mb-3">Notes</h3>
                          <div class="text-sm text-gray-900 whitespace-pre-wrap">{{ currentEvent.notes }}</div>
                        </div>

                        <!-- Empty State -->
                        <div v-if="!currentEvent.venue && !currentEvent.loadInDetails && !currentEvent.soundDetails && !currentEvent.notes" class="text-sm text-gray-500">
                          No production information available.
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <!-- Facilities Accordion -->
                  <AccordionItem value="facilities" class="border border-gray-200 bg-white rounded-lg mb-3 px-6 data-[state=open]:pb-6">
                    <AccordionTrigger class="py-4 text-base font-semibold text-gray-900 hover:no-underline">
                      Facilities
                    </AccordionTrigger>
                    <AccordionContent class="pt-4">
                      <div class="text-sm text-gray-500">
                        Facilities information will be displayed here.
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <!-- Equipment Accordion -->
                  <AccordionItem value="equipment" class="border border-gray-200 bg-white rounded-lg mb-3 px-6 data-[state=open]:pb-6">
                    <AccordionTrigger class="py-4 text-base font-semibold text-gray-900 hover:no-underline">
                      Equipment
                    </AccordionTrigger>
                    <AccordionContent class="pt-4">
                      <div class="text-sm text-gray-500">
                        Equipment information will be displayed here.
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <!-- Logistics Accordion -->
                  <AccordionItem value="logistics" class="border border-gray-200 bg-white rounded-lg mb-3 px-6 data-[state=open]:pb-6">
                    <AccordionTrigger class="py-4 text-base font-semibold text-gray-900 hover:no-underline">
                      Logistics
                    </AccordionTrigger>
                    <AccordionContent class="pt-4">
                      <div class="text-sm text-gray-500">
                        Logistics information will be displayed here.
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <!-- Local Crew Accordion -->
                  <AccordionItem value="local-crew" class="border border-gray-200 bg-white rounded-lg mb-3 px-6 data-[state=open]:pb-6">
                    <AccordionTrigger class="py-4 text-base font-semibold text-gray-900 hover:no-underline">
                      Local Crew
                    </AccordionTrigger>
                    <AccordionContent class="pt-4">
                      <div class="text-sm text-gray-500">
                        Local Crew information will be displayed here.
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <!-- Labor Call Accordion -->
                  <AccordionItem value="labor-call" class="border border-gray-200 bg-white rounded-lg mb-3 px-6 data-[state=open]:pb-6">
                    <AccordionTrigger class="py-4 text-base font-semibold text-gray-900 hover:no-underline">
                      Labor Call
                    </AccordionTrigger>
                    <AccordionContent class="pt-4">
                      <div class="text-sm text-gray-500">
                        Labor Call information will be displayed here.
                      </div>
                    </AccordionContent>
                  </AccordionItem>
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
