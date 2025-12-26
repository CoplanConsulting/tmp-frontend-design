# Tour Manager Pro: UI vs Schema Comprehensive Audit

**Date:** December 25, 2025  
**Purpose:** Identify mismatches, gaps, and issues between tmp_frontend_design UI and tour-manager-pro Drizzle schemas  
**Status:** READ-ONLY ANALYSIS - No code changes

---

## Executive Summary

This audit reveals **significant misalignment** between the frontend mock data structures and the backend Drizzle schemas. The schemas were AI-generated 6+ months ago and haven't been updated as UI mocks evolved. Key findings include:

- **13 overcomplicated enums** that need simplification
- **15+ missing schema fields** the UI requires
- **20+ schema fields** with no UI purpose
- **Multiple naming mismatches** between UI and schema
- **Guest List feature** has NO schema at all

---

## 1. Page Inventory (tmp_frontend_design)

### 1.1 Dashboard (`/dashboard`)
| Route | Purpose | Data Fields Used | Relationships |
|-------|---------|------------------|---------------|
| `/dashboard` | Tour overview with stats | `statsCards`: title, value, subtitle, icon | Tour → Days → Events |
| | | `tourSchedule`: id, day, date, eventType, venue, location | |

**Mock Data Source:** `utils/mockDashboard.ts`

---

### 1.2 Events (`/events`)
| Route | Purpose | Data Fields Used |
|-------|---------|------------------|
| `/events` | Events list | id, date, location, venue, status, capacity, showTime |
| `/events/add` | Add new event | Form fields for event creation |
| `/events/advance` | Event advance details | Full event details with advance info |

**Mock Data Source:** `utils/mockEvents.ts`

**UI Event Interface Fields:**
```typescript
interface Event {
  id: string
  date: string                    // "Oct 17, 2025" format
  location: string                // "Moncton NB" - city + state combined
  venue: string                   // Venue name only
  status: 'confirmed' | 'pending' | 'cancelled'
  capacity: number
  showTime: string                // "8:00pm"
  advanceStatus: 'not-started' | 'in-progress' | 'completed'
  advanced: string                // Display text
  loadIn: string                  // Time string
  soundCheck: string
  lunch: string
  doors: string
  setLength: string
  dinner: string
  curfew: string
  returnToHotelAfterSoundCheck: string
  returnToHotelAfterShow: string
  dayOfContact: string            // Contact name
  email: string                   // Contact email
  phone: string                   // Contact phone
  promoter: string                // Promoter name
  promoterPrimaryContact: string
  loadInDetails: string
  soundDetails: string
  lightDetails: string
  securityDetails: string
  cateringDetails: string
  lunchCount: string
  dinnerCount: string
  meetAndGreet: string
  notes: string
  hotels: string                  // ❌ NOT IN SCHEMA
  tixSold: string                 // ❌ NOT IN SCHEMA
  percentSold: string             // ❌ NOT IN SCHEMA
  totalComps: string              // ❌ NOT IN SCHEMA
  compsRemain: string             // ❌ NOT IN SCHEMA
  compsUsed: string               // ❌ NOT IN SCHEMA
}
```

---

### 1.3 Days (`/days`)
| Route | Purpose | Data Fields Used |
|-------|---------|------------------|
| `/days/day` | Tour schedule/day view | id, date, dayOfWeek, dateShort, status, city, state, country, timeZone, dayType, eventName, location, venue, isEmpty |

**Mock Data Source:** `utils/mockDays.ts`

**UI Day Interface Fields:**
```typescript
interface Day {
  id: string
  date: string                    // ISO format "2025-10-14"
  dayOfWeek: string               // "TUE" - ❌ NOT IN SCHEMA (derived)
  dateShort: string               // "10/14" - ❌ NOT IN SCHEMA (derived)
  status: 'confirmed' | 'pending' | 'cancelled'
  city: string
  state: string
  country: string
  timeZone: string
  dayType: 'Show Day' | 'Travel Day' | 'Day Off' | 'Rehearsal' | 'On Hold'
  eventName: string               // ❌ NOT IN SCHEMA (should come from Event)
  location: string                // Combined city, state - ❌ NOT IN SCHEMA (derived)
  venue: string                   // ❌ NOT IN SCHEMA (should come from Event→Venue)
  isEmpty: boolean                // ❌ NOT IN SCHEMA
}
```

---

### 1.4 Calendar (`/calendar`)
| Route | Purpose | Data Fields Used |
|-------|---------|------------------|
| `/calendar` | Monthly calendar view | id, date, title, type |

**Mock Data Source:** `utils/mockCalendar.ts`

**UI Calendar Event Interface:**
```typescript
interface CalendarEvent {
  id: string
  date: string                    // ISO format
  title: string                   // Event title/location
  type: 'show' | 'travel' | 'off' | 'special'  // ⚠️ DIFFERENT from schema dayType
}
```

---

### 1.5 People/Personnel (`/people`)
| Route | Purpose | Data Fields Used |
|-------|---------|------------------|
| `/people` | Crew directory | firstName, lastName, fullName, role, department, email, phone, tourIds, shirtSize, jacketSize, passport info, emergency contacts |

