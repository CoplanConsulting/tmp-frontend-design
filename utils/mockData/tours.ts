/**
 * Tour Data - HomeComing 2025
 * 
 * This is the primary tour for development/demo.
 * All days, events, venues, and people reference this tour.
 */

import type { Tour, Organization, TourStats } from './types'

// =============================================================================
// TOURS
// =============================================================================

export const tours: Tour[] = [
  {
    id: 'tour-1',
    organizationId: 'org-1',
    name: 'HomeComing 2025',
    artist: 'Terri Clark & Paul Brandt',
    startDate: '2025-10-14',
    endDate: '2025-12-02',
    tourManager: 'Steve Coplan',
    status: 'Confirmed',
    totalDays: 49,
    totalShows: 34,
    completedShows: 0,
    totalCrew: 12,
  },
  {
    id: 'tour-2',
    organizationId: 'org-1',
    name: 'Western Winds 2025',
    artist: 'The Blue Grass Band',
    startDate: '2025-05-01',
    endDate: '2025-06-15',
    tourManager: 'Alice Cooper',
    status: 'In-Progress',
    totalDays: 45,
    totalShows: 20,
    completedShows: 8,
    totalCrew: 12,
  },
  {
    id: 'tour-3',
    organizationId: 'org-1',
    name: 'Summer Revival 2024',
    artist: 'Neon Lights',
    startDate: '2024-07-05',
    endDate: '2024-08-30',
    tourManager: 'Robert Plant',
    status: 'Completed',
    totalDays: 56,
    totalShows: 25,
    completedShows: 25,
    totalCrew: 15,
  },
]

// =============================================================================
// CURRENT TOUR HELPER
// =============================================================================

export const currentTour = tours[0] // HomeComing 2025

export function getTourById(id: string): Tour | undefined {
  return tours.find(t => t.id === id)
}

export function getToursByStatus(status: Tour['status']): Tour[] {
  return tours.filter(t => t.status === status)
}

// =============================================================================
// TOUR STATS (for Dashboard)
// =============================================================================

export const tourStats: TourStats = {
  tourIds: 'tour-1',
  dateRange: 'Oct 14 - Dec 2, 2025',
  totalDays: 49,
  totalShows: 34,
  completedShows: 0,
  remainingShows: 34,
  totalCrew: 12,
  nextShowDate: '2025-10-17',
  nextShowVenue: 'Casino New Brunswick',
  nextShowCity: 'Moncton, NB',
}
