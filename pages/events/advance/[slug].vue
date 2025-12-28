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
              <div class="space-y-4 mb-8">
                <Accordion type="multiple" default-value="['schedule']" class="w-full">
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
                  <AccordionItem value="production" class="border border-gray-200/80 bg-white rounded-lg mb-4 px-6 shadow-sm hover:shadow-md transition-shadow data-[state=open]:shadow-md data-[state=open]:pb-6 data-[state=open]:border-gray-300">
                    <AccordionTrigger class="py-5 text-base font-semibold text-gray-900 hover:no-underline">
                      Production
                    </AccordionTrigger>
                    <AccordionContent class="pt-4">
                      <div class="space-y-6">
                        <!-- Venue Technical Info -->
                        <div v-if="currentEvent.venue">
                          <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Venue Technical Information</h3>
                          <div class="grid gap-y-3" style="grid-template-columns: auto 1fr; column-gap: 1.5rem; align-items: baseline;">
                            <template v-if="currentEvent.venue.stageDimensions">
                              <div class="text-right">
                                <span class="text-sm text-gray-600 font-medium">STAGE DIMENSIONS</span>
                              </div>
                              <div>
                                <span class="text-sm text-gray-900">{{ currentEvent.venue.stageDimensions }}</span>
                              </div>
                            </template>

                            <template v-if="currentEvent.venue.capacity">
                              <div class="text-right">
                                <span class="text-sm text-gray-600 font-medium">CAPACITY</span>
                              </div>
                              <div>
                                <span class="text-sm text-gray-900">{{ currentEvent.venue.capacity }}</span>
                              </div>
                            </template>

                            <template v-if="currentEvent.venue.loadInInfo">
                              <div class="text-right">
                                <span class="text-sm text-gray-600 font-medium">LOAD IN INFO</span>
                              </div>
                              <div>
                                <span class="text-sm text-gray-900 whitespace-pre-wrap">{{ currentEvent.venue.loadInInfo }}</span>
                              </div>
                            </template>

                            <template v-if="currentEvent.venue.powerInfo">
                              <div class="text-right">
                                <span class="text-sm text-gray-600 font-medium">POWER</span>
                              </div>
                              <div>
                                <span class="text-sm text-gray-900">{{ currentEvent.venue.powerInfo }}</span>
                              </div>
                            </template>

                            <template v-if="currentEvent.venue.dressingRoomInfo">
                              <div class="text-right">
                                <span class="text-sm text-gray-600 font-medium">DRESSING ROOMS</span>
                              </div>
                              <div>
                                <span class="text-sm text-gray-900 whitespace-pre-wrap">{{ currentEvent.venue.dressingRoomInfo }}</span>
                              </div>
                            </template>

                            <template v-if="currentEvent.venue.greenRoomInfo">
                              <div class="text-right">
                                <span class="text-sm text-gray-600 font-medium">GREEN ROOM</span>
                              </div>
                              <div>
                                <span class="text-sm text-gray-900 whitespace-pre-wrap">{{ currentEvent.venue.greenRoomInfo }}</span>
                              </div>
                            </template>
                          </div>
                        </div>

                        <!-- Event Production Details -->
                        <div v-if="currentEvent.production || currentEvent.loadInDetails || currentEvent.soundDetails" class="pt-6 border-t border-gray-200">
                          <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Event Production Details</h3>
                          <div class="grid gap-y-3" style="grid-template-columns: auto 1fr; column-gap: 1.5rem; align-items: baseline;">
                            <template v-if="currentEvent.production?.loadInDetails || currentEvent.loadInDetails">
                              <div class="text-right">
                                <span class="text-sm text-gray-600 font-medium">LOAD IN</span>
                              </div>
                              <div>
                                <span class="text-sm text-gray-900 whitespace-pre-wrap">{{ currentEvent.production?.loadInDetails || currentEvent.loadInDetails }}</span>
                              </div>
                            </template>

                            <template v-if="currentEvent.production?.soundDetails || currentEvent.soundDetails">
                              <div class="text-right">
                                <span class="text-sm text-gray-600 font-medium">SOUND</span>
                              </div>
                              <div>
                                <span class="text-sm text-gray-900 whitespace-pre-wrap">{{ currentEvent.production?.soundDetails || currentEvent.soundDetails }}</span>
                              </div>
                            </template>

                            <template v-if="currentEvent.production?.lightDetails || currentEvent.lightDetails">
                              <div class="text-right">
                                <span class="text-sm text-gray-600 font-medium">LIGHTING</span>
                              </div>
                              <div>
                                <span class="text-sm text-gray-900 whitespace-pre-wrap">{{ currentEvent.production?.lightDetails || currentEvent.lightDetails }}</span>
                              </div>
                            </template>

                            <template v-if="currentEvent.production?.backlineDetails">
                              <div class="text-right">
                                <span class="text-sm text-gray-600 font-medium">BACKLINE</span>
                              </div>
                              <div>
                                <span class="text-sm text-gray-900 whitespace-pre-wrap">{{ currentEvent.production.backlineDetails }}</span>
                              </div>
                            </template>

                            <template v-if="currentEvent.production?.videoDetails">
                              <div class="text-right">
                                <span class="text-sm text-gray-600 font-medium">VIDEO</span>
                              </div>
                              <div>
                                <span class="text-sm text-gray-900 whitespace-pre-wrap">{{ currentEvent.production.videoDetails }}</span>
                              </div>
                            </template>

                            <template v-if="currentEvent.production?.stagingDetails">
                              <div class="text-right">
                                <span class="text-sm text-gray-600 font-medium">STAGING</span>
                              </div>
                              <div>
                                <span class="text-sm text-gray-900 whitespace-pre-wrap">{{ currentEvent.production.stagingDetails }}</span>
                              </div>
                            </template>

                            <template v-if="currentEvent.production?.securityDetails || currentEvent.securityDetails">
                              <div class="text-right">
                                <span class="text-sm text-gray-600 font-medium">SECURITY</span>
                              </div>
                              <div>
                                <span class="text-sm text-gray-900 whitespace-pre-wrap">{{ currentEvent.production?.securityDetails || currentEvent.securityDetails }}</span>
                              </div>
                            </template>

                            <template v-if="currentEvent.production?.cateringDetails || currentEvent.cateringDetails">
                              <div class="text-right">
                                <span class="text-sm text-gray-600 font-medium">CATERING</span>
                              </div>
                              <div>
                                <span class="text-sm text-gray-900 whitespace-pre-wrap">{{ currentEvent.production?.cateringDetails || currentEvent.cateringDetails }}</span>
                              </div>
                            </template>

                            <template v-if="currentEvent.production?.meetAndGreet || currentEvent.meetAndGreet">
                              <div class="text-right">
                                <span class="text-sm text-gray-600 font-medium">MEET & GREET</span>
                              </div>
                              <div>
                                <span class="text-sm text-gray-900 whitespace-pre-wrap">{{ currentEvent.production?.meetAndGreet || currentEvent.meetAndGreet }}</span>
                              </div>
                            </template>
                          </div>
                        </div>

                        <!-- Notes -->
                        <div v-if="currentEvent.notes" class="pt-6 border-t border-gray-200">
                          <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Notes</h3>
                          <div class="text-sm text-gray-900 whitespace-pre-wrap">{{ currentEvent.notes }}</div>
                        </div>

                        <!-- Empty State -->
                        <div v-if="!currentEvent.venue && !currentEvent.production && !currentEvent.loadInDetails && !currentEvent.notes" class="text-sm text-gray-500">
                          No production information available.
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <!-- Facilities Accordion -->
                  <AccordionItem value="facilities" class="border border-gray-200/80 bg-white rounded-lg mb-4 px-6 shadow-sm hover:shadow-md transition-shadow data-[state=open]:shadow-md data-[state=open]:pb-6 data-[state=open]:border-gray-300">
                    <AccordionTrigger class="py-5 text-base font-semibold text-gray-900 hover:no-underline">
                      Facilities
                    </AccordionTrigger>
                    <AccordionContent class="pt-4">
                      <div v-if="currentEvent.facilities" class="space-y-6">
                        <!-- Catering -->
                        <div v-if="currentEvent.facilities.catering">
                          <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Catering</h3>
                          <div class="grid gap-y-3" style="grid-template-columns: auto 1fr; column-gap: 1.5rem; align-items: baseline;">
                            <template v-if="currentEvent.facilities.catering.breakfast">
                              <div class="text-right">
                                <span class="text-sm text-gray-600 font-medium">BREAKFAST</span>
                              </div>
                              <div>
                                <span class="text-sm text-gray-900">{{ currentEvent.facilities.catering.breakfast.time }} - {{ currentEvent.facilities.catering.breakfast.count }} people</span>
                                <span v-if="currentEvent.facilities.catering.breakfast.notes" class="block text-sm text-gray-600 mt-1">{{ currentEvent.facilities.catering.breakfast.notes }}</span>
                              </div>
                            </template>

                            <template v-if="currentEvent.facilities.catering.lunch">
                              <div class="text-right">
                                <span class="text-sm text-gray-600 font-medium">LUNCH</span>
                              </div>
                              <div>
                                <span class="text-sm text-gray-900">{{ currentEvent.facilities.catering.lunch.time }} - {{ currentEvent.facilities.catering.lunch.count }} people</span>
                                <span v-if="currentEvent.facilities.catering.lunch.notes" class="block text-sm text-gray-600 mt-1">{{ currentEvent.facilities.catering.lunch.notes }}</span>
                              </div>
                            </template>

                            <template v-if="currentEvent.facilities.catering.dinner">
                              <div class="text-right">
                                <span class="text-sm text-gray-600 font-medium">DINNER</span>
                              </div>
                              <div>
                                <span class="text-sm text-gray-900">{{ currentEvent.facilities.catering.dinner.time }} - {{ currentEvent.facilities.catering.dinner.count }} people</span>
                                <span v-if="currentEvent.facilities.catering.dinner.notes" class="block text-sm text-gray-600 mt-1">{{ currentEvent.facilities.catering.dinner.notes }}</span>
                              </div>
                            </template>

                            <template v-if="currentEvent.facilities.catering.specialRequests">
                              <div class="text-right">
                                <span class="text-sm text-gray-600 font-medium"> Requests</span>
                              </div>
                              <div>
                                <span class="text-sm text-gray-900">{{ currentEvent.facilities.catering.specialRequests }}</span>
                              </div>
                            </template>
                          </div>
                        </div>

                        <!-- Parking -->
                        <div v-if="currentEvent.facilities.parking" class="pt-6 border-t border-gray-200">
                          <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Parking</h3>
                          <div class="grid gap-y-3" style="grid-template-columns: auto 1fr; column-gap: 1.5rem; align-items: baseline;">
                            <template v-if="currentEvent.facilities.parking.trucks">
                              <div class="text-right">
                                <span class="text-sm text-gray-600 font-medium">TRUCKS</span>
                              </div>
                              <div>
                                <span class="text-sm text-gray-900">{{ currentEvent.facilities.parking.trucks }}</span>
                              </div>
                            </template>

                            <template v-if="currentEvent.facilities.parking.buses">
                              <div class="text-right">
                                <span class="text-sm text-gray-600 font-medium">BUSES</span>
                              </div>
                              <div>
                                <span class="text-sm text-gray-900">{{ currentEvent.facilities.parking.buses }}</span>
                              </div>
                            </template>

                            <template v-if="currentEvent.facilities.parking.notes">
                              <div class="text-right">
                                <span class="text-sm text-gray-600 font-medium">NOTES</span>
                              </div>
                              <div>
                                <span class="text-sm text-gray-900">{{ currentEvent.facilities.parking.notes }}</span>
                              </div>
                            </template>
                          </div>
                        </div>

                        <!-- IT Requirements -->
                        <div v-if="currentEvent.facilities.it" class="pt-6 border-t border-gray-200">
                          <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">IT & Connectivity</h3>
                          <div class="grid gap-y-3" style="grid-template-columns: auto 1fr; column-gap: 1.5rem; align-items: baseline;">
                            <template v-if="currentEvent.facilities.it.requirements">
                              <div class="text-right">
                                <span class="text-sm text-gray-600 font-medium">REQUIREMENTS</span>
                              </div>
                              <div>
                                <span class="text-sm text-gray-900 whitespace-pre-wrap">{{ currentEvent.facilities.it.requirements }}</span>
                              </div>
                            </template>

                            <template v-if="currentEvent.facilities.it.notes">
                              <div class="text-right">
                                <span class="text-sm text-gray-600 font-medium">NOTES</span>
                              </div>
                              <div>
                                <span class="text-sm text-gray-900 whitespace-pre-wrap">{{ currentEvent.facilities.it.notes }}</span>
                              </div>
                            </template>
                          </div>
                        </div>

                        <!-- Venue Facilities (if available) -->
                        <div v-if="currentEvent.venue && (currentEvent.venue.wifiInfo || currentEvent.venue.laundryInfo || currentEvent.venue.runnerInfo)" class="pt-6 border-t border-gray-200">
                          <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Venue Amenities</h3>
                          <div class="grid gap-y-3" style="grid-template-columns: auto 1fr; column-gap: 1.5rem; align-items: baseline;">
                            <template v-if="currentEvent.venue.wifiInfo">
                              <div class="text-right">
                                <span class="text-sm text-gray-600 font-medium">WIFI</span>
                              </div>
                              <div>
                                <span class="text-sm text-gray-900">{{ currentEvent.venue.wifiInfo }}</span>
                              </div>
                            </template>

                            <template v-if="currentEvent.venue.laundryInfo">
                              <div class="text-right">
                                <span class="text-sm text-gray-600 font-medium">LAUNDRY</span>
                              </div>
                              <div>
                                <span class="text-sm text-gray-900">{{ currentEvent.venue.laundryInfo }}</span>
                              </div>
                            </template>

                            <template v-if="currentEvent.venue.runnerInfo">
                              <div class="text-right">
                                <span class="text-sm text-gray-600 font-medium">RUNNER</span>
                              </div>
                              <div>
                                <span class="text-sm text-gray-900">{{ currentEvent.venue.runnerInfo }}</span>
                              </div>
                            </template>

                            <template v-if="currentEvent.venue.busParking">
                              <div class="text-right">
                                <span class="text-sm text-gray-600 font-medium">BUS PARKING</span>
                              </div>
                              <div>
                                <span class="text-sm text-gray-900">{{ currentEvent.venue.busParking }}</span>
                              </div>
                            </template>

                            <template v-if="currentEvent.venue.parkingInstructions">
                              <div class="text-right">
                                <span class="text-sm text-gray-600 font-medium">PARKING INFO</span>
                              </div>
                              <div>
                                <span class="text-sm text-gray-900">{{ currentEvent.venue.parkingInstructions }}</span>
                              </div>
                            </template>
                          </div>
                        </div>
                      </div>
                      <div v-else class="text-sm text-gray-500">
                        No facilities information available.
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <!-- Equipment Accordion -->
                  <AccordionItem value="equipment" class="border border-gray-200/80 bg-white rounded-lg mb-4 px-6 shadow-sm hover:shadow-md transition-shadow data-[state=open]:shadow-md data-[state=open]:pb-6 data-[state=open]:border-gray-300">
                    <AccordionTrigger class="py-5 text-base font-semibold text-gray-900 hover:no-underline">
                      Equipment
                    </AccordionTrigger>
                    <AccordionContent class="pt-4">
                      <div v-if="currentEvent.production" class="grid gap-y-6" style="grid-template-columns: auto 1fr; column-gap: 1.5rem; align-items: baseline;">
                        <!-- Audio Equipment -->
                        <template v-if="currentEvent.production.soundDetails">
                          <div class="text-right">
                            <span class="text-sm text-gray-600 font-medium">AUDIO</span>
                          </div>
                          <div>
                            <span class="text-sm text-gray-900 whitespace-pre-wrap">{{ currentEvent.production.soundDetails }}</span>
                          </div>
                        </template>

                        <!-- Lighting Equipment -->
                        <template v-if="currentEvent.production.lightDetails">
                          <div class="text-right">
                            <span class="text-sm text-gray-600 font-medium">LIGHTING</span>
                          </div>
                          <div>
                            <span class="text-sm text-gray-900 whitespace-pre-wrap">{{ currentEvent.production.lightDetails }}</span>
                          </div>
                        </template>

                        <!-- Video Equipment -->
                        <template v-if="currentEvent.production.videoDetails">
                          <div class="text-right">
                            <span class="text-sm text-gray-600 font-medium">VIDEO</span>
                          </div>
                          <div>
                            <span class="text-sm text-gray-900 whitespace-pre-wrap">{{ currentEvent.production.videoDetails }}</span>
                          </div>
                        </template>

                        <!-- Backline Equipment -->
                        <template v-if="currentEvent.production.backlineDetails">
                          <div class="text-right">
                            <span class="text-sm text-gray-600 font-medium">BACKLINE</span>
                          </div>
                          <div>
                            <span class="text-sm text-gray-900 whitespace-pre-wrap">{{ currentEvent.production.backlineDetails }}</span>
                          </div>
                        </template>

                        <!-- Staging Equipment -->
                        <template v-if="currentEvent.production.stagingDetails">
                          <div class="text-right">
                            <span class="text-sm text-gray-600 font-medium">STAGING</span>
                          </div>
                          <div>
                            <span class="text-sm text-gray-900 whitespace-pre-wrap">{{ currentEvent.production.stagingDetails }}</span>
                          </div>
                        </template>
                      </div>
                      <div v-else class="text-sm text-gray-500">
                        No equipment information available.
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <!-- Logistics Accordion -->
                  <AccordionItem value="logistics" class="border border-gray-200/80 bg-white rounded-lg mb-4 px-6 shadow-sm hover:shadow-md transition-shadow data-[state=open]:shadow-md data-[state=open]:pb-6 data-[state=open]:border-gray-300">
                    <AccordionTrigger class="py-5 text-base font-semibold text-gray-900 hover:no-underline">
                      Logistics
                    </AccordionTrigger>
                    <AccordionContent class="pt-4">
                      <div v-if="currentEvent.logistics" class="grid gap-y-3" style="grid-template-columns: auto 1fr; column-gap: 1.5rem; align-items: baseline;">
                        <template v-if="currentEvent.logistics.airportNotes">
                          <div class="text-right">
                            <span class="text-sm text-gray-600 font-medium">AIRPORT</span>
                          </div>
                          <div>
                            <span class="text-sm text-gray-900 whitespace-pre-wrap">{{ currentEvent.logistics.airportNotes }}</span>
                          </div>
                        </template>

                        <template v-if="currentEvent.logistics.groundTransport">
                          <div class="text-right">
                            <span class="text-sm text-gray-600 font-medium">TRANSPORT</span>
                          </div>
                          <div>
                            <span class="text-sm text-gray-900 whitespace-pre-wrap">{{ currentEvent.logistics.groundTransport }}</span>
                          </div>
                        </template>

                        <template v-if="currentEvent.logistics.directions">
                          <div class="text-right">
                            <span class="text-sm text-gray-600 font-medium">DIRECTIONS</span>
                          </div>
                          <div>
                            <span class="text-sm text-gray-900 whitespace-pre-wrap">{{ currentEvent.logistics.directions }}</span>
                          </div>
                        </template>

                        <template v-if="currentEvent.logistics.areaBusiness">
                          <div class="text-right">
                            <span class="text-sm text-gray-600 font-medium">AREA BUSINESS</span>
                          </div>
                          <div>
                            <span class="text-sm text-gray-900 whitespace-pre-wrap">{{ currentEvent.logistics.areaBusiness }}</span>
                          </div>
                        </template>

                        <template v-if="currentEvent.logistics.areaRestaurants">
                          <div class="text-right">
                            <span class="text-sm text-gray-600 font-medium">RESTAURANTS</span>
                          </div>
                          <div>
                            <span class="text-sm text-gray-900 whitespace-pre-wrap">{{ currentEvent.logistics.areaRestaurants }}</span>
                          </div>
                        </template>

                        <template v-if="currentEvent.logistics.pointsOfInterest">
                          <div class="text-right">
                            <span class="text-sm text-gray-600 font-medium">POINTS OF INTEREST</span>
                          </div>
                          <div>
                            <span class="text-sm text-gray-900 whitespace-pre-wrap">{{ currentEvent.logistics.pointsOfInterest }}</span>
                          </div>
                        </template>
                      </div>
                      <div v-else class="text-sm text-gray-500">
                        No logistics information available.
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <!-- Local Crew Accordion -->
                  <AccordionItem value="local-crew" class="border border-gray-200/80 bg-white rounded-lg mb-4 px-6 shadow-sm hover:shadow-md transition-shadow data-[state=open]:shadow-md data-[state=open]:pb-6 data-[state=open]:border-gray-300">
                    <AccordionTrigger class="py-5 text-base font-semibold text-gray-900 hover:no-underline">
                      Local Crew
                    </AccordionTrigger>
                    <AccordionContent class="pt-4">
                      <div v-if="currentEvent.localCrew" class="grid gap-y-3" style="grid-template-columns: auto 1fr; column-gap: 1.5rem; align-items: baseline;">
                        <template v-if="currentEvent.localCrew.union">
                          <div class="text-right">
                            <span class="text-sm text-gray-600 font-medium">UNION</span>
                          </div>
                          <div>
                            <span class="text-sm text-gray-900">{{ currentEvent.localCrew.union }}</span>
                          </div>
                        </template>

                        <template v-if="currentEvent.localCrew.minimumIn !== undefined">
                          <div class="text-right">
                            <span class="text-sm text-gray-600 font-medium">MINIMUM IN</span>
                          </div>
                          <div>
                            <span class="text-sm text-gray-900">{{ currentEvent.localCrew.minimumIn }} crew</span>
                          </div>
                        </template>

                        <template v-if="currentEvent.localCrew.minimumOut !== undefined">
                          <div class="text-right">
                            <span class="text-sm text-gray-600 font-medium">MINIMUM OUT</span>
                          </div>
                          <div>
                            <span class="text-sm text-gray-900">{{ currentEvent.localCrew.minimumOut }} crew</span>
                          </div>
                        </template>

                        <template v-if="currentEvent.localCrew.penalties">
                          <div class="text-right">
                            <span class="text-sm text-gray-600 font-medium">PENALTIES</span>
                          </div>
                          <div>
                            <span class="text-sm text-gray-900 whitespace-pre-wrap">{{ currentEvent.localCrew.penalties }}</span>
                          </div>
                        </template>

                        <template v-if="currentEvent.localCrew.notes">
                          <div class="text-right">
                            <span class="text-sm text-gray-600 font-medium">NOTES</span>
                          </div>
                          <div>
                            <span class="text-sm text-gray-900 whitespace-pre-wrap">{{ currentEvent.localCrew.notes }}</span>
                          </div>
                        </template>
                      </div>
                      <div v-else class="text-sm text-gray-500">
                        No local crew information available.
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <!-- Labor Call Accordion -->
                  <AccordionItem value="labor-call" class="border border-gray-200/80 bg-white rounded-lg mb-4 px-6 shadow-sm hover:shadow-md transition-shadow data-[state=open]:shadow-md data-[state=open]:pb-6 data-[state=open]:border-gray-300">
                    <AccordionTrigger class="py-5 text-base font-semibold text-gray-900 hover:no-underline">
                      Labor Call
                    </AccordionTrigger>
                    <AccordionContent class="pt-4">
                      <div v-if="currentEvent.laborCall" class="space-y-6">
                        <!-- Labor Call Table -->
                        <div class="overflow-x-auto">
                          <table class="w-full text-sm">
                            <thead>
                              <tr class="border-b-2 border-gray-200">
                                <th class="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Time</th>
                                <th class="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Call</th>
                                <th class="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                                <th class="text-center py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Count</th>
                                <th class="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Notes</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="(entry, index) in currentEvent.laborCall.entries" :key="index" class="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                                <td class="py-3 px-3 text-gray-900 font-medium tabular-nums">{{ entry.time }}</td>
                                <td class="py-3 px-3 text-gray-900 font-medium">{{ entry.call }}</td>
                                <td class="py-3 px-3 text-gray-700">{{ entry.type }}</td>
                                <td class="py-3 px-3 text-center text-gray-900 font-medium tabular-nums">{{ entry.count || '-' }}</td>
                                <td class="py-3 px-3 text-gray-600 text-sm">{{ entry.notes || '-' }}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <!-- Labor Call Summary -->
                        <div class="pt-6 border-t border-gray-200 space-y-3">
                          <div class="grid gap-y-2" style="grid-template-columns: auto 1fr; column-gap: 2rem; align-items: baseline;">
                            <div class="text-right">
                              <span class="text-sm text-gray-600 font-medium">CURRENCY</span>
                            </div>
                            <div>
                              <span class="text-sm text-gray-900 font-medium">{{ currentEvent.laborCall.currency }}</span>
                            </div>

                            <template v-if="currentEvent.laborCall.totalCost">
                              <div class="text-right">
                                <span class="text-sm text-gray-600 font-medium">TOTAL COST</span>
                              </div>
                              <div>
                                <span class="text-lg font-bold text-gray-900">{{ currentEvent.laborCall.currency }} ${{ currentEvent.laborCall.totalCost.toLocaleString() }}</span>
                              </div>
                            </template>
                          </div>

                          <div v-if="currentEvent.laborCall.notes" class="pt-4 border-t border-gray-100">
                            <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Additional Notes</span>
                            <p class="text-sm text-gray-900 mt-2 whitespace-pre-wrap">{{ currentEvent.laborCall.notes }}</p>
                          </div>
                        </div>
                      </div>
                      <div v-else class="text-sm text-gray-500">
                        No labor call information available.
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