**Mock Data Source:** `utils/mockPeople.ts`

**UI Person Interface Fields:**
```typescript
interface Person {
  id: string
  firstName: string
  lastName: string
  middleName?: string
  fullName: string                // ❌ NOT IN SCHEMA (derived)
  role: string                    // Free text
  department: string              // Free text
  email?: string
  phone?: string
  address?: string
  dob?: string                    // ❌ NOT IN SCHEMA (different from profiles)
  company?: string                // ❌ NOT IN SCHEMA (should be companyId reference)
  tourIds: string                  // ❌ NOT IN SCHEMA for people table
  tourName?: string               // ❌ NOT IN SCHEMA (derived)
  passportNumber?: string
  passportExpiration?: string
  passportCountry?: string
  nationality?: string
  emergencyContactName?: string
  emergencyContactRelationship?: string
  emergencyContactPhone?: string
  emergencyContactEmail?: string
  shirtSize?: string
  jacketSize?: string
  notes?: string
}
```

---

### 1.6 Guest List (`/guest-list/[id]`)
| Route | Purpose | Data Fields Used |
|-------|---------|------------------|
| `/guest-list/[id]` | Per-event guest management | name, tickets, passes, type, status, affiliation, pickup, email, phone, requestor, requestDate, approvedBy, approvalDate, seating, notes |

**Mock Data Source:** `utils/mockGuestList.ts`

**UI Guest Interface Fields:**
```typescript
interface Guest {
  id: string
  name: string
  tickets: number
  passes: number
  type: 'VIP' | 'M&G' | 'Photo' | '-'
  status: 'approved' | 'pending' | 'declined'
  affiliation: string
  pickup: string
  email: string
  phone: string
  requestor: string
  requestDate: string
  approvedBy?: string
  approvalDate?: string
  seating?: {
    section: string
    row: string
    seats: string
  }
  notes?: string
}

interface TicketAllocation {
  allowed: { tix: number, vip: number, mng: number }
  approved: { tix: number, vip: number, mng: number }
  remaining: { tix: number, vip: number, mng: number }
}
```

**⚠️ CRITICAL: NO GUEST LIST SCHEMA EXISTS IN DATABASE**

---

### 1.7 Venues (`/venues/[id]`)
| Route | Purpose | Data Fields Used |
|-------|---------|------------------|
| `/venues/[id]` | Venue database with details | name, street, city, state, postalCode, phone, capacity, type, website, stageDimensions, dressingRoomInfo, loadingDockInfo, wifiInfo, merchPercent, merchContact, laundryInfo, busParking, parkingInstructions, shorePower, runnerInfo, notes, shows, venueContact |

**Mock Data Source:** `utils/mockVenues.ts`

**UI Venue Interface Fields:**
```typescript
interface Venue {
  id: string
  name: string
  street: string                  // ⚠️ Schema uses "address"
  city: string
  state: string
  postalCode: string              // ✅ Matches
  phone: string
  capacity: string                // ⚠️ UI uses string, schema uses integer
  type: string                    // ⚠️ UI uses free text, schema uses enum
  website: string
  stageDimensions: string         // ⚠️ Schema uses "stageSize"
  dressingRoomInfo: string        // ⚠️ Schema uses "dressingRoomCount" (integer)
  loadingDockInfo: string         // ⚠️ Schema uses "loadInInfo"
  wifiInfo: string                // ⚠️ Schema uses "wifiAvailable" (boolean)
  merchPercent: string            // ⚠️ Schema uses "merchandiseSplit"
  merchContact: string            // ❌ NOT IN SCHEMA
  laundryInfo: string             // ❌ NOT IN SCHEMA
  busParking: string              // ⚠️ Schema uses "parkingInfo"
  parkingInstructions: string     // ⚠️ Should merge with parkingInfo
  shorePower: string              // ⚠️ Schema uses "powerAvailable"
  runnerInfo: string              // ❌ NOT IN SCHEMA
  notes: string
  shows: string                   // ❌ NOT IN SCHEMA (derived from events)
  venueContact: string            // ⚠️ Schema has productionContact, boxOfficeContact
}
```

---

### 1.8 Tours (via `mockTours.ts`)

**UI Tour Interface Fields:**
```typescript
interface Tour {
  id: string
  name: string
  artist: string
  startDate: string               // "Oct 14, 2025" format
  endDate: string
  totalShows: number              // ❌ NOT IN SCHEMA (derived)
  totalCrew: number               // ❌ NOT IN SCHEMA (derived)
  totalDays: number               // ❌ NOT IN SCHEMA (derived)
  daysLeft: number                // ❌ NOT IN SCHEMA (derived)
  tourManager: string
  status: 'Confirmed' | 'In-Progress' | 'Completed' | 'Cancelled'  // ⚠️ Different from schema
}
```

---

## 2. Schema Inventory (tour-manager-pro/lib/db/schema/)

