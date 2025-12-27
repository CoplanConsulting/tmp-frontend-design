/**
 * User Groups Data - HomeComing 2025
 *
 * Permission groups for organizing users with role-based access control
 */

import type { UserGroup } from './types'

export const userGroups: UserGroup[] = [
  // Admin group - full access
  {
    id: 'group-1',
    organizationId: 'org-1',
    name: 'Administrators',
    description: 'Full access to all features and settings',
    permissions: {
      tours: { view: true, edit: true, delete: true },
      events: { view: true, edit: true, delete: true },
      personnel: { view: true, edit: true, delete: true },
      guests: { view: true, edit: true, delete: true },
      venues: { view: true, edit: true, delete: true },
      settings: { view: true, edit: true },
    },
    userCount: 2,
    createdAt: '2023-01-15T00:00:00Z',
    updatedAt: '2023-01-15T00:00:00Z',
  },

  // Manager group - can view and edit most things, but not delete
  {
    id: 'group-2',
    organizationId: 'org-1',
    name: 'Tour Managers',
    description: 'Can manage tour operations and events',
    permissions: {
      tours: { view: true, edit: true, delete: false },
      events: { view: true, edit: true, delete: false },
      personnel: { view: true, edit: true, delete: false },
      guests: { view: true, edit: true, delete: false },
      venues: { view: true, edit: true, delete: false },
      settings: { view: true, edit: false },
    },
    userCount: 2,
    createdAt: '2023-02-01T00:00:00Z',
    updatedAt: '2023-02-01T00:00:00Z',
  },

  // Editor group - can view and edit their areas
  {
    id: 'group-3',
    organizationId: 'org-1',
    name: 'Crew Members',
    description: 'Can view and edit event details and personnel',
    permissions: {
      tours: { view: true, edit: false, delete: false },
      events: { view: true, edit: true, delete: false },
      personnel: { view: true, edit: false, delete: false },
      guests: { view: true, edit: true, delete: false },
      venues: { view: true, edit: false, delete: false },
      settings: { view: false, edit: false },
    },
    userCount: 3,
    createdAt: '2023-03-01T00:00:00Z',
    updatedAt: '2023-03-01T00:00:00Z',
  },

  // Viewer group - read-only access
  {
    id: 'group-4',
    organizationId: 'org-1',
    name: 'Viewers',
    description: 'Read-only access to tour information',
    permissions: {
      tours: { view: true, edit: false, delete: false },
      events: { view: true, edit: false, delete: false },
      personnel: { view: true, edit: false, delete: false },
      guests: { view: true, edit: false, delete: false },
      venues: { view: true, edit: false, delete: false },
      settings: { view: false, edit: false },
    },
    userCount: 2,
    createdAt: '2023-04-01T00:00:00Z',
    updatedAt: '2023-04-01T00:00:00Z',
  },

  // Production team - specific permissions for production crew
  {
    id: 'group-5',
    organizationId: 'org-1',
    name: 'Production Team',
    description: 'Production crew with event and venue management access',
    permissions: {
      tours: { view: true, edit: false, delete: false },
      events: { view: true, edit: true, delete: false },
      personnel: { view: true, edit: false, delete: false },
      guests: { view: true, edit: false, delete: false },
      venues: { view: true, edit: true, delete: false },
      settings: { view: false, edit: false },
    },
    userCount: 0,
    createdAt: '2023-05-01T00:00:00Z',
    updatedAt: '2023-05-01T00:00:00Z',
  },
]

// Helper functions
export function getUserGroupById(id: string): UserGroup | undefined {
  return userGroups.find(g => g.id === id)
}

export function getUserGroupsByOrganizationId(organizationId: string): UserGroup[] {
  return userGroups.filter(g => g.organizationId === organizationId)
}

export function searchUserGroups(query: string): UserGroup[] {
  const q = query.toLowerCase()
  return userGroups.filter(g =>
    g.name.toLowerCase().includes(q) ||
    g.description?.toLowerCase().includes(q)
  )
}
