export interface Guest {
  id: string
  name: string
  tickets: number
  passes: number
  type: 'VIP' | 'M&G' | 'Photo' | '-'
  status: 'approved' | 'pending' | 'declined'
  affiliation: string
  pickup: string
  email: string
  phone: string
  requestor: string
  requestDate: string
  approvedBy?: string
  approvalDate?: string
  seating?: {
    section: string
    row: string
    seats: string
  }
  notes?: string
}

export interface TicketAllocation {
  allowed: {
    tix: number
    vip: number
    mng: number
  }
  approved: {
    tix: number
    vip: number
    mng: number
  }
  remaining: {
    tix: number
    vip: number
    mng: number
  }
}

export const guestList: Guest[] = [
  {
    id: '1',
    name: 'John Smith',
    tickets: 4,
    passes: 4,
    type: 'VIP',
    status: 'approved',
    affiliation: 'Label',
    pickup: 'Will Call',
    email: 'jsmith@gmail.com',
    phone: '615-555-1234',
    requestor: 'Jane Doe',
    requestDate: '6/15/2025',
    approvedBy: 'Alex Rodriguez',
    approvalDate: '6/15/2025',
    seating: {
      section: 'A',
      row: '4',
      seats: '5-8'
    },
    notes: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    tickets: 4,
    passes: 4,
    type: 'M&G',
    status: 'approved',
    affiliation: 'Media',
    pickup: 'Box Office',
    email: 'sarah.j@media.com',
    phone: '416-555-2345',
    requestor: 'Mike Stevens',
    requestDate: '6/10/2025',
    approvedBy: 'Alex Rodriguez',
    approvalDate: '6/12/2025',
    seating: {
      section: 'B',
      row: '2',
      seats: '1-4'
    },
    notes: 'VIP media credentials required at check-in'
  },
  {
    id: '3',
    name: 'David Lee',
    tickets: 4,
    passes: 0,
    type: '-',
    status: 'approved',
    affiliation: 'Friend of PB',
    pickup: 'Hand Deliver',
    email: 'david.lee@email.com',
    phone: '902-555-3456',
    requestor: 'Paul Brown',
    requestDate: '6/8/2025',
    approvedBy: 'Alex Rodriguez',
    approvalDate: '6/9/2025',
    seating: {
      section: 'C',
      row: '5',
      seats: '10-13'
    }
  },
  {
    id: '4',
    name: 'Emily Chen',
    tickets: 2,
    passes: 2,
    type: 'Photo',
    status: 'approved',
    affiliation: 'Media',
    pickup: 'Will Call',
    email: 'echen@photos.com',
    phone: '604-555-4567',
    requestor: 'Lisa White',
    requestDate: '6/14/2025',
    approvedBy: 'Alex Rodriguez',
    approvalDate: '6/14/2025',
    seating: {
      section: 'Photo Pit',
      row: '-',
      seats: '-'
    },
    notes: 'Photo pass for pit access only'
  },
  {
    id: '5',
    name: 'Michael Brown',
    tickets: 3,
    passes: 3,
    type: 'VIP',
    status: 'approved',
    affiliation: 'Friend of Promoter',
    pickup: 'Box Office',
    email: 'mbrown@example.com',
    phone: '613-555-5678',
    requestor: 'Tom Green',
    requestDate: '6/11/2025',
    approvedBy: 'Alex Rodriguez',
    approvalDate: '6/13/2025',
    seating: {
      section: 'A',
      row: '1',
      seats: '1-3'
    }
  }
]

export const ticketAllocations: TicketAllocation = {
  allowed: {
    tix: 30,
    vip: 20,
    mng: 25
  },
  approved: {
    tix: 5,
    vip: 5,
    mng: 10
  },
  remaining: {
    tix: 25,
    vip: 15,
    mng: 15
  }
}

export interface EventListItem {
  id: string
  day: string
  date: string
  location: string
  venue: string
  active?: boolean
}

export const eventListItems: EventListItem[] = [
  {
    id: '1',
    day: 'THU',
    date: '10/16',
    location: 'Moncton NB',
    venue: 'Casino New Brunswick',
    active: false
  },
  {
    id: '2',
    day: 'FRI',
    date: '10/17',
    location: 'Moncton NB',
    venue: 'Casino New Brunswick',
    active: false
  },
  {
    id: '3',
    day: 'SAT',
    date: '10/18',
    location: 'Truro NS',
    venue: 'Rath Eastlink Community Centre',
    active: true
  },
  {
    id: '4',
    day: 'SUN',
    date: '10/19',
    location: 'Travel Day',
    venue: 'St John\'s NL',
    active: false
  },
  {
    id: '5',
    day: 'MON',
    date: '10/20',
    location: 'St John\'s NL',
    venue: 'Holy Heart Theatre',
    active: false
  },
  {
    id: '6',
    day: 'TUE',
    date: '10/21',
    location: 'St John\'s NL',
    venue: 'Holy Heart Theatre',
    active: false
  },
  {
    id: '7',
    day: 'WED',
    date: '10/22',
    location: 'Travel Day',
    venue: 'Ottawa ON',
    active: false
  },
  {
    id: '8',
    day: 'THU',
    date: '10/23',
    location: 'Ottawa ON',
    venue: 'Meridian Theatres at Centrepoint',
    active: false
  },
  {
    id: '9',
    day: 'FRI',
    date: '10/24',
    location: 'Oshawa ON',
    venue: 'Tribute Communities Centre',
    active: false
  },
  {
    id: '10',
    day: 'SAT',
    date: '10/25',
    location: 'Owen Sound ON',
    venue: 'Harry Lumley Bayshore Arena',
    active: false
  }
]