### 2.1 organizations.ts
| Field | Type | Notes |
|-------|------|-------|
| id | uuid | PK |
| name | text | Required |
| slug | text | Required, unique |
| orgType | enum | Music, Sports/Athletics, Theatre, Festival, Other |
| contactEmail | text | |
| taxId | text | |
| currency | text | |
| wireInfo | text | |
| notes | text | |
| isActive | boolean | Default true |
| createdBy | uuid | FK to profiles |
| createdAt | timestamp | |
| updatedAt | timestamp | |

---

### 2.2 profiles.ts
| Field | Type | Notes |
|-------|------|-------|
| id | uuid | PK (from auth.users) |
| firstName | text | |
| middleName | text | |
| lastName | text | |
| email | text | |
| phone | text | |
| avatarUrl | text | |
| dateOfBirth | date | |
| currentAddress | text | |
| passportNumber | text | |
| passportExpDate | date | |
| passportCountry | text | |
| nationalityCitizenship | text | |
| emergencyContactName | text | |
| emergencyContactRelationship | text | |
| emergencyContactPhone | text | |
| emergencyContactEmail | text | |
| shirtSize | enum | XS, S, M, L, XL, XXL, XXXL |
| jacketSize | enum | (same as shirtSize) |
| currentOrganizationId | uuid | FK to organizations |
| createdAt | timestamp | |
| updatedAt | timestamp | |

---

### 2.3 tours.ts
| Field | Type | Notes |
|-------|------|-------|
| id | uuid | PK |
| organizationId | uuid | FK, required |
| name | text | Required |
| artist | text | |
| startDate | date | |
| endDate | date | |
| tourManager | text | |
| status | enum | Upcoming, Active, Completed, Cancelled |
| createdBy | uuid | FK to profiles |
| createdAt | timestamp | |
| updatedAt | timestamp | |

**Schema Status Enum:** `Upcoming, Active, Completed, Cancelled`  
**UI Status Enum:** `Confirmed, In-Progress, Completed, Cancelled`  
⚠️ **MISMATCH: "Upcoming" vs "Confirmed", "Active" vs "In-Progress"**

---

### 2.4 days.ts
| Field | Type | Notes |
|-------|------|-------|
| id | uuid | PK |
| tourIds | uuid | FK, required |
| name | text | |
| date | date | Required |
| dayType | enum | Show Day, Travel Day, Day Off, Rehearsal, Press |
| status | enum | Confirmed, Pending, Cancelled, Rescheduled |
| city | text | |
| state | text | |
| country | text | Default "USA" |
| timezone | enum | Eastern, Central, Mountain, Pacific, etc. |
| notes | text | |
| createdBy | uuid | FK to profiles |
| createdAt | timestamp | |
| updatedAt | timestamp | |

**Schema dayType Enum:** `Show Day, Travel Day, Day Off, Rehearsal, Press`  
**UI dayType:** `Show Day, Travel Day, Day Off, Rehearsal, On Hold`  
⚠️ **MISMATCH: UI has "On Hold", schema has "Press"**

---

### 2.5 events.ts
| Field | Type | Notes |
|-------|------|-------|
| id | uuid | PK |
| dayId | uuid | FK, required |
| venueId | uuid | FK, nullable |
| advanceStatus | enum | 13 values (overcomplicated!) |
| loadIn | text | |
| soundCheck | text | |
| lunch | text | |
| doors | text | |
| eventTime | text | |
| dinner | text | |
| curfew | text | |
| setLength | integer | |
| returnToHotelAfterSoundcheck | boolean | |
| returnToHotelAfterEvent | boolean | |
| dayOfEventContactId | uuid | FK to people |
| promoterId | uuid | FK to people |
| primaryPromoterContactId | uuid | FK to people |
| loadInDetails | text | |
| soundDetails | text | |
| lightDetails | text | |
| securityDetails | text | |
| cateringDetails | text | |
| lunchCount | integer | |
| dinnerCount | integer | |
| meetAndGreetInfo | text | |
| notes | text | |
| createdBy | uuid | FK to profiles |
| createdAt | timestamp | |
| updatedAt | timestamp | |

**Schema advanceStatus Enum (13 values!):**
```
not_started, initial_contact, in_progress, waiting_response,
tech_rider_sent, hospitality_rider_sent, contracts_pending,
deposits_pending, advance_scheduled, advance_completed,
day_of_confirmed, cancelled, on_hold
```

**UI advanceStatus:** `not-started, in-progress, completed`  
⚠️ **CRITICAL MISMATCH: UI only needs 3 values, schema has 13!**

---

