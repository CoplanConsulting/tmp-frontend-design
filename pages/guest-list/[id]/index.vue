<script setup lang="ts">
import { Plus, Phone, Calendar, MapPin } from 'lucide-vue-next'
import { 
  getGuestsByEventId, 
  getTicketAllocationSummary, 
  getEventListItems, 
  getEventWithDetails 
} from '~/utils/mockData'

definePageMeta({
  layout: 'default'
})

const route = useRoute()
const eventId = computed(() => route.params.id as string)

const activeTab = ref('all')

// Reactive event with full details
const event = computed(() => {
  const id = eventId.value
  return id ? getEventWithDetails(id) : undefined
})

// Guests for this event
const guests = computed(() => {
  const id = eventId.value
  return id ? getGuestsByEventId(id) : []
})

// Ticket allocation summary shaped exactly as GuestListTicketAllocations expects
const allocations = computed(() => {
  const id = eventId.value
  return id ? getTicketAllocationSummary(id) : {
    comp: { allowed: 0, used: 0, remaining: 0 },
    vip: { allowed: 0, used: 0, remaining: 0 },
    guest: { allowed: 0, used: 0, remaining: 0 }
  }
})

const eventListItems = getEventListItems()
</script>

<template>
  <div class="flex flex-1 gap-0 bg-[var(--background)] h-[calc(100vh-6rem)] -m-4">
    <!-- Event List Column -->
    <div class="w-[var(--sidebar-width)] border-r border-[var(--border)] bg-[var(--card)] overflow-y-auto">
      <Sidebar collapsible="none" variant="sidebar" side="left" class="border-none bg-transparent">
        <SidebarHeader class="border-b border-[var(--border)] px-[var(--spacing-4)] py-[var(--spacing-3)]">
          <div class="flex items-center gap-[var(--spacing-2)]">
            <Button variant="outline" size="sm" class="text-[var(--font-size-xs)]">
              <Calendar class="h-3 w-3 mr-[var(--spacing-1)]" />
              Today
            </Button>
            <Button variant="outline" size="sm" class="text-[var(--font-size-xs)]">
              <MapPin class="h-3 w-3 mr-[var(--spacing-1)]" />
              Go To
            </Button>
          </div>
        </SidebarHeader>

        <SidebarContent class="px-[var(--spacing-2)]">
          <div class="space-y-[var(--spacing-1)] py-[var(--spacing-2)]">
            <NuxtLink
              v-for="eventItem in eventListItems"
              :key="eventItem.id"
              :to="`/guest-list/${eventItem.id}`"
              :class="[
                'w-full flex items-center gap-[var(--spacing-3)] px-[var(--spacing-3)] py-[var(--spacing-3)] rounded-[var(--radius-md)] text-left transition-colors duration-[var(--transition-duration-fast)]',
                eventItem.id === eventId ? 'bg-[var(--muted)]' : 'hover:bg-[var(--muted)]/50'
              ]"
            >
              <div class="flex-shrink-0 flex flex-col items-center justify-center w-12 h-12 border border-[var(--border)] rounded-[var(--radius-md)] bg-[var(--card)]">
                <span class="text-[10px] font-semibold text-[var(--muted-foreground)] uppercase">{{ eventItem.dayOfWeek }}</span>
                <span class="text-[var(--font-size-xs)] font-bold text-[var(--foreground)]">{{ eventItem.dateShort }}</span>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-[var(--font-size-sm)] font-bold text-[var(--foreground)] truncate">{{ eventItem.location }}</p>
                <p class="text-[var(--font-size-xs)] text-[var(--muted-foreground)] truncate">{{ eventItem.venueName }}</p>
              </div>
            </NuxtLink>
          </div>
        </SidebarContent>
      </Sidebar>
    </div>

    <!-- Main Content -->
    <div class="flex-1 overflow-y-auto bg-[var(--background)]">
      <div class="p-[var(--spacing-8)]">
        <div v-if="event" class="flex flex-col gap-[var(--spacing-6)]">
          <!-- Page Header -->
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-[var(--spacing-3)]">
              <Badge class="bg-[var(--foreground)] text-[var(--background)] font-bold text-[var(--font-size-xs)] px-[var(--spacing-3)] py-1.5 hover:bg-[var(--foreground)]">
                {{ event.day?.dayOfWeek }} {{ event.day?.dateShort }}
              </Badge>
              <div>
                <h1 class="text-[var(--font-size-2xl)] font-bold text-[var(--foreground)]">{{ event.day?.location }}</h1>
                <p class="text-[var(--font-size-sm)] text-[var(--muted-foreground)] mt-[var(--spacing-1)]">{{ event.venue?.name ?? 'TBD' }}</p>
              </div>
            </div>

            <div class="flex items-center gap-[var(--spacing-3)]">
              <Button variant="outline" class="text-[var(--foreground)] transition-colors duration-[var(--transition-duration-base)]" as-child>
                <NuxtLink :to="`/days/${event.dayId}`">Event Details</NuxtLink>
              </Button>
              <Button class="bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--foreground)]/90 transition-colors duration-[var(--transition-duration-base)]" as-child>
                <NuxtLink :to="`/events/${eventId}`">Edit Event</NuxtLink>
              </Button>
            </div>
          </div>

          <!-- Venue and Ticket Allocations Grid -->
          <div class="grid grid-cols-2 gap-[var(--spacing-6)]">
            <!-- Venue Card -->
            <Card class="border border-[var(--border)] bg-[var(--card)]">
              <CardHeader class="pb-[var(--spacing-3)]">
                <div class="flex items-center gap-[var(--spacing-2)]">
                  <MapPin class="h-5 w-5 text-[var(--muted-foreground)]" />
                  <CardTitle class="text-[var(--font-size-base)] font-bold text-[var(--foreground)]">Venue</CardTitle>
                </div>
              </CardHeader>
              <CardContent class="space-y-[var(--spacing-2)]">
                <div>
                  <p class="text-[var(--font-size-base)] font-bold text-[var(--foreground)]">{{ event.venue?.name ?? 'TBD' }}</p>
                  <p class="text-[var(--font-size-sm)] text-[var(--muted-foreground)] mt-[var(--spacing-1)]">
                    {{ event.venue?.address ?? '' }}<br />
                    {{ event.venue?.city ?? '' }}, {{ event.venue?.state ?? '' }} {{ event.venue?.postalCode ?? '' }}
                  </p>
                </div>
                <div class="flex items-center gap-[var(--spacing-2)] text-[var(--font-size-sm)] text-[var(--muted-foreground)]">
                  <Phone class="h-4 w-4" />
                  <span>{{ event.venue?.phone ?? 'N/A' }}</span>
                </div>
              </CardContent>
            </Card>

            <!-- Ticket Allocations Card -->
            <GuestListTicketAllocations :allocations="allocations" />
          </div>

          <!-- Guest List Section -->
          <div class="space-y-[var(--spacing-4)]">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-[var(--font-size-lg)] font-bold text-[var(--foreground)]">Guest List</h2>
                <p class="text-[var(--font-size-sm)] text-[var(--muted-foreground)] mt-[var(--spacing-1)]">Manage guest list entries for this show</p>
              </div>
              <Button class="bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--foreground)]/90 gap-[var(--spacing-2)] transition-colors duration-[var(--transition-duration-base)]" as-child>
                <NuxtLink :to="`/guest-list/${eventId}/new`">
                  <Plus class="h-4 w-4" />
                  Add Guest
                </NuxtLink>
              </Button>
            </div>

            <!-- Tabs -->
            <Tabs v-model="activeTab" default-value="all">
              <TabsList class="bg-[var(--card)] border border-[var(--border)]">
                <TabsTrigger value="all">All Guests</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="declined">Declined</TabsTrigger>
              </TabsList>

              <TabsContent value="all" class="mt-[var(--spacing-4)]">
                <GuestListGuestTable :guests="guests" />
              </TabsContent>
              <TabsContent value="pending" class="mt-[var(--spacing-4)]">
                <GuestListGuestTable :guests="guests.filter(g => g.status === 'pending')" />
              </TabsContent>
              <TabsContent value="approved" class="mt-[var(--spacing-4)]">
                <GuestListGuestTable :guests="guests.filter(g => g.status === 'approved')" />
              </TabsContent>
              <TabsContent value="declined" class="mt-[var(--spacing-4)]">
                <GuestListGuestTable :guests="guests.filter(g => g.status === 'declined')" />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div v-else class="flex items-center justify-center h-full">
          <p class="text-[var(--muted-foreground)] text-[var(--font-size-sm)]">Event not found</p>
        </div>
      </div>
    </div>
  </div>
</template>