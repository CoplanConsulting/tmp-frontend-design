<script setup lang="ts">
import { Search, Mail, Phone, Shirt } from 'lucide-vue-next'
import { mockPeople, type Person } from '~/utils/mockPeople'
import { tours } from '~/utils/mockTours'

definePageMeta({
  layout: 'default'
})

// State
const searchQuery = ref('')
const selectedTourId = ref<string>('all')
const selectedDepartment = ref<string>('all')
const selectedPerson = ref<Person | null>(null)
const isDetailSheetOpen = ref(false)

// Get unique departments
const departments = computed(() => {
  const uniqueDepts = new Set(mockPeople.map(p => p.department))
  return Array.from(uniqueDepts).sort()
})

// Filtered people
const filteredPeople = computed(() => {
  let result = mockPeople

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
  if (selectedTourId.value !== 'all') {
    result = result.filter(person => person.tourId === selectedTourId.value)
  }

  // Filter by department
  if (selectedDepartment.value !== 'all') {
    result = result.filter(person => person.department === selectedDepartment.value)
  }

  return result
})

// Get tour name by ID
const getTourName = (tourId: string): string => {
  const tour = tours.find(t => t.id === tourId)
  return tour ? tour.name : 'Unknown Tour'
}

// Open detail sheet
const openPersonDetail = (person: Person) => {
  selectedPerson.value = person
  isDetailSheetOpen.value = true
}
</script>

