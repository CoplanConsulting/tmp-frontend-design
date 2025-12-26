/**
 * Guest List Data - HomeComing 2025
 * 
 * Guests are linked to specific events via eventId.
 * Ticket allocations define limits per event.
 */

import type { Guest, TicketAllocation } from './types'

// =============================================================================
// GUESTS
// =============================================================================

export const guests: Guest[] = [
  // Event 2: Moncton Show (first real show)
  {
    id: 'guest-1',
    eventId: 'event-2',
    name: 'John Smith',
    email: 'jsmith@gmail.com',
    phone: '615-555-1234',
    tickets: 4,
    passes: 4,
    guestType: 'VIP',
    status: 'approved',
    affiliation: 'Label',
    pickupMethod: 'Will Call',
    requestorId: 'person-1',
    requestorName: 'Steve Coplan',
    requestDate: '2025-09-15',
    approvedById: 'person-2',
    approvedByName: 'Elena Sherertz',
    approvalDate: '2025-09-15',
    seatSection: 'A',
    seatRow: '4',
    seats: '5-8',
    notes: 'VIP treatment - meet & greet after show',
  },
  {
    id: 'guest-2',
    eventId: 'event-2',
    name: 'Sarah Johnson',
    email: 'sarah.j@media.com',
    phone: '416-555-2345',
    tickets: 2,
    passes: 2,
    guestType: 'M&G',
    status: 'approved',
    affiliation: 'Media',
    pickupMethod: 'Box Office',
    requestorId: 'person-1',
    requestorName: 'Steve Coplan',
    requestDate: '2025-09-10',
    approvedById: 'person-2',
    approvedByName: 'Elena Sherertz',
    approvalDate: '2025-09-12',
    seatSection: 'B',
    seatRow: '2',
    seats: '1-2',
    notes: 'Interview scheduled for 3pm',
  },
  {
    id: 'guest-3',
    eventId: 'event-2',
    name: 'David Lee',
    email: 'david.lee@email.com',
    phone: '902-555-3456',
    tickets: 4,
    passes: 0,
    guestType: 'Comp',
    status: 'approved',
    affiliation: 'Friend of Artist',
    pickupMethod: 'Hand Deliver',
    requestorId: 'person-12',
    requestorName: 'Paul Brandt',
    requestDate: '2025-09-08',
    approvedById: 'person-1',
    approvedByName: 'Steve Coplan',
    approvalDate: '2025-09-09',
    seatSection: 'C',
    seatRow: '5',
    seats: '10-13',
  },
  {
    id: 'guest-4',
    eventId: 'event-2',
    name: 'Emily Chen',
    email: 'echen@photos.com',
    phone: '604-555-4567',
    tickets: 1,
    passes: 1,
    guestType: 'Photo',
    status: 'approved',
    affiliation: 'Media',
    pickupMethod: 'Will Call',
    requestorId: 'person-1',
    requestorName: 'Steve Coplan',
    requestDate: '2025-09-14',
    approvedById: 'person-1',
    approvedByName: 'Steve Coplan',
    approvalDate: '2025-09-14',
    seatSection: 'Photo Pit',
    notes: 'Photo pass for first 3 songs only',
  },
  {
    id: 'guest-5',
    eventId: 'event-2',
    name: 'Michael Brown',
    email: 'mbrown@example.com',
    phone: '613-555-5678',
    tickets: 3,
    passes: 0,
    guestType: 'VIP',
    status: 'pending',
    affiliation: 'Sponsor',
    pickupMethod: 'Box Office',
    requestorId: 'contact-2',
    requestorName: 'Patrick Guay',
    requestDate: '2025-09-20',
  },
  
  // Event 3: Truro Show
  {
    id: 'guest-6',
    eventId: 'event-3',
    name: 'Lisa White',
    email: 'lwhite@radio.ca',
    phone: '902-555-6789',
    tickets: 2,
    passes: 2,
    guestType: 'M&G',
    status: 'approved',
    affiliation: 'Radio',
    pickupMethod: 'Will Call',
    requestorId: 'person-1',
    requestorName: 'Steve Coplan',
    requestDate: '2025-09-18',
    approvedById: 'person-1',
    approvedByName: 'Steve Coplan',
    approvalDate: '2025-09-18',
    notes: 'Radio interview at 4pm',
  },
  {
    id: 'guest-7',
    eventId: 'event-3',
    name: 'Tom Green',
    email: 'tgreen@promoter.com',
    phone: '902-555-7890',
    tickets: 4,
    passes: 4,
    guestType: 'VIP',
    status: 'approved',
    affiliation: 'Promoter',
    pickupMethod: 'Will Call',
    requestorId: 'contact-2',
    requestorName: 'Patrick Guay',
    requestDate: '2025-09-15',
    approvedById: 'person-1',
    approvedByName: 'Steve Coplan',
    approvalDate: '2025-09-16',
  },
  
  // Event 4: St. John's Show 1
  {
    id: 'guest-8',
    eventId: 'event-4',
    name: 'Jennifer Walsh',
    email: 'jwalsh@cbc.ca',
    phone: '709-555-1111',
    tickets: 2,
    passes: 1,
    guestType: 'Photo',
    status: 'pending',
    affiliation: 'CBC',
    pickupMethod: 'Will Call',
    requestorId: 'person-1',
    requestorName: 'Steve Coplan',
    requestDate: '2025-09-25',
  },
  {
    id: 'guest-9',
    eventId: 'event-4',
    name: 'Kevin Power',
    email: 'kpower@ntv.ca',
    phone: '709-555-2222',
    tickets: 2,
    passes: 2,
    guestType: 'M&G',
    status: 'declined',
    affiliation: 'NTV',
    pickupMethod: 'Will Call',
    requestorId: 'person-1',
    requestorName: 'Steve Coplan',
    requestDate: '2025-09-22',
    notes: 'Declined - M&G full',
  },
  
  // Event 5: St. John's Show 2
  {
    id: 'guest-10',
    eventId: 'event-5',
    name: 'Mary Chicken',
    email: 'mary.b@email.com',
    phone: '709-555-3333',
    tickets: 6,
    passes: 0,
    guestType: 'Comp',
    status: 'approved',
    affiliation: 'Family',
    pickupMethod: 'Hand Deliver',
    requestorId: 'person-11',
    requestorName: 'Terri Clark',
    requestDate: '2025-09-20',
    approvedById: 'person-1',
    approvedByName: 'Steve Coplan',
    approvalDate: '2025-09-20',
    seatSection: 'A',
    seatRow: '1',
    seats: '1-6',
    notes: "Terri's family - front row reserved",
  },
]

