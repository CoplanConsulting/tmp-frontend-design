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
          <header class="flex h-16 items-center gap-4 border-b border-gray-200 bg-white px-6">
            <div class="flex items-center gap-3">
              <div class="flex flex-col items-center justify-center w-[52px] h-[52px] rounded-md border border-gray-300 bg-white flex-shrink-0">
                <span class="text-xs font-semibold text-gray-900 leading-none">{{ headerDate.dayOfWeek }}</span>
                <span class="text-xs text-gray-600 leading-none mt-1">{{ headerDate.dateShort }}</span>
              </div>
              <div>
                <h1 class="text-xl font-semibold text-gray-900">
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
                <!-- Venue Card -->
                <Card class="border border-gray-200 bg-white">
                  <CardHeader class="pb-3">
                    <div class="flex items-center justify-between">
                      <CardTitle class="text-sm font-medium text-gray-600">Venue</CardTitle>
                      <MapPin class="h-4 w-4 text-gray-600" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ currentEvent.venue?.name ?? 'TBD' }}</h3>
                    <p v-if="currentEvent.venue?.address" class="text-sm text-gray-600">{{ currentEvent.venue.address }}</p>
                    <p v-if="currentEvent.venue?.city" class="text-sm text-gray-600">{{ currentEvent.venue.city }}, {{ currentEvent.venue.state }} {{ currentEvent.venue.postalCode }}</p>
                    <p v-if="currentEvent.venue?.phone" class="text-sm text-gray-600 mt-2">{{ currentEvent.venue.phone }}</p>
                  </CardContent>
                </Card>

                <!-- Promoter Card -->
                <Card class="border border-gray-200 bg-white">
                  <CardHeader class="pb-3">
                    <div class="flex items-center justify-between">
                      <CardTitle class="text-sm font-medium text-gray-600">Promoter</CardTitle>
                      <Users class="h-4 w-4 text-gray-600" />
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

                <!-- Hotel Card -->
                <Card class="border border-gray-200 bg-white">
                  <CardHeader class="pb-3">
                    <div class="flex items-center justify-between">
                      <CardTitle class="text-sm font-medium text-gray-600">Hotel</CardTitle>
                      <Hotel class="h-4 w-4 text-gray-600" />
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

                <!-- Day of Show Contact Card -->
                <Card class="border border-gray-200 bg-white">
                  <CardHeader class="pb-3">
                    <div class="flex items-center justify-between">
                      <CardTitle class="text-sm font-medium text-gray-600">Day of Show Contact</CardTitle>
                      <Contact class="h-4 w-4 text-gray-600" />
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
              </div>

              <!-- Tabs -->
              <Tabs v-model="activeTab" class="w-full">
                <TabsList class="mb-6">
                  <TabsTrigger v-for="tab in tabs" :key="tab" :value="tab">
                    {{ tab }}
                  </TabsTrigger>
                </TabsList>

                <!-- Schedule Tab -->
                <TabsContent value="Schedule">
                  <div class="text-center py-12 text-gray-500">
                    Schedule information will be displayed here.
                  </div>
                </TabsContent>

                <!-- Placeholder Tabs -->
                <TabsContent value="Facilities">
                  <div class="text-center py-12 text-gray-500">
                    Facilities information will be displayed here.
                  </div>
                </TabsContent>

                <TabsContent value="Production">
                  <div class="space-y-8">
                    <!-- Venue Technical Info -->
                    <div v-if="currentEvent.venue">
                      <h2 class="text-xl font-semibold text-gray-900 mb-4">Venue Technical Information</h2>
                      <div class="space-y-3">
                        <div v-if="currentEvent.venue.stageDimensions" class="flex">
                          <div class="w-48 text-sm text-gray-600 text-right pr-6">STAGE DIMENSIONS</div>
                          <div class="flex-1 text-sm font-medium text-gray-900">{{ currentEvent.venue.stageDimensions }}</div>
                        </div>
                        <div v-if="currentEvent.venue.capacity" class="flex">
                          <div class="w-48 text-sm text-gray-600 text-right pr-6">CAPACITY</div>
                          <div class="flex-1 text-sm font-medium text-gray-900">{{ currentEvent.venue.capacity }}</div>
                        </div>
                        <div v-if="currentEvent.venue.loadInInfo" class="flex">
                          <div class="w-48 text-sm text-gray-600 text-right pr-6">LOAD IN INFO</div>
                          <div class="flex-1 text-sm font-medium text-gray-900 whitespace-pre-wrap">{{ currentEvent.venue.loadInInfo }}</div>
                        </div>
                        <div v-if="currentEvent.venue.powerInfo" class="flex">
                          <div class="w-48 text-sm text-gray-600 text-right pr-6">POWER</div>
                          <div class="flex-1 text-sm font-medium text-gray-900">{{ currentEvent.venue.powerInfo }}</div>
                        </div>
                        <div v-if="currentEvent.venue.dressingRoomInfo" class="flex">
                          <div class="w-48 text-sm text-gray-600 text-right pr-6">DRESSING ROOMS</div>
                          <div class="flex-1 text-sm font-medium text-gray-900 whitespace-pre-wrap">{{ currentEvent.venue.dressingRoomInfo }}</div>
                        </div>
                        <div v-if="currentEvent.venue.greenRoomInfo" class="flex">
                          <div class="w-48 text-sm text-gray-600 text-right pr-6">GREEN ROOM</div>
                          <div class="flex-1 text-sm font-medium text-gray-900 whitespace-pre-wrap">{{ currentEvent.venue.greenRoomInfo }}</div>
                        </div>
                      </div>
                    </div>

                    <!-- Event Production Details -->
                    <div v-if="currentEvent.loadInDetails || currentEvent.soundDetails || currentEvent.lightDetails || currentEvent.securityDetails">
                      <h2 class="text-xl font-semibold text-gray-900 mb-4">Event Production Details</h2>
                      <div class="space-y-3">
                        <div v-if="currentEvent.loadInDetails" class="flex">
                          <div class="w-48 text-sm text-gray-600 text-right pr-6">LOAD IN</div>
                          <div class="flex-1 text-sm font-medium text-gray-900 whitespace-pre-wrap">{{ currentEvent.loadInDetails }}</div>
                        </div>
                        <div v-if="currentEvent.soundDetails" class="flex">
                          <div class="w-48 text-sm text-gray-600 text-right pr-6">SOUND</div>
                          <div class="flex-1 text-sm font-medium text-gray-900 whitespace-pre-wrap">{{ currentEvent.soundDetails }}</div>
                        </div>
                        <div v-if="currentEvent.lightDetails" class="flex">
                          <div class="w-48 text-sm text-gray-600 text-right pr-6">LIGHTING</div>
                          <div class="flex-1 text-sm font-medium text-gray-900 whitespace-pre-wrap">{{ currentEvent.lightDetails }}</div>
                        </div>
                        <div v-if="currentEvent.securityDetails" class="flex">
                          <div class="w-48 text-sm text-gray-600 text-right pr-6">SECURITY</div>
                          <div class="flex-1 text-sm font-medium text-gray-900 whitespace-pre-wrap">{{ currentEvent.securityDetails }}</div>
                        </div>
                        <div v-if="currentEvent.cateringDetails" class="flex">
                          <div class="w-48 text-sm text-gray-600 text-right pr-6">CATERING</div>
                          <div class="flex-1 text-sm font-medium text-gray-900 whitespace-pre-wrap">{{ currentEvent.cateringDetails }}</div>
                        </div>
                        <div v-if="currentEvent.meetAndGreet" class="flex">
                          <div class="w-48 text-sm text-gray-600 text-right pr-6">MEET & GREET</div>
                          <div class="flex-1 text-sm font-medium text-gray-900 whitespace-pre-wrap">{{ currentEvent.meetAndGreet }}</div>
                        </div>
                      </div>
                    </div>

                    <!-- Schedule -->
                    <div v-if="currentEvent.loadIn || currentEvent.soundCheck || currentEvent.doors || currentEvent.showTime || currentEvent.curfew">
                      <h2 class="text-xl font-semibold text-gray-900 mb-4">Show Schedule</h2>
                      <div class="space-y-3">
                        <div v-if="currentEvent.loadIn" class="flex">
                          <div class="w-48 text-sm text-gray-600 text-right pr-6">LOAD IN</div>
                          <div class="flex-1 text-sm font-medium text-gray-900">{{ currentEvent.loadIn }}</div>
                        </div>
                        <div v-if="currentEvent.soundCheck" class="flex">
                          <div class="w-48 text-sm text-gray-600 text-right pr-6">SOUND CHECK</div>
                          <div class="flex-1 text-sm font-medium text-gray-900">{{ currentEvent.soundCheck }}</div>
                        </div>
                        <div v-if="currentEvent.doors" class="flex">
                          <div class="w-48 text-sm text-gray-600 text-right pr-6">DOORS</div>
                          <div class="flex-1 text-sm font-medium text-gray-900">{{ currentEvent.doors }}</div>
                        </div>
                        <div v-if="currentEvent.showTime" class="flex">
                          <div class="w-48 text-sm text-gray-600 text-right pr-6">SHOW TIME</div>
                          <div class="flex-1 text-sm font-medium text-gray-900">{{ currentEvent.showTime }}</div>
                        </div>
                        <div v-if="currentEvent.curfew" class="flex">
                          <div class="w-48 text-sm text-gray-600 text-right pr-6">CURFEW</div>
                          <div class="flex-1 text-sm font-medium text-gray-900">{{ currentEvent.curfew }}</div>
                        </div>
                        <div v-if="currentEvent.setLength" class="flex">
                          <div class="w-48 text-sm text-gray-600 text-right pr-6">SET LENGTH</div>
                          <div class="flex-1 text-sm font-medium text-gray-900">{{ currentEvent.setLength }} minutes</div>
                        </div>
                      </div>
                    </div>

                    <!-- Meals -->
                    <div v-if="currentEvent.lunch || currentEvent.dinner">
                      <h2 class="text-xl font-semibold text-gray-900 mb-4">Meals</h2>
                      <div class="space-y-3">
                        <div v-if="currentEvent.lunch" class="flex">
                          <div class="w-48 text-sm text-gray-600 text-right pr-6">LUNCH</div>
                          <div class="flex-1 text-sm font-medium text-gray-900">
                            {{ currentEvent.lunch }}
                            <span v-if="currentEvent.lunchCount" class="text-gray-600 ml-2">({{ currentEvent.lunchCount }} people)</span>
                          </div>
                        </div>
                        <div v-if="currentEvent.dinner" class="flex">
                          <div class="w-48 text-sm text-gray-600 text-right pr-6">DINNER</div>
                          <div class="flex-1 text-sm font-medium text-gray-900">
                            {{ currentEvent.dinner }}
                            <span v-if="currentEvent.dinnerCount" class="text-gray-600 ml-2">({{ currentEvent.dinnerCount }} people)</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Notes -->
                    <div v-if="currentEvent.notes">
                      <h2 class="text-xl font-semibold text-gray-900 mb-4">Notes</h2>
                      <div class="text-sm font-medium text-gray-900 whitespace-pre-wrap">{{ currentEvent.notes }}</div>
                    </div>

                    <!-- Empty State -->
                    <div v-if="!currentEvent.venue && !currentEvent.loadInDetails && !currentEvent.soundDetails && !currentEvent.loadIn && !currentEvent.lunch && !currentEvent.notes" class="text-center py-12 text-gray-500">
                      No production information available for this event.
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="Equipment">
                  <div class="text-center py-12 text-gray-500">
                    Equipment information will be displayed here.
                  </div>
                </TabsContent>

                <TabsContent value="Logistics">
                  <div class="text-center py-12 text-gray-500">
                    Logistics information will be displayed here.
                  </div>
                </TabsContent>

                <TabsContent value="Labor Call">
                  <div class="text-center py-12 text-gray-500">
                    Labor Call information will be displayed here.
                  </div>
                </TabsContent>

                <TabsContent value="Local Crew">
                  <div class="text-center py-12 text-gray-500">
                    Local Crew information will be displayed here.
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            <div v-else class="text-center py-12 text-gray-500">
              Event not found.
            </div>
          </main>
        </div>
  </div>
</template>
