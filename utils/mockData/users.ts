/**
 * Users Data - HomeComing 2025
 *
 * Application users with authentication and permissions
 */

import type { User } from './types'

export const users: User[] = [
  // Admins
  {
    id: 'user-1',
    organizationId: 'org-1',
    firstName: 'Steve',
    lastName: 'Coplan',
    email: 'steve@coplanmusic.com',
    phone: '615-555-1212',
    title: 'Tour Manager',
    role: 'admin',
    status: 'active',
    userGroupIds: ['group-1'],
    lastLoginAt: '2025-12-26T08:30:00Z',
    createdAt: '2023-01-15T00:00:00Z',
  },
  {
    id: 'user-2',
    organizationId: 'org-1',
    firstName: 'Elena',
    lastName: 'Sherertz',
    email: 'elena@coplanmusic.com',
    phone: '615-555-1498',
    title: 'Production Manager',
    role: 'admin',
    status: 'active',
    userGroupIds: ['group-1'],
    lastLoginAt: '2025-12-25T22:15:00Z',
    createdAt: '2023-02-01T00:00:00Z',
  },

  // Managers
  {
    id: 'user-3',
    organizationId: 'org-1',
    firstName: 'Sarah',
    lastName: 'Jennings',
    email: 'sarah.jennings@tourcrew.com',
    phone: '615-555-0011',
    title: 'FOH Engineer',
    role: 'manager',
    status: 'active',
    userGroupIds: ['group-2'],
    lastLoginAt: '2025-12-26T07:45:00Z',
    createdAt: '2023-03-10T00:00:00Z',
  },
  {
    id: 'user-4',
    organizationId: 'org-1',
    firstName: 'Kevin',
    lastName: 'Watts',
    email: 'kevin.watts@tourcrew.com',
    phone: '615-555-0012',
    title: 'Monitor Engineer',
    role: 'manager',
    status: 'active',
    userGroupIds: ['group-2'],
    lastLoginAt: '2025-12-24T18:30:00Z',
    createdAt: '2023-03-15T00:00:00Z',
  },

  // Editors
  {
    id: 'user-5',
    organizationId: 'org-1',
    firstName: 'Rachel',
    lastName: 'Green',
    email: 'rachel.green@tourcrew.com',
    phone: '615-555-0015',
    title: 'Lighting Director',
    role: 'editor',
    status: 'active',
    userGroupIds: ['group-3'],
    lastLoginAt: '2025-12-25T14:20:00Z',
    createdAt: '2023-04-01T00:00:00Z',
  },
  {
    id: 'user-6',
    organizationId: 'org-1',
    firstName: 'David',
    lastName: 'Lee',
    email: 'david.lee@tourcrew.com',
    phone: '615-555-0013',
    title: 'Drum Tech',
    role: 'editor',
    status: 'active',
    userGroupIds: ['group-3'],
    lastLoginAt: '2025-12-23T11:00:00Z',
    createdAt: '2023-04-15T00:00:00Z',
  },

  // Viewers
  {
    id: 'user-7',
    organizationId: 'org-1',
    firstName: 'Tommy',
    lastName: 'Rodriguez',
    email: 'tommy.r@tourcrew.com',
    phone: '615-555-0016',
    title: 'Bus Driver 1',
    role: 'viewer',
    status: 'active',
    userGroupIds: ['group-4'],
    lastLoginAt: '2025-12-22T09:00:00Z',
    createdAt: '2023-05-01T00:00:00Z',
  },
  {
    id: 'user-8',
    organizationId: 'org-1',
    firstName: 'Marcus',
    lastName: 'Chen',
    email: 'marcus.chen@tourcrew.com',
    phone: '615-555-0014',
    title: 'Guitar Tech',
    role: 'viewer',
    status: 'active',
    lastLoginAt: '2025-12-21T16:30:00Z',
    createdAt: '2023-05-10T00:00:00Z',
  },

  // Pending invitation
  {
    id: 'user-9',
    organizationId: 'org-1',
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.johnson@example.com',
    phone: '615-555-9999',
    title: 'Assistant Production Manager',
    role: 'editor',
    status: 'pending',
    userGroupIds: ['group-3'],
    createdAt: '2025-12-20T00:00:00Z',
    invitedAt: '2025-12-20T10:00:00Z',
    invitedBy: 'user-2',
  },

  // Inactive
  {
    id: 'user-10',
    organizationId: 'org-1',
    firstName: 'Mike',
    lastName: 'Wilson',
    email: 'mike.wilson@former.com',
    phone: '615-555-8888',
    title: 'Former Stage Manager',
    role: 'editor',
    status: 'inactive',
    lastLoginAt: '2025-06-15T12:00:00Z',
    createdAt: '2023-02-20T00:00:00Z',
  },
]

// Helper functions
export function getUserById(id: string): User | undefined {
  return users.find(u => u.id === id)
}

export function getUsersByOrganizationId(organizationId: string): User[] {
  return users.filter(u => u.organizationId === organizationId)
}

export function getUsersByRole(role: string): User[] {
  return users.filter(u => u.role === role)
}

export function getUsersByStatus(status: string): User[] {
  return users.filter(u => u.status === status)
}

export function searchUsers(query: string): User[] {
  const q = query.toLowerCase()
  return users.filter(u =>
    u.firstName.toLowerCase().includes(q) ||
    u.lastName.toLowerCase().includes(q) ||
    u.email.toLowerCase().includes(q) ||
    u.title?.toLowerCase().includes(q) ||
    u.role.toLowerCase().includes(q)
  )
}

// Get user count by role
export function getUserCountByRole(): Record<string, number> {
  return users.reduce((acc, u) => {
    acc[u.role] = (acc[u.role] || 0) + 1
    return acc
  }, {} as Record<string, number>)
}

// Get user count by status
export function getUserCountByStatus(): Record<string, number> {
  return users.reduce((acc, u) => {
    acc[u.status] = (acc[u.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)
}

// Get full name
export function getUserFullName(user: User): string {
  return `${user.firstName} ${user.lastName}`
}
