/**
 * People Data - HomeComing 2025
 * 
 * Two types of people:
 * 1. Personnel (Person) - Tour crew members (internal team)
 * 2. Contacts (Contact) - External people (promoters, venue staff, vendors)
 */

import type { Organization, Person, Contact, Company } from './types'

// =============================================================================
// TOUR PERSONNEL (Internal Team)
// =============================================================================

export const personnel: Person[] = [
  // Management
  {
    id: 'person-1',
    organizationIds: ['org-1'],
    tourIds: ['tour-1', 'tour-2', 'tour-3'],
    firstName: 'Steve',
    lastName: 'Coplan',
    middleName: 'Chuck',
    email: 'steve@coplanmusic.com',
    phone: '615-555-1212',
    address: '1210 Glen Echo Dr, Nashville, TN 37215',
    role: 'Tour Manager',
    department: 'Management',
    shirtSize: 'L',
    jacketSize: 'L',
    passportCountry: 'USA',
    passportExpiration: '2030-06-15',
    emergencyContactName: 'Sarah Coplan',
    emergencyContactRelationship: 'Spouse',
    emergencyContactPhone: '615-555-1213',
    notes: 'Primary point of contact for all tour matters',
  },
  {
    id: 'person-2',
    organizationIds: ['org-1'],
    tourIds: ['tour-1', 'tour-2'],
    firstName: 'Elena',
    lastName: 'Sherertz',
    middleName: 'Lauren',
    email: 'elena@coplanmusic.com',
    phone: '615-555-1498',
    address: '2416 Johnson Blvd, Nashville, TN 37217',
    role: 'Production Manager',
    department: 'Production',
    shirtSize: 'M',
    jacketSize: 'L',
    passportCountry: 'USA',
    passportExpiration: '2029-03-22',
    emergencyContactName: 'Mike Sherertz',
    emergencyContactRelationship: 'Brother',
    emergencyContactPhone: '615-555-1499',
  },
  
  // Audio
  {
    id: 'person-3',
    organizationIds: ['org-1'],
    tourIds: ['tour-1', 'tour-3'],
    firstName: 'Sarah',
    lastName: 'Jennings',
    email: 'sarah.jennings@tourcrew.com',
    phone: '615-555-0011',
    role: 'FOH Engineer',
    department: 'Audio',
    shirtSize: 'M',
    jacketSize: 'M',
    passportCountry: 'USA',
    passportExpiration: '2031-08-10',
  },
  {
    id: 'person-4',
    organizationIds: ['org-1'],
    tourIds: ['tour-1', 'tour-2'],
    firstName: 'Kevin',
    lastName: 'Watts',
    email: 'kevin.watts@tourcrew.com',
    phone: '615-555-0012',
    role: 'Monitor Engineer',
    department: 'Audio',
    shirtSize: 'L',
    jacketSize: 'XL',
    passportCountry: 'USA',
  },
  
  // Backline
  {
    id: 'person-5',
    organizationIds: ['org-1'],
    tourIds: ['tour-1', 'tour-3'],
    firstName: 'David',
    lastName: 'Lee',
    email: 'david.lee@tourcrew.com',
    phone: '615-555-0013',
    role: 'Drum Tech',
    department: 'Backline',
    shirtSize: 'L',
    jacketSize: 'L',
  },
  {
    id: 'person-6',
    organizationIds: ['org-1'],
    tourIds: ['tour-1', 'tour-2'],
    firstName: 'Marcus',
    lastName: 'Chen',
    email: 'marcus.chen@tourcrew.com',
    phone: '615-555-0014',
    role: 'Guitar Tech',
    department: 'Backline',
    shirtSize: 'M',
    jacketSize: 'L',
  },
  
  // Lighting
  {
    id: 'person-7',
    organizationIds: ['org-1'],
    tourIds: ['tour-2', 'tour-1'],
    firstName: 'Rachel',
    lastName: 'Green',
    email: 'rachel.green@tourcrew.com',
    phone: '615-555-0015',
    role: 'Lighting Director',
    department: 'Lighting',
    shirtSize: 'S',
    jacketSize: 'M',
  },
  
  // Transportation
  {
    id: 'person-8',
    organizationIds: ['org-1'],
    tourIds: ['tour-1'],
    firstName: 'Tommy',
    lastName: 'Rodriguez',
    email: 'tommy.r@tourcrew.com',
    phone: '615-555-0016',
    role: 'Bus Driver 1',
    department: 'Transportation',
    shirtSize: 'XL',
    jacketSize: 'XXL',
  },
  {
    id: 'person-9',
    organizationIds: ['org-1'],
    tourIds: ['tour-1'],
    firstName: 'Jerry',
    lastName: 'Riggs',
    email: 'jerry.riggs@tourcrew.com',
    phone: '615-555-0017',
    role: 'Bus Driver 2',
    department: 'Transportation',
    shirtSize: 'L',
    jacketSize: 'XL',
  },
  {
    id: 'person-10',
    organizationIds: ['org-1'],
    tourIds: ['tour-1'],
    firstName: 'Lars',
    lastName: 'Ulrich',
    email: 'lars.u@tourcrew.com',
    phone: '615-555-0018',
    role: 'Truck Driver',
    department: 'Transportation',
    shirtSize: 'L',
    jacketSize: 'XL',
  },
  
  // Band (Artists)
  {
    id: 'person-11',
    organizationIds: ['org-1'],
    tourIds: ['tour-1'],
    firstName: 'Terri',
    lastName: 'Clark',
    email: 'terri@terriclark.com',
    role: 'Artist',
    department: 'Band',
    notes: 'Co-headliner',
  },
  {
    id: 'person-12',
    organizationIds: ['org-1'],
    tourIds: ['tour-1'],
    firstName: 'Paul',
    lastName: 'Brandt',
    email: 'paul@paulbrandt.com',
    role: 'Artist',
    department: 'Band',
    notes: 'Co-headliner',
  },
]

