<script setup lang="ts">
import { Search, Briefcase, Building2, List, LayoutGrid, UserPlus } from 'lucide-vue-next'
import { contacts, companies, searchContacts, getContactsByCompanyId } from '@/utils/mockData/people'
import type { Company } from '@/utils/mockData/types'

definePageMeta({
  layout: 'default'
})

// State
const searchQuery = ref('')
const selectedCompanyId = ref<string>('all')
const selectedRole = ref<string>('all')
const viewMode = ref<'all' | 'grouped'>('all')

// Get unique companies from contacts
const uniqueCompanies = computed(() => {
  const companyMap = new Map()
  contacts.forEach(contact => {
    if (contact.companyId && contact.companyName) {
      companyMap.set(contact.companyId, contact.companyName)
    }
  })
  return Array.from(companyMap, ([id, name]) => ({ id, name }))
})

// Get unique roles from contacts
const uniqueRoles = computed(() => {
  const roles = [...new Set(contacts.map(c => c.role))]
  return roles.sort()
})

// Filtered contacts
const filteredContacts = computed(() => {
  let result = contacts

  // Filter by search
  if (searchQuery.value.trim()) {
    result = searchContacts(searchQuery.value)
  }

  // Filter by company
  if (selectedCompanyId.value !== 'all') {
    result = result.filter(contact => contact.companyId === selectedCompanyId.value)
  }

  // Filter by role
  if (selectedRole.value !== 'all') {
    result = result.filter(contact => contact.role === selectedRole.value)
  }

  return result
})

// Grouped contacts by company
const groupedContacts = computed(() => {
  const filtered = filteredContacts.value

  // Get companies that have contacts in the filtered list
  const companiesWithContacts = companies
    .map(company => {
      const companyContacts = filtered.filter(c => c.companyId === company.id)
      return {
        company,
        contacts: companyContacts
      }
    })
    .filter(item => item.contacts.length > 0)
    .sort((a, b) => a.company.name.localeCompare(b.company.name))

  // Get independent contacts (no company)
  const independentContacts = filtered.filter(c => !c.companyId)

  return {
    companies: companiesWithContacts,
    independent: independentContacts
  }
})

// Get role badge variant
const getRoleBadgeVariant = (role: string): 'default' | 'outline' | 'secondary' => {
  if (role.toLowerCase().includes('promoter')) return 'default'
  if (role.toLowerCase().includes('venue')) return 'outline'
  return 'secondary'
}

// Get company type badge variant
const getCompanyTypeBadgeVariant = (type: string): 'default' | 'outline' | 'secondary' => {
  if (type === 'Promoter') return 'default'
  if (type === 'Venue') return 'outline'
  return 'secondary'
}

// Check if filters are active
const hasActiveFilters = computed(() => {
  return searchQuery.value.trim() !== '' ||
         selectedCompanyId.value !== 'all' ||
         selectedRole.value !== 'all'
})

// Clear all filters
const clearFilters = () => {
  searchQuery.value = ''
  selectedCompanyId.value = 'all'
  selectedRole.value = 'all'
}

// Handle add contact click
const handleAddContact = () => {
  navigateTo('/contacts/add')
}
</script>

