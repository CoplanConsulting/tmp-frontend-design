/**
 * Consolidated Types for Tour Manager Pro
 * 
 * Single source of truth for all data structures.
 * When connecting to the real API, map schema fields to these interfaces.
 *
 */

// =============================================================================
// ENUMS & CONSTANTS
// =============================================================================

export type DayType = 'Show Day' | 'Travel Day' | 'Day Off' | 'Rehearsal' | 'Press Day' | 'On Hold'
export type DayStatus = 'confirmed' | 'pending' | 'cancelled' | 'rescheduled'
export type TourStatus = 'Confirmed' | 'In-Progress' | 'Completed' | 'Cancelled'
export type AdvanceStatus = 'not-started' | 'in-progress' | 'completed'
export type GuestStatus = 'approved' | 'pending' | 'declined'
export type GuestType = 'VIP' | 'M&G' | 'Photo' | 'Comp' | '-'

export const DAY_TYPE_CONFIG = {
  'Show Day': { color: 'bg-green-500', label: 'Show' },
  'Travel Day': { color: 'bg-blue-500', label: 'Travel' },
  'Day Off': { color: 'bg-gray-400', label: 'Off' },
  'Rehearsal': { color: 'bg-purple-500', label: 'Rehearsal' },
  'Press Day': { color: 'bg-orange-500', label: 'Press' },
  'On Hold': { color: 'bg-yellow-500', label: 'Hold' },
} as const

// =============================================================================
// CORE ENTITIES
// =============================================================================

/**
 * Organization
 */
export interface Organization {
  id: string
  name: string
  slug: string
  type: 'Music' | 'Sports' | 'Theatre' | 'Festival' | 'Other'
  contactEmail?: string
  currency: string
  isActive: boolean
}

/**
 * Tour
 */
export interface Tour {
  id: string
  organizationId: string
  name: string
  artist: string
  startDate: string          // ISO date
  endDate: string            // ISO date
  tourManager: string
  status: TourStatus
  // Computed/derived fields (calculate from related data)
  totalDays?: number
  totalShows?: number
  completedShows?: number
  totalCrew?: number
}

/**
 * Day
 */
export interface Day {
  id: string
  tourIds: string
  date: string               // ISO date (YYYY-MM-DD)
  dayType: DayType
  status: DayStatus
  city: string
  state: string
  country: string
  timezone: string
  notes?: string
  // Derived fields (for UI convenience)
  dayOfWeek?: string         // "MON", "TUE", etc.
  dateShort?: string         // "10/17"
  location?: string          // "Moncton, NB"
  hasEvent?: boolean
}

/**
 * Event
 * This is THE core entity for tour management
 */
export interface Event {
  id: string
  dayId: string
  venueId: string | null
  
  // Schedule
  loadIn?: string            // Time string "10:00 AM"
  soundCheck?: string
  doors?: string
  showTime?: string
  curfew?: string
  setLength?: number         // Minutes
  
  // Meals
  lunch?: string
  lunchCount?: number
  dinner?: string
  dinnerCount?: number
  
  // Logistics
  returnToHotelAfterSoundcheck?: boolean
  returnToHotelAfterShow?: boolean
  
  // Contacts (IDs reference People)
  dayOfShowContactId?: string
  promoterId?: string
  primaryPromoterContactId?: string
  
  // Production details
  loadInDetails?: string
  soundDetails?: string
  lightDetails?: string
  securityDetails?: string
  cateringDetails?: string
  meetAndGreet?: string
  
  // Advance status
  advanceStatus: AdvanceStatus
  
  // Ticket tracking
  capacity?: number
  ticketsSold?: number
  totalComps?: number
  compsUsed?: number
  
  // Notes
  notes?: string
  
  // Hotel assignment
  hotelId?: string
}

/**
 * Venue - A performance location
 */
export interface Venue {
  id: string
  organizationId: string
  name: string
  type: string               // Casino, Theatre, Arena, etc.
  
  // Address
  address: string
  city: string
  state: string
  postalCode: string
  country: string
  
  // Contact
  phone?: string
  email?: string
  website?: string
  venueContactName?: string
  productionContactName?: string
  
  // Technical
  capacity?: number
  stageDimensions?: string
  loadInInfo?: string
  dressingRoomInfo?: string
  greenRoomInfo?: string
  wifiInfo?: string
  powerInfo?: string
  
  // Parking
  busParking?: string
  parkingInstructions?: string
  
  // Business
  merchSplit?: string
  merchContact?: string
  settlementTerms?: string
  
  // Amenities
  laundryInfo?: string
  runnerInfo?: string
  cateringOptions?: string
  
  notes?: string
}

/**
 * Hotel
 */
export interface Hotel {
  id: string
  organizationId: string
  name: string
  address: string
  city: string
  state: string
  postalCode: string
  phone?: string
  email?: string
  contactName?: string
  confirmationNumber?: string
  
