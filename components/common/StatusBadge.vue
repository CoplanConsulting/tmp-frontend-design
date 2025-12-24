<script setup lang="ts">
defineProps<{
  status: string
  variant?: 'event' | 'advance' | 'guest'
}>()

const getStatusClass = (status: string, variant: string = 'event') => {
  if (variant === 'event') {
    const classes = {
      'confirmed': 'bg-green-500 text-white',
      'pending': 'bg-yellow-500 text-white',
      'cancelled': 'bg-red-500 text-white'
    }
    return classes[status.toLowerCase() as keyof typeof classes] || 'bg-gray-400 text-white'
  }

  if (variant === 'advance') {
    const classes = {
      'completed': 'bg-green-500 text-white',
      'in-progress': 'bg-yellow-500 text-white',
      'not-started': 'bg-gray-400 text-white'
    }
    return classes[status.toLowerCase() as keyof typeof classes] || 'bg-gray-400 text-white'
  }

  if (variant === 'guest') {
    const classes = {
      'approved': 'bg-green-100 text-green-800 border-green-200',
      'pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'declined': 'bg-red-100 text-red-800 border-red-200'
    }
    return classes[status.toLowerCase() as keyof typeof classes] || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  return 'bg-gray-400 text-white'
}

const getStatusText = (status: string) => {
  return status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')
}
</script>

<template>
  <Badge
    :class="[
      getStatusClass(status, variant),
      variant === 'guest' ? 'font-semibold border' : 'font-bold'
    ]"
  >
    {{ getStatusText(status) }}
  </Badge>
</template>
