<script setup lang="ts">
import { Plus, Phone, Calendar } from 'lucide-vue-next'
import { guestList, ticketAllocations, eventListItems } from '~/utils/mockGuestList'

definePageMeta({
  layout: 'default'
})

const route = useRoute()
const eventId = route.params.id

const activeTab = ref('all')
</script>

<template>
  <div class="flex flex-1 gap-0 bg-gray-50 h-[calc(100vh-6rem)] -m-4">
    <!-- Event List Column -->
    <div class="w-[300px] border-r border-gray-200 bg-white overflow-y-auto">
      <Sidebar collapsible="none" variant="sidebar" side="left" class="border-none bg-transparent">
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
    </div>

    <!-- Main Content -->
    <div class="flex-1 overflow-y-auto bg-gray-50">
      <div class="p-8">
        <div class="flex flex-col gap-6">
        <!-- Page Header -->
        <div class="flex items-start justify-between">
          <div class="flex items-center gap-3">
            <Badge class="bg-black text-white font-bold text-xs px-3 py-1.5 hover:bg-black">
              SAT 10/18
            </Badge>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Truro NS</h1>
              <p class="text-sm text-gray-600 mt-0.5">Rath Eastlink Community Centre</p>
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

        <!-- Venue and Ticket Allocations Grid -->
        <div class="grid grid-cols-2 gap-6">
          <!-- Venue Card -->
          <Card class="border border-gray-200 bg-white">
            <CardHeader class="pb-3">
              <div class="flex items-center gap-2">
                <MapPin class="h-5 w-5 text-gray-600" />
                <CardTitle class="text-base font-bold text-gray-900">Venue</CardTitle>
              </div>
            </CardHeader>
            <CardContent class="space-y-2">
              <div>
                <p class="text-base font-bold text-gray-900">Rath Eastlink Community Centre</p>
                <p class="text-sm text-gray-600 mt-1">
                  275 Abenaki Rd,<br />
                  Truro, NS B2N 0G6,
                </p>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <Phone class="h-4 w-4" />
                <span>(902) 893-2224</span>
              </div>
            </CardContent>
          </Card>

          <!-- Ticket Allocations Card -->
          <GuestListTicketAllocations :allocations="ticketAllocations" />
        </div>

        <!-- Guest List Section -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-lg font-bold text-gray-900">Guest List</h2>
              <p class="text-sm text-gray-600 mt-0.5">Manage guest list entries for this show</p>
            </div>
            <Button class="bg-black text-white hover:bg-gray-800 gap-2" as-child>
              <a :href="`/guest-list/${eventId}/new`">
                <Plus class="h-4 w-4" />
                Add Guest
              </a>
            </Button>
          </div>

          <!-- Tabs -->
          <Tabs v-model="activeTab" default-value="all">
            <TabsList class="bg-white border border-gray-200">
              <TabsTrigger value="all">All Guests</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="declined">Declined</TabsTrigger>
            </TabsList>

            <TabsContent value="all" class="mt-4">
              <GuestListGuestTable :guests="guestList" />
            </TabsContent>

            <TabsContent value="pending" class="mt-4">
              <GuestListGuestTable :guests="guestList.filter(g => g.status === 'pending')" />
            </TabsContent>

            <TabsContent value="approved" class="mt-4">
              <GuestListGuestTable :guests="guestList.filter(g => g.status === 'approved')" />
            </TabsContent>

            <TabsContent value="declined" class="mt-4">
              <GuestListGuestTable :guests="guestList.filter(g => g.status === 'declined')" />
            </TabsContent>
          </Tabs>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>
