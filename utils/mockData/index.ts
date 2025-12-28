/**
 * Mock Data - Consolidated Entry Point
 * 
 * This is the single import point for all mock data.
 * All data is interconnected with consistent IDs.
 * 
 * Usage:
 *   import { tours, days, events, venues, getDayWithDetails } from '@/utils/mockData'
 */

// =============================================================================
// RE-EXPORTS
// =============================================================================

// Types
export * from './types'


export {
  organizations,
  currentOrganization,
  getOrganizationById,
} from './organizations'

// Data
export { tours, currentTour, tourStats, getTourById, getToursByStatus } from './tours'
export { days, getDayById, getDaysBytourIds, getDaysByType, getShowDays, getDayByDate, getUpcomingDays } from './days'
export { events, getEventById, getEventByDayId, getEventsByVenueId, getEventsByAdvanceStatus, getUpcomingEvents } from './events'
export { venues, getVenueById, getVenuesByCity, searchVenues } from './venues'
export { hotels, getHotelById, getHotelsByCity } from './hotels'
export {
  personnel, contacts, companies,
  getPersonById, getPersonnelByTourId, getPersonnelByDepartment,
  getContactById, getContactsByCompanyId, getCompanyById,
  searchPeople, searchContacts, getDepartments, getPersonnelCountByDepartment
} from './people'
export {
  guests, ticketAllocations,
  getGuestById, getGuestsByEventId, getGuestsByStatus, getPendingGuests,
  getGuestCountByEvent, getTicketAllocationsByEventId, getTicketAllocationSummary,
  getTotalTicketsForGuest, getTotalTicketsByEvent
} from './guests'
export {
  users,
  getUserById, getUsersByOrganizationId, getUsersByRole, getUsersByStatus,
  searchUsers, getUserCountByRole, getUserCountByStatus, getUserFullName
} from './users'
export {
  userGroups,
  getUserGroupById, getUserGroupsByOrganizationId, searchUserGroups
} from './userGroups'

// =============================================================================
// RELATIONSHIP-AWARE QUERIES
// These functions join data across entities
// =============================================================================

import type { Day, Event, Venue, DayWithDetails, EventWithDetails, Contact, Guest } from './types'
import { days, getDayById } from './days'
import { events, getEventByDayId } from './events'
import { venues, getVenueById } from './venues'
import { getHotelById } from './hotels'
import { contacts, getContactById } from './people'
import { guests, getGuestsByEventId, getTicketAllocationsByEventId } from './guests'
import { getDayOfWeek, getLocation } from './types'
import { tours } from './tours'

/**
 * Get tour name(s) from tourId(s)
 * Handles single string, array of strings, or undefined
 * Returns formatted tour names: "Tour A", "Tour A & Tour B", "Tour A, Tour B, Tour C", or "N Tours"
 */
export function getTourName(tourIds: string | string[] | undefined): string {
  if (!tourIds || (Array.isArray(tourIds) && tourIds.length === 0)) {
    return 'Not Assigned'
  }

  const ids = Array.isArray(tourIds) ? tourIds : [tourIds]

  const names = ids
    .map(id => {
      const tour = tours.find(t => t.id === id)
      return tour?.name || null
    })
    .filter(Boolean) as string[]

  if (names.length === 0) return 'Unknown Tour'
  if (names.length === 1) return names[0]
  if (names.length === 2) return names.join(' & ')
  if (names.length <= 4) return names.join(', ')
  return `${names.length} Tours`
}

/**
 * Get a day with all its related data (event, venue, hotel)
 */
export function getDayWithDetails(dayId: string): DayWithDetails | undefined {
  const day = getDayById(dayId)
  if (!day) return undefined
  
  const event = getEventByDayId(dayId)
  const venue = event?.venueId ? getVenueById(event.venueId) : undefined
  const hotel = event?.hotelId ? getHotelById(event.hotelId) : undefined
  
  return {
    ...day,
    event,
    venue,
    hotel,
  }
}

/**
 * Get an event with all its related data
 */
export function getEventWithDetails(eventId: string): EventWithDetails | undefined {
  const event = events.find(e => e.id === eventId)
  if (!event) return undefined
  
  const day = getDayById(event.dayId)
  const venue = event.venueId ? getVenueById(event.venueId) : undefined
  const hotel = event.hotelId ? getHotelById(event.hotelId) : undefined
  const dayOfShowContact = event.dayOfShowContactId ? getContactById(event.dayOfShowContactId) : undefined
  const promoter = event.promoterId ? getContactById(event.promoterId) : undefined
  const eventGuests = getGuestsByEventId(eventId)
  const ticketAllocations = getTicketAllocationsByEventId(eventId)
  
  return {
    ...event,
    day,
    venue,
    hotel,
    dayOfShowContact,
    promoter,
    guests: eventGuests,
    ticketAllocations,
  }
}

/**
 * Get all days with their events for calendar/schedule views
 */
