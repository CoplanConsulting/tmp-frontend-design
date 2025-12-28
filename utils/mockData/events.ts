/**
 * Events Data - HomeComing 2025
 * 
 * All 34 shows on the tour. Each event links to:
 * - A day (dayId)
 * - A venue (venueId)
 * - A hotel (hotelId)
 * - Contacts (dayOfShowContactId, promoterId)
 */

import type { Event } from './types'

export const events: Event[] = [
  // Show 1: Moncton (Rehearsal - day-3)
  {
    id: 'event-1',
    organizationId: 'org-1',
    dayId: 'day-3',
    venueId: 'venue-1',
    hotelId: 'hotel-1',
    advanceStatus: 'completed',

    // Schedule
    crewDepartHotel: '11:30 am',
    loadIn: '1:00pm',
    soundCheck: '4:00pm',
    doors: '6:00pm',
    showTime: '8:00pm',
    showEnds: '10:00pm',
    loadOut: '10:10pm',
    curfew: '11:30pm',
    setLength: 75,

    // Meals (legacy fields - keeping for now)
    lunch: '12:00pm',
    lunchCount: 15,
    dinner: '5:00pm',
    dinnerCount: 15,

    // Logistics
    returnToHotelAfterSoundcheck: false,
    returnToHotelAfterShow: true,

    // Contacts
    dayOfShowContactId: 'contact-1',
    promoterId: 'contact-2',
    primaryPromoterContactId: 'contact-2',

    // NEW: Structured Production Data
    production: {
      loadInDetails: 'Using rear dock, ground level access. 2 semis arriving at 1:00pm.',
      soundDetails: 'Using venue house PA (d&b audiotechnik) supplemented with our digital console (Avid S6L). FOH position center floor.',
      lightDetails: 'Full touring lighting rig - 40 LED moving fixtures, 12 par cans, 2 followspots. Rigging crew required for overhead points.',
      backlineDetails: 'Complete artist backline provided: 2x Yamaha CP88 keyboards, Pearl drum kit with hardware, 4x guitar stands.',
      videoDetails: 'IMAG system with 2 camera setup, 16x9 LED screens stage left and right.',
      stagingDetails: '8x8 drum riser (center rear), 4x8 keyboard riser (stage right), black stage deck required.',
      securityDetails: '4 security personnel required - 2 for stage barriers, 2 for backstage/dressing room access.',
      cateringDetails: 'Hot dinner for 20 people at 5:00pm in catering area. Vegetarian and vegan options required. Coffee/tea service all day.',
      meetAndGreet: '30 minute meet & greet scheduled for 7:15pm in green room. Max 20 guests. Photo op setup needed.',
    },

    // NEW: Facilities
    facilities: {
      catering: {
        breakfast: { time: '10:00am', count: 12, notes: 'Continental breakfast setup' },
        lunch: { time: '12:00pm', count: 15, notes: 'Sandwiches and salads' },
        dinner: { time: '5:00pm', count: 15, notes: 'Hot meal, vegetarian and vegan options required' },
        specialRequests: 'Gluten-free options needed for 2 crew members',
      },
      parking: {
        trucks: '2 semis arriving 1:00pm, departing 11:30pm',
        buses: '1 tour bus overnight parking, shore power required',
        notes: 'Confirm bus parking location with venue day prior',
      },
      it: {
        requirements: 'Hardline ethernet connection needed for merchandise POS system and live stream feed',
        notes: 'Venue WiFi available but prefer wired connection for reliability',
      },
    },

    // NEW: Logistics
    logistics: {
      airportNotes: 'Greater Moncton Roméo LeBlanc International Airport (YQM) - 15 minutes from venue, 20 minutes from hotel',
      groundTransport: 'Buses depart hotel at 11:00am for venue. Return buses available immediately after load out.',
      areaBusiness: 'Long & McQuade music store 10 minutes away for emergency gear needs. Canadian Tire for general supplies.',
      areaRestaurants: 'Pump House Brewery next door (excellent for crew meals). St. James Gate (Irish pub) 5 min walk. Tim Hortons across street.',
      pointsOfInterest: 'Hopewell Rocks (30min drive), Magnetic Hill (15min). Downtown Moncton has good shopping and restaurants.',
      directions: 'From hotel: Take Main Street east for 2km, venue on right after casino entrance. Look for "Event Centre" signage.',
    },

    // NEW: Local Crew
    localCrew: {
      union: 'IATSE Local 849 (Moncton)',
      minimumIn: 4,
      minimumOut: 6,
      penalties: 'Time and half after 12 hours, double time after 16 hours. Meal breaks required every 5 hours.',
      notes: 'Rigging crew required for overhead points. Request same crew for load in/out if possible for efficiency.',
    },

    // NEW: Labor Call
    laborCall: {
      entries: [
        { time: '1:00 PM', call: 'Load In', type: 'Loaders', count: 4, notes: 'General labor, no special skills required' },
        { time: '2:00 PM', call: 'Rigging', type: 'Riggers', count: 2, notes: 'Certified riggers for overhead lighting points' },
        { time: '2:30 PM', call: 'Audio Setup', type: 'Audio', count: 2, notes: 'Assist with PA setup and cable runs' },
        { time: '2:30 PM', call: 'Lighting Hang', type: 'Lighting', count: 3, notes: 'Includes 1 rigger for overhead work' },
        { time: '3:30 PM', call: 'Staging Setup', type: 'Stage Hands', count: 2, notes: 'Risers, deck, barriers' },
        { time: '10:10 PM', call: 'Load Out', type: 'Loaders', count: 6, notes: 'All hands for strike and pack' },
      ],
      currency: 'CAD',
      totalCost: 3200,
      notes: 'Rates: Loaders $32/hr, Audio/Lighting $38/hr, Riggers $42/hr. Local steward fee $50.',
    },

    // Ticket tracking
    capacity: 1701,
    ticketsSold: 0,
    totalComps: 30,
    compsUsed: 0,

    // Notes
    notes: 'Rehearsal day - full production setup. This is a private rehearsal, no audience. Use this day to dial in all technical elements before tomorrow\'s opening night.',
  },
  
  // Show 2: Moncton (day-4)
  {
    id: 'event-2',
    dayId: 'day-4',
    venueId: 'venue-1',
    hotelId: 'hotel-1',
    advanceStatus: 'completed',
    loadIn: '10:00 AM',
    soundCheck: '4:00 PM',
    doors: '7:00 PM',
    showTime: '8:00 PM',
    curfew: '11:00 PM',
    setLength: 120,
    lunch: '12:00 PM',
    lunchCount: 15,
    dinner: '5:00 PM',
    dinnerCount: 15,
    dayOfShowContactId: 'contact-1',
    promoterId: 'contact-2',
    capacity: 1701,
    ticketsSold: 1400,
    totalComps: 30,
    compsUsed: 4,
    notes: 'First show of tour!',
  },
  
  // Show 3: Truro (day-5)
  {
    id: 'event-3',
    dayId: 'day-5',
    venueId: 'venue-2',
    hotelId: 'hotel-2',
    advanceStatus: 'in-progress',
    loadIn: '10:00 AM',
    soundCheck: '4:00 PM',
    doors: '7:00 PM',
    showTime: '8:00 PM',
    curfew: '11:00 PM',
    setLength: 120,
    lunch: '12:00 PM',
    lunchCount: 15,
    dinner: '5:00 PM',
    dinnerCount: 15,
    dayOfShowContactId: 'contact-3',
    promoterId: 'contact-2',
    capacity: 1796,
    ticketsSold: 1200,
    totalComps: 25,
    compsUsed: 0,
  },
  
  // Show 4: St. John's (day-7)
  {
    id: 'event-4',
    dayId: 'day-7',
    venueId: 'venue-3',
    hotelId: 'hotel-3',
    advanceStatus: 'in-progress',
    loadIn: '10:00 AM',
    soundCheck: '4:00 PM',
    doors: '7:00 PM',
    showTime: '8:00 PM',
    curfew: '11:00 PM',
    setLength: 120,
    dayOfShowContactId: 'contact-4',
    promoterId: 'contact-2',
    capacity: 1000,
    ticketsSold: 850,
    totalComps: 20,
    compsUsed: 0,
  },
  
  // Show 5: St. John's (day-8)
  {
    id: 'event-5',
    dayId: 'day-8',
    venueId: 'venue-3',
    hotelId: 'hotel-3',
    advanceStatus: 'in-progress',
    loadIn: '12:00 PM',
    soundCheck: '4:00 PM',
    doors: '7:00 PM',
    showTime: '8:00 PM',
    curfew: '11:00 PM',
    setLength: 120,
    dayOfShowContactId: 'contact-4',
    promoterId: 'contact-2',
    capacity: 1000,
    ticketsSold: 920,
    totalComps: 20,
    compsUsed: 0,
  },
  
  // Show 6: Ottawa (day-10)
  {
    id: 'event-6',
    dayId: 'day-10',
    venueId: 'venue-4',
    hotelId: 'hotel-4',
    advanceStatus: 'not-started',
    doors: '7:00 PM',
    showTime: '8:00 PM',
    setLength: 120,
    dayOfShowContactId: 'contact-5',
    promoterId: 'contact-2',
    capacity: 955,
    ticketsSold: 0,
    totalComps: 20,
    compsUsed: 0,
  },
  
  // Show 7: Oshawa (day-11)
  {
    id: 'event-7',
    dayId: 'day-11',
    venueId: 'venue-5',
    hotelId: 'hotel-5',
    advanceStatus: 'not-started',
    doors: '7:00 PM',
    showTime: '8:00 PM',
    setLength: 120,
    capacity: 5100,
    ticketsSold: 0,
    totalComps: 40,
    compsUsed: 0,
  },
  
  // Show 8: Owen Sound (day-12)
  {
    id: 'event-8',
    dayId: 'day-12',
    venueId: 'venue-6',
    hotelId: 'hotel-6',
    advanceStatus: 'not-started',
    doors: '7:00 PM',
    showTime: '8:00 PM',
    setLength: 120,
    capacity: 3500,
    ticketsSold: 0,
    totalComps: 30,
    compsUsed: 0,
  },
  
  // Show 9: London (day-14)
  {
    id: 'event-9',
    dayId: 'day-14',
    venueId: 'venue-7',
    hotelId: 'hotel-7',
    advanceStatus: 'not-started',
    doors: '7:00 PM',
    showTime: '8:00 PM',
    setLength: 120,
    capacity: 1729,
    ticketsSold: 0,
    totalComps: 25,
    compsUsed: 0,
  },
  
  // Show 10: Peterborough (day-15)
  {
    id: 'event-10',
    dayId: 'day-15',
    venueId: 'venue-8',
    hotelId: 'hotel-8',
    advanceStatus: 'not-started',
    doors: '7:00 PM',
    showTime: '8:00 PM',
    setLength: 120,
    capacity: 647,
    ticketsSold: 0,
    totalComps: 15,
    compsUsed: 0,
  },
  
  // Show 11: Peterborough (day-16)
  {
    id: 'event-11',
    dayId: 'day-16',
    venueId: 'venue-8',
    hotelId: 'hotel-8',
    advanceStatus: 'not-started',
    doors: '7:00 PM',
    showTime: '8:00 PM',
    setLength: 120,
    capacity: 647,
    ticketsSold: 0,
    totalComps: 15,
    compsUsed: 0,
  },
  
  // Show 12: Kitchener (day-17)
  {
    id: 'event-12',
    dayId: 'day-17',
    venueId: 'venue-9',
    hotelId: 'hotel-9',
    advanceStatus: 'not-started',
    doors: '7:00 PM',
    showTime: '8:00 PM',
    setLength: 120,
    capacity: 2047,
    ticketsSold: 0,
    totalComps: 30,
    compsUsed: 0,
  },
  
  // Show 13: Niagara Falls (day-19)
  {
    id: 'event-13',
    dayId: 'day-19',
    venueId: 'venue-10',
    hotelId: 'hotel-10',
    advanceStatus: 'not-started',
    doors: '7:00 PM',
    showTime: '8:00 PM',
    setLength: 120,
    capacity: 1500,
    ticketsSold: 0,
    totalComps: 25,
    compsUsed: 0,
  },
  
  // Show 14: Belleville (day-20)
  {
    id: 'event-14',
    dayId: 'day-20',
    venueId: 'venue-11',
    hotelId: 'hotel-11',
    advanceStatus: 'not-started',
    doors: '7:00 PM',
    showTime: '8:00 PM',
    setLength: 120,
    capacity: 700,
    ticketsSold: 0,
    totalComps: 15,
    compsUsed: 0,
  },
  
  // Show 15: Thunder Bay (day-23)
  {
    id: 'event-15',
    dayId: 'day-23',
    venueId: 'venue-12',
    hotelId: 'hotel-11',
    advanceStatus: 'not-started',
    doors: '7:00 PM',
    showTime: '8:00 PM',
    setLength: 120,
    capacity: 1500,
    ticketsSold: 0,
    totalComps: 25,
    compsUsed: 0,
  },
  
  // Show 16: Winnipeg (day-25)
  {
    id: 'event-16',
    dayId: 'day-25',
    venueId: 'venue-13',
    hotelId: 'hotel-12',
    advanceStatus: 'not-started',
    doors: '7:00 PM',
    showTime: '8:00 PM',
    setLength: 120,
    capacity: 1671,
    ticketsSold: 0,
    totalComps: 25,
    compsUsed: 0,
  },
  
  // Show 17: Brandon (day-26)
  {
    id: 'event-17',
    dayId: 'day-26',
    venueId: 'venue-14',
    hotelId: 'hotel-13',
    advanceStatus: 'not-started',
    doors: '7:00 PM',
    showTime: '8:00 PM',
    setLength: 120,
    capacity: 900,
    ticketsSold: 0,
    totalComps: 20,
    compsUsed: 0,
  },
  
  // Show 18: Yorkton (day-27)
  {
    id: 'event-18',
    dayId: 'day-27',
    venueId: 'venue-15',
    hotelId: 'hotel-11',
    advanceStatus: 'not-started',
    doors: '7:00 PM',
    showTime: '8:00 PM',
    setLength: 120,
    capacity: 700,
    ticketsSold: 0,
    totalComps: 15,
    compsUsed: 0,
  },
  
  // Show 19: Bonnyville (day-30)
  {
    id: 'event-19',
    dayId: 'day-30',
    venueId: 'venue-16',
    hotelId: 'hotel-11',
    advanceStatus: 'not-started',
    doors: '7:00 PM',
    showTime: '8:00 PM',
    setLength: 120,
    capacity: 1000,
    ticketsSold: 0,
    totalComps: 20,
    compsUsed: 0,
  },
  
  // Show 20: Saskatoon (day-31)
  {
    id: 'event-20',
    dayId: 'day-31',
    venueId: 'venue-17',
    hotelId: 'hotel-14',
    advanceStatus: 'not-started',
    doors: '7:00 PM',
    showTime: '8:00 PM',
    setLength: 120,
    capacity: 2003,
    ticketsSold: 0,
    totalComps: 30,
    compsUsed: 0,
  },
  
  // Show 21: Regina (day-32)
  {
    id: 'event-21',
    dayId: 'day-32',
    venueId: 'venue-18',
    hotelId: 'hotel-15',
    advanceStatus: 'not-started',
    doors: '7:00 PM',
    showTime: '8:00 PM',
    setLength: 120,
    capacity: 2029,
    ticketsSold: 0,
    totalComps: 30,
    compsUsed: 0,
  },
  
  // Show 22: Medicine Hat (day-33)
  {
    id: 'event-22',
    dayId: 'day-33',
    venueId: 'venue-19',
    hotelId: 'hotel-11',
    advanceStatus: 'not-started',
    doors: '7:00 PM',
    showTime: '8:00 PM',
    setLength: 120,
    capacity: 6500,
    ticketsSold: 0,
    totalComps: 50,
    compsUsed: 0,
  },
  
  // Show 23: Calgary (day-34)
  {
    id: 'event-23',
    dayId: 'day-34',
    venueId: 'venue-20',
    hotelId: 'hotel-16',
    advanceStatus: 'not-started',
    doors: '7:00 PM',
    showTime: '8:00 PM',
    setLength: 120,
    capacity: 2538,
    ticketsSold: 0,
    totalComps: 35,
    compsUsed: 0,
  },
  
  // Show 24: Red Deer (day-36)
  {
    id: 'event-24',
    dayId: 'day-36',
    venueId: 'venue-21',
    hotelId: 'hotel-17',
    advanceStatus: 'not-started',
    doors: '7:00 PM',
    showTime: '8:00 PM',
    setLength: 120,
    capacity: 6500,
    ticketsSold: 0,
    totalComps: 50,
    compsUsed: 0,
  },
  
  // Show 25: Red Deer (day-37)
  {
    id: 'event-25',
    dayId: 'day-37',
    venueId: 'venue-21',
    hotelId: 'hotel-17',
    advanceStatus: 'not-started',
    doors: '7:00 PM',
    showTime: '8:00 PM',
    setLength: 120,
    capacity: 6500,
    ticketsSold: 0,
    totalComps: 50,
    compsUsed: 0,
  },
  
  // Show 26: Edmonton (day-38)
  {
    id: 'event-26',
    dayId: 'day-38',
    venueId: 'venue-22',
    hotelId: 'hotel-18',
    advanceStatus: 'not-started',
    doors: '7:00 PM',
    showTime: '8:00 PM',
    setLength: 120,
    capacity: 2538,
    ticketsSold: 0,
    totalComps: 35,
    compsUsed: 0,
  },
  
  // Show 27: Whitecourt (day-39)
  {
    id: 'event-27',
    dayId: 'day-39',
    venueId: 'venue-23',
    hotelId: 'hotel-11',
    advanceStatus: 'not-started',
    doors: '7:00 PM',
    showTime: '8:00 PM',
    setLength: 120,
    capacity: 500,
    ticketsSold: 0,
    totalComps: 10,
    compsUsed: 0,
  },
  
  // Show 28: Kelowna (day-40)
  {
    id: 'event-28',
    dayId: 'day-40',
    venueId: 'venue-24',
    hotelId: 'hotel-19',
    advanceStatus: 'not-started',
    doors: '7:00 PM',
    showTime: '8:00 PM',
    setLength: 120,
    capacity: 847,
    ticketsSold: 0,
    totalComps: 20,
    compsUsed: 0,
  },
  
  // Show 29: Kelowna (day-41)
  {
    id: 'event-29',
    dayId: 'day-41',
    venueId: 'venue-24',
    hotelId: 'hotel-19',
    advanceStatus: 'not-started',
    doors: '7:00 PM',
    showTime: '8:00 PM',
    setLength: 120,
    capacity: 847,
    ticketsSold: 0,
    totalComps: 20,
    compsUsed: 0,
  },
  
  // Show 30: Kamloops (day-43)
  {
    id: 'event-30',
    dayId: 'day-43',
    venueId: 'venue-25',
    hotelId: 'hotel-20',
    advanceStatus: 'not-started',
    doors: '7:00 PM',
    showTime: '8:00 PM',
    setLength: 120,
    capacity: 5464,
    ticketsSold: 0,
    totalComps: 40,
    compsUsed: 0,
  },
  
  // Show 31: Nanaimo (day-44)
  {
    id: 'event-31',
    dayId: 'day-44',
    venueId: 'venue-26',
    hotelId: 'hotel-21',
    advanceStatus: 'not-started',
    doors: '7:00 PM',
    showTime: '8:00 PM',
    setLength: 120,
    capacity: 800,
    ticketsSold: 0,
    totalComps: 15,
    compsUsed: 0,
  },
  
  // Show 32: Campbell River (day-45)
  {
    id: 'event-32',
    dayId: 'day-45',
    venueId: 'venue-27',
    hotelId: 'hotel-22',
    advanceStatus: 'not-started',
    doors: '7:00 PM',
    showTime: '8:00 PM',
    setLength: 120,
    capacity: 550,
    ticketsSold: 0,
    totalComps: 10,
    compsUsed: 0,
  },
  
  // Show 33: Duncan (day-46)
  {
    id: 'event-33',
    dayId: 'day-46',
    venueId: 'venue-28',
    hotelId: 'hotel-11',
    advanceStatus: 'not-started',
    doors: '7:00 PM',
    showTime: '8:00 PM',
    setLength: 120,
    capacity: 737,
    ticketsSold: 0,
    totalComps: 15,
    compsUsed: 0,
  },
  
  // Show 34: Abbotsford (day-47)
  {
    id: 'event-34',
    dayId: 'day-47',
    venueId: 'venue-29',
    hotelId: 'hotel-23',
    advanceStatus: 'not-started',
    doors: '7:00 PM',
    showTime: '8:00 PM',
    setLength: 120,
    capacity: 7500,
    ticketsSold: 0,
    totalComps: 50,
    compsUsed: 0,
  },
  
  // Show 35: Cranbrook (day-49)
  {
    id: 'event-35',
    dayId: 'day-49',
    venueId: 'venue-30',
    hotelId: 'hotel-24',
    advanceStatus: 'not-started',
    doors: '7:00 PM',
    showTime: '8:00 PM',
    setLength: 120,
    capacity: 650,
    ticketsSold: 0,
    totalComps: 15,
    compsUsed: 0,
    notes: 'Final show of tour!',
  },
]

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

export function getEventById(id: string): Event | undefined {
  return events.find(e => e.id === id)
}

export function getEventByDayId(dayId: string): Event | undefined {
  return events.find(e => e.dayId === dayId)
}

export function getEventsByVenueId(venueId: string): Event[] {
  return events.filter(e => e.venueId === venueId)
}

export function getEventsByAdvanceStatus(status: Event['advanceStatus']): Event[] {
  return events.filter(e => e.advanceStatus === status)
}

export function getUpcomingEvents(count: number = 5): Event[] {
  // For mock purposes, return first N events that aren't completed
  return events
    .filter(e => e.advanceStatus !== 'completed')
    .slice(0, count)
}
