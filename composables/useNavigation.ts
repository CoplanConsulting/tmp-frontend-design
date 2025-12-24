export const useNavigation = () => {
  const route = useRoute()
  const { selectedEvent } = useSelectedEvent()

  const isActive = (url: string) => route.path === url

  const currentPageTitle = computed(() => {
    const pageTitles: Record<string, string> = {
      '/dashboard': 'Dashboard',
      '/events': 'Events',
      '/events/add': 'Add Event',
      '/events/advance': 'Event Details',
      '/days/day': 'Tour Schedule',
      '/calendar': 'Calendar',
      '/people': 'Personnel',
      '/guest-list': 'Guest List',
      '/venues': 'Venues'
    }

    // Find the base page title
    const matchedPath = Object.keys(pageTitles).find(path =>
      route.path.startsWith(path)
    )
    const baseTitle = matchedPath ? pageTitles[matchedPath] : 'Dashboard'

    // Append selected event title only on Tour Schedule page
    if (selectedEvent.value.id !== null && route.path.startsWith('/days/day')) {
      return `${baseTitle} > ${selectedEvent.value.title}`
    }

    return baseTitle

  })

  return { isActive, currentPageTitle }
}
