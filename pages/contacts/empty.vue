<script setup lang="ts">
import { UserPlus } from 'lucide-vue-next'

definePageMeta({
  layout: 'default'
})

const handleAddContact = () => {
  navigateTo('/contacts/add')
}
</script>

<template>
  <div class="flex-1 p-8 bg-gray-50">
    <!-- Page Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Contacts Directory</h1>
      <p class="text-sm text-gray-600 mt-1">Manage external contacts, promoters, and venue representatives</p>
    </div>

    <!-- Empty State Card -->
    <Card class="border-2 border-dashed border-gray-300 bg-white">
      <div class="flex flex-col items-center justify-center py-16 px-8">
        <div class="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-6">
          <UserPlus class="h-8 w-8 text-gray-600" />
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">No contacts yet</h3>
        <p class="text-sm text-gray-600 text-center max-w-md mb-8">
          Add your first contact to start building your network of promoters, venue managers, and industry professionals
        </p>
        <Button
          class="bg-black text-white hover:bg-gray-800 gap-2"
          @click="handleAddContact"
        >
          <UserPlus class="h-4 w-4" />
          Add Your First Contact
        </Button>
      </div>
    </Card>
  </div>
</template>
