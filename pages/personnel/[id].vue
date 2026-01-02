<script setup lang="ts">
import { User, ArrowLeft, FileText } from 'lucide-vue-next'
import { getPersonById } from '@/utils/mockData/people'
import { getTourName } from '@/utils/mockData'
import BasicIdentitySection from '@/components/person/sections/BasicIdentitySection.vue'
import ContactInfoSection from '@/components/person/sections/ContactInfoSection.vue'
import EmergencyContactSection from '@/components/person/sections/EmergencyContactSection.vue'
import TravelDocumentsSection from '@/components/person/sections/TravelDocumentsSection.vue'
import SizingSection from '@/components/person/sections/SizingSection.vue'
import TourPreferencesSection from '@/components/person/sections/TourPreferencesSection.vue'
import ProfessionalSection from '@/components/person/sections/ProfessionalSection.vue'

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
  <!-- Personnel Detail View -->
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
    <BasicIdentitySection :person="selectedPerson" :editable="false" />

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
      <ContactInfoSection :person="selectedPerson" :editable="false" />

      <!-- Emergency Contact -->
      <EmergencyContactSection :person="selectedPerson" :editable="false" />

      <!-- Travel Documents -->
      <TravelDocumentsSection :person="selectedPerson" :editable="false" />

      <!-- Sizing -->
      <SizingSection :person="selectedPerson" :editable="false" />

      <!-- Tour Preferences -->
      <TourPreferencesSection :person="selectedPerson" :editable="false" />

      <!-- Professional -->
      <ProfessionalSection :person="selectedPerson" :editable="false" />
    </div>

    <!-- Notes -->
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
