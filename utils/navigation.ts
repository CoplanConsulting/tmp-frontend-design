import {
  Calendar,
  FileText,
  Home,
  Hotel,
  MapPin,
  Mic,
  Truck,
  Users,
  CalendarDays,
  Contact,
  UserCog,
  Building2
} from 'lucide-vue-next'
import type { Component } from 'vue'

// Navigation item with icon
export interface NavigationItem {
  title: string
  url: string
  icon?: Component
  isActive?: boolean
}

// Navigation section (group of items)
export interface NavigationSection {
  title: string
  items: NavigationItem[]
}

// Main navigation sections for the sidebar
export const navigationSections: NavigationSection[] = [
  {
    title: 'Navigation',
    items: [
      { title: 'Dashboard', icon: Home, url: '/dashboard' },
      { title: 'Days', icon: CalendarDays, url: '/days/day' },
      { title: 'Events', icon: Mic, url: '/events' },
      { title: 'Calendar', icon: Calendar, url: '/calendar' },
      { title: 'Personnel', icon: UserCog, url: '/personnel' },
      { title: 'Guest List', icon: Users, url: '/guest-list/1' },
      { title: 'Venues', icon: MapPin, url: '/venues/1' },
      { title: 'Companies', icon: Building2, url: '/companies' },
      { title: 'Contacts', icon: Contact, url: '/contacts' }
    ]
  },
  {
    title: 'Tour',
    items: [
      { title: 'Dashboard', icon: Truck, url: '#' },
      { title: 'Calendar', icon: Hotel, url: '#' },
      { title: 'Personnel', icon: FileText, url: '#' },
      { title: 'Gear', icon: FileText, url: '#' },
      { title: 'Tour Passes', icon: FileText, url: '#' },
      { title: 'Attachments', icon: FileText, url: '#' },
      { title: 'Settings', icon: FileText, url: '#' }
    ]
  },
  {
    title: 'Organization',
    items: [
      { title: 'Dashboard', icon: Truck, url: '#' },
      { title: 'Users', icon: Hotel, url: '#' },
      { title: 'User Groups', icon: FileText, url: '#' },
      { title: 'Schedules', icon: FileText, url: '#' },
      { title: 'Guest List', icon: FileText, url: '#' },
      { title: 'Set List', icon: FileText, url: '#' },
      { title: 'Attachments', icon: FileText, url: '#' },
      { title: 'Settings', icon: FileText, url: '#' }
    ]
  }
]

// Legacy exports for backward compatibility (can be removed later)
export const navigationItems = navigationSections[0].items
export const logisticsItems = navigationSections[1].items
