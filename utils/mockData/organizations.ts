import type { Organization } from './types'

export const organizations: Organization[] = [
  {
    id: 'org-1',
    name: 'Coplan Music Management',
    slug: 'coplan-music',
    orgType: 'Music',
    contactEmail: 'info@coplanmusic.com',
    taxId: '123-456-789',
    currency: 'CAD',
    isActive: true,
    createdAt: '2023-01-15',
    updatedAt: '2025-12-26',
  },
]

export const currentOrganization = organizations[0]  // For now, hardcode the main one

export function getOrganizationById(id: string) {
  return organizations.find(o => o.id === id)
}