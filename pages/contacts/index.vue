<script setup lang="ts">
import { Briefcase, Building2, List, LayoutGrid, UserPlus } from 'lucide-vue-next'
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
  <div class="flex flex-1 flex-col gap-[var(--spacing-6)]">
    <!-- Page Header -->
    <div class="flex items-start justify-between">
      <div class="flex flex-col gap-[var(--spacing-1)]">
        <h1 class="text-[length:var(--font-size-3xl)] font-bold text-[var(--foreground)]">Contacts Directory</h1>
        <p class="text-[length:var(--font-size-sm)] text-[var(--muted-foreground)]">Manage external contacts, promoters, and venue representatives</p>
      </div>
      <Button
        class="bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--foreground)]/90 gap-[var(--spacing-2)] transition-colors duration-[var(--transition-duration-base)]"
        @click="handleAddContact"
      >
        <UserPlus class="h-4 w-4" />
        Add Contact
      </Button>
    </div>

    <!-- Search and Filters Container -->
    <div class="border border-[var(--border)] rounded-[var(--radius-lg)] p-[var(--spacing-6)] bg-[var(--card)]">
      <div class="flex flex-col gap-[var(--spacing-4)]">
        <!-- Search Input -->
        <SearchInput
          v-model="searchQuery"
          placeholder="Search by name, role, or company..."
        />

        <!-- Filters Row -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-[var(--spacing-3)]">
          <!-- Company Filter -->
          <Select v-model="selectedCompanyId">
            <SelectTrigger class="bg-[var(--card)]">
              <SelectValue placeholder="All Companies" />
            </SelectTrigger>
            <SelectContent class="bg-[var(--card)]">
              <SelectItem value="all">All Companies</SelectItem>
              <SelectItem v-for="company in uniqueCompanies" :key="company.id" :value="company.id">
                {{ company.name }}
              </SelectItem>
            </SelectContent>
          </Select>

          <!-- Role Filter -->
          <Select v-model="selectedRole">
            <SelectTrigger class="bg-[var(--card)]">
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent class="bg-[var(--card)]">
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
      <TabsList class="grid w-full max-w-[400px] grid-cols-2 bg-[var(--muted)]">
        <TabsTrigger value="all" class="flex items-center gap-[var(--spacing-2)]">
          <List class="h-4 w-4" />
          All Contacts
        </TabsTrigger>
        <TabsTrigger value="grouped" class="flex items-center gap-[var(--spacing-2)]">
          <LayoutGrid class="h-4 w-4" />
          By Company
        </TabsTrigger>
      </TabsList>

      <!-- All Contacts View (Flat Table) -->
      <TabsContent value="all" class="mt-[var(--spacing-6)]">
        <!-- TRUE EMPTY STATE: No contacts exist at all -->
        <EmptyState
          v-if="contacts.length === 0"
          :icon="UserPlus"
          title="No contacts yet"
          description="Add your first contact to start building your network of promoters, venue managers, and industry professionals"
          dashed
        >
          <template #action>
            <Button
              class="bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--foreground)]/90 gap-[var(--spacing-2)] transition-colors duration-[var(--transition-duration-base)]"
              @click="handleAddContact"
            >
              <UserPlus class="h-4 w-4" />
              Add Your First Contact
            </Button>
          </template>
        </EmptyState>

        <!-- CONTACTS TABLE (when contacts exist) -->
        <div v-else class="border border-[var(--border)] rounded-[var(--radius-lg)] overflow-hidden bg-[var(--card)]">
          <Table>
            <TableHeader>
              <TableRow class="bg-[var(--card)] border-b border-[var(--border)]">
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
                    <Briefcase class="h-12 w-12 text-[var(--muted-foreground)] opacity-60 mb-[var(--spacing-4)]" />
                    <p class="text-[length:var(--font-size-base)] font-semibold text-[var(--foreground)] mb-[var(--spacing-1)]">No contacts match your search</p>
                    <p class="text-[length:var(--font-size-sm)] text-[var(--muted-foreground)] mb-[var(--spacing-4)]">Try adjusting your search or filters</p>
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
                class="border-b border-[var(--border)] last:border-0 hover:bg-[var(--muted)]/50 transition-colors duration-[var(--transition-duration-fast)]"
              >
                <TableCell class="font-medium">
                  <div class="flex items-center gap-[var(--spacing-3)]">
                    <Avatar class="h-9 w-9">
                      <AvatarFallback class="bg-[var(--muted)] text-[var(--foreground)]">
                        {{ contact.firstName.charAt(0) }}{{ contact.lastName.charAt(0) }}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div class="font-semibold text-[var(--foreground)]">{{ contact.firstName }} {{ contact.lastName }}</div>
                      <div v-if="contact.title" class="text-[length:var(--font-size-xs)] text-[var(--muted-foreground)]">{{ contact.title }}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge :variant="getRoleBadgeVariant(contact.role)" class="font-normal">
                    {{ contact.role }}
                  </Badge>
                </TableCell>
                <TableCell class="text-[var(--foreground)]">
                  {{ contact.companyName || '—' }}
                </TableCell>
                <TableCell class="text-[var(--muted-foreground)] text-[length:var(--font-size-sm)]">
                  {{ contact.email || '—' }}
                </TableCell>
                <TableCell class="text-[var(--muted-foreground)] text-[length:var(--font-size-sm)]">
                  {{ contact.phone || '—' }}
                </TableCell>
                <TableCell class="text-right">
                  <Button
                    variant="link"
                    size="sm"
                    as-child
                    class="text-[var(--foreground)] hover:text-[var(--foreground)]/70 transition-colors duration-[var(--transition-duration-fast)]"
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
      <TabsContent value="grouped" class="mt-[var(--spacing-6)] flex flex-col gap-[var(--spacing-4)]">
        <!-- TRUE EMPTY STATE: No contacts exist at all -->
        <EmptyState
          v-if="contacts.length === 0"
          :icon="UserPlus"
          title="No contacts yet"
          description="Add your first contact to start building your network of promoters, venue managers, and industry professionals"
          dashed
        >
          <template #action>
            <Button
              class="bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--foreground)]/90 gap-[var(--spacing-2)] transition-colors duration-[var(--transition-duration-base)]"
              @click="handleAddContact"
            >
              <UserPlus class="h-4 w-4" />
              Add Your First Contact
            </Button>
          </template>
        </EmptyState>

        <!-- GROUPED VIEW CONTENT (when contacts exist) -->
        <template v-else>
          <!-- Companies Sections -->
          <div v-for="item in groupedContacts.companies" :key="item.company.id" class="border border-[var(--border)] rounded-[var(--radius-lg)] bg-[var(--card)] overflow-hidden">
          <!-- Company Header -->
          <div class="px-[var(--spacing-6)] py-[var(--spacing-4)] bg-[var(--muted)]/50 border-b border-[var(--border)]">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-[var(--spacing-3)]">
                <div class="flex items-center justify-center w-10 h-10 border border-[var(--border)] rounded-[var(--radius-md)] bg-[var(--card)]">
                  <Building2 class="h-5 w-5 text-[var(--muted-foreground)]" />
                </div>
                <div>
                  <h3 class="font-bold text-[var(--foreground)]">{{ item.company.name }}</h3>
                  <div class="flex items-center gap-[var(--spacing-2)] mt-[var(--spacing-1)]">
                    <StatusBadge :type="item.company.type">
                      {{ item.company.type }}
                    </StatusBadge>
                    <span v-if="item.company.city" class="text-[length:var(--font-size-xs)] text-[var(--muted-foreground)]">
                      {{ item.company.city }}<span v-if="item.company.state">, {{ item.company.state }}</span>
                    </span>
                  </div>
                </div>
              </div>
              <Badge variant="secondary" class="text-[length:var(--font-size-xs)]">
                {{ item.contacts.length }} {{ item.contacts.length === 1 ? 'contact' : 'contacts' }}
              </Badge>
            </div>
          </div>

          <!-- Company Contacts Table -->
          <Table>
            <TableHeader>
              <TableRow class="bg-[var(--card)] border-b border-[var(--border)]">
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
                class="border-b border-[var(--border)] last:border-0 hover:bg-[var(--muted)]/50 transition-colors duration-[var(--transition-duration-fast)]"
              >
                <TableCell class="font-medium">
                  <div class="flex items-center gap-[var(--spacing-3)]">
                    <Avatar class="h-9 w-9">
                      <AvatarFallback class="bg-[var(--muted)] text-[var(--foreground)]">
                        {{ contact.firstName.charAt(0) }}{{ contact.lastName.charAt(0) }}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div class="font-semibold text-[var(--foreground)]">{{ contact.firstName }} {{ contact.lastName }}</div>
                      <div v-if="contact.title" class="text-[length:var(--font-size-xs)] text-[var(--muted-foreground)]">{{ contact.title }}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge :variant="getRoleBadgeVariant(contact.role)" class="font-normal">
                    {{ contact.role }}
                  </Badge>
                </TableCell>
                <TableCell class="text-[var(--muted-foreground)] text-[length:var(--font-size-sm)]">
                  {{ contact.email || '—' }}
                </TableCell>
                <TableCell class="text-[var(--muted-foreground)] text-[length:var(--font-size-sm)]">
                  {{ contact.phone || '—' }}
                </TableCell>
                <TableCell class="text-right">
                  <Button
                    variant="link"
                    size="sm"
                    as-child
                    class="text-[var(--foreground)] hover:text-[var(--foreground)]/70 transition-colors duration-[var(--transition-duration-fast)]"
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
        <div v-if="groupedContacts.independent.length > 0" class="border border-[var(--border)] rounded-[var(--radius-lg)] bg-[var(--card)] overflow-hidden">
          <!-- Independent Header -->
          <div class="px-[var(--spacing-6)] py-[var(--spacing-4)] bg-[var(--muted)]/50 border-b border-[var(--border)]">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-[var(--spacing-3)]">
                <div class="flex items-center justify-center w-10 h-10 border border-[var(--border)] rounded-[var(--radius-md)] bg-[var(--card)]">
                  <Briefcase class="h-5 w-5 text-[var(--muted-foreground)]" />
                </div>
                <div>
                  <h3 class="font-bold text-[var(--foreground)]">Independent Contacts</h3>
                  <p class="text-[length:var(--font-size-xs)] text-[var(--muted-foreground)] mt-[var(--spacing-1)]">Contacts not associated with a company</p>
                </div>
              </div>
              <Badge variant="secondary" class="text-[length:var(--font-size-xs)]">
                {{ groupedContacts.independent.length }} {{ groupedContacts.independent.length === 1 ? 'contact' : 'contacts' }}
              </Badge>
            </div>
          </div>

          <!-- Independent Contacts Table -->
          <Table>
            <TableHeader>
              <TableRow class="bg-[var(--card)] border-b border-[var(--border)]">
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
                class="border-b border-[var(--border)] last:border-0 hover:bg-[var(--muted)]/50 transition-colors duration-[var(--transition-duration-fast)]"
              >
                <TableCell class="font-medium">
                  <div class="flex items-center gap-[var(--spacing-3)]">
                    <Avatar class="h-9 w-9">
                      <AvatarFallback class="bg-[var(--muted)] text-[var(--foreground)]">
                        {{ contact.firstName.charAt(0) }}{{ contact.lastName.charAt(0) }}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div class="font-semibold text-[var(--foreground)]">{{ contact.firstName }} {{ contact.lastName }}</div>
                      <div v-if="contact.title" class="text-[length:var(--font-size-xs)] text-[var(--muted-foreground)]">{{ contact.title }}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge :variant="getRoleBadgeVariant(contact.role)" class="font-normal">
                    {{ contact.role }}
                  </Badge>
                </TableCell>
                <TableCell class="text-[var(--muted-foreground)] text-[length:var(--font-size-sm)]">
                  {{ contact.email || '—' }}
                </TableCell>
                <TableCell class="text-[var(--muted-foreground)] text-[length:var(--font-size-sm)]">
                  {{ contact.phone || '—' }}
                </TableCell>
                <TableCell class="text-right">
                  <Button
                    variant="link"
                    size="sm"
                    as-child
                    class="text-[var(--foreground)] hover:text-[var(--foreground)]/70 transition-colors duration-[var(--transition-duration-fast)]"
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
          <div v-if="groupedContacts.companies.length === 0 && groupedContacts.independent.length === 0" class="border border-[var(--border)] rounded-[var(--radius-lg)] bg-[var(--card)]">
            <div class="flex flex-col items-center justify-center py-[var(--spacing-16)] px-[var(--spacing-8)] text-center">
              <Briefcase class="h-12 w-12 text-[var(--muted-foreground)] opacity-60 mb-[var(--spacing-4)]" />
              <p class="text-[length:var(--font-size-base)] font-semibold text-[var(--foreground)] mb-[var(--spacing-1)]">No contacts match your search</p>
              <p class="text-[length:var(--font-size-sm)] text-[var(--muted-foreground)] mb-[var(--spacing-4)]">Try adjusting your search or filters</p>
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
