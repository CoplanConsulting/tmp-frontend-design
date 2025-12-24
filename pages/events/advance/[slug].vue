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
import { getAllAdvanceDetails, getAdvanceDetailBySlug } from '~/utils/mockAdvanceDetails'

definePageMeta({
  layout: 'default'
})

const route = useRoute()
const slug = computed(() => route.params.slug as string)

// Get all events for timeline
const timelineEvents = getAllAdvanceDetails()

// Get current event details
const currentEvent = computed(() => getAdvanceDetailBySlug(slug.value))

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
                :to="`/events/advance/${event.slug}`"
                class="flex items-start gap-4 cursor-pointer hover:bg-gray-50 -mx-2 px-2 py-2 rounded-md transition-colors"
                :class="{ 'bg-gray-100': event.slug === slug }"
              >
                <div class="flex flex-col items-center justify-center w-[52px] h-[52px] rounded-md border border-gray-300 bg-white flex-shrink-0">
                  <span class="text-xs font-semibold text-gray-900 leading-none">{{ event.dayOfWeek }}</span>
                  <span class="text-xs text-gray-600 leading-none mt-1">{{ event.dateNumber }}</span>
                </div>
                <div class="flex-1 pt-1">
                  <h3 class="text-lg font-semibold text-gray-900 leading-tight">
                    {{ event.title }}
                  </h3>
                  <p class="text-sm text-gray-500 mt-1">
                    {{ event.subtitle }}
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
                <span class="text-xs font-semibold text-gray-900 leading-none">{{ currentEvent?.dayOfWeek }}</span>
                <span class="text-xs text-gray-600 leading-none mt-1">{{ currentEvent?.dateNumber }}</span>
              </div>
              <div>
                <h1 class="text-xl font-semibold text-gray-900">{{ currentEvent?.title }}</h1>
                <p class="text-sm text-gray-500">{{ currentEvent?.subtitle }}</p>
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
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ currentEvent.venue.name }}</h3>
                    <p class="text-sm text-gray-600">{{ currentEvent.venue.address }}</p>
                    <p class="text-sm text-gray-600">{{ currentEvent.venue.city }}</p>
                    <p class="text-sm text-gray-600 mt-2">{{ currentEvent.venue.phone }}</p>
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
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ currentEvent.promoter.name }}</h3>
                    <p class="text-sm text-gray-600 mb-3">{{ currentEvent.promoter.company }}</p>
                    <p class="text-sm text-gray-600">{{ currentEvent.promoter.phone }}</p>
                    <p class="text-sm text-gray-600">{{ currentEvent.promoter.email }}</p>
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
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ currentEvent.hotel.name }}</h3>
                    <p class="text-sm text-gray-600">{{ currentEvent.hotel.address }}</p>
                    <p class="text-sm text-gray-600">{{ currentEvent.hotel.city }}</p>
                    <p class="text-sm text-gray-600 mt-2">{{ currentEvent.hotel.phone }}</p>
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
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ currentEvent.dayOfShowContact.name }}</h3>
                    <p class="text-sm text-gray-600 mb-3">{{ currentEvent.dayOfShowContact.company }}</p>
                    <p class="text-sm text-gray-600">{{ currentEvent.dayOfShowContact.phone }}</p>
                    <p class="text-sm text-gray-600">{{ currentEvent.dayOfShowContact.email }}</p>
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
                  <div v-if="currentEvent.staging || currentEvent.loading || currentEvent.rigging" class="space-y-8">
                    <!-- Staging Section -->
                    <div v-if="currentEvent.staging">
                      <h2 class="text-xl font-semibold text-gray-900 mb-4">Staging</h2>
                      <div class="space-y-3">
                        <div v-if="currentEvent.staging.dimensions" class="flex">
                          <div class="w-48 text-sm text-gray-600 text-right pr-6">DIMENSIONS</div>
                          <div class="flex-1 text-sm font-medium text-gray-900">{{ currentEvent.staging.dimensions }}</div>
                        </div>
                        <div v-if="currentEvent.staging.stageWings" class="flex">
                          <div class="w-48 text-sm text-gray-600 text-right pr-6">STAGE WINGS</div>
                          <div class="flex-1 text-sm font-medium text-gray-900">{{ currentEvent.staging.stageWings }}</div>
                        </div>
                        <div v-if="currentEvent.staging.paBays" class="flex">
                          <div class="w-48 text-sm text-gray-600 text-right pr-6">PA BAYS</div>
                          <div class="flex-1 text-sm font-medium text-gray-900">{{ currentEvent.staging.paBays }}</div>
                        </div>
                        <div v-if="currentEvent.staging.orchestraPit" class="flex">
                          <div class="w-48 text-sm text-gray-600 text-right pr-6">ORCHESTRA PIT</div>
                          <div class="flex-1 text-sm font-medium text-gray-900">{{ currentEvent.staging.orchestraPit }}</div>
                        </div>
                        <div v-if="currentEvent.staging.curtain" class="flex">
                          <div class="w-48 text-sm text-gray-600 text-right pr-6">CURTAIN</div>
                          <div class="flex-1 text-sm font-medium text-gray-900">{{ currentEvent.staging.curtain }}</div>
                        </div>
                        <div v-if="currentEvent.staging.fireCurtain" class="flex">
                          <div class="w-48 text-sm text-gray-600 text-right pr-6">FIRE CURTAIN</div>
                          <div class="flex-1 text-sm font-medium text-gray-900">{{ currentEvent.staging.fireCurtain }}</div>
                        </div>
                        <div v-if="currentEvent.staging.steps" class="flex">
                          <div class="w-48 text-sm text-gray-600 text-right pr-6">STEPS</div>
                          <div class="flex-1 text-sm font-medium text-gray-900">{{ currentEvent.staging.steps }}</div>
                        </div>
                        <div v-if="currentEvent.staging.trimHeight" class="flex">
                          <div class="w-48 text-sm text-gray-600 text-right pr-6">TRIM HEIGHT</div>
                          <div class="flex-1 text-sm font-medium text-gray-900">{{ currentEvent.staging.trimHeight }}</div>
                        </div>
                        <div v-if="currentEvent.staging.apron" class="flex">
                          <div class="w-48 text-sm text-gray-600 text-right pr-6">APRON</div>
                          <div class="flex-1 text-sm font-medium text-gray-900">{{ currentEvent.staging.apron }}</div>
                        </div>
                        <div v-if="currentEvent.staging.deckToGrid" class="flex">
                          <div class="w-48 text-sm text-gray-600 text-right pr-6">DECK TO GRID</div>
                          <div class="flex-1 text-sm font-medium text-gray-900">{{ currentEvent.staging.deckToGrid }}</div>
                        </div>
                        <div v-if="currentEvent.staging.legs" class="flex">
                          <div class="w-48 text-sm text-gray-600 text-right pr-6">LEGS</div>
                          <div class="flex-1 text-sm font-medium text-gray-900">{{ currentEvent.staging.legs }}</div>
                        </div>
                        <div v-if="currentEvent.staging.risers" class="flex">
                          <div class="w-48 text-sm text-gray-600 text-right pr-6">RISERS</div>
                          <div class="flex-1 text-sm font-medium text-gray-900">{{ currentEvent.staging.risers }}</div>
                        </div>
                        <div v-if="currentEvent.staging.stage" class="flex">
                          <div class="w-48 text-sm text-gray-600 text-right pr-6">STAGE</div>
                          <div class="flex-1 text-sm font-medium text-gray-900">{{ currentEvent.staging.stage }}</div>
                        </div>
                        <div v-if="currentEvent.staging.borders" class="flex">
                          <div class="w-48 text-sm text-gray-600 text-right pr-6">BORDERS</div>
                          <div class="flex-1 text-sm font-medium text-gray-900">{{ currentEvent.staging.borders }}</div>
                        </div>
                      </div>
                    </div>

                    <!-- Loading Section -->
                    <div v-if="currentEvent.loading">
                      <h2 class="text-xl font-semibold text-gray-900 mb-4">Loading</h2>
                      <div class="space-y-3">
                        <div v-if="currentEvent.loading.access" class="flex">
                          <div class="w-48 text-sm text-gray-600 text-right pr-6">ACCESS</div>
                          <div class="flex-1 text-sm font-medium text-gray-900">{{ currentEvent.loading.access }}</div>
                        </div>
                        <div v-if="currentEvent.loading.dockType" class="flex">
                          <div class="w-48 text-sm text-gray-600 text-right pr-6">DOCK TYPE</div>
                          <div class="flex-1 text-sm font-medium text-gray-900">{{ currentEvent.loading.dockType }}</div>
                        </div>
                        <div v-if="currentEvent.loading.deadCase" class="flex">
                          <div class="w-48 text-sm text-gray-600 text-right pr-6">DEAD CASE</div>
                          <div class="flex-1 text-sm font-medium text-gray-900">{{ currentEvent.loading.deadCase }}</div>
                        </div>
                        <div v-if="currentEvent.loading.forklifts" class="flex">
                          <div class="w-48 text-sm text-gray-600 text-right pr-6">FORKLIFTS</div>
                          <div class="flex-1 text-sm font-medium text-gray-900">{{ currentEvent.loading.forklifts }}</div>
                        </div>
                        <div v-if="currentEvent.loading.loadComments && currentEvent.loading.loadComments.length > 0" class="flex">
                          <div class="w-48 text-sm text-gray-600 text-right pr-6">LOAD COMMENTS</div>
                          <div class="flex-1">
                            <ul class="list-disc list-inside space-y-1">
                              <li v-for="(comment, idx) in currentEvent.loading.loadComments" :key="idx" class="text-sm font-medium text-gray-900">
                                {{ comment }}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Rigging Section -->
                    <div v-if="currentEvent.rigging">
                      <h2 class="text-xl font-semibold text-gray-900 mb-4">Rigging</h2>
                      <div class="space-y-3">
                        <div v-if="currentEvent.rigging.flySystem" class="flex">
                          <div class="w-48 text-sm text-gray-600 text-right pr-6">FLY SYSTEM</div>
                          <div class="flex-1 text-sm font-medium text-gray-900">{{ currentEvent.rigging.flySystem }}</div>
                        </div>
                        <div v-if="currentEvent.rigging.lineSets" class="flex">
                          <div class="w-48 text-sm text-gray-600 text-right pr-6">LINE SETS</div>
                          <div class="flex-1 text-sm font-medium text-gray-900">{{ currentEvent.rigging.lineSets }}</div>
                        </div>
                        <div v-if="currentEvent.rigging.riggingComments && currentEvent.rigging.riggingComments.length > 0" class="flex">
                          <div class="w-48 text-sm text-gray-600 text-right pr-6">RIGGING COMMENTS</div>
                          <div class="flex-1">
                            <ul class="list-disc list-inside space-y-1">
                              <li v-for="(comment, idx) in currentEvent.rigging.riggingComments" :key="idx" class="text-sm font-medium text-gray-900">
                                {{ comment }}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-else class="text-center py-12 text-gray-500">
                    No production information available for this event.
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
