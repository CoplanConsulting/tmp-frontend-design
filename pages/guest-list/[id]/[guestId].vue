<script setup lang="ts">
import {
  Calendar,
  Edit,
  Printer,
  Trash2
} from 'lucide-vue-next'
import { guestList, eventListItems } from '~/utils/mockGuestList'

definePageMeta({
  layout: 'default'
})

const route = useRoute()

// Find the guest by ID - reactive to route changes
const guest = computed(() => guestList.find(g => g.id === route.params.guestId))

// Find the active event
const activeEvent = computed(() => eventListItems.find(e => e.active))

const getStatusClass = (status: string) => {
  const classes = {
    'approved': 'bg-green-100 text-green-800 border-green-200',
    'pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'declined': 'bg-red-100 text-red-800 border-red-200'
  }
  return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-800 border-gray-200'
}

const getStatusText = (status: string) => {
  return status.charAt(0).toUpperCase() + status.slice(1)
}
</script>

<template>
  <div class="flex flex-1 flex-col gap-0">
    <!-- Event List Column -->
    <Sidebar collapsible="none" variant="sidebar" side="left" class="border-r border-gray-200 bg-white">
      <SidebarHeader class="border-b border-gray-200 px-4 py-3">
        <div class="flex items-center gap-2">
          <Button variant="outline" size="sm" class="text-xs">
            <Calendar class="h-3 w-3 mr-1" />
            Today
          </Button>
          <Button variant="outline" size="sm" class="text-xs">
            <MapPin class="h-3 w-3 mr-1" />
            Go To
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent class="px-2">
        <div class="space-y-1 py-2">
          <button
            v-for="event in eventListItems"
            :key="event.id"
            :class="[
              'w-full flex items-center gap-3 px-3 py-3 rounded-md text-left transition-colors',
              event.active ? 'bg-gray-100' : 'hover:bg-gray-50'
            ]"
          >
            <div class="flex-shrink-0 flex flex-col items-center justify-center w-12 h-12 border border-gray-200 rounded-md bg-white">
              <span class="text-[10px] font-semibold text-gray-600 uppercase">{{ event.day }}</span>
              <span class="text-xs font-bold text-gray-900">{{ event.date }}</span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-bold text-gray-900 truncate">{{ event.location }}</p>
              <p class="text-xs text-gray-600 truncate">{{ event.venue }}</p>
            </div>
          </button>
        </div>
      </SidebarContent>
    </Sidebar>

    <!-- Main Content -->
    <div v-if="guest" class="flex flex-1 flex-col gap-6 p-6 bg-gray-50">
        <!-- Page Header -->
        <div class="flex items-start justify-between">
          <div class="flex items-center gap-3">
            <Badge v-if="activeEvent" class="bg-black text-white font-bold text-xs px-3 py-1.5 hover:bg-black">
              {{ activeEvent.day }} {{ activeEvent.date.replace('/', '/') }}
            </Badge>
            <div>
              <h1 v-if="activeEvent" class="text-2xl font-bold text-gray-900">{{ activeEvent.location }}</h1>
              <p v-if="activeEvent" class="text-sm text-gray-600 mt-0.5">{{ activeEvent.venue }}</p>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <Button variant="outline" class="text-gray-900" as-child>
              <a href="/days/day">Event Details</a>
            </Button>
            <Button class="bg-black text-white hover:bg-gray-800" as-child>
              <a href="/events/add">Edit Event</a>
            </Button>
          </div>
        </div>

        <!-- Guest Details Card -->
        <Card class="border border-gray-200 bg-white">
          <CardContent class="p-6">
            <!-- Guest Name and Status -->
            <div class="flex items-center justify-between mb-6">
              <div>
                <div class="flex items-baseline gap-3">
                  <h2 class="text-2xl font-bold text-gray-900">{{ guest.name }}</h2>
                  <Badge
                    :class="getStatusClass(guest.status)"
                    class="font-semibold border"
                  >
                    {{ getStatusText(guest.status) }}
                  </Badge>
                </div>
                <p class="text-sm text-gray-600 mt-1">{{ guest.tickets }} tickets • {{ guest.passes }} VIP</p>
              </div>
            </div>

            <!-- Two-Column Grid Layout -->
            <div class="grid grid-cols-2 gap-8">
              <!-- Left Column -->
              <div class="space-y-6">
                <!-- Contact Information -->
                <div>
                  <h3 class="text-sm font-semibold text-gray-900 mb-3">Contact Information</h3>
                  <div class="space-y-3">
                    <div>
                      <p class="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">NAME</p>
                      <p class="text-base font-bold text-gray-900">{{ guest.name }}</p>
                    </div>
                    <div>
                      <p class="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">EMAIL</p>
                      <p class="text-base font-bold text-gray-900">{{ guest.email }}</p>
                    </div>
                    <div>
                      <p class="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">PHONE</p>
                      <p class="text-base font-bold text-gray-900">{{ guest.phone }}</p>
                    </div>
                  </div>
                </div>

                <!-- Ticket Details -->
                <div>
                  <h3 class="text-sm font-semibold text-gray-900 mb-3">Ticket Details</h3>
                  <div class="space-y-3">
                    <div>
                      <p class="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">NUMBER OF TICKETS</p>
                      <p class="text-base font-bold text-gray-900">{{ guest.tickets }}</p>
                    </div>
                    <div>
                      <p class="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">NUMBER OF PASSES</p>
                      <p class="text-base font-bold text-gray-900">{{ guest.passes }}</p>
                    </div>
                    <div>
                      <p class="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">PASS TYPE</p>
                      <p class="text-base font-bold text-gray-900">{{ guest.type }}</p>
                    </div>
                  </div>
                </div>

                <!-- Seating Information -->
                <div v-if="guest.seating">
                  <h3 class="text-sm font-semibold text-gray-900 mb-3">Seating Information</h3>
                  <div class="space-y-3">
                    <div>
                      <p class="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">SECTION</p>
                      <p class="text-base font-bold text-gray-900">{{ guest.seating.section }}</p>
                    </div>
                    <div>
                      <p class="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">ROW</p>
                      <p class="text-base font-bold text-gray-900">{{ guest.seating.row }}</p>
                    </div>
                    <div>
                      <p class="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">SEAT(S)</p>
                      <p class="text-base font-bold text-gray-900">{{ guest.seating.seats }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right Column -->
              <div class="space-y-6">
                <!-- Request Information -->
                <div>
                  <h3 class="text-sm font-semibold text-gray-900 mb-3">Request Information</h3>
                  <div class="space-y-3">
                    <div>
                      <p class="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">AFFILIATION</p>
                      <p class="text-base font-bold text-gray-900">{{ guest.affiliation }}</p>
                    </div>
                    <div>
                      <p class="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">REQUESTOR</p>
                      <p class="text-base font-bold text-gray-900">{{ guest.requestor }}</p>
                    </div>
                    <div>
                      <p class="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">REQUEST DATE</p>
                      <p class="text-base font-bold text-gray-900">{{ guest.requestDate }}</p>
                    </div>
                  </div>
                </div>

                <!-- Approval Information -->
                <div>
                  <h3 class="text-sm font-semibold text-gray-900 mb-3">Approval Information</h3>
                  <div class="space-y-3">
                    <div>
                      <p class="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">STATUS</p>
                      <Badge
                        :class="getStatusClass(guest.status)"
                        class="font-semibold border"
                      >
                        {{ getStatusText(guest.status) }}
                      </Badge>
                    </div>
                    <div v-if="guest.approvedBy">
                      <p class="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">APPROVED BY</p>
                      <p class="text-base font-bold text-gray-900">{{ guest.approvedBy }}</p>
                    </div>
                    <div v-if="guest.approvalDate">
                      <p class="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">APPROVAL DATE</p>
                      <p class="text-base font-bold text-gray-900">{{ guest.approvalDate }}</p>
                    </div>
                  </div>
                </div>

                <!-- Notes -->
                <div v-if="guest.notes">
                  <h3 class="text-sm font-semibold text-gray-900 mb-3">Notes</h3>
                  <p class="text-sm text-gray-700 leading-relaxed">{{ guest.notes }}</p>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center gap-3 mt-6 pt-6 border-t border-gray-200">
              <Button variant="outline" class="gap-2">
                <Edit class="h-4 w-4" />
                Edit
              </Button>
              <Button variant="outline" class="gap-2">
                <Printer class="h-4 w-4" />
                Print Label
              </Button>
              <Button v-if="guest.status === 'approved'" variant="outline" class="gap-2 text-orange-600 border-orange-600 hover:bg-orange-50">
                Revoke Approval
              </Button>
            </div>

            <!-- Bottom Actions -->
            <div class="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
              <Button
                variant="outline"
                as-child
              >
                <a :href="`/guest-list/${route.params.id}`">
                  Back to Guest List
                </a>
              </Button>
              <Button variant="destructive" class="gap-2">
                <Trash2 class="h-4 w-4" />
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
    </div>

    <div v-else class="flex flex-1 flex-col items-center justify-center p-6 bg-gray-50">
      <p class="text-gray-600">Guest not found</p>
    </div>
  </div>
</template>
