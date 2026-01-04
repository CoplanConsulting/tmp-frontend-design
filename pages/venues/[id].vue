<script setup lang="ts">
import {
  FileText,
  MapPin,
  Plus,
  Phone,
  Globe,
  Ruler,
  DoorOpen,
  Wifi,
  ParkingSquare,
  FileEdit,
  Building2
} from 'lucide-vue-next'
import { venues, getVenueById } from '@/utils/mockData'
import type { Venue } from '@/utils/mockData'

definePageMeta({
  layout: 'default'
})

const route = useRoute()
const router = useRouter()
const venueId = computed(() => route.params.id as string)

// Find selected venue or default to first venue
const selectedVenue = computed(() => {
  const venue = getVenueById(venueId.value)
  return venue || venues[0]
})

// Navigate to venue
const selectVenue = (id: string) => {
  router.push(`/venues/${id}`)
}
</script>

<template>
  <div class="flex flex-1 gap-0 bg-gray-50 h-[calc(100vh-6rem)] -m-4">
    <!-- Venue List Column -->
    <div class="w-[var(--sidebar-width)] border-r border-gray-200 bg-white overflow-y-auto">
      <Sidebar collapsible="none" variant="sidebar" side="left" class="border-none bg-transparent">
      <SidebarHeader class="border-b border-gray-200 px-4 py-3">
        <div class="flex items-center justify-between">
          <h3 class="font-bold text-sm text-gray-900">All Venues</h3>
          <Badge variant="secondary" class="text-xs">{{ venues.length }}</Badge>
        </div>
      </SidebarHeader>

      <SidebarContent class="px-2">
        <div class="space-y-1 py-2">
          <button
            v-for="venue in venues"
            :key="venue.id"
            @click="selectVenue(venue.id)"
            :class="[
              'w-full flex items-center gap-3 px-3 py-3 rounded-md text-left transition-colors',
              venue.id === selectedVenue.id ? 'bg-gray-100' : 'hover:bg-gray-50'
            ]"
          >
            <div class="flex-shrink-0 flex items-center justify-center w-10 h-10 border border-gray-200 rounded-md bg-white">
              <Building2 class="h-5 w-5 text-gray-600" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-bold text-gray-900 truncate">{{ venue.name }}</p>
              <p class="text-xs text-gray-600 truncate">{{ venue.city }}, {{ venue.state }}</p>
            </div>
          </button>
        </div>
      </SidebarContent>
      </Sidebar>
    </div>

    <!-- Main Content - Venue Detail -->
    <div class="flex-1 overflow-y-auto bg-gray-50">
      <div class="p-8">
        <div class="flex flex-col gap-6">
        <!-- Page Header -->
        <div class="flex items-start justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">{{ selectedVenue.name }}</h1>
            <div class="flex items-center gap-4 mt-2 text-sm text-gray-600">
              <div class="flex items-center gap-2">
                <Phone class="h-4 w-4" />
                <span>{{ selectedVenue.phone }}</span>
              </div>
              <div class="flex items-center gap-2">
                <Globe class="h-4 w-4" />
                <a :href="selectedVenue.website" target="_blank" class="text-blue-600 hover:underline">
                  Website
                </a>
              </div>
              <Badge variant="secondary" class="text-xs font-semibold">
                Capacity: {{ selectedVenue.capacity }}
              </Badge>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <Button variant="outline" class="text-gray-900">
              <FileEdit class="h-4 w-4 mr-2" />
              Edit Venue
            </Button>
            <Button class="bg-black text-white hover:bg-gray-800">
              <Plus class="h-4 w-4 mr-2" />
              Add Venue
            </Button>
          </div>
        </div>

        <!-- Venue Information Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Basic Information -->
          <Card class="border border-gray-200 bg-white">
            <CardHeader class="pb-3">
              <div class="flex items-center gap-2">
                <MapPin class="h-5 w-5 text-gray-600" />
                <CardTitle class="text-base font-bold text-gray-900">Location & Contact</CardTitle>
              </div>
            </CardHeader>
            <CardContent class="space-y-3">
              <div>
                <p class="text-xs font-semibold text-gray-500 uppercase">Address</p>
                <p class="text-sm text-gray-900 mt-1">
                  {{ selectedVenue.address }}<br />
                  {{ selectedVenue.city }}, {{ selectedVenue.state }} {{ selectedVenue.postalCode }}
                </p>
              </div>
              <Separator class="bg-slate-200" />
              <div>
                <p class="text-xs font-semibold text-gray-500 uppercase">Contact Name</p>
                <p class="text-sm text-gray-900 mt-1">{{ selectedVenue.venueContactName }}</p>
              </div>
              <Separator class="bg-slate-200" />
              <div>
                <p class="text-xs font-semibold text-gray-500 uppercase">Production Contact</p>
                <p class="text-sm text-gray-900 mt-1">{{ selectedVenue.productionContactName }}</p>
              </div>
            </CardContent>
          </Card>

          <!-- Technical Specs -->
          <Card class="border border-gray-200 bg-white">
            <CardHeader class="pb-3">
              <div class="flex items-center gap-2">
                <Ruler class="h-5 w-5 text-gray-600" />
                <CardTitle class="text-base font-bold text-gray-900">Technical Specs</CardTitle>
              </div>
            </CardHeader>
            <CardContent class="space-y-3">
              <div>
                <p class="text-xs font-semibold text-gray-500 uppercase">Stage Dimensions</p>
                <p class="text-sm text-gray-900 mt-1">{{ selectedVenue.stageDimensions }}</p>
              </div>
              <Separator class="bg-slate-200" />
              <div>
                <p class="text-xs font-semibold text-gray-500 uppercase">Load In Info</p>
                <p class="text-sm text-gray-900 mt-1">{{ selectedVenue.loadInInfo }}</p>
              </div>
              <Separator class="bg-slate-200" />
              <div>
                <p class="text-xs font-semibold text-gray-500 uppercase">Power Info</p>
                <p class="text-sm text-gray-900 mt-1">{{ selectedVenue.powerInfo }}</p>
              </div>
            </CardContent>
          </Card>

          <!-- Logistics & Amenities -->
          <Card class="border border-gray-200 bg-white">
            <CardHeader class="pb-3">
              <div class="flex items-center gap-2">
                <DoorOpen class="h-5 w-5 text-gray-600" />
                <CardTitle class="text-base font-bold text-gray-900">Logistics & Amenities</CardTitle>
              </div>
            </CardHeader>
            <CardContent class="space-y-3">
              <div>
                <p class="text-xs font-semibold text-gray-500 uppercase">Dressing Rooms</p>
                <p class="text-sm text-gray-900 mt-1">{{ selectedVenue.dressingRoomInfo }}</p>
              </div>
              <Separator class="bg-slate-200" />
              <div>
                <p class="text-xs font-semibold text-gray-500 uppercase">Laundry Facilities</p>
                <p class="text-sm text-gray-900 mt-1">{{ selectedVenue.laundryInfo }}</p>
              </div>
              <Separator class="bg-slate-200" />
              <div>
                <p class="text-xs font-semibold text-gray-500 uppercase">Runner Info</p>
                <p class="text-sm text-gray-900 mt-1">{{ selectedVenue.runnerInfo }}</p>
              </div>
            </CardContent>
          </Card>

          <!-- Hospitality & WiFi -->
          <Card class="border border-gray-200 bg-white">
            <CardHeader class="pb-3">
              <div class="flex items-center gap-2">
                <Wifi class="h-5 w-5 text-gray-600" />
                <CardTitle class="text-base font-bold text-gray-900">Hospitality & Admin</CardTitle>
              </div>
            </CardHeader>
            <CardContent class="space-y-3">
              <div>
                <p class="text-xs font-semibold text-gray-500 uppercase">WiFi Information</p>
                <p class="text-sm text-gray-900 mt-1">{{ selectedVenue.wifiInfo }}</p>
              </div>
              <Separator class="bg-slate-200" />
              <div>
                <p class="text-xs font-semibold text-gray-500 uppercase">Merch Split</p>
                <p class="text-sm text-gray-900 mt-1">{{ selectedVenue.merchSplit }}</p>
              </div>
              <Separator class="bg-slate-200" />
              <div>
                <p class="text-xs font-semibold text-gray-500 uppercase">Merch Contact</p>
                <p class="text-sm text-gray-900 mt-1">{{ selectedVenue.merchContact }}</p>
              </div>
            </CardContent>
          </Card>

          <!-- Parking Information -->
          <Card class="border border-gray-200 bg-white lg:col-span-2">
            <CardHeader class="pb-3">
              <div class="flex items-center gap-2">
                <ParkingSquare class="h-5 w-5 text-gray-600" />
                <CardTitle class="text-base font-bold text-gray-900">Parking & Load-In</CardTitle>
              </div>
            </CardHeader>
            <CardContent class="space-y-3">
              <div class="grid grid-cols-2 gap-6">
                <div>
                  <p class="text-xs font-semibold text-gray-500 uppercase">Bus Parking</p>
                  <p class="text-sm text-gray-900 mt-1">{{ selectedVenue.busParking }}</p>
                </div>
                <div>
                  <p class="text-xs font-semibold text-gray-500 uppercase">Parking Instructions</p>
                  <p class="text-sm text-gray-900 mt-1">{{ selectedVenue.parkingInstructions }}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <!-- Additional Notes -->
          <Card class="border border-gray-200 bg-white lg:col-span-2" v-if="selectedVenue.notes">
            <CardHeader class="pb-3">
              <div class="flex items-center gap-2">
                <FileText class="h-5 w-5 text-gray-600" />
                <CardTitle class="text-base font-bold text-gray-900">Additional Notes</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-gray-900">{{ selectedVenue.notes }}</p>
            </CardContent>
          </Card>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>