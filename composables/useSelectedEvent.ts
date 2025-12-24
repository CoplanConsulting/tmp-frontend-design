// composables/useSelectedEvent.ts

const selectedEvent = ref<{
  id: any
  title: string
}>({
  id: null,
  title: ''
})

export const useSelectedEvent = () => {
  const setEvent = (id: any, title: string | undefined) => {
    // Fallback to empty string if title is undefined
    selectedEvent.value = { 
      id, 
      title: title ?? '' 
    }
  }

  const clearEvent = () => {
    selectedEvent.value = { id: null, title: '' }
  }

  return {
    selectedEvent: readonly(selectedEvent),
    setEvent,
    clearEvent
  }
}