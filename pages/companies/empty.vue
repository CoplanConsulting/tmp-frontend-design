<script setup lang="ts">
import { Building2, Plus } from 'lucide-vue-next'

definePageMeta({
  layout: 'default'
})

const handleAddCompany = () => {
  navigateTo('/companies/add')
}
</script>

<template>
  <div class="flex-1 p-8 bg-gray-50">
    <!-- Page Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Companies</h1>
      <p class="text-sm text-gray-600 mt-1">Manage promoters, venues, and production companies</p>
    </div>

    <!-- Empty State Card -->
    <Card class="border-2 border-dashed border-gray-300 bg-white">
      <div class="flex flex-col items-center justify-center py-16 px-8">
        <div class="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-6">
          <Building2 class="h-8 w-8 text-gray-600" />
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">No companies yet</h3>
        <p class="text-sm text-gray-600 text-center max-w-md mb-8">
          Add your first company to start building your network of promoters, venues, and production partners
        </p>
        <Button
          class="bg-black text-white hover:bg-gray-800 gap-2"
          @click="handleAddCompany"
        >
          <Plus class="h-4 w-4" />
          Add Your First Company
        </Button>
      </div>
    </Card>
  </div>
</template>