export function getDaysWithEvents(tourIds: string = 'tour-1'): DayWithDetails[] {
  return days
    .filter(d => d.tourIds === tourIds)
    .map(day => getDayWithDetails(day.id)!)
}

/**
 * Get upcoming schedule (days + events) for dashboard
 */
export function getUpcomingSchedule(fromDate: string = '2025-10-14', count: number = 7): DayWithDetails[] {
  return days
    .filter(d => d.date >= fromDate)
    .slice(0, count)
    .map(day => getDayWithDetails(day.id)!)
}

/**
 * Get events that need advancing (not yet completed)
 */
export function getEventsNeedingAdvance(): EventWithDetails[] {
  return events
    .filter(e => e.advanceStatus !== 'completed')
    .map(e => getEventWithDetails(e.id)!)
}

/**
 * Get all shows for a venue
 */
export function getShowsForVenue(venueId: string): EventWithDetails[] {
  return events
    .filter(e => e.venueId === venueId)
    .map(e => getEventWithDetails(e.id)!)
}

/**
 * Search across all entities
 */
export function globalSearch(query: string): {
  days: Day[];
  events: Event[];
  venues: Venue[];
  personnel: import('./types').Person[];
  contacts: Contact[];
} {
  const q = query.toLowerCase()
  
  return {
    days: days.filter(d => 
      d.city.toLowerCase().includes(q) ||
      d.state.toLowerCase().includes(q) ||
      d.dayType.toLowerCase().includes(q)
    ),
    events: events.filter(e => {
      const venue = e.venueId ? getVenueById(e.venueId) : undefined
      return venue?.name.toLowerCase().includes(q) ||
             venue?.city.toLowerCase().includes(q)
    }),
    venues: venues.filter(v =>
      v.name.toLowerCase().includes(q) ||
      v.city.toLowerCase().includes(q)
    ),
    personnel: [], // Import separately to avoid circular deps
    contacts: contacts.filter(c =>
      c.firstName.toLowerCase().includes(q) ||
      c.lastName.toLowerCase().includes(q) ||
      (c.companyName?.toLowerCase().includes(q) ?? false)
    ),
  }
}

// =============================================================================
// DASHBOARD DATA
// Computed data for the main dashboard
// =============================================================================

import { tourStats, currentTour } from './tours'

export interface DashboardData {
  tour: typeof currentTour;
  stats: typeof tourStats;
  upcomingDays: DayWithDetails[];
  advanceProgress: {
    completed: number;
    inProgress: number;
    notStarted: number;
    total: number;
  };
  pendingGuests: Guest[];
}

export function getDashboardData(): DashboardData {
  const upcomingDays = getUpcomingSchedule('2025-10-14', 7)
  
  const advanceProgress = {
    completed: events.filter(e => e.advanceStatus === 'completed').length,
    inProgress: events.filter(e => e.advanceStatus === 'in-progress').length,
    notStarted: events.filter(e => e.advanceStatus === 'not-started').length,
    total: events.length,
  }
  
  const pendingGuests = guests.filter(g => g.status === 'pending')
  
  return {
    tour: currentTour,
    stats: tourStats,
    upcomingDays,
    advanceProgress,
    pendingGuests,
  }
}

// =============================================================================
// CALENDAR DATA
// Data formatted for calendar views
// =============================================================================

export interface CalendarDay {
  date: string;
  dayOfWeek: string;
  dayType: Day['dayType'];
  hasEvent: boolean;
  location: string;
  venueName?: string;
  eventId?: string;
}

export function getCalendarDays(tourIds: string = 'tour-1'): CalendarDay[] {
  return days
    .filter(d => d.tourIds === tourIds)
    .map(day => {
      const event = getEventByDayId(day.id)
      const venue = event?.venueId ? getVenueById(event.venueId) : undefined
      
      return {
        date: day.date,
        dayOfWeek: getDayOfWeek(day.date),
        dayType: day.dayType,
        hasEvent: !!event,
        location: getLocation(day.city, day.state),
        venueName: venue?.name,
        eventId: event?.id,
      }
    })
}

// =============================================================================
// SIDEBAR / NAVIGATION DATA
// Quick lists for sidebars and nav
// =============================================================================

export interface EventListItem {
  id: string;
  dayOfWeek: string;
  dateShort: string;
  location: string;
  venueName: string;
  advanceStatus: Event['advanceStatus'];
}

export function getEventListItems(): EventListItem[] {
  return events.map(event => {
    const day = getDayById(event.dayId)
    const venue = event.venueId ? getVenueById(event.venueId) : undefined
    
    return {
      id: event.id,
      dayOfWeek: day ? getDayOfWeek(day.date) : '',
      dateShort: day ? day.date.slice(5).replace('-', '/') : '',
      location: day ? getLocation(day.city, day.state) : '',
      venueName: venue?.name ?? 'TBD',
      advanceStatus: event.advanceStatus,
    }
  })
}
