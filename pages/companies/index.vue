<script setup lang="ts">
import { Building2, Phone, Globe, Users, Plus, Filter } from 'lucide-vue-next'
import { companies, getContactsByCompanyId } from '@/utils/mockData/people'
import type { Company } from '@/utils/mockData/types'

definePageMeta({
  layout: 'default'
})

// Search and filter functionality
const searchQuery = ref('')
const selectedType = ref<string>('all')

// Get unique company types
const companyTypes = computed(() => {
  const types = [...new Set(companies.map(c => c.type))]
  return types.sort()
})

const filteredCompanies = computed(() => {
  let filtered = companies

  // Filter by type
  if (selectedType.value !== 'all') {
    filtered = filtered.filter(company => company.type === selectedType.value)
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(company =>
      company.name.toLowerCase().includes(query) ||
      company.type.toLowerCase().includes(query) ||
      company.city?.toLowerCase().includes(query) ||
      company.state?.toLowerCase().includes(query)
    )
  }

  return filtered
})

// Get contact count for a company
const getContactCount = (companyId: string) => {
  return getContactsByCompanyId(companyId).length
}

// Check if filters are active
const hasActiveFilters = computed(() => {
  return searchQuery.value.trim() !== '' || selectedType.value !== 'all'
})

// Clear all filters
const clearFilters = () => {
  searchQuery.value = ''
  selectedType.value = 'all'
}

// Handle add company click
const handleAddCompany = () => {
  navigateTo('/companies/add')
}
</script>

<template>
  <div class="flex-1 p-8 bg-gray-50">
    <!-- Page Header -->
    <div class="flex items-start justify-between mb-6">
      <div>
        <div class="flex items-center gap-3">
          <h1 class="text-2xl font-bold text-gray-900">Companies</h1>
          <Badge variant="secondary" class="font-semibold text-sm">
            {{ filteredCompanies.length }} of {{ companies.length }}
          </Badge>
        </div>
        <p class="text-sm text-gray-600 mt-1">Manage promoters, venues, and production companies</p>
      </div>
      <Button class="bg-black text-white hover:bg-gray-800" @click="handleAddCompany">
        <Plus class="h-4 w-4 mr-2" />
        Add Company
      </Button>
    </div>

    <!-- Search and Filter Bar -->
    <div class="mb-6 flex items-center gap-4">
      <SearchInput v-model="searchQuery" placeholder="Search companies..." />
      <div class="flex items-center gap-2">
        <Filter class="h-4 w-4 text-gray-600" />
        <select
          v-model="selectedType"
          class="h-10 px-3 py-2 border border-gray-200 rounded-md text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
        >
          <option value="all">All Types</option>
          <option v-for="type in companyTypes" :key="type" :value="type">
            {{ type }}
          </option>
        </select>
      </div>
    </div>

    <!-- TRUE EMPTY STATE: No companies exist at all -->
    <EmptyState
      v-if="companies.length === 0"
      :icon="Building2"
      title="No companies yet"
      description="Add your first company to start building your network of promoters, venues, and production partners"
      dashed
    >
      <template #action>
        <Button
          class="bg-black text-white hover:bg-gray-800 gap-2"
          @click="handleAddCompany"
        >
          <Plus class="h-4 w-4" />
          Add Your First Company
        </Button>
      </template>
    </EmptyState>

    <!-- COMPANIES TABLE (when data exists) -->
    <Card v-else class="border border-gray-200 bg-white">
      <Table>
        <TableHeader>
          <TableRow class="border-b border-gray-200">
            <TableHead class="font-bold text-gray-900">Company Name</TableHead>
            <TableHead class="font-bold text-gray-900">Type</TableHead>
            <TableHead class="font-bold text-gray-900">Location</TableHead>
            <TableHead class="font-bold text-gray-900">Main Phone</TableHead>
            <TableHead class="font-bold text-gray-900 text-center">Contacts</TableHead>
            <TableHead class="font-bold text-gray-900">Website</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <!-- FILTERED EMPTY STATE: No results after filtering -->
          <TableRow v-if="filteredCompanies.length === 0">
            <TableCell colspan="6" class="h-64">
              <div class="flex flex-col items-center justify-center text-center">
                <Building2 class="h-12 w-12 text-gray-400 mb-4" />
                <p class="text-base font-semibold text-gray-900 mb-1">No companies match your search</p>
                <p class="text-sm text-gray-600 mb-4">Try adjusting your filters or search terms</p>
                <Button
                  v-if="hasActiveFilters"
                  variant="outline"
                  size="sm"
                  @click="clearFilters"
                >
                  Clear Filters
                </Button>
              </div>
            </TableCell>
          </TableRow>

          <!-- COMPANY ROWS -->
          <TableRow
            v-for="company in filteredCompanies"
            :key="company.id"
            class="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
            @click="$router.push(`/companies/${company.id}`)"
          >
            <TableCell class="font-semibold text-gray-900">
              <div class="flex items-center gap-3">
                <div class="flex-shrink-0 flex items-center justify-center w-9 h-9 border border-gray-200 rounded-md bg-white shadow-sm">
                  <Building2 class="h-4 w-4 text-gray-600" />
                </div>
                <span class="hover:text-black transition-colors">{{ company.name }}</span>
              </div>
            </TableCell>
            <TableCell>
              <StatusBadge :type="company.type">
                {{ company.type }}
              </StatusBadge>
            </TableCell>
            <TableCell class="text-gray-600">
              {{ company.city }}{{ company.state ? `, ${company.state}` : '' }}
            </TableCell>
            <TableCell class="text-gray-600">
              <a
                v-if="company.mainPhone"
                :href="`tel:${company.mainPhone}`"
                class="hover:text-blue-600 transition-colors"
                @click.stop
              >
                {{ company.mainPhone }}
              </a>
              <span v-else class="text-gray-400">-</span>
            </TableCell>
            <TableCell class="text-center">
              <Badge variant="secondary" class="font-semibold border border-gray-200">
                {{ getContactCount(company.id) }}
              </Badge>
            </TableCell>
            <TableCell>
              <a
                v-if="company.website"
                :href="company.website"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 hover:underline text-sm font-medium transition-colors"
                @click.stop
              >
                <Globe class="h-3.5 w-3.5" />
                Visit
              </a>
              <span v-else class="text-gray-400">-</span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  </div>
</template>
