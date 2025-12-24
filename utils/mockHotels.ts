export interface Hotel {
  id: string
  name: string
  street: string
  city: string
  stateProv: string
  zip: string
  confirmationNumber: string
  contactName: string
  phone: string
  email: string
  distance: string
  travelTime: string
  amenities: string
  busParking: string
  parkingNotes: string
  associatedShows: string
  notes: string
}

export const hotels: Hotel[] = [
  {
    id: '1',
    name: 'Delta Hotels by Marriott Moncton',
    street: '100 Main St',
    city: 'Moncton',
    stateProv: 'NB',
    zip: 'X0X 0X0',
    confirmationNumber: 'CONF-1000',
    contactName: 'Teresa Tourmgr',
    phone: '(555) 123-4567',
    email: 'reservations@monctonhotel.com',
    distance: '2.0 km',
    travelTime: '8 mins',
    amenities: 'WiFi, Gym, Breakfast',
    busParking: 'Yes',
    parkingNotes: 'Ample bus parking in rear lot.',
    associatedShows: 'Oct 17, 2025 - Moncton NB',
    notes: 'Conveniently located near the venue.'
  },
  {
    id: '2',
    name: 'Fairmont Truro',
    street: '105 Main St',
    city: 'Truro',
    stateProv: 'NS',
    zip: 'X0X 0X0',
    confirmationNumber: 'CONF-1001',
    contactName: 'Teresa Tourmgr',
    phone: '(555) 123-4567',
    email: 'reservations@trurohotel.com',
    distance: '2.0 km',
    travelTime: '8 mins',
    amenities: 'WiFi, Gym, Breakfast',
    busParking: 'Yes',
    parkingNotes: 'Ample bus parking in rear lot.',
    associatedShows: 'Oct 18, 2025 - Truro NS NS',
    notes: 'Conveniently located near the venue.'
  },
  {
    id: '3',
    name: 'Sheraton St. John\'s',
    street: '110 Main St',
    city: 'St. John\'s',
    stateProv: 'NL',
    zip: 'X0X 0X0',
    confirmationNumber: 'CONF-1002',
    contactName: 'Teresa Tourmgr',
    phone: '(555) 123-4567',
    email: 'reservations@st.john\'shotel.com',
    distance: '2.0 km',
    travelTime: '8 mins',
    amenities: 'WiFi, Gym, Breakfast',
    busParking: 'Yes',
    parkingNotes: 'Ample bus parking in rear lot.',
    associatedShows: 'Oct 20, 2025 - St. John\'s NL, Oct 21, 2025 - St. John\'s NL',
    notes: 'Conveniently located near the venue.'
  },
  {
    id: '4',
    name: 'Westin Ottawa',
    street: '115 Main St',
    city: 'Ottawa',
    stateProv: 'ON',
    zip: 'X0X 0X0',
    confirmationNumber: 'CONF-1003',
    contactName: 'Teresa Tourmgr',
    phone: '(555) 123-4567',
    email: 'reservations@ottawahotel.com',
    distance: '2.0 km',
    travelTime: '8 mins',
    amenities: 'WiFi, Gym, Breakfast',
    busParking: 'Yes',
    parkingNotes: 'Ample bus parking in rear lot.',
    associatedShows: 'Oct 23, 2025 - Ottawa ON',
    notes: 'Conveniently located near the venue.'
  },
  {
    id: '5',
    name: 'Holiday Inn Express Oshawa',
    street: '120 Main St',
    city: 'Oshawa',
    stateProv: 'ON',
    zip: 'X0X 0X0',
    confirmationNumber: 'CONF-1004',
    contactName: 'Teresa Tourmgr',
    phone: '(555) 123-4567',
    email: 'reservations@oshawahotel.com',
    distance: '2.0 km',
    travelTime: '8 mins',
    amenities: 'WiFi, Gym, Breakfast',
    busParking: 'Yes',
    parkingNotes: 'Ample bus parking in rear lot.',
    associatedShows: 'Oct 24, 2025 - Oshawa ON',
    notes: 'Conveniently located near the venue.'
  },
  // ... (Includes Owen Sound, London, Peterborough, Kitchener, Niagara Falls, etc.)
  {
    id: '25',
    name: 'Delta Hotels by Marriott Kelowna',
    street: '220 Main St',
    city: 'Kelowna',
    stateProv: 'BC',
    zip: 'X0X 0X0',
    confirmationNumber: 'CONF-1024',
    contactName: 'Teresa Tourmgr',
    phone: '(555) 123-4567',
    email: 'reservations@kelownahotel.com',
    distance: '2.0 km',
    travelTime: '8 mins',
    amenities: 'WiFi, Gym, Breakfast',
    busParking: 'Yes',
    parkingNotes: 'Ample bus parking in rear lot.',
    associatedShows: 'Nov 22, 2025 - Kelowna BC, Nov 23, 2025 - Kelowna BC',
    notes: 'Conveniently located near the venue.'
  },
  {
    id: '30',
    name: 'Fairmont Cranbrook',
    street: '245 Main St',
    city: 'Cranbrook',
    stateProv: 'BC',
    zip: 'X0X 0X0',
    confirmationNumber: 'CONF-1029',
    contactName: 'Teresa Tourmgr',
    phone: '(555) 123-4567',
    email: 'reservations@cranbrookhotel.com',
    distance: '2.0 km',
    travelTime: '8 mins',
    amenities: 'WiFi, Gym, Breakfast',
    busParking: 'Yes',
    parkingNotes: 'Ample bus parking in rear lot.',
    associatedShows: 'Dec 01, 2025 - Cranbrook BC',
    notes: 'Conveniently located near the venue.'
  }
];