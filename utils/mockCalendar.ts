export interface CalendarEvent {
  id: string
  date: string // YYYY-MM-DD format
  title: string
  type: 'show' | 'travel' | 'off' | 'special'
}

export const calendarEvents: CalendarEvent[] = [
  // Previous month end
  { id: '1', date: '2024-11-26', title: 'Off Day - London ON', type: 'off' },
  { id: '2', date: '2024-11-27', title: 'London ON', type: 'show' },
  { id: '3', date: '2024-11-28', title: 'Peterborough ON', type: 'show' },
  { id: '4', date: '2024-11-29', title: 'Peterborough ON', type: 'show' },
  { id: '5', date: '2024-11-30', title: 'Kitchener ON', type: 'show' },
  { id: '6', date: '2024-11-31', title: 'Off Day - Niagara Falls ON', type: 'off' },

  // December 2024
  { id: '7', date: '2024-12-01', title: 'Niagara Falls ON', type: 'show' },
  { id: '8', date: '2024-12-02', title: 'Belleville ON', type: 'show' },
  { id: '9', date: '2024-12-03', title: 'Travel Day - Sault St...', type: 'travel' },
  { id: '10', date: '2024-12-04', title: 'Travel Day - Thunder...', type: 'travel' },
  { id: '11', date: '2024-12-05', title: 'Thunder Bay ON', type: 'show' },
  { id: '12', date: '2024-12-06', title: 'Travel Day - Winnipeg...', type: 'travel' },
  { id: '13', date: '2024-12-07', title: 'Winnipeg MB', type: 'show' },
  { id: '14', date: '2024-12-08', title: 'Brandon MB', type: 'show' },
  { id: '15', date: '2024-12-09', title: 'Yorkton SK', type: 'show' },
  { id: '16', date: '2024-12-10', title: 'Off Day', type: 'off' },
  { id: '17', date: '2024-12-11', title: 'Off Day', type: 'off' },
  { id: '18', date: '2024-12-12', title: 'Bonnyville AB', type: 'show' },
  { id: '19', date: '2024-12-13', title: 'Saskatoon SK', type: 'show' },
  { id: '20', date: '2024-12-14', title: 'Regina SK', type: 'show' },
  { id: '21', date: '2024-12-15', title: 'Medicine Hat AB', type: 'show' },
  { id: '22', date: '2024-12-16', title: 'Calgary AB', type: 'show' },
  { id: '23', date: '2024-12-17', title: 'Off Day - Calgary AB', type: 'off' },
  { id: '24', date: '2024-12-18', title: 'Red Deer AB', type: 'show' },
  { id: '25', date: '2024-12-19', title: 'Red Deer AB', type: 'show' },
  { id: '26', date: '2024-12-20', title: 'Edmonton AB', type: 'show' },
  { id: '27', date: '2024-12-21', title: 'Whitecourt AB', type: 'show' },
  { id: '28', date: '2024-12-22', title: 'Kelowna BC', type: 'show' },
  { id: '29', date: '2024-12-23', title: 'Kelowna BC', type: 'show' },
  { id: '30', date: '2024-12-24', title: 'Off Day - Kelowna BC', type: 'off' },
  { id: '31', date: '2024-12-25', title: 'Kamloops BC', type: 'show' },
  { id: '32', date: '2024-12-26', title: 'Nanaimo BC', type: 'show' },
  { id: '33', date: '2024-12-27', title: 'Campbell River BC', type: 'show' },
  { id: '34', date: '2024-12-28', title: 'Duncan BC', type: 'show' },
  { id: '35', date: '2024-12-29', title: 'Abbotsford BC', type: 'show' },
  { id: '36', date: '2024-12-30', title: 'Travel Day - Cranbrook...', type: 'travel' },

  // Next month start
  { id: '37', date: '2025-01-01', title: 'Cranbrook BC', type: 'show' },
  { id: '38', date: '2025-01-02', title: 'Hold - 2nd Show Cranbrook', type: 'special' },
]

export const eventTypeConfig = {
  show: {
    label: 'Show Day',
    color: 'bg-green-500 hover:bg-green-600',
    textColor: 'text-white'
  },
  travel: {
    label: 'Travel Day',
    color: 'bg-blue-500 hover:bg-blue-600',
    textColor: 'text-white'
  },
  off: {
    label: 'Off Day',
    color: 'bg-gray-500 hover:bg-gray-600',
    textColor: 'text-white'
  },
  special: {
    label: 'Special Event',
    color: 'bg-purple-500 hover:bg-purple-600',
    textColor: 'text-white'
  }
}

export function getEventsForDate(date: Date): CalendarEvent[] {
  const dateStr = date.toISOString().split('T')[0]
  return calendarEvents.filter(event => event.date === dateStr)
}

export function getEventTypeColor(type: CalendarEvent['type']): string {
  return eventTypeConfig[type].color
}

export function getEventTypeLabel(type: CalendarEvent['type']): string {
  return eventTypeConfig[type].label
}