<template>
  <div class="flex flex-1 flex-col gap-6">
        <!-- Page Header -->
        <div class="space-y-1">
          <h1 class="text-3xl font-bold text-gray-900">Crew Directory</h1>
          <p class="text-sm text-gray-500">Manage and view all personnel across tours</p>
        </div>

        <!-- Search and Filters Container -->
        <div class="border border-gray-200 rounded-lg p-6 bg-white">
          <div class="space-y-4">
            <!-- Search Input -->
            <div class="relative">
              <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                v-model="searchQuery"
                placeholder="Search by name or role..."
                class="pl-9 bg-white"
              />
            </div>

            <!-- Filters Row -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <!-- Tour Filter -->
              <Select v-model="selectedTourId">
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
                    <Users class="h-8 w-8" />
                    <p class="text-sm font-medium">No crew members found</p>
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
                <TableCell class="text-gray-600">{{ getTourName(person.tourId) }}</TableCell>
                <TableCell class="text-right">
                  <Button
                    variant="link"
                    size="sm"
                    @click="openPersonDetail(person)"
                    class="text-gray-900 hover:text-gray-700"
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

    <!-- Detail Sheet - Light Theme -->
    <Sheet v-model:open="isDetailSheetOpen">
      <SheetContent class="sm:max-w-lg bg-white overflow-y-auto">
        <SheetHeader class="pb-6 border-b px-6">
          <SheetTitle class="text-gray-900 text-lg">Crew Member Details</SheetTitle>
          <SheetDescription class="text-gray-600">
            Complete information for {{ selectedPerson?.fullName || `${selectedPerson?.firstName} ${selectedPerson?.lastName}` }}
          </SheetDescription>
        </SheetHeader>

        <div v-if="selectedPerson" class="py-6 px-6 space-y-8">
          <!-- Avatar and Basic Info -->
          <div class="flex items-center gap-4">
            <Avatar class="h-20 w-20 border-2 border-gray-200">
              <AvatarFallback class="text-xl bg-gray-100 text-gray-700 font-semibold">
                {{ selectedPerson.firstName.charAt(0) }}{{ selectedPerson.lastName.charAt(0) }}
              </AvatarFallback>
            </Avatar>
            <div class="flex-1">
              <h3 class="text-xl font-bold text-gray-900">
                {{ selectedPerson.fullName || `${selectedPerson.firstName} ${selectedPerson.middleName ? selectedPerson.middleName + ' ' : ''}${selectedPerson.lastName}` }}
              </h3>
              <p class="text-sm text-gray-600 mt-1">{{ selectedPerson.role }}</p>
              <div class="mt-2">
                <Badge v-if="selectedPerson.department === 'Management'" variant="outline" class="font-normal">
                  {{ selectedPerson.department }}
                </Badge>
                <span v-else class="text-sm text-gray-700">{{ selectedPerson.department }}</span>
              </div>
            </div>
          </div>

          <!-- Tour & Company Information -->
          <div class="space-y-4">
            <h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Assignment</h4>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="text-xs text-gray-500 mb-1 block">Tour</label>
                <p class="text-sm font-medium text-gray-900">{{ getTourName(selectedPerson.tourId) }}</p>
              </div>
              <div v-if="selectedPerson.company">
                <label class="text-xs text-gray-500 mb-1 block">Company</label>
                <p class="text-sm font-medium text-gray-900">{{ selectedPerson.company }}</p>
              </div>
            </div>
          </div>

          <Separator />

          <!-- Contact Information -->
          <div class="space-y-4">
            <h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact Information</h4>
            <div class="space-y-3">
              <div v-if="selectedPerson.email" class="flex items-start gap-3">
                <Mail class="h-4 w-4 text-gray-400 mt-0.5" />
                <div class="flex-1 min-w-0">
                  <label class="text-xs text-gray-500 block mb-0.5">Email</label>
                  <a :href="`mailto:${selectedPerson.email}`" class="text-sm text-blue-600 hover:underline break-all">
                    {{ selectedPerson.email }}
                  </a>
                </div>
              </div>
              <div v-if="selectedPerson.phone" class="flex items-start gap-3">
                <Phone class="h-4 w-4 text-gray-400 mt-0.5" />
                <div class="flex-1">
                  <label class="text-xs text-gray-500 block mb-0.5">Phone</label>
                  <a :href="`tel:${selectedPerson.phone}`" class="text-sm text-blue-600 hover:underline">
                    {{ selectedPerson.phone }}
                  </a>
                </div>
              </div>
              <div v-if="selectedPerson.address" class="flex items-start gap-3">
                <MapPin class="h-4 w-4 text-gray-400 mt-0.5" />
                <div class="flex-1">
                  <label class="text-xs text-gray-500 block mb-0.5">Address</label>
                  <p class="text-sm text-gray-900">{{ selectedPerson.address }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Personal Information -->
          <div v-if="selectedPerson.dob || selectedPerson.nationality" class="space-y-4">
            <Separator />
            <h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Personal Information</h4>
            <div class="grid grid-cols-2 gap-4">
              <div v-if="selectedPerson.dob">
                <label class="text-xs text-gray-500 mb-1 block">Date of Birth</label>
                <p class="text-sm font-medium text-gray-900">{{ selectedPerson.dob }}</p>
              </div>
              <div v-if="selectedPerson.nationality">
                <label class="text-xs text-gray-500 mb-1 block">Nationality</label>
                <p class="text-sm font-medium text-gray-900">{{ selectedPerson.nationality }}</p>
              </div>
            </div>
          </div>

          <!-- Passport Information -->
          <div v-if="selectedPerson.passportNumber || selectedPerson.passportCountry" class="space-y-4">
            <Separator />
            <h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Passport Information</h4>
            <div class="space-y-3">
              <div v-if="selectedPerson.passportNumber">
                <label class="text-xs text-gray-500 mb-1 block">Passport Number</label>
                <p class="text-sm font-medium text-gray-900">{{ selectedPerson.passportNumber }}</p>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div v-if="selectedPerson.passportExpiration">
                  <label class="text-xs text-gray-500 mb-1 block">Expiration</label>
                  <p class="text-sm font-medium text-gray-900">{{ selectedPerson.passportExpiration }}</p>
                </div>
                <div v-if="selectedPerson.passportCountry">
                  <label class="text-xs text-gray-500 mb-1 block">Country</label>
                  <p class="text-sm font-medium text-gray-900">{{ selectedPerson.passportCountry }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Emergency Contact -->
          <div v-if="selectedPerson.emergencyContactName" class="space-y-4">
            <Separator />
            <h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Emergency Contact</h4>
            <div class="space-y-3">
              <div>
                <label class="text-xs text-gray-500 mb-1 block">Name</label>
                <p class="text-sm font-medium text-gray-900">{{ selectedPerson.emergencyContactName }}</p>
              </div>
              <div v-if="selectedPerson.emergencyContactRelationship">
                <label class="text-xs text-gray-500 mb-1 block">Relationship</label>
                <p class="text-sm font-medium text-gray-900">{{ selectedPerson.emergencyContactRelationship }}</p>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div v-if="selectedPerson.emergencyContactPhone">
                  <label class="text-xs text-gray-500 mb-1 block">Phone</label>
                  <a :href="`tel:${selectedPerson.emergencyContactPhone}`" class="text-sm text-blue-600 hover:underline">
                    {{ selectedPerson.emergencyContactPhone }}
                  </a>
                </div>
                <div v-if="selectedPerson.emergencyContactEmail">
                  <label class="text-xs text-gray-500 mb-1 block">Email</label>
                  <a :href="`mailto:${selectedPerson.emergencyContactEmail}`" class="text-sm text-blue-600 hover:underline break-all">
                    {{ selectedPerson.emergencyContactEmail }}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Sizing Information -->
          <div v-if="selectedPerson.shirtSize || selectedPerson.jacketSize" class="space-y-4">
            <Separator />
            <h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Sizing Information</h4>
            <div class="grid grid-cols-2 gap-4">
              <div v-if="selectedPerson.shirtSize">
                <label class="text-xs text-gray-500 mb-1 block">Shirt Size</label>
                <div class="flex items-center gap-2">
                  <Shirt class="h-4 w-4 text-gray-400" />
                  <span class="text-sm font-medium text-gray-900">{{ selectedPerson.shirtSize }}</span>
                </div>
              </div>
              <div v-if="selectedPerson.jacketSize">
                <label class="text-xs text-gray-500 mb-1 block">Jacket Size</label>
                <div class="flex items-center gap-2">
                  <Shirt class="h-4 w-4 text-gray-400" />
                  <span class="text-sm font-medium text-gray-900">{{ selectedPerson.jacketSize }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Notes -->
          <div v-if="selectedPerson.notes && selectedPerson.notes.trim()" class="space-y-4">
            <Separator />
            <h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Notes</h4>
            <p class="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{{ selectedPerson.notes }}</p>
          </div>
        </div>

        <SheetFooter class="pt-6 border-t px-6">
          <Button variant="outline" @click="isDetailSheetOpen = false" class="w-full">
            Close
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </div>
</template>