### 2.6 venues.ts
| Field | Type | Notes |
|-------|------|-------|
| id | uuid | PK |
| organizationId | uuid | FK, required |
| name | text | Required |
| venueType | enum | arena, theater, club, festival, outdoor, stadium, concert_hall, other |
| address | text | ⚠️ UI uses "street" |
| city | text | |
| state | text | |
| country | text | Default "USA" |
| postalCode | text | |
| timezone | text | |
| capacity | integer | ⚠️ UI uses string |
| phone | text | |
| email | text | |
| website | text | |
| stageSize | text | ⚠️ UI uses "stageDimensions" |
| loadInInfo | text | ⚠️ UI uses "loadingDockInfo" |
| parkingInfo | text | ⚠️ UI has busParking + parkingInstructions |
| productionContact | text | |
| boxOfficeContact | text | |
| securityRequirements | text | |
| cateringOptions | text | |
| wifiAvailable | boolean | ⚠️ UI uses "wifiInfo" (text with details) |
| greenRoomInfo | text | |
| dressingRoomCount | integer | ⚠️ UI uses "dressingRoomInfo" (text) |
| audioSystem | text | |
| lightingSystem | text | |
| powerAvailable | text | ⚠️ UI uses "shorePower" |
| curfewTime | time | |
| soundLimiter | boolean | |
| alcoholLicense | boolean | |
| ageRestrictions | text | |
| settlementTerms | text | |
| hospitalityIncluded | text | |
| merchandiseSplit | text | ⚠️ UI uses "merchPercent" |
| doorSplit | text | |
| notes | text | |
| tags | text[] | |
| isActive | boolean | |
| createdBy | uuid | FK to profiles |
| createdAt | timestamp | |
| updatedAt | timestamp | |

---

### 2.7 people.ts
| Field | Type | Notes |
|-------|------|-------|
| id | uuid | PK |
| organizationId | uuid | FK, required |
| firstName | text | Required |
| middleName | text | |
| lastName | text | Required |
| email | text | |
| phone | text | |
| role | text | Free text (was enum, simplified) |
| title | text | |
| companyId | uuid | FK to companies |
| address | text | |
| website | text | |
| primaryContactFor | text | |
| notes | text | |
| tags | text[] | |
| isActive | boolean | |
| createdBy | uuid | FK to profiles |
| createdAt | timestamp | |
| updatedAt | timestamp | |

**⚠️ UI "People" is actually "Tour Personnel" (profiles + tourMembers), not this table!**

---

### 2.8 tour-members.ts
| Field | Type | Notes |
|-------|------|-------|
| id | uuid | PK |
| tourIds | uuid | FK, required |
| profileId | uuid | FK, required |
| roleOnTour | text | Required |
| department | text | Required |
| dailyRate | decimal | |
| startDate | date | Required |
| endDate | date | |
| status | enum | confirmed, pending, completed |
| notes | text | |
| createdBy | uuid | FK to profiles |
| createdAt | timestamp | |
| updatedAt | timestamp | |

---

### 2.9 companies.ts
| Field | Type | Notes |
|-------|------|-------|
| id | uuid | PK |
| organizationId | uuid | FK, required |
| name | text | Required |
| type | enum | 14 values (promoter, vendor, production, etc.) |
| mainPhone | text | |
| website | text | |
| mainEmail | text | |
| address | text | |
| city | text | |
| stateProvince | text | |
| country | text | |
| postalCode | text | |
| primaryContactId | uuid | FK to people |
| notes | text | |
| tags | text[] | |
| isActive | boolean | |
| createdBy | uuid | FK to profiles |
| createdAt | timestamp | |
| updatedAt | timestamp | |

---

### 2.10 financial-details.ts
| Field | Type | Notes |
|-------|------|-------|
| id | uuid | PK |
| organizationId | uuid | FK, required |
| eventId | uuid | FK, required |
| guarantee | decimal | |
| overagePercentage | decimal | |
| overageAmount | decimal | |
| totalAmountDue | decimal | |
| depositAmount | decimal | |
| depositDueDate | date | |
| depositPaid | boolean | |
| depositPaidDate | date | |
| finalPaymentDueDate | date | |
| finalPaymentPaid | boolean | |
| finalPaymentPaidDate | date | |
| settleWithPersonId | uuid | FK to people |
| settleWithText | text | |
| paymentMethod | enum | cash, check, wire_transfer, ach, credit_card, paypal, venmo, other |
| paymentTerms | text | |
| expensesDeducted | decimal | |
| merchandiseSplitPercentage | decimal | |
| doorSplitPercentage | decimal | |
| settlementNotes | text | |
| additionalNotes | text | |
| status | enum | pending, partial, settled, cancelled |
| createdBy | uuid | FK to profiles |
| createdAt | timestamp | |
| updatedAt | timestamp | |

---

### 2.11 travel-itineraries.ts
| Field | Type | Notes |
|-------|------|-------|
| id | uuid | PK |
| organizationId | uuid | FK, required |
| tourIds | uuid | FK, required |
| dayId | uuid | FK |
| eventId | uuid | FK |
| departureCity | text | |
| departureLocation | text | |
| departureDate | date | |
| departureTime | time | |
| departureTimezone | text | |
| travelMethod | enum | bus, fly, drive, train, boat, walk, other |
| travelDetails | text | |
| confirmationNumber | text | |
| travelProvider | text | |
| arrivalCity | text | |
| arrivalLocation | text | |
| arrivalDate | date | |
| arrivalTime | time | |
| arrivalTimezone | text | |
| distanceMiles | integer | |
| distanceKm | integer | |
| travelTimeHours | decimal | |
| estimatedCost | decimal | |
| travelers | uuid[] | |
| travelNotes | text | |
| status | enum | planned, confirmed, in_transit, completed, cancelled |
| createdBy | uuid | FK to profiles |
| createdAt | timestamp | |
| updatedAt | timestamp | |

