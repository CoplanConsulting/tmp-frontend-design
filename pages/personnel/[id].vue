<script setup lang="ts">
import {
  Mail,
  Phone,
  MapPin,
  User,
  FileText,
  AlertCircle,
  Shirt,
  Globe,
  Calendar,
  ArrowLeft
} from 'lucide-vue-next'
import { getPersonById } from '@/utils/mockData/people'
import { getTourName } from '@/utils/mockData'

definePageMeta({
  layout: 'default'
})

const route = useRoute()
const router = useRouter()
const personId = computed(() => route.params.id as string)

// Find selected person
const selectedPerson = computed(() => {
  const person = getPersonById(personId.value)
  return person
})

// Navigate back
const goBack = () => {
  router.push('/personnel')
}
</script>

<template>
  <div v-if="selectedPerson" class="flex flex-1 flex-col gap-6">
    <!-- Back Button -->
    <div>
      <Button
        variant="ghost"
        size="sm"
        @click="goBack"
        class="text-gray-600 hover:text-gray-900 -ml-2"
      >
        <ArrowLeft class="h-4 w-4 mr-2" />
        Back to Personnel
      </Button>
    </div>

    <!-- Page Header -->
    <div class="flex items-start justify-between">
      <div class="flex items-center gap-4">
        <Avatar class="h-16 w-16 border-2 border-gray-200">
          <AvatarFallback class="text-xl bg-gray-100 text-gray-700 font-semibold">
            {{ selectedPerson.firstName.charAt(0) }}{{ selectedPerson.lastName.charAt(0) }}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 class="text-2xl font-bold text-gray-900">
            {{ selectedPerson.firstName }}
            <span v-if="selectedPerson.middleName" class="text-gray-600">{{ selectedPerson.middleName }}</span>
            {{ selectedPerson.lastName }}
          </h1>
          <div class="flex items-center gap-3 mt-2">
            <p class="text-sm text-gray-600">{{ selectedPerson.role }}</p>
            <Badge variant="outline" class="text-xs font-semibold">
              {{ selectedPerson.department }}
            </Badge>
          </div>
        </div>
      </div>
    </div>

    <!-- Information Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Tour Assignment -->
      <Card class="border border-gray-200 bg-white">
        <CardHeader class="pb-3">
          <div class="flex items-center gap-2">
            <User class="h-5 w-5 text-gray-600" />
            <CardTitle class="text-base font-bold text-gray-900">Tour Assignment</CardTitle>
          </div>
        </CardHeader>
        <CardContent class="space-y-3">
          <div>
            <p class="text-xs font-semibold text-gray-500 uppercase">Tour</p>
            <p class="text-sm text-gray-900 mt-1">{{ getTourName(selectedPerson.tourIds) }}</p>
          </div>
          <Separator class="bg-slate-200" />
          <div>
            <p class="text-xs font-semibold text-gray-500 uppercase">Role</p>
            <p class="text-sm text-gray-900 mt-1">{{ selectedPerson.role }}</p>
          </div>
          <Separator class="bg-slate-200" />
          <div>
            <p class="text-xs font-semibold text-gray-500 uppercase">Department</p>
            <p class="text-sm text-gray-900 mt-1">{{ selectedPerson.department }}</p>
          </div>
          <Separator v-if="selectedPerson.company" class="bg-slate-200" />
          <div v-if="selectedPerson.company">
            <p class="text-xs font-semibold text-gray-500 uppercase">Company</p>
            <p class="text-sm text-gray-900 mt-1">{{ selectedPerson.company }}</p>
          </div>
        </CardContent>
      </Card>

      <!-- Contact Information -->
      <Card class="border border-gray-200 bg-white">
        <CardHeader class="pb-3">
          <div class="flex items-center gap-2">
            <Phone class="h-5 w-5 text-gray-600" />
            <CardTitle class="text-base font-bold text-gray-900">Contact Information</CardTitle>
          </div>
        </CardHeader>
        <CardContent class="space-y-3">
          <div v-if="selectedPerson.email">
            <p class="text-xs font-semibold text-gray-500 uppercase">Email</p>
            <a :href="`mailto:${selectedPerson.email}`" class="text-sm text-blue-600 hover:underline mt-1 block break-all">
              {{ selectedPerson.email }}
            </a>
          </div>
          <Separator v-if="selectedPerson.email && selectedPerson.phone" class="bg-slate-200" />
          <div v-if="selectedPerson.phone">
            <p class="text-xs font-semibold text-gray-500 uppercase">Phone</p>
            <a :href="`tel:${selectedPerson.phone}`" class="text-sm text-blue-600 hover:underline mt-1 block">
              {{ selectedPerson.phone }}
            </a>
          </div>
          <Separator v-if="selectedPerson.address" class="bg-slate-200" />
          <div v-if="selectedPerson.address">
            <p class="text-xs font-semibold text-gray-500 uppercase">Address</p>
            <p class="text-sm text-gray-900 mt-1">{{ selectedPerson.address }}</p>
          </div>
          <div v-if="!selectedPerson.email && !selectedPerson.phone && !selectedPerson.address">
            <p class="text-sm text-gray-500 italic">No contact information available</p>
          </div>
        </CardContent>
      </Card>

      <!-- Passport Information -->
      <Card v-if="selectedPerson.passportCountry || selectedPerson.passportNumber" class="border border-gray-200 bg-white">
        <CardHeader class="pb-3">
          <div class="flex items-center gap-2">
            <Globe class="h-5 w-5 text-gray-600" />
            <CardTitle class="text-base font-bold text-gray-900">Passport Information</CardTitle>
          </div>
        </CardHeader>
        <CardContent class="space-y-3">
          <div v-if="selectedPerson.passportCountry">
            <p class="text-xs font-semibold text-gray-500 uppercase">Country</p>
            <p class="text-sm text-gray-900 mt-1">{{ selectedPerson.passportCountry }}</p>
          </div>
          <Separator v-if="selectedPerson.passportNumber" class="bg-slate-200" />
          <div v-if="selectedPerson.passportNumber">
            <p class="text-xs font-semibold text-gray-500 uppercase">Passport Number</p>
            <p class="text-sm text-gray-900 mt-1">{{ selectedPerson.passportNumber }}</p>
          </div>
          <Separator v-if="selectedPerson.passportExpiration" class="bg-slate-200" />
          <div v-if="selectedPerson.passportExpiration">
            <p class="text-xs font-semibold text-gray-500 uppercase">Expiration Date</p>
            <p class="text-sm text-gray-900 mt-1">{{ selectedPerson.passportExpiration }}</p>
          </div>
          <Separator v-if="selectedPerson.nationality" class="bg-slate-200" />
          <div v-if="selectedPerson.nationality">
            <p class="text-xs font-semibold text-gray-500 uppercase">Nationality</p>
            <p class="text-sm text-gray-900 mt-1">{{ selectedPerson.nationality }}</p>
          </div>
        </CardContent>
      </Card>

      <!-- Emergency Contact -->
      <Card v-if="selectedPerson.emergencyContactName" class="border border-gray-200 bg-white">
        <CardHeader class="pb-3">
          <div class="flex items-center gap-2">
            <AlertCircle class="h-5 w-5 text-gray-600" />
            <CardTitle class="text-base font-bold text-gray-900">Emergency Contact</CardTitle>
          </div>
        </CardHeader>
        <CardContent class="space-y-3">
          <div>
            <p class="text-xs font-semibold text-gray-500 uppercase">Name</p>
            <p class="text-sm text-gray-900 mt-1">{{ selectedPerson.emergencyContactName }}</p>
          </div>
          <Separator v-if="selectedPerson.emergencyContactRelationship" class="bg-slate-200" />
          <div v-if="selectedPerson.emergencyContactRelationship">
            <p class="text-xs font-semibold text-gray-500 uppercase">Relationship</p>
            <p class="text-sm text-gray-900 mt-1">{{ selectedPerson.emergencyContactRelationship }}</p>
          </div>
          <Separator v-if="selectedPerson.emergencyContactPhone" class="bg-slate-200" />
          <div v-if="selectedPerson.emergencyContactPhone">
            <p class="text-xs font-semibold text-gray-500 uppercase">Phone</p>
            <a :href="`tel:${selectedPerson.emergencyContactPhone}`" class="text-sm text-blue-600 hover:underline mt-1 block">
              {{ selectedPerson.emergencyContactPhone }}
            </a>
          </div>
          <Separator v-if="selectedPerson.emergencyContactEmail" class="bg-slate-200" />
          <div v-if="selectedPerson.emergencyContactEmail">
            <p class="text-xs font-semibold text-gray-500 uppercase">Email</p>
            <a :href="`mailto:${selectedPerson.emergencyContactEmail}`" class="text-sm text-blue-600 hover:underline mt-1 block break-all">
              {{ selectedPerson.emergencyContactEmail }}
            </a>
          </div>
        </CardContent>
      </Card>

      <!-- Sizing Information -->
      <Card v-if="selectedPerson.shirtSize || selectedPerson.jacketSize" class="border border-gray-200 bg-white">
        <CardHeader class="pb-3">
          <div class="flex items-center gap-2">
            <Shirt class="h-5 w-5 text-gray-600" />
            <CardTitle class="text-base font-bold text-gray-900">Sizing Information</CardTitle>
          </div>
        </CardHeader>
        <CardContent class="space-y-3">
          <div v-if="selectedPerson.shirtSize">
            <p class="text-xs font-semibold text-gray-500 uppercase">Shirt Size</p>
            <p class="text-sm text-gray-900 mt-1">{{ selectedPerson.shirtSize }}</p>
          </div>
          <Separator v-if="selectedPerson.shirtSize && selectedPerson.jacketSize" class="bg-slate-200" />
          <div v-if="selectedPerson.jacketSize">
            <p class="text-xs font-semibold text-gray-500 uppercase">Jacket Size</p>
            <p class="text-sm text-gray-900 mt-1">{{ selectedPerson.jacketSize }}</p>
          </div>
        </CardContent>
      </Card>

      <!-- Additional Information (Date of Birth) -->
      <Card v-if="selectedPerson.dateOfBirth" class="border border-gray-200 bg-white">
        <CardHeader class="pb-3">
          <div class="flex items-center gap-2">
            <Calendar class="h-5 w-5 text-gray-600" />
            <CardTitle class="text-base font-bold text-gray-900">Personal Information</CardTitle>
          </div>
        </CardHeader>
        <CardContent class="space-y-3">
          <div>
            <p class="text-xs font-semibold text-gray-500 uppercase">Date of Birth</p>
            <p class="text-sm text-gray-900 mt-1">{{ selectedPerson.dateOfBirth }}</p>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Notes (Full Width) -->
    <Card v-if="selectedPerson.notes" class="border border-gray-200 bg-white">
      <CardHeader class="pb-3">
        <div class="flex items-center gap-2">
          <FileText class="h-5 w-5 text-gray-600" />
          <CardTitle class="text-base font-bold text-gray-900">Notes</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p class="text-sm text-gray-900 whitespace-pre-wrap leading-relaxed">{{ selectedPerson.notes }}</p>
      </CardContent>
    </Card>
  </div>

  <!-- Not Found State -->
  <div v-else class="flex flex-1 items-center justify-center">
    <div class="text-center">
      <User class="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <h2 class="text-xl font-bold text-gray-900 mb-2">Personnel Not Found</h2>
      <p class="text-sm text-gray-600 mb-6">The person you're looking for doesn't exist.</p>
      <Button variant="outline" @click="goBack">
        <ArrowLeft class="h-4 w-4 mr-2" />
        Back to Personnel
      </Button>
    </div>
  </div>
</template>