// =============================================================================
// TICKET ALLOCATIONS (Per Event)
// =============================================================================

export const ticketAllocations: TicketAllocation[] = [
  // Event 2: Moncton
  { eventId: 'event-2', ticketType: 'comp', allowed: 30, used: 14 },
  { eventId: 'event-2', ticketType: 'vip', allowed: 20, used: 7 },
  { eventId: 'event-2', ticketType: 'guest', allowed: 25, used: 4 },
  
  // Event 3: Truro
  { eventId: 'event-3', ticketType: 'comp', allowed: 25, used: 6 },
  { eventId: 'event-3', ticketType: 'vip', allowed: 15, used: 8 },
  { eventId: 'event-3', ticketType: 'guest', allowed: 20, used: 0 },
  
  // Event 4: St. John's 1
  { eventId: 'event-4', ticketType: 'comp', allowed: 20, used: 4 },
  { eventId: 'event-4', ticketType: 'vip', allowed: 10, used: 0 },
  { eventId: 'event-4', ticketType: 'guest', allowed: 15, used: 0 },
  
  // Event 5: St. John's 2
  { eventId: 'event-5', ticketType: 'comp', allowed: 20, used: 6 },
  { eventId: 'event-5', ticketType: 'vip', allowed: 10, used: 0 },
  { eventId: 'event-5', ticketType: 'guest', allowed: 15, used: 0 },
]

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

export function getGuestById(id: string): Guest | undefined {
  return guests.find(g => g.id === id)
}

export function getGuestsByEventId(eventId: string): Guest[] {
  return guests.filter(g => g.eventId === eventId)
}

export function getGuestsByStatus(status: Guest['status']): Guest[] {
  return guests.filter(g => g.status === status)
}

export function getPendingGuests(): Guest[] {
  return guests.filter(g => g.status === 'pending')
}

export function getGuestCountByEvent(eventId: string): { total: number; approved: number; pending: number; declined: number } {
  const eventGuests = getGuestsByEventId(eventId)
  return {
    total: eventGuests.length,
    approved: eventGuests.filter(g => g.status === 'approved').length,
    pending: eventGuests.filter(g => g.status === 'pending').length,
    declined: eventGuests.filter(g => g.status === 'declined').length,
  }
}

export function getTicketAllocationsByEventId(eventId: string): TicketAllocation[] {
  return ticketAllocations.filter(ta => ta.eventId === eventId)
}

export function getTicketAllocationSummary(eventId: string): {
  comp: { allowed: number; used: number; remaining: number };
  vip: { allowed: number; used: number; remaining: number };
  guest: { allowed: number; used: number; remaining: number };
} {
  const allocations = getTicketAllocationsByEventId(eventId)
  
  const getSummary = (type: string) => {
    const alloc = allocations.find(a => a.ticketType === type)
    if (!alloc) return { allowed: 0, used: 0, remaining: 0 }
    return {
      allowed: alloc.allowed,
      used: alloc.used,
      remaining: alloc.allowed - alloc.used,
    }
  }
  
  return {
    comp: getSummary('comp'),
    vip: getSummary('vip'),
    guest: getSummary('guest'),
  }
}

export function getTotalTicketsForGuest(guest: Guest): number {
  return guest.tickets + guest.passes
}

export function getTotalTicketsByEvent(eventId: string): { tickets: number; passes: number } {
  const eventGuests = getGuestsByEventId(eventId).filter(g => g.status === 'approved')
  return {
    tickets: eventGuests.reduce((sum, g) => sum + g.tickets, 0),
    passes: eventGuests.reduce((sum, g) => sum + g.passes, 0),
  }
}
