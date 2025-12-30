<script setup lang="ts">
import { UserCog } from 'lucide-vue-next'
import { personnel, getDepartments } from '@/utils/mockData/people'
import { tours, getTourName } from '@/utils/mockData'

definePageMeta({
  layout: 'default'
})

// State
const searchQuery = ref('')
const selectedtourIds = ref<string>('all')
const selectedDepartment = ref<string>('all')

// Get unique departments
const departments = computed(() => getDepartments())

// Filtered people
const filteredPeople = computed(() => {
  let result = personnel

  // Filter by search
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(person =>
      person.firstName.toLowerCase().includes(query) ||
      person.lastName.toLowerCase().includes(query) ||
      person.role.toLowerCase().includes(query)
    )
  }

  // Filter by tour
  if (selectedtourIds.value !== 'all') {
    result = result.filter(person =>
        person.tourIds?.includes(selectedtourIds.value) ?? false
    )
  }

  // Filter by department
  if (selectedDepartment.value !== 'all') {
    result = result.filter(person => person.department === selectedDepartment.value)
  }

  return result
})
</script>

<template>
  <div class="flex flex-1 flex-col gap-6">
    <!-- Page Header -->
    <div class="space-y-1">
      <h1 class="text-3xl font-bold text-gray-900">Personnel Directory</h1>
      <p class="text-sm text-gray-500">Manage and view all personnel across tours</p>
    </div>

    <!-- Search and Filters Container -->
    <div class="border border-gray-200 rounded-lg p-6 bg-white">
      <div class="space-y-4">
        <!-- Search Input -->
        <SearchInput
          v-model="searchQuery"
          placeholder="Search by name or role..."
        />

        <!-- Filters Row -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <!-- Tour Filter -->
          <Select v-model="selectedtourIds">
            <SelectTrigger class="bg-white">
              <SelectValue placeholder="All Tours" />
            </SelectTrigger>
            <SelectContent class="bg-white">
              <SelectItem value="all">All Tours</SelectItem>
              <SelectItem v-for="tour in tours" :key="tour.id" :value="tour.id">
                {{ tour.name }}
              </SelectItem>
            </SelectContent>
          </Select>

          <!-- Department Filter -->
          <Select v-model="selectedDepartment">
            <SelectTrigger class="bg-white">
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent class="bg-white">
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem v-for="dept in departments" :key="dept" :value="dept">
                {{ dept }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>

    <!-- Table Container -->
    <div class="border border-gray-200 rounded-lg overflow-hidden bg-white">
      <Table>
        <TableHeader>
          <TableRow class="bg-white border-b border-gray-200">
            <TableHead class="font-semibold">Name</TableHead>
            <TableHead class="font-semibold">Role</TableHead>
            <TableHead class="font-semibold">Department</TableHead>
            <TableHead class="font-semibold">Tour</TableHead>
            <TableHead class="text-right font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            v-if="filteredPeople.length === 0"
            class="hover:bg-transparent"
          >
            <TableCell colspan="5" class="h-32 text-center">
              <div class="flex flex-col items-center justify-center gap-2 text-gray-500">
                <UserCog class="h-8 w-8" />
                <p class="text-sm font-medium">No personnel found</p>
                <p class="text-xs">Try adjusting your search or filters</p>
              </div>
            </TableCell>
          </TableRow>
          <TableRow
            v-for="person in filteredPeople"
            :key="person.id"
            class="border-b border-gray-200 last:border-0 hover:bg-gray-50"
          >
            <TableCell class="font-medium">
              <div class="flex items-center gap-3">
                <Avatar class="h-9 w-9">
                  <AvatarFallback class="bg-gray-100 text-gray-700">
                    {{ person.firstName.charAt(0) }}{{ person.lastName.charAt(0) }}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div class="font-semibold text-gray-900">{{ person.firstName }} {{ person.lastName }}</div>
                  <div v-if="person.email" class="text-xs text-gray-500">{{ person.email }}</div>
                </div>
              </div>
            </TableCell>
            <TableCell class="text-gray-900">{{ person.role }}</TableCell>
            <TableCell>
              <Badge v-if="person.department === 'Management'" variant="outline" class="font-normal">
                {{ person.department }}
              </Badge>
              <span v-else class="text-gray-900">{{ person.department }}</span>
            </TableCell>
            <TableCell class="text-gray-600">{{ getTourName(person.tourIds) }}</TableCell>
            <TableCell class="text-right">
              <Button
                variant="link"
                size="sm"
                as-child
                class="text-gray-900 hover:text-gray-700"
              >
                <NuxtLink :to="`/personnel/${person.id}`">
                  View Details
                </NuxtLink>
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
