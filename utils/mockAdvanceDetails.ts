export interface AdvanceDetail {
  id: string
  slug: string
  date: string
  dayOfWeek: string
  dateNumber: string
  title: string
  subtitle: string
  venue: {
    name: string
    address: string
    city: string
    phone: string
  }
  promoter: {
    name: string
    company: string
    phone: string
    email: string
  }
  hotel: {
    name: string
    address: string
    city: string
    phone: string
  }
  dayOfShowContact: {
    name: string
    company: string
    phone: string
    email: string
  }
  staging?: {
    dimensions?: string
    stageWings?: string
    paBays?: string
    orchestraPit?: string
    curtain?: string
    fireCurtain?: string
    steps?: string
    trimHeight?: string
    apron?: string
    deckToGrid?: string
    legs?: string
    risers?: string
    stage?: string
    borders?: string
  }
  loading?: {
    access?: string
    dockType?: string
    deadCase?: string
    forklifts?: string
    loadComments?: string[]
  }
  rigging?: {
    flySystem?: string
    lineSets?: string
    riggingComments?: string[]
  }
}

export const advanceDetails: AdvanceDetail[] = [
  {
    id: '1',
    slug: 'moncton-thu',
    date: '2024-10-16',
    dayOfWeek: 'THU',
    dateNumber: '10/16',
    title: 'Moncton NB',
    subtitle: 'Casino New Brunswick',
    venue: {
      name: 'Casino New Brunswick',
      address: '123 Main Street',
      city: 'Moncton, NB E1C 1A1',
      phone: '(506) 555-1234'
    },
    promoter: {
      name: 'John Smith',
      company: 'LiveNation',
      phone: '604-683-4233',
      email: 'jsmith@livenation.com'
    },
    hotel: {
      name: 'Delta Beausejour',
      address: '750 Main Street',
      city: 'Moncton, NB E1C 8R3',
      phone: '506-854-4344'
    },
    dayOfShowContact: {
      name: 'John Smith',
      company: 'LiveNation',
      phone: '604-683-4233',
      email: 'jsmith@livenation.com'
    }
  },
  {
    id: '2',
    slug: 'moncton-fri',
    date: '2024-10-17',
    dayOfWeek: 'FRI',
    dateNumber: '10/17',
    title: 'Moncton NB',
    subtitle: 'Casino New Brunswick',
    venue: {
      name: 'Casino New Brunswick',
      address: '123 Main Street',
      city: 'Moncton, NB E1C 1A1',
      phone: '(506) 555-1234'
    },
    promoter: {
      name: 'John Smith',
      company: 'LiveNation',
      phone: '604-683-4233',
      email: 'jsmith@livenation.com'
    },
    hotel: {
      name: 'Delta Beausejour',
      address: '750 Main Street',
      city: 'Moncton, NB E1C 8R3',
      phone: '506-854-4344'
    },
    dayOfShowContact: {
      name: 'John Smith',
      company: 'LiveNation',
      phone: '604-683-4233',
      email: 'jsmith@livenation.com'
    }
  },
  {
    id: '3',
    slug: 'truro',
    date: '2024-10-18',
    dayOfWeek: 'SAT',
    dateNumber: '10/18',
    title: 'Truro NS',
    subtitle: 'Rath Eastlink Community Centre',
    venue: {
      name: 'Rath Eastlink Community Centre',
      address: '625 Abenaki Rd.',
      city: 'Truro, NS B2N 0G6,',
      phone: '(902) 893-2224'
    },
    promoter: {
      name: 'Alex Vyskocil',
      company: 'LiveNation',
      phone: '604-683-4233',
      email: 'alexvyskocil@livenation.com'
    },
    hotel: {
      name: 'Best Western Truro',
      address: '150 Willow St',
      city: 'Truro, NS B2N 4Z6',
      phone: '902-893-4311'
    },
    dayOfShowContact: {
      name: 'Alex Vyskocil',
      company: 'LiveNation',
      phone: '604-683-4233',
      email: 'alexvyskocil@livenation.com'
    },
    staging: {
      dimensions: '60\' (W) x 40\' (D) x 24\' (H)',
      stageWings: '2\' each side (stage left & right)',
      paBays: '2 x side-fill positions (stage left & right)',
      orchestraPit: 'Retractable, 20\' x 12\' (covered when not in use)',
      curtain: 'Main drape – red velour, motorized',
      fireCurtain: 'Present, manual drop (tested monthly)',
      steps: '3-step mobile units (2x stage left, 2x stage right)',
      trimHeight: '28\' (clearance under grid)',
      apron: '8\' extension, removable for pit access',
      deckToGrid: '32\' (adjustable via lift system)',
      legs: '4 pairs, black velour, adjustable widths',
      risers: '4 pairs, black velour, adjustable widths',
      stage: 'Sprung hardwood, dance-friendly surface',
      borders: '3x black mid-stage borders (adjustable height)'
    },
    loading: {
      access: 'Rear loading dock, ramp available',
      dockType: 'Ground-level with 1x dock plate (10,000 lb capacity)',
      deadCase: 'Storage room adjacent to dock (20\' x 15\')',
      forklifts: '2x electric forklifts on-site (5,000 lb capacity)',
      loadComments: [
        'No load-in during rain (dock not covered)',
        'Max truck length: 48\' (no semis beyond dock)'
      ]
    },
    rigging: {
      flySystem: 'Double-purchase counterweight (40 lines)',
      lineSets: '30 available (10 dead-hung, 20 motor-assist)',
      riggingComments: [
        'Certified riggers required for overhead points',
        'Max point load: 1,200 lbs (dynamic)',
        'No truss motors on house battens'
      ]
    }
  },
  {
    id: '4',
    slug: 'travel-day',
    date: '2024-10-19',
    dayOfWeek: 'SUN',
    dateNumber: '10/19',
    title: 'Travel Day',
    subtitle: 'St John\'s NL',
    venue: {
      name: 'N/A',
      address: 'N/A',
      city: 'N/A',
      phone: 'N/A'
    },
    promoter: {
      name: 'N/A',
      company: 'N/A',
      phone: 'N/A',
      email: 'N/A'
    },
    hotel: {
      name: 'N/A',
      address: 'N/A',
      city: 'N/A',
      phone: 'N/A'
    },
    dayOfShowContact: {
      name: 'N/A',
      company: 'N/A',
      phone: 'N/A',
      email: 'N/A'
    }
  }
]

export function getAdvanceDetailBySlug(slug: string): AdvanceDetail | undefined {
  return advanceDetails.find(detail => detail.slug === slug)
}

export function getAllAdvanceDetails(): AdvanceDetail[] {
  return advanceDetails
}
