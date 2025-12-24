export interface Tour {
  id: string
  name: string
  artist: string
  startDate: string
  endDate: string
  totalShows: number
  totalCrew: number
  totalDays: number
  daysLeft: number
  tourManager: string
  status: 'Confirmed' | 'In-Progress' | 'Completed' | 'Cancelled'
}

export const tours: Tour[] = [
  {
    id: '1',
    name: 'HomeComing 2025',
    artist: 'Terri Clark, Paul Brandt',
    startDate: 'Oct 14, 2025',
    endDate: 'Dec 03, 2025',
    totalShows: 34,
    totalCrew: 2,
    totalDays: 51,
    daysLeft: 94,
    tourManager: 'Steve Coplan',
    status: 'Confirmed'
  },
  {
    id: '2',
    name: 'Western Winds 2025',
    artist: 'The Blue Grass Band',
    startDate: 'May 01, 2025',
    endDate: 'Jun 15, 2025',
    totalShows: 20,
    totalCrew: 12,
    totalDays: 45,
    daysLeft: -20,
    tourManager: 'Alice Cooper',
    status: 'In-Progress'
  },
  {
    id: '3',
    name: 'Summer Revival 2024',
    artist: 'Neon Lights',
    startDate: 'Jul 05, 2024',
    endDate: 'Aug 30, 2024',
    totalShows: 25,
    totalCrew: 15,
    totalDays: 56,
    daysLeft: 0,
    tourManager: 'Robert Plant',
    status: 'Completed'
  },
  {
    id: '4',
    name: 'Coast to Coast 2024',
    artist: 'The Wanderers',
    startDate: 'Mar 10, 2024',
    endDate: 'Apr 25, 2024',
    totalShows: 18,
    totalCrew: 8,
    totalDays: 46,
    daysLeft: 0,
    tourManager: 'James Taylor',
    status: 'Completed'
  },
  {
    id: '5',
    name: 'Legacy Tour 2022',
    artist: 'Old School Legends',
    startDate: 'Sep 01, 2022',
    endDate: 'Oct 31, 2022',
    totalShows: 40,
    totalCrew: 20,
    totalDays: 61,
    daysLeft: 0,
    tourManager: 'Mick Jagger',
    status: 'Completed'
  },
  {
    id: '6',
    name: 'Midnight Run 2022',
    artist: 'Dark Echoes',
    startDate: 'Jan 15, 2022',
    endDate: 'Feb 28, 2022',
    totalShows: 15,
    totalCrew: 5,
    totalDays: 44,
    daysLeft: 0,
    tourManager: 'David Bowie',
    status: 'Completed'
  }
];