---

## 3. Comparison Matrix

### 3.1 Events Comparison

| UI Field | Schema Field | Status | Notes |
|----------|--------------|--------|-------|
| id | id | ✅ Aligned | |
| date | (via day.date) | ⚠️ Indirect | Event has dayId, not date |
| location | (via day.city + day.state) | ⚠️ Indirect | Needs join |
| venue | (via venue.name) | ⚠️ Indirect | Needs join via venueId |
| status | (via day.status) | ⚠️ Indirect | Event has no status |
| capacity | (via venue.capacity) | ⚠️ Indirect | Needs join |
| showTime | eventTime | ⚠️ Name mismatch | |
| advanceStatus | advanceStatus | ⚠️ Enum mismatch | UI: 3 values, Schema: 13 |
| advanced | - | ❌ Missing | Display text, derive from status |
| loadIn | loadIn | ✅ Aligned | |
| soundCheck | soundCheck | ✅ Aligned | |
| lunch | lunch | ✅ Aligned | |
| doors | doors | ✅ Aligned | |
| setLength | setLength | ⚠️ Type mismatch | UI: string, Schema: integer |
| dinner | dinner | ✅ Aligned | |
| curfew | curfew | ✅ Aligned | |
| returnToHotelAfterSoundCheck | returnToHotelAfterSoundcheck | ⚠️ Case mismatch | |
| returnToHotelAfterShow | returnToHotelAfterEvent | ⚠️ Name mismatch | |
| dayOfContact | (via dayOfEventContactId→people.name) | ⚠️ Indirect | |
| email | (via dayOfEventContactId→people.email) | ⚠️ Indirect | |
| phone | (via dayOfEventContactId→people.phone) | ⚠️ Indirect | |
| promoter | (via promoterId→people.name) | ⚠️ Indirect | |
| promoterPrimaryContact | (via primaryPromoterContactId) | ⚠️ Indirect | |
| loadInDetails | loadInDetails | ✅ Aligned | |
| soundDetails | soundDetails | ✅ Aligned | |
| lightDetails | lightDetails | ✅ Aligned | |
| securityDetails | securityDetails | ✅ Aligned | |
| cateringDetails | cateringDetails | ✅ Aligned | |
| lunchCount | lunchCount | ⚠️ Type mismatch | UI: string, Schema: integer |
| dinnerCount | dinnerCount | ⚠️ Type mismatch | UI: string, Schema: integer |
| meetAndGreet | meetAndGreetInfo | ⚠️ Name mismatch | |
| notes | notes | ✅ Aligned | |
| hotels | - | ❌ Missing from schema | Need hotelId or hotels table |
| tixSold | - | ❌ Missing from schema | Add to events or financialDetails |
| percentSold | - | ❌ Missing from schema | Derived from tixSold/capacity |
| totalComps | - | ❌ Missing from schema | For guest list feature |
| compsRemain | - | ❌ Missing from schema | For guest list feature |
| compsUsed | - | ❌ Missing from schema | For guest list feature |

---

### 3.2 Days Comparison

| UI Field | Schema Field | Status | Notes |
|----------|--------------|--------|-------|
| id | id | ✅ Aligned | |
| date | date | ✅ Aligned | |
| dayOfWeek | - | 🗑️ Derive in UI | Calculate from date |
| dateShort | - | 🗑️ Derive in UI | Format from date |
| status | status | ⚠️ Enum mismatch | Schema has "Rescheduled" |
| city | city | ✅ Aligned | |
| state | state | ✅ Aligned | |
| country | country | ✅ Aligned | |
| timeZone | timezone | ⚠️ Case mismatch | |
| dayType | dayType | ⚠️ Enum mismatch | UI: "On Hold", Schema: "Press" |
| eventName | - | ❌ Derive from event | Join to events table |
| location | - | 🗑️ Derive in UI | Combine city + state |
| venue | - | ❌ Derive from event | Join events→venues |
| isEmpty | - | 🗑️ Derive in UI | Check if events exist |

---

### 3.3 Venues Comparison

| UI Field | Schema Field | Status | Notes |
|----------|--------------|--------|-------|
| id | id | ✅ Aligned | |
| name | name | ✅ Aligned | |
| street | address | ⚠️ Name mismatch | Rename to address |
| city | city | ✅ Aligned | |
| state | state | ✅ Aligned | |
| postalCode | postalCode | ✅ Aligned | |
| phone | phone | ✅ Aligned | |
| capacity | capacity | ⚠️ Type mismatch | UI: string, Schema: integer |
| type | venueType | ⚠️ Name mismatch | Also enum vs free text |
| website | website | ✅ Aligned | |
| stageDimensions | stageSize | ⚠️ Name mismatch | |
| dressingRoomInfo | dressingRoomCount + greenRoomInfo | ⚠️ Structure mismatch | Need text field |
| loadingDockInfo | loadInInfo | ⚠️ Name mismatch | |
| wifiInfo | wifiAvailable | ⚠️ Type mismatch | Bool vs text details |
| merchPercent | merchandiseSplit | ⚠️ Name mismatch | |
| merchContact | - | ❌ Missing from schema | Add to venues |
| laundryInfo | - | ❌ Missing from schema | Add to venues |
| busParking | parkingInfo | ⚠️ Split needed | Schema combines parking |
| parkingInstructions | parkingInfo | ⚠️ Merge needed | Schema combines parking |
| shorePower | powerAvailable | ⚠️ Name mismatch | |
| runnerInfo | - | ❌ Missing from schema | Add to venues |
| notes | notes | ✅ Aligned | |
| shows | - | 🗑️ Derive from events | Don't store |
| venueContact | productionContact / boxOfficeContact | ⚠️ Split fields | Consider consolidating |

