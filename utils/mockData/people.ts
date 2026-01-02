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
    email: 'steve@coplanmusic.com',
    organizationIds: ['org-1'],
    firstName: 'Steve',
    lastName: 'Coplan',
    middleName: 'Chuck',
    nickname: 'Chuck',
    preferredName: 'Chuck',
    phone: '615-555-1212',
    address: {
      street: '1210 Glen Echo Dr',
      line2: 'Apt 2B',
      city: 'Nashville',
      state: 'TN',
      zip: '37215',
      country: 'USA',
    },

    // Personal Info
    gender: 'Male',
    birthplace: 'Detroit, MI',
    nationality: 'American',
    dateOfBirth: '1985-06-15',
    pronouns: 'he/him',

    // Professional
    jobTitle: 'Tour Manager',
    company: 'Coplan Music Management',
    primaryArtistOrOrg: 'HomeComing 2025',
    bio: 'Experienced tour manager with 15+ years in the music industry. Specialized in large-scale country music tours and international logistics coordination.',
    skills: ['Tour Logistics', 'Budget Management', 'Crisis Resolution', 'International Touring', 'Vendor Negotiations'],
    certifications: ['First Aid/CPR Certified', 'OSHA Safety Training', 'International Tour Management Diploma'],
    languages: ['English', 'Spanish', 'French'],
    equipmentOwned: 'MacBook Pro, iPad Pro, portable printer, emergency toolkit',

    // Family Info
    maritalStatus: 'married',
    anniversary: '2010-09-20',
    spouseName: 'Sarah Coplan',
    spouseBirthday: '1987-03-12',
    children: 'Two daughters: Emma (12) and Sophia (9)',
    familyNotes: 'Family lives in Nashville. Spouse works remotely as graphic designer.',

    // Tour Preferences
    hotelPrefs: {
      roomType: 'king',
      smoking: false,
    },
    busPrefs: {
      bunkSide: 'driver',
      bunkLevel: 'middle',
      bunkPosition: 'front',
    },
    flightPrefs: {
      seat: 'aisle',
      time: 'am',
      meal: 'no_preference',
      notes: 'Prefers direct flights when possible. TSA PreCheck enrolled.',
    },
    frequentFlyer: [
      { airline: 'Delta', accountNumber: 'DL123456789' },
      { airline: 'American Airlines', accountNumber: 'AA987654321' },
      { airline: 'Southwest', accountNumber: 'SW555444333' },
    ],

    // Clothing Sizes
    clothing: {
      height: '5\' 10"',
      weight: '175 lbs',
      tshirt: 'L',
      hoodie: 'XL',
      pants: '32x32',
      shoes: '10',
      jacket: 'L',
      hat: '7 1/4',
    },

    // Emergency contact
    emergencyContact: {
      name: 'Sarah Coplan',
      relationship: 'Spouse',
      phone: '615-555-1213',
      email: 'sarah.coplan@email.com',
    },

    // Travel documents
    passportNumber: 'US1234567890',
    passportExpDate: '2030-06-15',
    passportCountry: 'USA',
    knownTravelerNumber: 'KTN123456789',
    globalEntryNumber: 'GE987654321',
    driversLicense: {
      number: 'TN12345678',
      state: 'TN',
    },

    // Medical/Health
    bloodType: 'O+',
    medicalConditions: 'Seasonal allergies',
    allergies: 'Pollen, shellfish',
    dietaryRestrictions: 'No shellfish',

    notes: 'Primary point of contact for all tour matters. Handles day-to-day logistics and troubleshooting. Available 24/7 during tour dates.',

    // Privacy settings
    privacySettings: {
      personalDetails: 'private',
      contactInfo: 'organization',
      emergencyContact: 'organization',
      travelPreferences: 'tourTeam',
      travelDocuments: 'organization',
      frequentFlyer: 'private',
      sizing: 'tourTeam',
      family: 'private',
      medical: 'private',
      professional: 'organization',
    },

    tourIds: ['tour-1', 'tour-2', 'tour-3'],
    role: 'Tour Manager',
    department: 'Management',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2025-12-30'),
  },
  {
    id: 'person-2',
    email: 'elena@coplanmusic.com',
    organizationIds: ['org-1'],
    firstName: 'Elena',
    lastName: 'Sherertz',
    middleName: 'Lauren',
    phone: '615-555-1498',
    address: {
      street: '2416 Johnson Blvd',
      line2: '',
      city: 'Nashville',
      state: 'TN',
      zip: '37217',
      country: 'USA',
    },
    clothing: {
      tshirt: 'M',
      jacket: 'L',
    },
    passportCountry: 'USA',
    passportExpDate: '2029-03-22',
    emergencyContact: {
      name: 'Mike Sherertz',
      relationship: 'Brother',
      phone: '615-555-1499',
    },
    tourIds: ['tour-1', 'tour-2'],
    role: 'Production Manager',
    department: 'Production',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2025-12-30'),
  },
  
  // Audio
  {
    id: 'person-3',
    email: 'sarah.jennings@tourcrew.com',
    organizationIds: ['org-1'],
    firstName: 'Sarah',
    lastName: 'Jennings',
    phone: '615-555-0011',
    clothing: {
      tshirt: 'M',
      jacket: 'M',
    },
    passportCountry: 'USA',
    passportExpDate: '2031-08-10',
    tourIds: ['tour-1', 'tour-3'],
    role: 'FOH Engineer',
    department: 'Audio',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2025-12-30'),
  },
  {
    id: 'person-4',
    email: 'kevin.watts@tourcrew.com',
    organizationIds: ['org-1'],
    firstName: 'Kevin',
    lastName: 'Watts',
    phone: '615-555-0012',
    clothing: {
      tshirt: 'L',
      jacket: 'XL',
    },
    passportCountry: 'USA',
    tourIds: ['tour-1', 'tour-2'],
    role: 'Monitor Engineer',
    department: 'Audio',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2025-12-30'),
  },
  
  // Backline
  {
    id: 'person-5',
    email: 'david.lee@tourcrew.com',
    organizationIds: ['org-1'],
    firstName: 'David',
    lastName: 'Lee',
    phone: '615-555-0013',
    clothing: {
      tshirt: 'L',
      jacket: 'L',
    },
    tourIds: ['tour-1', 'tour-3'],
    role: 'Drum Tech',
    department: 'Backline',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2025-12-30'),
  },
  {
    id: 'person-6',
    email: 'marcus.chen@tourcrew.com',
    organizationIds: ['org-1'],
    firstName: 'Marcus',
    lastName: 'Chen',
    phone: '615-555-0014',
    clothing: {
      tshirt: 'M',
      jacket: 'L',
    },
    tourIds: ['tour-1', 'tour-2'],
    role: 'Guitar Tech',
    department: 'Backline',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2025-12-30'),
  },
  
  // Lighting
  {
    id: 'person-7',
    email: 'rachel.green@tourcrew.com',
    organizationIds: ['org-1'],
    firstName: 'Rachel',
    lastName: 'Green',
    phone: '615-555-0015',
    clothing: {
      tshirt: 'S',
      jacket: 'M',
    },
    tourIds: ['tour-2', 'tour-1'],
    role: 'Lighting Director',
    department: 'Lighting',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2025-12-30'),
  },
  
  // Transportation
  {
    id: 'person-8',
    email: 'tommy.r@tourcrew.com',
    organizationIds: ['org-1'],
    firstName: 'Tommy',
    lastName: 'Rodriguez',
    phone: '615-555-0016',
    clothing: {
      tshirt: 'XL',
      jacket: 'XXL',
    },
    tourIds: ['tour-1'],
    role: 'Bus Driver 1',
    department: 'Transportation',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2025-12-30'),
  },
  {
    id: 'person-9',
    email: 'jerry.riggs@tourcrew.com',
    organizationIds: ['org-1'],
    firstName: 'Jerry',
    lastName: 'Riggs',
    phone: '615-555-0017',
    clothing: {
      tshirt: 'L',
      jacket: 'XL',
    },
    tourIds: ['tour-1'],
    role: 'Bus Driver 2',
    department: 'Transportation',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2025-12-30'),
  },
  {
    id: 'person-10',
    email: 'lars.u@tourcrew.com',
    organizationIds: ['org-1'],
    firstName: 'Lars',
    lastName: 'Ulrich',
    phone: '615-555-0018',
    clothing: {
      tshirt: 'L',
      jacket: 'XL',
    },
    tourIds: ['tour-1'],
    role: 'Truck Driver',
    department: 'Transportation',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2025-12-30'),
  },
  
  // Band (Artists)
  {
    id: 'person-11',
    email: 'terri@terriclark.com',
    organizationIds: ['org-1'],
    firstName: 'Terri',
    lastName: 'Clark',
    notes: 'Co-headliner',
    tourIds: ['tour-1'],
    role: 'Artist',
    department: 'Band',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2025-12-30'),
  },
  {
    id: 'person-12',
    email: 'paul@paulbrandt.com',
    organizationIds: ['org-1'],
    firstName: 'Paul',
    lastName: 'Brandt',
    notes: 'Co-headliner',
    tourIds: ['tour-1'],
    role: 'Artist',
    department: 'Band',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2025-12-30'),
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