// =============================================================================
// EXTERNAL CONTACTS (Promoters, Venue Staff, Vendors)
// =============================================================================

export const contacts: Contact[] = [
  // Promoter contacts
  {
    id: 'contact-1',
    organizationId: 'org-1',
    firstName: 'John',
    lastName: 'Smith',
    email: 'jsmith@livenation.com',
    phone: '604-683-4233',
    role: 'Promoter Rep',
    title: 'Regional Director',
    companyId: 'company-1',
    companyName: 'Live Nation Canada',
    isActive: true,
  },
  {
    id: 'contact-2',
    organizationId: 'org-1',
    firstName: 'Patrick',
    lastName: 'Guay',
    email: 'patrick@livenation.com',
    phone: '514-555-1234',
    role: 'Promoter',
    title: 'Tour Promoter',
    companyId: 'company-1',
    companyName: 'Live Nation Canada',
    isActive: true,
    notes: 'Primary promoter contact for HomeComing 2025',
  },
  {
    id: 'contact-3',
    organizationId: 'org-1',
    firstName: 'Michelle',
    lastName: 'Thompson',
    email: 'mthompson@ratheastlink.ca',
    phone: '902-893-2224',
    role: 'Venue Manager',
    title: 'Event Coordinator',
    companyId: 'company-2',
    companyName: 'Rath Eastlink Community Centre',
    isActive: true,
  },
  {
    id: 'contact-4',
    organizationId: 'org-1',
    firstName: 'Robert',
    lastName: 'Murphy',
    email: 'rmurphy@holyheart.ca',
    phone: '709-579-4424',
    role: 'Venue Manager',
    title: 'Theatre Manager',
    companyId: 'company-3',
    companyName: 'Holy Heart Theatre',
    isActive: true,
  },
  {
    id: 'contact-5',
    organizationId: 'org-1',
    firstName: 'Amanda',
    lastName: 'Wilson',
    email: 'awilson@meridiancentrepointe.com',
    phone: '613-580-2700',
    role: 'Venue Manager',
    title: 'Production Manager',
    companyId: 'company-4',
    companyName: 'Meridian Theatres',
    isActive: true,
  },
  {
    id: 'contact-6',
    organizationId: 'org-1',
    firstName: 'Richard',
    lastName: 'Sharpe',
    email: 'richard@sharpeprod.com',
    phone: '416-555-7890',
    role: 'Production Company',
    title: 'Owner',
    companyId: 'company-5',
    companyName: 'Richard Sharpe Productions',
    isActive: true,
    notes: 'Production services provider',
  },
  {
    id: 'contact-7',
    organizationId: 'org-1',
    firstName: 'Alex',
    lastName: 'Vyskocil',
    email: 'alex@livenation.com',
    phone: '416-555-2345',
    role: 'Production Assistant',
    title: 'Assistant',
    companyId: 'company-1',
    companyName: 'Live Nation Canada',
    isActive: true,
  },
  {
    id: 'contact-8',
    organizationId: 'org-1',
    firstName: 'Rob',
    lastName: 'Chicken',
    email: 'rob@rwpromotions.com',
    phone: '204-555-3456',
    role: 'Promoter',
    title: 'Owner',
    companyId: 'company-6',
    companyName: 'RW Promotions',
    isActive: true,
    notes: 'Manitoba/Saskatchewan dates',
  },
]

