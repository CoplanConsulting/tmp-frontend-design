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
  <div class="flex-1 p-[var(--spacing-8)] bg-[var(--background)]">
    <!-- Page Header -->
    <div class="flex items-start justify-between mb-[var(--spacing-6)]">
      <div>
        <div class="flex items-center gap-[var(--spacing-3)]">
          <h1 class="text-[var(--font-size-2xl)] font-bold text-[var(--foreground)]">Companies</h1>
          <Badge variant="secondary" class="font-semibold text-[var(--font-size-sm)]">
            {{ filteredCompanies.length }} of {{ companies.length }}
          </Badge>
        </div>
        <p class="text-[var(--font-size-sm)] text-[var(--muted-foreground)] mt-[var(--spacing-1)]">Manage promoters, venues, and production companies</p>
      </div>
      <Button
        class="bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--foreground)]/90 transition-colors duration-[var(--transition-duration-base)]"
        @click="handleAddCompany"
      >
        <Plus class="h-4 w-4 mr-[var(--spacing-2)]" />
        Add Company
      </Button>
    </div>

    <!-- Search and Filter Bar -->
    <div class="mb-[var(--spacing-6)] flex items-center gap-[var(--spacing-4)]">
      <SearchInput v-model="searchQuery" placeholder="Search companies..." />
      <div class="flex items-center gap-[var(--spacing-2)]">
        <Filter class="h-4 w-4 text-[var(--muted-foreground)]" />
        <select
          v-model="selectedType"
          class="h-10 px-[var(--spacing-3)] py-[var(--spacing-2)] border border-[var(--border)] rounded-[var(--radius-md)] text-[var(--font-size-sm)] bg-[var(--card)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
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
          class="bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--foreground)]/90 gap-[var(--spacing-2)] transition-colors duration-[var(--transition-duration-base)]"
          @click="handleAddCompany"
        >
          <Plus class="h-4 w-4" />
          Add Your First Company
        </Button>
      </template>
    </EmptyState>

    <!-- COMPANIES TABLE (when data exists) -->
    <Card v-else class="border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow-sm)]">
      <Table>
        <TableHeader>
          <TableRow class="border-b border-[var(--border)]">
            <TableHead class="font-bold text-[var(--foreground)]">Company Name</TableHead>
            <TableHead class="font-bold text-[var(--foreground)]">Type</TableHead>
            <TableHead class="font-bold text-[var(--foreground)]">Location</TableHead>
            <TableHead class="font-bold text-[var(--foreground)]">Main Phone</TableHead>
            <TableHead class="font-bold text-[var(--foreground)] text-center">Contacts</TableHead>
            <TableHead class="font-bold text-[var(--foreground)]">Website</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <!-- FILTERED EMPTY STATE: No results after filtering -->
          <TableRow v-if="filteredCompanies.length === 0">
            <TableCell colspan="6" class="h-64">
              <div class="flex flex-col items-center justify-center text-center gap-[var(--spacing-4)]">
                <Building2 class="h-12 w-12 text-[var(--muted-foreground)] opacity-60" />
                <div class="flex flex-col gap-[var(--spacing-1)]">
                  <p class="text-[var(--font-size-base)] font-semibold text-[var(--foreground)]">No companies match your search</p>
                  <p class="text-[var(--font-size-sm)] text-[var(--muted-foreground)]">Try adjusting your filters or search terms</p>
                </div>
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
            class="border-b border-[var(--border)] hover:bg-[var(--muted)] cursor-pointer transition-colors duration-[var(--transition-duration-fast)]"
            @click="$router.push(`/companies/${company.id}`)"
          >
            <TableCell class="font-semibold text-[var(--foreground)]">
              <div class="flex items-center gap-[var(--spacing-3)]">
                <div class="flex-shrink-0 flex items-center justify-center w-9 h-9 border border-[var(--border)] rounded-[var(--radius-md)] bg-[var(--card)] shadow-[var(--shadow-xs)]">
                  <Building2 class="h-4 w-4 text-[var(--muted-foreground)]" />
                </div>
                <span class="hover:text-[var(--accent)] transition-colors duration-[var(--transition-duration-fast)]">{{ company.name }}</span>
              </div>
            </TableCell>
            <TableCell>
              <StatusBadge :type="company.type">
                {{ company.type }}
              </StatusBadge>
            </TableCell>
            <TableCell class="text-[var(--muted-foreground)]">
              {{ company.city }}{{ company.state ? `, ${company.state}` : '' }}
            </TableCell>
            <TableCell class="text-[var(--muted-foreground)]">
              <a
                v-if="company.mainPhone"
                :href="`tel:${company.mainPhone}`"
                class="hover:text-[var(--accent)] transition-colors duration-[var(--transition-duration-fast)]"
                @click.stop
              >
                {{ company.mainPhone }}
              </a>
              <span v-else class="opacity-40">-</span>
            </TableCell>
            <TableCell class="text-center">
              <Badge variant="secondary" class="font-semibold border border-[var(--border)]">
                {{ getContactCount(company.id) }}
              </Badge>
            </TableCell>
            <TableCell>
              <a
                v-if="company.website"
                :href="company.website"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-[var(--spacing-1)] text-[var(--accent)] hover:opacity-80 hover:underline text-[var(--font-size-sm)] font-medium transition-all duration-[var(--transition-duration-fast)]"
                @click.stop
              >
                <Globe class="h-3.5 w-3.5" />
                Visit
              </a>
              <span v-else class="opacity-40">-</span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  </div>
</template>