  // Logistics
  distanceToVenue?: string
  travelTimeToVenue?: string
  busParking?: string
  parkingNotes?: string
  amenities?: string
  
  notes?: string
}

/**
 * Person - Tour personnel (internal team member)
 * This represents someone ON the tour (profiles + tour_members combined)
 */
export interface Person {
  id: string
  
  // Basic info
  firstName: string
  lastName: string
  middleName?: string
  email?: string
  phone?: string
  address?: string
  dateOfBirth?: string
  
  // Tour role
  tourIds: string[]
  role: string              // "Tour Manager", "FOH Engineer", etc.
  department: string        // "Management", "Audio", "Band", etc.
  company?: string
  
  // Travel documents
  passportNumber?: string
  passportExpiration?: string
  passportCountry?: string
  nationality?: string
  
  // Emergency contact
  emergencyContactName?: string
  emergencyContactRelationship?: string
  emergencyContactPhone?: string
  emergencyContactEmail?: string
  
  // Sizing
  shirtSize?: string
  jacketSize?: string
  
  notes?: string
}

/**
 * Contact - External person (promoter, venue staff, vendor)
 * This is the "people" table - contacts NOT on the tour
 */
export interface Contact {
  id: string
  organizationId: string
  
  firstName: string
  lastName: string
  email?: string
  phone?: string
  
  role: string              // "Promoter", "Venue Manager", "Vendor", etc.
  title?: string
  companyId?: string
  companyName?: string      // Denormalized for convenience
  
  address?: string
  website?: string
  
  notes?: string
  tags?: string[]
  isActive: boolean
}

/**
 * Company - Business entity (promoter company, vendor, etc.)
 */
export interface Company {
  id: string
  organizationId: string
  name: string
  type: string              // "Promoter", "Vendor", "Production", etc.
  
  mainPhone?: string
  mainEmail?: string
  website?: string
  
  address?: string
  city?: string
  state?: string
  country?: string
  postalCode?: string
  
  primaryContactId?: string
  notes?: string
  isActive: boolean
}

/**
 * Guest
 */
export interface Guest {
  id: string
  eventId: string
  
  name: string
  email?: string
  phone?: string
  
  tickets: number
  passes: number
  guestType: GuestType
  status: GuestStatus
  
  affiliation?: string      // "Label", "Media", "Friend of Artist", etc.
  pickupMethod?: string     // "Will Call", "Box Office", "Hand Deliver"
  
  requestorId?: string
  requestorName?: string    // Denormalized
  requestDate?: string
  
  approvedById?: string
  approvedByName?: string   // Denormalized
  approvalDate?: string
  
  // Seating
  seatSection?: string
  seatRow?: string
  seats?: string
  
  notes?: string
}

/**
 * Ticket allocation per event
 */
export interface TicketAllocation {
  eventId: string
  ticketType: 'comp' | 'vip' | 'guest'
  allowed: number
  used: number
}

// =============================================================================
// HELPER TYPES
// =============================================================================

/**
 * Full day with related event and venue data
 * Used for day detail views
 */
export interface DayWithDetails extends Day {
  event?: Event
  venue?: Venue
  hotel?: Hotel
}

/**
 * Full event with all related data
 * Used for event detail/advance views
 */
export interface EventWithDetails extends Event {
  day?: Day
  venue?: Venue
  hotel?: Hotel
  dayOfShowContact?: Contact
  promoter?: Contact
  guests?: Guest[]
  ticketAllocations?: TicketAllocation[]
}

/**
 * Stats for dashboard
 */
export interface TourStats {
  tourIds: string
  dateRange: string
  totalDays: number
  totalShows: number
  completedShows: number
  remainingShows: number
  totalCrew: number
  nextShowDate?: string
  nextShowVenue?: string
  nextShowCity?: string
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Get full name from person
 */
export function getFullName(person: { firstName: string; lastName: string; middleName?: string }): string {
  return person.middleName 
    ? `${person.firstName} ${person.middleName} ${person.lastName}`
    : `${person.firstName} ${person.lastName}`
}

/**
 * Get location string from city/state
 */
export function getLocation(city: string, state: string): string {
  return `${city}, ${state}`
}

/**
 * Get day of week abbreviation from date
 */
export function getDayOfWeek(dateStr: string): string {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  const date = new Date(dateStr)
  return days[date.getDay()]
}

/**
 * Get short date format (MM/DD)
 */
export function getDateShort(dateStr: string): string {
  const date = new Date(dateStr)
  return `${date.getMonth() + 1}/${date.getDate()}`
}

/**
 * Format date for display (Oct 17, 2025)
 */
export function formatDisplayDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

/**
 * Calculate percentage
 */
export function getPercentage(value: number, total: number): string {
  if (total === 0) return 'N/A'
  return `${Math.round((value / total) * 100)}%`
}
