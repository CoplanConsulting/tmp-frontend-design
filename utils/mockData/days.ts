/**
 * Days Data - HomeComing 2025
 * 
 * All 49 days of the tour. Each day can have 0 or 1 event.
 * Days link to the tour, events link to days.
 */

import type { Day } from './types'
import { getDayOfWeek, getDateShort, getLocation } from './types'

// Helper to create a day with derived fields
function createDay(data: Omit<Day, 'dayOfWeek' | 'dateShort' | 'location'>): Day {
  return {
    ...data,
    dayOfWeek: getDayOfWeek(data.date),
    dateShort: getDateShort(data.date),
    location: getLocation(data.city, data.state),
  }
}

export const days: Day[] = [
  // Week 1: Oct 14-20 (Maritimes)
  createDay({ 
        id: 'day-1', 
        tourIds: 'tour-1', 
        date: '2025-10-14', 
        dayType: 'Travel Day', 
        status: 'confirmed', 
        city: 'Nashville', 
        state: 'TN', 
        country: 'USA', 
        timezone: 'Central', 
        notes: 'Fly to Moncton'
    }),
  createDay({ id: 'day-2', tourIds: 'tour-1', date: '2025-10-15', dayType: 'Travel Day', status: 'confirmed', city: 'Moncton', state: 'NB', country: 'Canada', timezone: 'Atlantic' }),
  createDay({ id: 'day-3', tourIds: 'tour-1', date: '2025-10-16', dayType: 'Rehearsal', status: 'confirmed', city: 'Moncton', state: 'NB', country: 'Canada', timezone: 'Atlantic', hasEvent: true }),
  createDay({ id: 'day-4', tourIds: 'tour-1', date: '2025-10-17', dayType: 'Show Day', status: 'confirmed', city: 'Moncton', state: 'NB', country: 'Canada', timezone: 'Atlantic', hasEvent: true }),
  createDay({ id: 'day-5', tourIds: 'tour-1', date: '2025-10-18', dayType: 'Show Day', status: 'confirmed', city: 'Truro', state: 'NS', country: 'Canada', timezone: 'Atlantic', hasEvent: true }),
  createDay({ id: 'day-6', tourIds: 'tour-1', date: '2025-10-19', dayType: 'Travel Day', status: 'confirmed', city: 'Truro', state: 'NS', country: 'Canada', timezone: 'Atlantic', notes: 'Fly to St. Johns' }),
  createDay({ id: 'day-7', tourIds: 'tour-1', date: '2025-10-20', dayType: 'Show Day', status: 'confirmed', city: "St. John's", state: 'NL', country: 'Canada', timezone: 'Newfoundland', hasEvent: true }),
  
  // Week 2: Oct 21-27 (Newfoundland to Ontario)
  createDay({ id: 'day-8', tourIds: 'tour-1', date: '2025-10-21', dayType: 'Show Day', status: 'confirmed', city: "St. John's", state: 'NL', country: 'Canada', timezone: 'Newfoundland', hasEvent: true }),
  createDay({ id: 'day-9', tourIds: 'tour-1', date: '2025-10-22', dayType: 'Travel Day', status: 'confirmed', city: "St. John's", state: 'NL', country: 'Canada', timezone: 'Newfoundland', notes: 'Fly to Ottawa' }),
  createDay({ id: 'day-10', tourIds: 'tour-1', date: '2025-10-23', dayType: 'Show Day', status: 'confirmed', city: 'Ottawa', state: 'ON', country: 'Canada', timezone: 'Eastern', hasEvent: true }),
  createDay({ id: 'day-11', tourIds: 'tour-1', date: '2025-10-24', dayType: 'Show Day', status: 'confirmed', city: 'Oshawa', state: 'ON', country: 'Canada', timezone: 'Eastern', hasEvent: true }),
  createDay({ id: 'day-12', tourIds: 'tour-1', date: '2025-10-25', dayType: 'Show Day', status: 'confirmed', city: 'Owen Sound', state: 'ON', country: 'Canada', timezone: 'Eastern', hasEvent: true }),
  createDay({ id: 'day-13', tourIds: 'tour-1', date: '2025-10-26', dayType: 'Day Off', status: 'confirmed', city: 'London', state: 'ON', country: 'Canada', timezone: 'Eastern' }),
  createDay({ id: 'day-14', tourIds: 'tour-1', date: '2025-10-27', dayType: 'Show Day', status: 'confirmed', city: 'London', state: 'ON', country: 'Canada', timezone: 'Eastern', hasEvent: true }),
  
  // Week 3: Oct 28 - Nov 3 (Ontario continued)
  createDay({ id: 'day-15', tourIds: 'tour-1', date: '2025-10-28', dayType: 'Show Day', status: 'confirmed', city: 'Peterborough', state: 'ON', country: 'Canada', timezone: 'Eastern', hasEvent: true }),
  createDay({ id: 'day-16', tourIds: 'tour-1', date: '2025-10-29', dayType: 'Show Day', status: 'confirmed', city: 'Peterborough', state: 'ON', country: 'Canada', timezone: 'Eastern', hasEvent: true }),
  createDay({ id: 'day-17', tourIds: 'tour-1', date: '2025-10-30', dayType: 'Show Day', status: 'confirmed', city: 'Kitchener', state: 'ON', country: 'Canada', timezone: 'Eastern', hasEvent: true }),
  createDay({ id: 'day-18', tourIds: 'tour-1', date: '2025-10-31', dayType: 'Day Off', status: 'confirmed', city: 'Niagara Falls', state: 'ON', country: 'Canada', timezone: 'Eastern' }),
  createDay({ id: 'day-19', tourIds: 'tour-1', date: '2025-11-01', dayType: 'Show Day', status: 'confirmed', city: 'Niagara Falls', state: 'ON', country: 'Canada', timezone: 'Eastern', hasEvent: true }),
  createDay({ id: 'day-20', tourIds: 'tour-1', date: '2025-11-02', dayType: 'Show Day', status: 'confirmed', city: 'Belleville', state: 'ON', country: 'Canada', timezone: 'Eastern', hasEvent: true }),
  createDay({ id: 'day-21', tourIds: 'tour-1', date: '2025-11-03', dayType: 'Travel Day', status: 'confirmed', city: 'Belleville', state: 'ON', country: 'Canada', timezone: 'Eastern', notes: 'Drive to Thunder Bay' }),
  
  // Week 4: Nov 4-10 (Ontario to Manitoba)
  createDay({ id: 'day-22', tourIds: 'tour-1', date: '2025-11-04', dayType: 'Travel Day', status: 'confirmed', city: 'Thunder Bay', state: 'ON', country: 'Canada', timezone: 'Eastern' }),
  createDay({ id: 'day-23', tourIds: 'tour-1', date: '2025-11-05', dayType: 'Show Day', status: 'confirmed', city: 'Thunder Bay', state: 'ON', country: 'Canada', timezone: 'Eastern', hasEvent: true }),
  createDay({ id: 'day-24', tourIds: 'tour-1', date: '2025-11-06', dayType: 'Travel Day', status: 'confirmed', city: 'Thunder Bay', state: 'ON', country: 'Canada', timezone: 'Eastern', notes: 'Drive to Winnipeg' }),
  createDay({ id: 'day-25', tourIds: 'tour-1', date: '2025-11-07', dayType: 'Show Day', status: 'confirmed', city: 'Winnipeg', state: 'MB', country: 'Canada', timezone: 'Central', hasEvent: true }),
  createDay({ id: 'day-26', tourIds: 'tour-1', date: '2025-11-08', dayType: 'Show Day', status: 'confirmed', city: 'Brandon', state: 'MB', country: 'Canada', timezone: 'Central', hasEvent: true }),
  createDay({ id: 'day-27', tourIds: 'tour-1', date: '2025-11-09', dayType: 'Show Day', status: 'confirmed', city: 'Yorkton', state: 'SK', country: 'Canada', timezone: 'Central', hasEvent: true }),
  createDay({ id: 'day-28', tourIds: 'tour-1', date: '2025-11-10', dayType: 'Day Off', status: 'confirmed', city: 'Yorkton', state: 'SK', country: 'Canada', timezone: 'Central' }),
  
  // Week 5: Nov 11-17 (Saskatchewan to Alberta)
  createDay({ id: 'day-29', tourIds: 'tour-1', date: '2025-11-11', dayType: 'Day Off', status: 'confirmed', city: 'Yorkton', state: 'SK', country: 'Canada', timezone: 'Central', notes: 'Remembrance Day' }),
  createDay({ id: 'day-30', tourIds: 'tour-1', date: '2025-11-12', dayType: 'Show Day', status: 'confirmed', city: 'Bonnyville', state: 'AB', country: 'Canada', timezone: 'Mountain', hasEvent: true }),
  createDay({ id: 'day-31', tourIds: 'tour-1', date: '2025-11-13', dayType: 'Show Day', status: 'confirmed', city: 'Saskatoon', state: 'SK', country: 'Canada', timezone: 'Central', hasEvent: true }),
  createDay({ id: 'day-32', tourIds: 'tour-1', date: '2025-11-14', dayType: 'Show Day', status: 'confirmed', city: 'Regina', state: 'SK', country: 'Canada', timezone: 'Central', hasEvent: true }),
  createDay({ id: 'day-33', tourIds: 'tour-1', date: '2025-11-15', dayType: 'Show Day', status: 'confirmed', city: 'Medicine Hat', state: 'AB', country: 'Canada', timezone: 'Mountain', hasEvent: true }),
  createDay({ id: 'day-34', tourIds: 'tour-1', date: '2025-11-16', dayType: 'Show Day', status: 'confirmed', city: 'Calgary', state: 'AB', country: 'Canada', timezone: 'Mountain', hasEvent: true }),
  createDay({ id: 'day-35', tourIds: 'tour-1', date: '2025-11-17', dayType: 'Travel Day', status: 'confirmed', city: 'Calgary', state: 'AB', country: 'Canada', timezone: 'Mountain' }),
  
  // Week 6: Nov 18-24 (Alberta)
  createDay({ id: 'day-36', tourIds: 'tour-1', date: '2025-11-18', dayType: 'Show Day', status: 'confirmed', city: 'Red Deer', state: 'AB', country: 'Canada', timezone: 'Mountain', hasEvent: true }),
  createDay({ id: 'day-37', tourIds: 'tour-1', date: '2025-11-19', dayType: 'Show Day', status: 'confirmed', city: 'Red Deer', state: 'AB', country: 'Canada', timezone: 'Mountain', hasEvent: true }),
  createDay({ id: 'day-38', tourIds: 'tour-1', date: '2025-11-20', dayType: 'Show Day', status: 'confirmed', city: 'Edmonton', state: 'AB', country: 'Canada', timezone: 'Mountain', hasEvent: true }),
  createDay({ id: 'day-39', tourIds: 'tour-1', date: '2025-11-21', dayType: 'Show Day', status: 'confirmed', city: 'Whitecourt', state: 'AB', country: 'Canada', timezone: 'Mountain', hasEvent: true }),
  createDay({ id: 'day-40', tourIds: 'tour-1', date: '2025-11-22', dayType: 'Show Day', status: 'confirmed', city: 'Kelowna', state: 'BC', country: 'Canada', timezone: 'Pacific', hasEvent: true }),
  createDay({ id: 'day-41', tourIds: 'tour-1', date: '2025-11-23', dayType: 'Show Day', status: 'confirmed', city: 'Kelowna', state: 'BC', country: 'Canada', timezone: 'Pacific', hasEvent: true }),
  createDay({ id: 'day-42', tourIds: 'tour-1', date: '2025-11-24', dayType: 'Day Off', status: 'confirmed', city: 'Kelowna', state: 'BC', country: 'Canada', timezone: 'Pacific' }),
  
  // Week 7: Nov 25 - Dec 1 (British Columbia)
  createDay({ id: 'day-43', tourIds: 'tour-1', date: '2025-11-25', dayType: 'Show Day', status: 'confirmed', city: 'Kamloops', state: 'BC', country: 'Canada', timezone: 'Pacific', hasEvent: true }),
  createDay({ id: 'day-44', tourIds: 'tour-1', date: '2025-11-26', dayType: 'Show Day', status: 'confirmed', city: 'Nanaimo', state: 'BC', country: 'Canada', timezone: 'Pacific', hasEvent: true }),
  createDay({ id: 'day-45', tourIds: 'tour-1', date: '2025-11-27', dayType: 'Show Day', status: 'confirmed', city: 'Campbell River', state: 'BC', country: 'Canada', timezone: 'Pacific', hasEvent: true }),
  createDay({ id: 'day-46', tourIds: 'tour-1', date: '2025-11-28', dayType: 'Show Day', status: 'confirmed', city: 'Duncan', state: 'BC', country: 'Canada', timezone: 'Pacific', hasEvent: true }),
  createDay({ id: 'day-47', tourIds: 'tour-1', date: '2025-11-29', dayType: 'Show Day', status: 'confirmed', city: 'Abbotsford', state: 'BC', country: 'Canada', timezone: 'Pacific', hasEvent: true }),
  createDay({ id: 'day-48', tourIds: 'tour-1', date: '2025-11-30', dayType: 'On Hold', status: 'pending', city: 'Abbotsford', state: 'BC', country: 'Canada', timezone: 'Pacific', notes: 'Potential 2nd show TBD' }),
  createDay({ id: 'day-49', tourIds: 'tour-1', date: '2025-12-01', dayType: 'Show Day', status: 'confirmed', city: 'Cranbrook', state: 'BC', country: 'Canada', timezone: 'Pacific', hasEvent: true }),
  
  // Final day
  createDay({ id: 'day-50', tourIds: 'tour-1', date: '2025-12-02', dayType: 'Travel Day', status: 'confirmed', city: 'Cranbrook', state: 'BC', country: 'Canada', timezone: 'Pacific', notes: 'Fly home' }),
]

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

export function getDayById(id: string): Day | undefined {
  return days.find(d => d.id === id)
}

export function getDaysBytourIds(tourIds: string): Day[] {
  return days.filter(d => d.tourIds === tourIds)
}

export function getDaysByType(dayType: Day['dayType']): Day[] {
  return days.filter(d => d.dayType === dayType)
}

export function getShowDays(): Day[] {
  return days.filter(d => d.dayType === 'Show Day')
}

export function getDayByDate(date: string): Day | undefined {
  return days.find(d => d.date === date)
}

export function getUpcomingDays(fromDate: string = new Date().toISOString().split('T')[0], count: number = 7): Day[] {
  return days
    .filter(d => d.date >= fromDate)
    .slice(0, count)
}
