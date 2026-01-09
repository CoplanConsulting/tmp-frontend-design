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
    wireInfo: 'Bank: TD Canada Trust\nAccount: 1234567890\nRouting: 004\nSwift: TDOMCATTTOR',
    notes: 'Primary organization for HomeComing 2025 tour. Contact Stephen Coplan for all major decisions.',
    isActive: true,
    createdBy: 'user-1',
    createdAt: '2023-01-15',
    updatedAt: '2025-12-26',
  },
]

export const currentOrganization = organizations[0]

export function getOrganizationById(id: string) {
  return organizations.find(o => o.id === id)
}