---

### 3.4 People/Personnel Comparison

**CRITICAL INSIGHT:** The UI "Personnel" page shows **tour crew members**, which is actually a combination of:
- `profiles` table (user account data)
- `tourMembers` table (tour assignment)

The `people` table is for **external contacts** (promoters, venue staff, vendors).

| UI Field | Source Table | Status | Notes |
|----------|--------------|--------|-------|
| id | profiles.id or tourMembers.id | ⚠️ Clarify | |
| firstName | profiles.firstName | ✅ Aligned | |
| lastName | profiles.lastName | ✅ Aligned | |
| middleName | profiles.middleName | ✅ Aligned | |
| fullName | - | 🗑️ Derive in UI | firstName + lastName |
| role | tourMembers.roleOnTour | ⚠️ Name mismatch | |
| department | tourMembers.department | ✅ Aligned | |
| email | profiles.email | ✅ Aligned | |
| phone | profiles.phone | ✅ Aligned | |
| address | profiles.currentAddress | ⚠️ Name mismatch | |
| dob | profiles.dateOfBirth | ⚠️ Name mismatch | |
| company | - | ❌ Missing | Not in profiles |
| tourIds | tourMembers.tourIds | ✅ Aligned | |
| tourName | (via tour.name) | ⚠️ Indirect | Needs join |
| passportNumber | profiles.passportNumber | ✅ Aligned | |
| passportExpiration | profiles.passportExpDate | ⚠️ Name mismatch | |
| passportCountry | profiles.passportCountry | ✅ Aligned | |
| nationality | profiles.nationalityCitizenship | ⚠️ Name mismatch | |
| emergencyContactName | profiles.emergencyContactName | ✅ Aligned | |
| emergencyContactRelationship | profiles.emergencyContactRelationship | ✅ Aligned | |
| emergencyContactPhone | profiles.emergencyContactPhone | ✅ Aligned | |
| emergencyContactEmail | profiles.emergencyContactEmail | ✅ Aligned | |
| shirtSize | profiles.shirtSize | ✅ Aligned | |
| jacketSize | profiles.jacketSize | ✅ Aligned | |
| notes | tourMembers.notes | ✅ Aligned | |

---

### 3.5 Guest List - COMPLETELY MISSING SCHEMA

**⚠️ CRITICAL: No guest list table exists in the schema!**

**Required New Table: `guests` or `guestListEntries`**
```typescript
// Proposed schema
export const guests = pgTable("guests", {
  id: uuid().primaryKey().defaultRandom(),
  eventId: uuid("event_id").notNull(),  // FK to events
  organizationId: uuid("organization_id").notNull(),
  name: text("name").notNull(),
  tickets: integer("tickets").default(0),
  passes: integer("passes").default(0),
  guestType: text("guest_type"),  // VIP, M&G, Photo, etc.
  status: text("status"),  // approved, pending, declined
  affiliation: text("affiliation"),
  pickupMethod: text("pickup_method"),
  email: text("email"),
  phone: text("phone"),
  requestorId: uuid("requestor_id"),  // FK to profiles
  requestedAt: timestamp("requested_at"),
  approvedById: uuid("approved_by_id"),  // FK to profiles
  approvedAt: timestamp("approved_at"),
  seatSection: text("seat_section"),
  seatRow: text("seat_row"),
  seats: text("seats"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Also need ticket allocation tracking per event
export const eventTicketAllocations = pgTable("event_ticket_allocations", {
  id: uuid().primaryKey().defaultRandom(),
  eventId: uuid("event_id").notNull(),
  ticketType: text("ticket_type"),  // tix, vip, mng
  allowedCount: integer("allowed_count"),
  approvedCount: integer("approved_count"),  // Could be computed
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
```

---

## 4. Issues List

### 4.1 🔴 Critical Issues

| # | Issue | Location | Impact |
|---|-------|----------|--------|
| 1 | **NO GUEST LIST SCHEMA** | Missing entirely | Cannot build guest list feature |
| 2 | **advanceStatus enum has 13 values, UI only uses 3** | events.ts | Overcomplicated, confusing |
| 3 | **Tour status enum mismatch** | tours.ts | "Upcoming/Active" vs "Confirmed/In-Progress" |
| 4 | **Day status mismatch** | days.ts | UI has "On Hold", schema has "Press" |
| 5 | **Event has no hotels field** | events.ts | Critical for tour management |
| 6 | **Event has no ticket sales tracking** | events.ts | tixSold, percentSold, comps missing |
| 7 | **People table confused with Personnel** | people.ts | External contacts vs tour crew |