// =============================================================================
// COMPANIES
// =============================================================================

export const companies: Company[] = [
  {
    id: 'company-1',
    organizationId: 'org-1',
    name: 'Live Nation Canada',
    type: 'Promoter',
    mainPhone: '416-872-1212',
    mainEmail: 'info@livenation.ca',
    website: 'https://www.livenation.com',
    city: 'Toronto',
    state: 'ON',
    country: 'Canada',
    primaryContactId: 'contact-2',
    isActive: true,
  },
  {
    id: 'company-2',
    organizationId: 'org-1',
    name: 'Rath Eastlink Community Centre',
    type: 'Venue',
    mainPhone: '902-893-2224',
    website: 'https://www.ratheastlinkcommunitycentre.ca',
    address: '625 Abenaki Rd',
    city: 'Truro',
    state: 'NS',
    country: 'Canada',
    isActive: true,
  },
  {
    id: 'company-3',
    organizationId: 'org-1',
    name: 'Holy Heart Theatre',
    type: 'Venue',
    mainPhone: '709-579-4424',
    website: 'https://holyheart.ca',
    address: '55 Bonaventure Ave',
    city: "St. John's",
    state: 'NL',
    country: 'Canada',
    isActive: true,
  },
  {
    id: 'company-4',
    organizationId: 'org-1',
    name: 'Meridian Theatres',
    type: 'Venue',
    mainPhone: '613-580-2700',
    website: 'https://meridiancentrepointe.com',
    city: 'Ottawa',
    state: 'ON',
    country: 'Canada',
    isActive: true,
  },
  {
    id: 'company-5',
    organizationId: 'org-1',
    name: 'Richard Sharpe Productions',
    type: 'Production',
    mainPhone: '416-555-7890',
    mainEmail: 'info@sharpeprod.com',
    city: 'Toronto',
    state: 'ON',
    country: 'Canada',
    isActive: true,
  },
  {
    id: 'company-6',
    organizationId: 'org-1',
    name: 'RW Promotions',
    type: 'Promoter',
    mainPhone: '204-555-3456',
    city: 'Winnipeg',
    state: 'MB',
    country: 'Canada',
    isActive: true,
  },
]

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

export function getPersonById(id: string): Person | undefined {
  return personnel.find(p => p.id === id)
}


export function getPersonnelByTourId(tourId: string): Person[] {
  return personnel.filter(p => p.tourIds?.includes(tourId) ?? false)
}

export function getPersonnelByDepartment(department: string): Person[] {
  return personnel.filter(p => p.department === department)
}

export function getContactById(id: string): Contact | undefined {
  return contacts.find(c => c.id === id)
}

export function getContactsByCompanyId(companyId: string): Contact[] {
  return contacts.filter(c => c.companyId === companyId)
}

export function getCompanyById(id: string): Company | undefined {
  return companies.find(c => c.id === id)
}

export function searchPeople(query: string): Person[] {
  const q = query.toLowerCase()
  return personnel.filter(p =>
    p.firstName.toLowerCase().includes(q) ||
    p.lastName.toLowerCase().includes(q) ||
    p.role.toLowerCase().includes(q) ||
    p.department.toLowerCase().includes(q)
  )
}

export function searchContacts(query: string): Contact[] {
  const q = query.toLowerCase()
  return contacts.filter(c =>
    c.firstName.toLowerCase().includes(q) ||
    c.lastName.toLowerCase().includes(q) ||
    c.role.toLowerCase().includes(q) ||
    (c.companyName?.toLowerCase().includes(q) ?? false)
  )
}

// Get unique departments
export function getDepartments(): string[] {
  return [...new Set(personnel.map(p => p.department))]
}

// Get personnel count by department
export function getPersonnelCountByDepartment(): Record<string, number> {
  return personnel.reduce((acc, p) => {
    acc[p.department] = (acc[p.department] || 0) + 1
    return acc
  }, {} as Record<string, number>)
}
