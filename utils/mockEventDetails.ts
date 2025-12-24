export interface EventDetail {
  id: string
  date: string
  fullDate: string
  dayType: 'SHOW DAY' | 'TRAVEL DAY' | 'OFF DAY'
  location: string
  eventName: string

  // Show Info
  showTime: string
  showLength: string
  schedule: Array<{
    time: string
    activity: string
  }>

  // Opening Act
  openingAct?: {
    schedule: Array<{
      time: string
      activity: string
    }>
  }

  // Return to Hotel
  returnInfo?: {
    afterSoundcheck: string
    afterShow: string
  }

  // Venue Info
  venue: {
    name: string
    address: string
    city: string
    postalCode: string
    phone: string
    capacity: number
    type: string
  }

  // Hotel Info
  hotel?: {
    name: string
    address: string
    city: string
    postalCode: string
    phone: string
    contact: string
    distanceToVenue: string
    amenities: string[]
  }

  // Travel Info
  travel?: {
    depart: string
    arrive: string
    departFrom: string
    travelBy: string
    etd: string
    eta: string
    travelTime: string
    miles: string
  }

  notes?: string
}

export const eventDetailsMap: Record<string, EventDetail> = {
  '2': {
    id: '2',
    date: '2024-10-17',
    fullDate: 'Friday, OCT 17, 2024',
    dayType: 'SHOW DAY',
    location: 'Moncton, NB • Atlantic',
    eventName: 'Moncton NB',
    showTime: '8:00pm',
    showLength: '75mins',
    schedule: [
      { time: '11:30 am', activity: 'Crew departs hotel for venue' },
      { time: '12:00pm', activity: 'Lunch at venue' },
      { time: '1:00pm', activity: 'Load-In' },
      { time: '4:00pm', activity: 'Sound Check' },
      { time: '5:00pm', activity: 'Dinner at venue' },
      { time: '6:00pm', activity: 'Doors open' },
      { time: '8:00pm', activity: 'The Big Show begins' },
      { time: '10:00pm', activity: 'Show ends' },
      { time: '10:10pm', activity: 'Load Out begins' }
    ],
    openingAct: {
      schedule: [
        { time: '4:00pm', activity: 'Load-In' },
        { time: '5:00pm', activity: 'Sound Check' },
        { time: '7:00pm', activity: 'Showtime • 45mins' }
      ]
    },
    returnInfo: {
      afterSoundcheck: 'TBA',
      afterShow: 'Yes'
    },
    venue: {
      name: 'Casino New Brunswick',
      address: '21 Casino Dr',
      city: 'Moncton, NB E1G 0R7',
      postalCode: 'E1G 0R7',
      phone: '(506) 859-7770',
      capacity: 2000,
      type: 'Casino'
    },
    hotel: {
      name: 'Holiday Inn Moncton',
      address: '434 Main St',
      city: 'Moncton, NB E1C 1B9',
      postalCode: 'E1C 1B9',
      phone: '(506) 854-6340',
      contact: 'Sarah Mitchell',
      distanceToVenue: '2.3 miles',
      amenities: ['Restaurant', 'Room Service', 'Laundry', 'Fitness Center', 'Pool / Hottub']
    },
    travel: {
      depart: 'Moncton NB Atlantic',
      arrive: 'Truro NS Atlantic',
      departFrom: 'Hotel',
      travelBy: 'Bus',
      etd: '11:00pm',
      eta: '1:30am',
      travelTime: '2.5 hours',
      miles: '95'
    }
  },
  '3': {
    id: '3',
    date: '2024-10-18',
    fullDate: 'Saturday, OCT 18, 2024',
    dayType: 'SHOW DAY',
    location: 'Truro, NS • Atlantic',
    eventName: 'Truro NS',
    showTime: '8:00pm',
    showLength: '75mins',
    schedule: [
      { time: '11:30 am', activity: 'Crew departs hotel for venue' },
      { time: '12:00pm', activity: 'Lunch at venue' },
      { time: '1:00pm', activity: 'Load-In' },
      { time: '4:00pm', activity: 'Sound Check' },
      { time: '5:00pm', activity: 'Dinner at venue' },
      { time: '6:00pm', activity: 'Doors open' },
      { time: '8:00pm', activity: 'The Big Show begins' },
      { time: '10:00pm', activity: 'Show ends' },
      { time: '10:10pm', activity: 'Load Out begins' }
    ],
    openingAct: {
      schedule: [
        { time: '4:00pm', activity: 'Load-In' },
        { time: '5:00pm', activity: 'Sound Check' },
        { time: '7:00pm', activity: 'Showtime • 45mins' }
      ]
    },
    returnInfo: {
      afterSoundcheck: 'TBA',
      afterShow: 'Yes'
    },
    venue: {
      name: 'Rath Eastlink Community Centre',
      address: '625 Abenaki Rd',
      city: 'Truro, NS B2N 0G6',
      postalCode: 'B2N 0G6',
      phone: '(902) 893-2224',
      capacity: 3100,
      type: 'Theatre'
    },
    hotel: {
      name: 'Holiday Inn',
      address: '3020 Blanshard St',
      city: 'Victoria, BC V8T 5B5',
      postalCode: 'V8T 5B5',
      phone: '(902) 382-4400',
      contact: 'Claire Danes',
      distanceToVenue: '0.5 miles',
      amenities: ['Restaurant', 'Room Service', 'Laundry', 'Fitness Center', 'Pool / Hottub']
    },
    travel: {
      depart: 'Truro NS Atlantic',
      arrive: 'Halifax NS Atlantic',
      departFrom: 'Hotel',
      travelBy: 'Bus',
      etd: 'Midnight',
      eta: '5:00am',
      travelTime: '5 hours',
      miles: '315'
    }
  },
  '4': {
    id: '4',
    date: '2024-10-19',
    fullDate: 'Sunday, OCT 19, 2024',
    dayType: 'TRAVEL DAY',
    location: 'Halifax, NS → St John\'s, NL',
    eventName: 'Travel Day',
    showTime: '',
    showLength: '',
    schedule: [
      { time: '6:00 am', activity: 'Wake up call' },
      { time: '7:00 am', activity: 'Breakfast at hotel' },
      { time: '8:30 am', activity: 'Depart hotel for airport' },
      { time: '10:00 am', activity: 'Flight departure' },
      { time: '12:30 pm', activity: 'Arrive St John\'s' },
      { time: '1:30 pm', activity: 'Check in to hotel' },
      { time: '6:00 pm', activity: 'Dinner' }
    ],
    venue: {
      name: 'N/A',
      address: '',
      city: '',
      postalCode: '',
      phone: '',
      capacity: 0,
      type: 'Travel'
    },
    hotel: {
      name: 'Sheraton Hotel Newfoundland',
      address: '115 Cavendish Square',
      city: 'St John\'s, NL A1C 3K2',
      postalCode: 'A1C 3K2',
      phone: '(709) 726-4980',
      contact: 'Mark Johnson',
      distanceToVenue: 'N/A',
      amenities: ['Restaurant', 'Room Service', 'Fitness Center', 'Pool']
    },
    travel: {
      depart: 'Halifax NS',
      arrive: 'St John\'s NL',
      departFrom: 'Hotel',
      travelBy: 'Flight',
      etd: '10:00am',
      eta: '12:30pm',
      travelTime: '2.5 hours',
      miles: '650'
    }
  },
  '5': {
    id: '5',
    date: '2024-10-20',
    fullDate: 'Monday, OCT 20, 2024',
    dayType: 'SHOW DAY',
    location: 'St John\'s, NL • Atlantic',
    eventName: 'St John\'s NL',
    showTime: '8:00pm',
    showLength: '75mins',
    schedule: [
      { time: '11:00 am', activity: 'Crew departs hotel for venue' },
      { time: '12:00pm', activity: 'Lunch at venue' },
      { time: '1:00pm', activity: 'Load-In' },
      { time: '4:00pm', activity: 'Sound Check' },
      { time: '5:00pm', activity: 'Dinner at venue' },
      { time: '6:30pm', activity: 'Doors open' },
      { time: '8:00pm', activity: 'The Big Show begins' },
      { time: '10:00pm', activity: 'Show ends' },
      { time: '10:15pm', activity: 'Load Out begins' }
    ],
    openingAct: {
      schedule: [
        { time: '3:30pm', activity: 'Load-In' },
        { time: '5:00pm', activity: 'Sound Check' },
        { time: '7:00pm', activity: 'Showtime • 45mins' }
      ]
    },
    returnInfo: {
      afterSoundcheck: 'Yes',
      afterShow: 'Yes'
    },
    venue: {
      name: 'Holy Heart Theatre',
      address: '58 Bonaventure Ave',
      city: 'St John\'s, NL A1C 3Z4',
      postalCode: 'A1C 3Z4',
      phone: '(709) 754-5958',
      capacity: 800,
      type: 'Theatre'
    },
    hotel: {
      name: 'Sheraton Hotel Newfoundland',
      address: '115 Cavendish Square',
      city: 'St John\'s, NL A1C 3K2',
      postalCode: 'A1C 3K2',
      phone: '(709) 726-4980',
      contact: 'Mark Johnson',
      distanceToVenue: '0.8 miles',
      amenities: ['Restaurant', 'Room Service', 'Fitness Center', 'Pool']
    }
  },
  '6': {
    id: '6',
    date: '2024-10-21',
    fullDate: 'Tuesday, OCT 21, 2024',
    dayType: 'SHOW DAY',
    location: 'St John\'s, NL • Atlantic',
    eventName: 'St John\'s NL',
    showTime: '8:00pm',
    showLength: '75mins',
    schedule: [
      { time: '3:00 pm', activity: 'Sound Check' },
      { time: '5:00 pm', activity: 'Dinner at venue' },
      { time: '6:30 pm', activity: 'Doors open' },
      { time: '8:00 pm', activity: 'The Big Show begins' },
      { time: '10:00 pm', activity: 'Show ends' },
      { time: '10:15 pm', activity: 'Load Out begins' }
    ],
    openingAct: {
      schedule: [
        { time: '4:30pm', activity: 'Sound Check' },
        { time: '7:00pm', activity: 'Showtime • 45mins' }
      ]
    },
    returnInfo: {
      afterSoundcheck: 'Yes',
      afterShow: 'Yes'
    },
    venue: {
      name: 'Holy Heart Theatre',
      address: '58 Bonaventure Ave',
      city: 'St John\'s, NL A1C 3Z4',
      postalCode: 'A1C 3Z4',
      phone: '(709) 754-5958',
      capacity: 800,
      type: 'Theatre'
    },
    hotel: {
      name: 'Sheraton Hotel Newfoundland',
      address: '115 Cavendish Square',
      city: 'St John\'s, NL A1C 3K2',
      postalCode: 'A1C 3K2',
      phone: '(709) 726-4980',
      contact: 'Mark Johnson',
      distanceToVenue: '0.8 miles',
      amenities: ['Restaurant', 'Room Service', 'Fitness Center', 'Pool']
    },
    travel: {
      depart: 'St John\'s NL',
      arrive: 'Halifax NS',
      departFrom: 'Hotel',
      travelBy: 'Flight',
      etd: '11:00pm',
      eta: '12:30am',
      travelTime: '2.5 hours',
      miles: '650'
    }
  },
  '9': {
    id: '9',
    date: '2024-10-24',
    fullDate: 'Friday, OCT 24, 2024',
    dayType: 'SHOW DAY',
    location: 'Oshawa, ON • Ontario',
    eventName: 'Oshawa ON',
    showTime: '7:30pm',
    showLength: '80mins',
    schedule: [
      { time: '11:00 am', activity: 'Crew departs hotel for venue' },
      { time: '12:00 pm', activity: 'Lunch at venue' },
      { time: '1:00 pm', activity: 'Load-In' },
      { time: '3:30 pm', activity: 'Sound Check' },
      { time: '5:00 pm', activity: 'Dinner at venue' },
      { time: '6:00 pm', activity: 'Doors open' },
      { time: '7:30 pm', activity: 'The Big Show begins' },
      { time: '9:30 pm', activity: 'Show ends' },
      { time: '9:45 pm', activity: 'Load Out begins' }
    ],
    openingAct: {
      schedule: [
        { time: '3:00pm', activity: 'Load-In' },
        { time: '4:30pm', activity: 'Sound Check' },
        { time: '6:30pm', activity: 'Showtime • 45mins' }
      ]
    },
    returnInfo: {
      afterSoundcheck: 'TBA',
      afterShow: 'Yes'
    },
    venue: {
      name: 'Tribute Communities Centre',
      address: '99 Athol St E',
      city: 'Oshawa, ON L1H 1B9',
      postalCode: 'L1H 1B9',
      phone: '(905) 434-1809',
      capacity: 5500,
      type: 'Arena'
    },
    hotel: {
      name: 'Hilton Oshawa',
      address: '201 King St W',
      city: 'Oshawa, ON L1J 2J5',
      postalCode: 'L1J 2J5',
      phone: '(905) 576-5101',
      contact: 'Jennifer Lee',
      distanceToVenue: '1.2 miles',
      amenities: ['Restaurant', 'Room Service', 'Fitness Center', 'Pool']
    },
    travel: {
      depart: 'Oshawa ON',
      arrive: 'Owen Sound ON',
      departFrom: 'Hotel',
      travelBy: 'Bus',
      etd: 'Midnight',
      eta: '3:00am',
      travelTime: '3 hours',
      miles: '150'
    }
  },
  '10': {
    id: '10',
    date: '2024-10-25',
    fullDate: 'Saturday, OCT 25, 2024',
    dayType: 'SHOW DAY',
    location: 'Owen Sound, ON • Ontario',
    eventName: 'Owen Sound ON',
    showTime: '8:00pm',
    showLength: '75mins',
    schedule: [
      { time: '11:00 am', activity: 'Crew departs hotel for venue' },
      { time: '12:00 pm', activity: 'Lunch at venue' },
      { time: '1:00 pm', activity: 'Load-In' },
      { time: '4:00 pm', activity: 'Sound Check' },
      { time: '5:00 pm', activity: 'Dinner at venue' },
      { time: '6:30 pm', activity: 'Doors open' },
      { time: '8:00 pm', activity: 'The Big Show begins' },
      { time: '10:00 pm', activity: 'Show ends' },
      { time: '10:15 pm', activity: 'Load Out begins' }
    ],
    openingAct: {
      schedule: [
        { time: '3:30pm', activity: 'Load-In' },
        { time: '5:00pm', activity: 'Sound Check' },
        { time: '7:00pm', activity: 'Showtime • 45mins' }
      ]
    },
    returnInfo: {
      afterSoundcheck: 'TBA',
      afterShow: 'Yes'
    },
    venue: {
      name: 'Harry Lumley Bayshore Arena',
      address: '1900 3rd Ave E',
      city: 'Owen Sound, ON N4K 2K4',
      postalCode: 'N4K 2K4',
      phone: '(519) 376-1440',
      capacity: 3500,
      type: 'Arena'
    },
    hotel: {
      name: 'Best Western Inn on the Bay',
      address: '1800 2nd Ave E',
      city: 'Owen Sound, ON N4K 2H9',
      postalCode: 'N4K 2H9',
      phone: '(519) 371-9200',
      contact: 'David Brown',
      distanceToVenue: '0.3 miles',
      amenities: ['Restaurant', 'Fitness Center', 'Pool']
    }
  }
}