---

### 4.2 🟡 Naming Mismatches

| UI Field | Schema Field | Table |
|----------|--------------|-------|
| showTime | eventTime | events |
| returnToHotelAfterShow | returnToHotelAfterEvent | events |
| returnToHotelAfterSoundCheck | returnToHotelAfterSoundcheck | events (case) |
| meetAndGreet | meetAndGreetInfo | events |
| street | address | venues |
| stageDimensions | stageSize | venues |
| loadingDockInfo | loadInInfo | venues |
| shorePower | powerAvailable | venues |
| merchPercent | merchandiseSplit | venues |
| timeZone | timezone | days (case) |
| dob | dateOfBirth | profiles |
| passportExpiration | passportExpDate | profiles |
| nationality | nationalityCitizenship | profiles |

---

### 4.3 🟡 Type Mismatches

| Field | UI Type | Schema Type | Table |
|-------|---------|-------------|-------|
| capacity | string | integer | venues |
| setLength | string | integer | events |
| lunchCount | string | integer | events |
| dinnerCount | string | integer | events |
| wifiInfo | text (details) | boolean | venues |
| dressingRoomInfo | text (details) | integer (count) | venues |

---

### 4.4 🟡 Missing Schema Fields

| Field | Needed For | Suggested Table |
|-------|------------|-----------------|
| hotels | Event hotel assignments | events (hotelId FK) or new hotels table |
| tixSold | Ticket tracking | events or financialDetails |
| percentSold | Ticket tracking | Derived from tixSold/capacity |
| totalComps | Guest list | events |
| compsRemain | Guest list | Derived |
| compsUsed | Guest list | Derived |
| merchContact | Venue merch info | venues |
| laundryInfo | Venue amenities | venues |
| runnerInfo | Venue services | venues |
| company | Personnel company | profiles or separate link |

---

### 4.5 🟡 Schema Fields with No UI Purpose

These may be needed later but aren't used by current UI:

| Field | Table | Notes |
|-------|-------|-------|
| audioSystem | venues | Could add to UI venue details |
| lightingSystem | venues | Could add to UI venue details |
| soundLimiter | venues | Could add to UI venue details |
| alcoholLicense | venues | Could add to UI venue details |
| ageRestrictions | venues | Could add to UI venue details |
| settlementTerms | venues | Could add to UI venue details |
| hospitalityIncluded | venues | Could add to UI venue details |
| doorSplit | venues | Could add to UI venue details |
| cateringOptions | venues | Could add to UI venue details |
| securityRequirements | venues | Could add to UI venue details |
| boxOfficeContact | venues | UI has single venueContact |
| primaryContactFor | people | External contacts feature |
| website | people | External contacts feature |
| title | people | External contacts feature |

---

### 4.6 🟡 Overcomplicated Enums

| Enum | Current Values | UI Actually Needs |
|------|----------------|-------------------|
| advanceStatus | 13 values | 3: not_started, in_progress, completed |
| companyType | 14 values | Consider simplifying or making free text |
| venueType | 8 values | OK, but UI uses free text |

---

## 5. Recommendations

### 5.1 Immediate Schema Changes (Before Building More UI)

#### 5.1.1 Create Guest List Schema
```sql
-- New tables needed for guest list feature
CREATE TABLE guests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  name TEXT NOT NULL,
  tickets INTEGER DEFAULT 0,
  passes INTEGER DEFAULT 0,
  guest_type TEXT,
  status TEXT DEFAULT 'pending',
  affiliation TEXT,
  pickup_method TEXT,
  email TEXT,
  phone TEXT,
  requestor_id UUID REFERENCES profiles(id),
  requested_at TIMESTAMP,
  approved_by_id UUID REFERENCES profiles(id),
  approved_at TIMESTAMP,
  seat_section TEXT,
  seat_row TEXT,
  seats TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE event_ticket_allocations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id),
  ticket_type TEXT NOT NULL,
  allowed_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);
```

---

#### 5.1.2 Simplify advanceStatus Enum
```sql
-- Migration to simplify advance_status
-- FROM: 13 values
-- TO: 3 values
ALTER TYPE advance_status RENAME TO advance_status_old;
CREATE TYPE advance_status AS ENUM ('not_started', 'in_progress', 'completed');

-- Update existing data (map old values to new)
UPDATE events SET advance_status = 
  CASE 
    WHEN advance_status_old IN ('not_started') THEN 'not_started'::advance_status
    WHEN advance_status_old IN ('initial_contact', 'in_progress', 'waiting_response', 
      'tech_rider_sent', 'hospitality_rider_sent', 'contracts_pending', 
      'deposits_pending', 'advance_scheduled') THEN 'in_progress'::advance_status
    WHEN advance_status_old IN ('advance_completed', 'day_of_confirmed') THEN 'completed'::advance_status
    ELSE 'not_started'::advance_status
  END;

DROP TYPE advance_status_old;
```

---