<template>
  <div class="flex flex-1 flex-col gap-6">
    <!-- Page Header -->
    <div class="space-y-1">
      <h1 class="text-3xl font-bold text-gray-900">Contacts Directory</h1>
      <p class="text-sm text-gray-500">Manage external contacts, promoters, and venue representatives</p>
    </div>

    <!-- Search and Filters Container -->
    <div class="border border-gray-200 rounded-lg p-6 bg-white">
      <div class="space-y-4">
        <!-- Search Input -->
        <div class="relative">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            v-model="searchQuery"
            placeholder="Search by name, role, or company..."
            class="pl-9 bg-white"
          />
        </div>

        <!-- Filters Row -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <!-- Company Filter -->
          <Select v-model="selectedCompanyId">
            <SelectTrigger class="bg-white">
              <SelectValue placeholder="All Companies" />
            </SelectTrigger>
            <SelectContent class="bg-white">
              <SelectItem value="all">All Companies</SelectItem>
              <SelectItem v-for="company in uniqueCompanies" :key="company.id" :value="company.id">
                {{ company.name }}
              </SelectItem>
            </SelectContent>
          </Select>

          <!-- Role Filter -->
          <Select v-model="selectedRole">
            <SelectTrigger class="bg-white">
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent class="bg-white">
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem v-for="role in uniqueRoles" :key="role" :value="role">
                {{ role }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>

    <!-- View Toggle and Content -->
    <Tabs v-model="viewMode" class="w-full">
      <TabsList class="grid w-full max-w-[400px] grid-cols-2 bg-gray-100">
        <TabsTrigger value="all" class="flex items-center gap-2">
          <List class="h-4 w-4" />
          All Contacts
        </TabsTrigger>
        <TabsTrigger value="grouped" class="flex items-center gap-2">
          <LayoutGrid class="h-4 w-4" />
          By Company
        </TabsTrigger>
      </TabsList>

      <!-- All Contacts View (Flat Table) -->
      <TabsContent value="all" class="mt-6">
        <!-- TRUE EMPTY STATE: No contacts exist at all -->
        <div v-if="contacts.length === 0" class="border-2 border-dashed border-gray-300 rounded-lg bg-white">
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
        </div>

        <!-- CONTACTS TABLE (when contacts exist) -->
        <div v-else class="border border-gray-200 rounded-lg overflow-hidden bg-white">
          <Table>
            <TableHeader>
              <TableRow class="bg-white border-b border-gray-200">
                <TableHead class="font-semibold">Name</TableHead>
                <TableHead class="font-semibold">Role</TableHead>
                <TableHead class="font-semibold">Company</TableHead>
                <TableHead class="font-semibold">Email</TableHead>
                <TableHead class="font-semibold">Phone</TableHead>
                <TableHead class="text-right font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <!-- FILTERED EMPTY STATE: No results after filtering -->
              <TableRow
                v-if="filteredContacts.length === 0"
                class="hover:bg-transparent"
              >
                <TableCell colspan="6" class="h-64">
                  <div class="flex flex-col items-center justify-center text-center">
                    <Briefcase class="h-12 w-12 text-gray-400 mb-4" />
                    <p class="text-base font-semibold text-gray-900 mb-1">No contacts match your search</p>
                    <p class="text-sm text-gray-600 mb-4">Try adjusting your search or filters</p>
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

              <!-- CONTACT ROWS -->
              <TableRow
                v-for="contact in filteredContacts"
                :key="contact.id"
                class="border-b border-gray-200 last:border-0 hover:bg-gray-50"
              >
                <TableCell class="font-medium">
                  <div class="flex items-center gap-3">
                    <Avatar class="h-9 w-9">
                      <AvatarFallback class="bg-gray-100 text-gray-700">
                        {{ contact.firstName.charAt(0) }}{{ contact.lastName.charAt(0) }}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div class="font-semibold text-gray-900">{{ contact.firstName }} {{ contact.lastName }}</div>
                      <div v-if="contact.title" class="text-xs text-gray-500">{{ contact.title }}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge :variant="getRoleBadgeVariant(contact.role)" class="font-normal">
                    {{ contact.role }}
                  </Badge>
                </TableCell>
                <TableCell class="text-gray-900">
                  {{ contact.companyName || '—' }}
                </TableCell>
                <TableCell class="text-gray-600 text-sm">
                  {{ contact.email || '—' }}
                </TableCell>
                <TableCell class="text-gray-600 text-sm">
                  {{ contact.phone || '—' }}
                </TableCell>
                <TableCell class="text-right">
                  <Button
                    variant="link"
                    size="sm"
                    as-child
                    class="text-gray-900 hover:text-gray-700"
                  >
                    <NuxtLink :to="`/contacts/${contact.id}`">
                      View Details
                    </NuxtLink>
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </TabsContent>

      <!-- Grouped by Company View -->
      <TabsContent value="grouped" class="mt-6 space-y-4">
        <!-- TRUE EMPTY STATE: No contacts exist at all -->
        <div v-if="contacts.length === 0" class="border-2 border-dashed border-gray-300 rounded-lg bg-white">
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
        </div>

        <!-- GROUPED VIEW CONTENT (when contacts exist) -->
        <template v-else>
          <!-- Companies Sections -->
          <div v-for="item in groupedContacts.companies" :key="item.company.id" class="border border-gray-200 rounded-lg bg-white overflow-hidden">
          <!-- Company Header -->
          <div class="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="flex items-center justify-center w-10 h-10 border border-gray-200 rounded-md bg-white">
                  <Building2 class="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <h3 class="font-bold text-gray-900">{{ item.company.name }}</h3>
                  <div class="flex items-center gap-2 mt-1">
                    <Badge :variant="getCompanyTypeBadgeVariant(item.company.type)" class="text-xs">
                      {{ item.company.type }}
                    </Badge>
                    <span v-if="item.company.city" class="text-xs text-gray-500">
                      {{ item.company.city }}<span v-if="item.company.state">, {{ item.company.state }}</span>
                    </span>
                  </div>
                </div>
              </div>
              <Badge variant="secondary" class="text-xs">
                {{ item.contacts.length }} {{ item.contacts.length === 1 ? 'contact' : 'contacts' }}
              </Badge>
            </div>
          </div>

          <!-- Company Contacts Table -->
          <Table>
            <TableHeader>
              <TableRow class="bg-white border-b border-gray-200">
                <TableHead class="font-semibold">Name</TableHead>
                <TableHead class="font-semibold">Role</TableHead>
                <TableHead class="font-semibold">Email</TableHead>
                <TableHead class="font-semibold">Phone</TableHead>
                <TableHead class="text-right font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow
                v-for="contact in item.contacts"
                :key="contact.id"
                class="border-b border-gray-200 last:border-0 hover:bg-gray-50"
              >
                <TableCell class="font-medium">
                  <div class="flex items-center gap-3">
                    <Avatar class="h-9 w-9">
                      <AvatarFallback class="bg-gray-100 text-gray-700">
                        {{ contact.firstName.charAt(0) }}{{ contact.lastName.charAt(0) }}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div class="font-semibold text-gray-900">{{ contact.firstName }} {{ contact.lastName }}</div>
                      <div v-if="contact.title" class="text-xs text-gray-500">{{ contact.title }}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge :variant="getRoleBadgeVariant(contact.role)" class="font-normal">
                    {{ contact.role }}
                  </Badge>
                </TableCell>
                <TableCell class="text-gray-600 text-sm">
                  {{ contact.email || '—' }}
                </TableCell>
                <TableCell class="text-gray-600 text-sm">
                  {{ contact.phone || '—' }}
                </TableCell>
                <TableCell class="text-right">
                  <Button
                    variant="link"
                    size="sm"
                    as-child
                    class="text-gray-900 hover:text-gray-700"
                  >
                    <NuxtLink :to="`/contacts/${contact.id}`">
                      View Details
                    </NuxtLink>
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <!-- Independent Contacts Section -->
        <div v-if="groupedContacts.independent.length > 0" class="border border-gray-200 rounded-lg bg-white overflow-hidden">
          <!-- Independent Header -->
          <div class="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="flex items-center justify-center w-10 h-10 border border-gray-200 rounded-md bg-white">
                  <Briefcase class="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <h3 class="font-bold text-gray-900">Independent Contacts</h3>
                  <p class="text-xs text-gray-500 mt-1">Contacts not associated with a company</p>
                </div>
              </div>
              <Badge variant="secondary" class="text-xs">
                {{ groupedContacts.independent.length }} {{ groupedContacts.independent.length === 1 ? 'contact' : 'contacts' }}
              </Badge>
            </div>
          </div>

          <!-- Independent Contacts Table -->
          <Table>
            <TableHeader>
              <TableRow class="bg-white border-b border-gray-200">
                <TableHead class="font-semibold">Name</TableHead>
                <TableHead class="font-semibold">Role</TableHead>
                <TableHead class="font-semibold">Email</TableHead>
                <TableHead class="font-semibold">Phone</TableHead>
                <TableHead class="text-right font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow
                v-for="contact in groupedContacts.independent"
                :key="contact.id"
                class="border-b border-gray-200 last:border-0 hover:bg-gray-50"
              >
                <TableCell class="font-medium">
                  <div class="flex items-center gap-3">
                    <Avatar class="h-9 w-9">
                      <AvatarFallback class="bg-gray-100 text-gray-700">
                        {{ contact.firstName.charAt(0) }}{{ contact.lastName.charAt(0) }}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div class="font-semibold text-gray-900">{{ contact.firstName }} {{ contact.lastName }}</div>
                      <div v-if="contact.title" class="text-xs text-gray-500">{{ contact.title }}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge :variant="getRoleBadgeVariant(contact.role)" class="font-normal">
                    {{ contact.role }}
                  </Badge>
                </TableCell>
                <TableCell class="text-gray-600 text-sm">
                  {{ contact.email || '—' }}
                </TableCell>
                <TableCell class="text-gray-600 text-sm">
                  {{ contact.phone || '—' }}
                </TableCell>
                <TableCell class="text-right">
                  <Button
                    variant="link"
                    size="sm"
                    as-child
                    class="text-gray-900 hover:text-gray-700"
                  >
                    <NuxtLink :to="`/contacts/${contact.id}`">
                      View Details
                    </NuxtLink>
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

          <!-- FILTERED EMPTY STATE for Grouped View -->
          <div v-if="groupedContacts.companies.length === 0 && groupedContacts.independent.length === 0" class="border border-gray-200 rounded-lg bg-white">
            <div class="flex flex-col items-center justify-center py-16 px-8 text-center">
              <Briefcase class="h-12 w-12 text-gray-400 mb-4" />
              <p class="text-base font-semibold text-gray-900 mb-1">No contacts match your search</p>
              <p class="text-sm text-gray-600 mb-4">Try adjusting your search or filters</p>
              <Button
                v-if="hasActiveFilters"
                variant="outline"
                size="sm"
                @click="clearFilters"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </template>
      </TabsContent>
    </Tabs>
  </div>
</template>
