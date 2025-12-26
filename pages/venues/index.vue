<script setup lang="ts">
import { venues } from '@/utils/mockData'

// Redirect to first venue
navigateTo(`/venues/${venues[0].id}`)
</script>

<template>
  <div></div>
</template>