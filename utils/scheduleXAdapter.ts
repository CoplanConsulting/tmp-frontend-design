/**
 * Schedule-X Adapter
 * Transforms mock data to schedule-x calendar event format
 */

import type { CalendarDay } from './mockData'
import { DAY_TYPE_CONFIG } from './mockData/types'

/**
 * Transform CalendarDay array to Schedule-X event format
 * Uses Temporal API as required by schedule-x
 */
export function transformCalendarDaysToEvents(
  calendarDays: CalendarDay[]
) {
  return calendarDays.map((day) => {
    const config = DAY_TYPE_CONFIG[day.dayType]

    // For show days with events, use venue name
    const title = day.hasEvent && day.venueName
      ? day.venueName
      : config?.label || day.dayType

    // Convert YYYY-MM-DD to Temporal.PlainDate for all-day events
    const start = Temporal.PlainDate.from(day.date)
    const end = Temporal.PlainDate.from(day.date)

    return {
      id: day.eventId || `day-${day.date}`,
      title,
      start,
      end,
      calendarId: day.dayType.toLowerCase().replace(/\s+/g, '-'), // e.g., "show-day"
      location: day.location,
      _customData: {
        dayType: day.dayType,
        hasEvent: day.hasEvent,
        eventId: day.eventId,
        venueName: day.venueName,
        location: day.location,
        clickable: day.hasEvent && !!day.eventId,
      },
    }
  })
}

/**
 * Get calendar configurations for day types
 * Maps to schedule-x calendar IDs with colors
 */
export function getCalendarConfigs() {
  return Object.entries(DAY_TYPE_CONFIG).map(([dayType, config]) => ({
    calendarId: dayType.toLowerCase().replace(/\s+/g, '-'),
    label: config.label,
    colorName: config.color,
    lightColors: {
      main: getTailwindColor(config.color),
      container: getTailwindColor(config.color, 0.1),
      onContainer: getTailwindColor(config.color),
    },
    darkColors: {
      main: getTailwindColor(config.color),
      container: getTailwindColor(config.color, 0.2),
      onContainer: getTailwindColor(config.color),
    },
  }))
}

/**
 * Extract hex color from Tailwind class
 * Simplified mapping - extend as needed
 */
function getTailwindColor(twClass: string, opacity: number = 1): string {
  const colorMap: Record<string, string> = {
    'bg-green-500': '#22c55e',
    'bg-blue-500': '#3b82f6',
    'bg-gray-400': '#9ca3af',
    'bg-purple-500': '#a855f7',
    'bg-orange-500': '#f97316',
    'bg-yellow-500': '#eab308',
  }

  const baseColor = colorMap[twClass] || '#9ca3af'

  if (opacity === 1) return baseColor

  // Convert hex to rgba with opacity
  const hex = baseColor.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}
