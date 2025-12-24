export interface StatCard {
  title: string
  value: string | number
  subtitle: string
  icon: string
}

export interface TourEvent {
  id: string
  day: string
  date: string
  eventType: string
  venue: string
  location: string
}

export const statsCards: StatCard[] = [
  {
    title: 'Dates',
    value: 'Oct 14 - Dec 1 2025',
    subtitle: '49 Total Days',
    icon: 'calendar'
  },
  {
    title: 'Show Count',
    value: '34',
    subtitle: '0 Completed - 34 Remain',
    icon: 'mic'
  },
  {
    title: 'Tour Personnel',
    value: '10',
    subtitle: 'Active team members on tour',
    icon: 'users'
  },
  {
    title: 'Next Show Day',
    value: 'Oct 17',
    subtitle: 'Moncton NB',
    icon: 'map-pin'
  }
]

export const tourSchedule: TourEvent[] = [
  {
    id: '1',
    day: 'WED',
    date: 'Oct 15, 2025',
    eventType: 'Travel Day',
    venue: 'Casino New Brunswick',
    location: 'Moncton NB'
  },
  {
    id: '2',
    day: 'THU',
    date: 'Oct 16, 2025',
    eventType: 'Rehearsal Day',
    venue: 'Casino New Brunswick',
    location: 'Moncton NB'
  },
  {
    id: '3',
    day: 'FRI',
    date: 'Oct 17, 2025',
    eventType: 'Show Day',
    venue: 'Casino New Brunswick',
    location: 'Moncton NB'
  },
  {
    id: '4',
    day: 'SAT',
    date: 'Oct 18, 2025',
    eventType: 'Show Day',
    venue: 'Rath Eastlink Community Centre',
    location: 'Truro NS'
  },
  {
    id: '5',
    day: 'SUN',
    date: 'Oct 19, 2025',
    eventType: 'Travel Day',
    venue: 'St. John\'s NL',
    location: ''
  },
  {
    id: '6',
    day: 'MON',
    date: 'Oct 20, 2025',
    eventType: 'Show Day',
    venue: 'Holy Heart Theatre',
    location: 'St. John\'s NL'
  }
]