#### 5.1.3 Fix Tour Status Enum
```sql
-- Change tour_status to match UI
ALTER TYPE tour_status RENAME VALUE 'Upcoming' TO 'Confirmed';
ALTER TYPE tour_status RENAME VALUE 'Active' TO 'In-Progress';
```

---

#### 5.1.4 Fix Day Type Enum
```sql
-- Add 'On Hold' to day_type
ALTER TYPE day_type ADD VALUE 'On Hold';
-- Keep 'Press' for backward compatibility or remove if unused
```

---

#### 5.1.5 Add Missing Event Fields
```sql
-- Add ticket tracking to events
ALTER TABLE events ADD COLUMN tickets_sold INTEGER DEFAULT 0;
ALTER TABLE events ADD COLUMN total_comps INTEGER DEFAULT 0;
ALTER TABLE events ADD COLUMN comps_used INTEGER DEFAULT 0;

-- Add hotel reference (or create hotels table)
ALTER TABLE events ADD COLUMN hotel_notes TEXT;
-- OR create a hotels table and add hotel_id FK
```

---

#### 5.1.6 Add Missing Venue Fields
```sql
ALTER TABLE venues ADD COLUMN merch_contact TEXT;
ALTER TABLE venues ADD COLUMN laundry_info TEXT;
ALTER TABLE venues ADD COLUMN runner_info TEXT;
ALTER TABLE venues ADD COLUMN wifi_details TEXT;  -- Keep wifiAvailable as bool, add details
ALTER TABLE venues ADD COLUMN dressing_room_info TEXT;  -- Add text in addition to count
```

---

### 5.2 Naming Standardization

Adopt **UI naming conventions** in schema where they make more sense:

| Current Schema | Change To | Reason |
|----------------|-----------|--------|
| eventTime | showTime | Industry standard |
| returnToHotelAfterEvent | returnToHotelAfterShow | Clearer |
| meetAndGreetInfo | meetAndGreet | Simpler |
| stageSize | stageDimensions | More descriptive |
| loadInInfo | loadingDockInfo | UI terminology |
| powerAvailable | shorePower | Industry term |
| nationalityCitizenship | nationality | Simpler |

---

### 5.3 Type Standardization

| Field | Current | Change To | Notes |
|-------|---------|-----------|-------|
| venues.capacity | integer | Keep integer | Fix UI to handle number |
| events.setLength | integer | Keep integer | Fix UI to handle number |
| events.lunchCount | integer | Keep integer | Fix UI to handle number |
| events.dinnerCount | integer | Keep integer | Fix UI to handle number |
| venues.dressingRoomCount | integer | Add dressingRoomInfo (text) | Keep both |
| venues.wifiAvailable | boolean | Add wifiDetails (text) | Keep both |

---

### 5.4 Derived Fields - DO NOT Add to Schema

These should be calculated in the UI/API, not stored:

- `fullName` - Derive from firstName + lastName
- `dayOfWeek` - Calculate from date
- `dateShort` - Format from date
- `location` - Combine city + state
- `isEmpty` - Check if events exist for day
- `percentSold` - Calculate from ticketsSold / capacity
- `compsRemain` - Calculate from totalComps - compsUsed
- `shows` (on venues) - Query events by venueId

---

### 5.5 Clarify People vs Personnel

Document the distinction clearly:

| Concept | Table(s) | Purpose |
|---------|----------|---------|
| **Tour Personnel** | profiles + tourMembers | Internal team members on tour |
| **External Contacts** | people + companies | Promoters, venue staff, vendors |

The UI "Personnel" page should query:
```sql
SELECT p.*, tm.roleOnTour, tm.department 
FROM profiles p
JOIN tour_members tm ON tm.profileId = p.id
WHERE tm.tourIds = :currenttourIds
```

---

## 6. Migration Priority

### Phase 1: Critical (Before Any More UI Work)
1. ✅ Create guest list tables
2. ✅ Simplify advanceStatus enum (13 → 3)
3. ✅ Add missing event fields (tickets, hotels)
4. ✅ Fix tour status enum

### Phase 2: Important (Next Sprint)
5. Add missing venue fields
6. Rename mismatched fields for consistency
7. Add day type "On Hold"

### Phase 3: Nice to Have (Later)
8. Add type annotations for string→number fields
9. Document derived field calculations
10. Create hotels table if needed

---

## 7. Questions for Stakeholder

Before proceeding with migrations, please confirm:

1. **Guest List**: Is the mockGuestList.ts structure accurate for your needs? Any additional fields?

2. **advanceStatus**: Is the 3-value simplification (not_started, in_progress, completed) sufficient, or do you need finer granularity?

3. **Hotels**: Should we create a full `hotels` table with relationships to events, or is a simple `hotelNotes` text field on events sufficient for MVP?

4. **Ticket Tracking**: Should ticket sales (tixSold, comps) live on the `events` table or in `financialDetails`?

5. **Venue Type**: Keep the 8-value enum or switch to free text like the UI uses?

6. **Tour Status**: Confirm "Confirmed/In-Progress/Completed/Cancelled" is the desired set of values.

---

**Document Prepared By:** Claude  
**Review Status:** Awaiting stakeholder review  
**Next Steps:** Address questions, then begin Phase 1 migrations
