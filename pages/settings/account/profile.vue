<script setup lang="ts">
import {
  User,
  Briefcase,
  Plane,
  Heart,
  Settings as SettingsIcon,
  Camera,
  Lock,
  Upload
} from 'lucide-vue-next'
import { getPersonById } from '@/utils/mockData/people'
import type { Person } from '@/utils/mockData/types'

definePageMeta({
  layout: 'default'
})

// Load current user (hardcoded to person-1 for mock)
const currentPerson = ref<Person | undefined>(getPersonById('person-1'))

// Navigate to privacy settings
const router = useRouter()
const goToPrivacySettings = () => {
  router.push('/settings/account/privacy')
}

// Toggle edit mode (placeholder for future implementation)
const isEditing = ref(false)
const toggleEdit = () => {
  isEditing.value = !isEditing.value
  // TODO: Implement edit mode
}

// Computed values
const displayName = computed(() => {
  if (!currentPerson.value) return ''
  return currentPerson.value.preferredName ||
         `${currentPerson.value.firstName} ${currentPerson.value.lastName}`
})

const fullName = computed(() => {
  if (!currentPerson.value) return ''
  const { firstName, middleName, lastName } = currentPerson.value
  return middleName ? `${firstName} ${middleName} ${lastName}` : `${firstName} ${lastName}`
})

const jobSubtitle = computed(() => {
  if (!currentPerson.value) return ''
  const parts = []
  if (currentPerson.value.jobTitle) parts.push(currentPerson.value.jobTitle)
  if (currentPerson.value.company) parts.push(currentPerson.value.company)
  return parts.join(' at ')
})

// Default accordion values (first 2 sections expanded)
const accordionValue = ref(['personal', 'professional'])

// Format phone for display
const formatPhone = (phone?: string) => {
  if (!phone) return 'Not provided'
  return phone
}

// Format address with proper line breaks
const formatAddressLines = (person: Person) => {
  if (!person.address) return []
  const { street, line2, city, state, zip, country } = person.address
  const lines = [street]
  if (line2) lines.push(line2)
  lines.push(`${city}, ${state} ${zip}`)
  if (country) lines.push(country)
  return lines
}

// Format date
const formatDate = (date?: string) => {
  if (!date) return 'Not provided'
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<style scoped>
/* Semantic definition list styling */
dl {
  margin: 0;
}

dt {
  font-weight: 700;
}

dd {
  margin: 0;
}

/* Individual definition list item spacing */
dl > div:not(:last-child) {
  margin-bottom: 1.5rem;
}
</style>

<template>
  <div v-if="currentPerson" class="flex flex-1 flex-col gap-6 max-w-5xl mx-auto p-8">
    <!-- Profile Header -->
    <Card class="border border-gray-200 bg-white shadow-sm">
      <CardContent class="p-8">
        <header class="flex items-start justify-between gap-6">
          <!-- Left: Avatar + Info -->
          <div class="flex items-start gap-6">
            <!-- Avatar with Upload Overlay -->
            <div class="relative group">
              <Avatar class="h-32 w-32 border-4 border-gray-100" role="img" :aria-label="`Profile picture for ${displayName}`">
                <AvatarFallback class="text-4xl bg-linear-to-br from-blue-500 to-blue-600 text-white font-bold">
                  {{ currentPerson.firstName.charAt(0) }}{{ currentPerson.lastName.charAt(0) }}
                </AvatarFallback>
              </Avatar>
              <button
                type="button"
                class="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                aria-label="Upload new profile picture"
                @click="() => { /* TODO: Upload handler */ }"
              >
                <Camera class="h-8 w-8 text-white" aria-hidden="true" />
              </button>
            </div>

            <!-- Name + Subtitle + Badges -->
            <div class="flex flex-col gap-3">
              <div>
                <h1 class="text-3xl font-bold text-gray-900 leading-tight">
                  {{ displayName }}
                </h1>
                <p v-if="jobSubtitle" class="text-lg text-gray-600 mt-1">
                  {{ jobSubtitle }}
                </p>
              </div>

              <!-- Badges -->
              <ul class="flex items-center gap-2 flex-wrap" role="list" aria-label="User roles and status">
                <li>
                  <Badge variant="secondary" class="bg-blue-50 text-blue-700 border-blue-200">
                    {{ currentPerson.role }}
                  </Badge>
                </li>
                <li>
                  <Badge variant="outline" class="border-gray-300 text-gray-700">
                    {{ currentPerson.department }}
                  </Badge>
                </li>
                <li v-if="currentPerson.tourIds.length > 0">
                  <Badge variant="outline" class="border-gray-300 text-gray-700">
                    {{ currentPerson.tourIds.length }} Active {{ currentPerson.tourIds.length === 1 ? 'Tour' : 'Tours' }}
                  </Badge>
                </li>
              </ul>
            </div>
          </div>

          <!-- Right: Action Buttons -->
          <nav class="flex items-center gap-3" aria-label="Profile actions">
            <Button variant="outline" size="default" @click="toggleEdit">
              <Upload class="h-4 w-4 mr-2" aria-hidden="true" />
              Edit Profile
            </Button>
            <Button variant="default" size="default" @click="goToPrivacySettings">
              <Lock class="h-4 w-4 mr-2" aria-hidden="true" />
              Manage Privacy
            </Button>
          </nav>
        </header>
      </CardContent>
    </Card>

    <!-- Accordion Sections -->
    <Accordion
      type="multiple"
      v-model="accordionValue"
      class="w-full space-y-4"
    >
      <!-- 1. Personal & Contact Information -->
      <AccordionItem
        value="personal"
        class="border border-gray-200/80 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow data-[state=open]:shadow-md data-[state=open]:border-gray-300 px-6 data-[state=open]:pb-6"
      >
        <AccordionTrigger class="py-5 text-base font-semibold text-gray-900 hover:no-underline">
          <span class="flex items-center gap-3">
            <User class="h-5 w-5 text-gray-600" aria-hidden="true" />
            <span>Personal & Contact Information</span>
          </span>
        </AccordionTrigger>
        <AccordionContent class="pt-4">
          <Tabs default-value="personal" class="">
            <TabsList class=" mb-6">
              <TabsTrigger value="personal">Personal Details</TabsTrigger>
              <TabsTrigger value="contact">Contact Info</TabsTrigger>
              <TabsTrigger value="emergency">Emergency Contact</TabsTrigger>
            </TabsList>

            <!-- Personal Details Tab -->
            <TabsContent value="personal" class="space-y-6">
              <dl class="space-y-6">
                <div>
                  <dt class="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Preferred Name</dt>
                  <dd class="text-lg text-gray-950 font-medium">{{ currentPerson.preferredName || 'Not set' }}</dd>
                </div>

                <div>
                  <dt class="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Full Legal Name</dt>
                  <dd class="text-lg text-gray-950 font-medium">{{ fullName }}</dd>
                </div>

                <div>
                  <dt class="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Nickname</dt>
                  <dd class="text-lg text-gray-950">{{ currentPerson.nickname || '—' }}</dd>
                </div>

                <div>
                  <dt class="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Date of Birth</dt>
                  <dd class="text-lg text-gray-950">{{ formatDate(currentPerson.dateOfBirth) }}</dd>
                </div>

                <div>
                  <dt class="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Gender</dt>
                  <dd class="text-lg text-gray-950">{{ currentPerson.gender || '—' }}</dd>
                </div>

                <div>
                  <dt class="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Pronouns</dt>
                  <dd class="text-lg text-gray-950">{{ currentPerson.pronouns || '—' }}</dd>
                </div>

                <div>
                  <dt class="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Birthplace</dt>
                  <dd class="text-lg text-gray-950">{{ currentPerson.birthplace || '—' }}</dd>
                </div>

                <div>
                  <dt class="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Nationality</dt>
                  <dd class="text-lg text-gray-950">{{ currentPerson.nationality || '—' }}</dd>
                </div>
              </dl>
            </TabsContent>

            <!-- Contact Info Tab -->
            <TabsContent value="contact" class="space-y-6">
              <dl class="space-y-6">
                <div>
                  <dt class="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Email Address</dt>
                  <dd>
                    <a
                      :href="`mailto:${currentPerson.email}`"
                      class="text-lg text-blue-600 hover:text-blue-700 hover:underline font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 rounded"
                    >
                      {{ currentPerson.email }}
                    </a>
                  </dd>
                </div>

                <div>
                  <dt class="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Phone Number</dt>
                  <dd>
                    <a
                      :href="`tel:${currentPerson.phone}`"
                      class="text-lg text-blue-600 hover:text-blue-700 hover:underline font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 rounded"
                    >
                      {{ formatPhone(currentPerson.phone) }}
                    </a>
                  </dd>
                </div>

                <div>
                  <dt class="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Mailing Address</dt>
                  <dd class="text-lg text-gray-950 leading-relaxed">
                    <address class="not-italic space-y-0.5">
                      <p v-for="(line, index) in formatAddressLines(currentPerson)" :key="index">{{ line }}</p>
                    </address>
                  </dd>
                </div>
              </dl>
            </TabsContent>

            <!-- Emergency Contact Tab -->
            <TabsContent value="emergency" class="space-y-6">
              <div v-if="currentPerson.emergencyContact">
                <dl class="space-y-4">
                  <div>
                    <dt class="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Contact Name</dt>
                    <dd class="text-xl font-bold text-gray-950">{{ currentPerson.emergencyContact.name }}</dd>
                  </div>

                  <div>
                    <dt class="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Relationship</dt>
                    <dd class="text-lg text-gray-950 font-medium">{{ currentPerson.emergencyContact.relationship }}</dd>
                  </div>

                  <div>
                    <dt class="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Phone Number</dt>
                    <dd>
                      <a
                        :href="`tel:${currentPerson.emergencyContact.phone}`"
                        class="text-lg text-blue-600 hover:text-blue-700 hover:underline font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 rounded"
                      >
                        {{ currentPerson.emergencyContact.phone }}
                      </a>
                    </dd>
                  </div>

                  <div v-if="currentPerson.emergencyContact.email">
                    <dt class="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Email Address</dt>
                    <dd>
                      <a
                        :href="`mailto:${currentPerson.emergencyContact.email}`"
                        class="text-lg text-blue-600 hover:text-blue-700 hover:underline font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 rounded"
                      >
                        {{ currentPerson.emergencyContact.email }}
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
              <p v-else class="text-sm text-gray-500">No emergency contact information provided.</p>
            </TabsContent>
          </Tabs>
        </AccordionContent>
      </AccordionItem>

      <!-- Travel & Tour Preferences -->
      <AccordionItem
        value="travel"
        class="border border-gray-200/80 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow data-[state=open]:shadow-md data-[state=open]:border-gray-300 px-6 data-[state=open]:pb-6"
      >
        <AccordionTrigger class="py-5 text-base font-semibold text-gray-900 hover:no-underline">
          <span class="flex items-center gap-3">
            <Plane class="h-5 w-5 text-gray-600" aria-hidden="true" />
            <span>Travel & Tour Preferences</span>
          </span>
        </AccordionTrigger>
        <AccordionContent class="pt-4">
          <Tabs default-value="preferences" class="">
            <TabsList class=" mb-6">
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="frequent-flyer">Frequent Flyer</TabsTrigger>
              <TabsTrigger value="sizing">Sizing</TabsTrigger>
            </TabsList>

            <!-- Preferences Tab -->
            <TabsContent value="preferences" class="space-y-8">
              <!-- Hotel -->
              <div v-if="currentPerson.hotelPrefs">
                <h4 class="text-sm font-bold text-gray-900 mb-4">Hotel Preferences</h4>
                <dl class="space-y-3">
                  <div>
                    <dt class="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Room Type</dt>
                    <dd class="text-base text-gray-950 capitalize">{{ currentPerson.hotelPrefs.roomType || '—' }}</dd>
                  </div>
                  <div>
                    <dt class="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Smoking</dt>
                    <dd class="text-base text-gray-950">{{ currentPerson.hotelPrefs.smoking ? 'Yes' : 'No' }}</dd>
                  </div>
                </dl>
              </div>

              <!-- Bus -->
              <div v-if="currentPerson.busPrefs">
                <h4 class="text-sm font-bold text-gray-900 mb-4">Bus Preferences</h4>
                <dl class="space-y-3">
                  <div>
                    <dt class="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Bunk Side</dt>
                    <dd class="text-base text-gray-950 capitalize">{{ currentPerson.busPrefs.bunkSide || '—' }}</dd>
                  </div>
                  <div>
                    <dt class="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Bunk Level</dt>
                    <dd class="text-base text-gray-950 capitalize">{{ currentPerson.busPrefs.bunkLevel || '—' }}</dd>
                  </div>
                  <div>
                    <dt class="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Bunk Position</dt>
                    <dd class="text-base text-gray-950 capitalize">{{ currentPerson.busPrefs.bunkPosition || '—' }}</dd>
                  </div>
                </dl>
              </div>

              <!-- Flight -->
              <div v-if="currentPerson.flightPrefs">
                <h4 class="text-sm font-bold text-gray-900 mb-4">Flight Preferences</h4>
                <dl class="space-y-3">
                  <div>
                    <dt class="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Seat Preference</dt>
                    <dd class="text-base text-gray-950 capitalize">{{ currentPerson.flightPrefs.seat || '—' }}</dd>
                  </div>
                  <div>
                    <dt class="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Flight Time</dt>
                    <dd class="text-base text-gray-950 uppercase">{{ currentPerson.flightPrefs.time || '—' }}</dd>
                  </div>
                  <div>
                    <dt class="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Meal Preference</dt>
                    <dd class="text-base text-gray-950 capitalize">{{ currentPerson.flightPrefs.meal?.replace('_', ' ') || '—' }}</dd>
                  </div>
                  <div v-if="currentPerson.flightPrefs.notes">
                    <dt class="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Notes</dt>
                    <dd class="text-sm text-gray-950">{{ currentPerson.flightPrefs.notes }}</dd>
                  </div>
                </dl>
              </div>
            </TabsContent>

            <!-- Documents Tab -->
            <TabsContent value="documents" class="space-y-6">
              <dl class="space-y-4">
                <div>
                  <dt class="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Passport Number</dt>
                  <dd class="text-base text-gray-950 font-mono">{{ currentPerson.passportNumber || '—' }}</dd>
                </div>
                <div>
                  <dt class="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Passport Country</dt>
                  <dd class="text-base text-gray-950">{{ currentPerson.passportCountry || '—' }}</dd>
                </div>
                <div>
                  <dt class="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Passport Expiration</dt>
                  <dd
                    class="text-base text-gray-950"
                    :class="{ 'text-orange-600 font-semibold': currentPerson.passportExpDate && new Date(currentPerson.passportExpDate) < new Date() }"
                  >
                    {{ formatDate(currentPerson.passportExpDate) }}
                  </dd>
                </div>
                <div v-if="currentPerson.knownTravelerNumber">
                  <dt class="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">TSA PreCheck / KTN</dt>
                  <dd class="text-base text-gray-950 font-mono">{{ currentPerson.knownTravelerNumber }}</dd>
                </div>
                <div v-if="currentPerson.globalEntryNumber">
                  <dt class="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Global Entry</dt>
                  <dd class="text-base text-gray-950 font-mono">{{ currentPerson.globalEntryNumber }}</dd>
                </div>
                <div v-if="currentPerson.driversLicense">
                  <dt class="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Driver's License</dt>
                  <dd class="text-base text-gray-950 font-mono">{{ currentPerson.driversLicense.number }} ({{ currentPerson.driversLicense.state }})</dd>
                </div>
              </dl>
            </TabsContent>

            <!-- Frequent Flyer Tab -->
            <TabsContent value="frequent-flyer" class="space-y-6">
              <div v-if="currentPerson.frequentFlyer && currentPerson.frequentFlyer.length > 0">
                <dl class="space-y-3">
                  <div v-for="(ff, index) in currentPerson.frequentFlyer" :key="index">
                    <dt class="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">{{ ff.airline }}</dt>
                    <dd class="text-base text-gray-950 font-mono">{{ ff.accountNumber }}</dd>
                  </div>
                </dl>
              </div>
              <p v-else class="text-sm text-gray-500">No frequent flyer programs on file.</p>
            </TabsContent>

            <!-- Sizing Tab -->
            <TabsContent value="sizing" class="space-y-6">
              <div v-if="currentPerson.clothing">
                <dl class="grid grid-cols-2 gap-x-6 gap-y-3">
                  <div>
                    <dt class="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Height</dt>
                    <dd class="text-base text-gray-950">{{ currentPerson.clothing.height || '—' }}</dd>
                  </div>
                  <div>
                    <dt class="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Weight</dt>
                    <dd class="text-base text-gray-950">{{ currentPerson.clothing.weight || '—' }}</dd>
                  </div>
                  <div>
                    <dt class="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">T-Shirt</dt>
                    <dd class="text-base text-gray-950">{{ currentPerson.clothing.tshirt || '—' }}</dd>
                  </div>
                  <div>
                    <dt class="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Hoodie</dt>
                    <dd class="text-base text-gray-950">{{ currentPerson.clothing.hoodie || '—' }}</dd>
                  </div>
                  <div>
                    <dt class="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Pants</dt>
                    <dd class="text-base text-gray-950">{{ currentPerson.clothing.pants || '—' }}</dd>
                  </div>
                  <div>
                    <dt class="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Shoes</dt>
                    <dd class="text-base text-gray-950">{{ currentPerson.clothing.shoes || '—' }}</dd>
                  </div>
                  <div>
                    <dt class="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Jacket</dt>
                    <dd class="text-base text-gray-950">{{ currentPerson.clothing.jacket || '—' }}</dd>
                  </div>
                  <div>
                    <dt class="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Hat</dt>
                    <dd class="text-base text-gray-950">{{ currentPerson.clothing.hat || '—' }}</dd>
                  </div>
                </dl>
              </div>
              <p v-else class="text-sm text-gray-500">No sizing information on file.</p>
            </TabsContent>
          </Tabs>
        </AccordionContent>
      </AccordionItem>

      <!-- Health & Family -->
      <AccordionItem
        value="health"
        class="border border-gray-200/80 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow data-[state=open]:shadow-md data-[state=open]:border-gray-300 px-6 data-[state=open]:pb-6"
      >
        <AccordionTrigger class="py-5 text-base font-semibold text-gray-900 hover:no-underline">
          <span class="flex items-center gap-3">
            <Heart class="h-5 w-5 text-gray-600" aria-hidden="true" />
            <span>Health & Family Information</span>
            <Lock class="h-4 w-4 text-gray-400 ml-1" aria-label="Privacy protected section" />
          </span>
        </AccordionTrigger>
        <AccordionContent class="pt-4">
          <Tabs default-value="family" class="">
            <TabsList class=" mb-6">
              <TabsTrigger value="family">Family</TabsTrigger>
              <TabsTrigger value="medical">Medical & Health</TabsTrigger>
            </TabsList>

            <!-- Family Tab -->
            <TabsContent value="family" class="space-y-6">
              <dl class="space-y-3">
                <div>
                  <dt class="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Marital Status</dt>
                  <dd class="text-base text-gray-950 capitalize">{{ currentPerson.maritalStatus || '—' }}</dd>
                </div>
                <div v-if="currentPerson.spouseName">
                  <dt class="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Spouse Name</dt>
                  <dd class="text-base text-gray-950">{{ currentPerson.spouseName }}</dd>
                </div>
                <div v-if="currentPerson.spouseBirthday">
                  <dt class="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Spouse Birthday</dt>
                  <dd class="text-base text-gray-950">{{ formatDate(currentPerson.spouseBirthday) }}</dd>
                </div>
                <div v-if="currentPerson.anniversary">
                  <dt class="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Anniversary</dt>
                  <dd class="text-base text-gray-950">{{ formatDate(currentPerson.anniversary) }}</dd>
                </div>
                <div v-if="currentPerson.children">
                  <dt class="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Children</dt>
                  <dd class="text-base text-gray-950">{{ currentPerson.children }}</dd>
                </div>
                <div v-if="currentPerson.familyNotes">
                  <dt class="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Family Notes</dt>
                  <dd class="text-sm text-gray-950">{{ currentPerson.familyNotes }}</dd>
                </div>
              </dl>

              <!-- General Notes -->
              <div v-if="currentPerson.notes" class="pt-6 border-t border-gray-200">
                <h4 class="text-sm font-bold text-gray-900 mb-3">General Notes</h4>
                <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p class="text-sm text-gray-950 leading-relaxed whitespace-pre-wrap">{{ currentPerson.notes }}</p>
                </div>
              </div>
            </TabsContent>

            <!-- Medical Tab -->
            <TabsContent value="medical" class="space-y-6">
              <dl class="space-y-3">
                <div v-if="currentPerson.bloodType">
                  <dt class="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Blood Type</dt>
                  <dd class="text-xl font-bold text-gray-950">{{ currentPerson.bloodType }}</dd>
                </div>
                <div v-if="currentPerson.medicalConditions">
                  <dt class="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Medical Conditions</dt>
                  <dd class="text-base text-gray-950">{{ currentPerson.medicalConditions }}</dd>
                </div>
                <div v-if="currentPerson.allergies">
                  <dt class="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Allergies</dt>
                  <dd>
                    <ul class="flex flex-wrap gap-2" role="list">
                      <li v-for="allergy in currentPerson.allergies.split(',')" :key="allergy.trim()">
                        <Badge variant="outline" class="border-orange-300 text-orange-700">
                          {{ allergy.trim() }}
                        </Badge>
                      </li>
                    </ul>
                  </dd>
                </div>
                <div v-if="currentPerson.dietaryRestrictions">
                  <dt class="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Dietary Restrictions</dt>
                  <dd class="text-base text-gray-950">{{ currentPerson.dietaryRestrictions }}</dd>
                </div>
              </dl>
            </TabsContent>
          </Tabs>
        </AccordionContent>
      </AccordionItem>

      <!-- Professional Information -->
      <AccordionItem
        value="professional"
        class="border border-gray-200/80 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow data-[state=open]:shadow-m px-6 data-[state=open]:pb-6"
      >
        <AccordionTrigger class="py-5 text-base font-semibold text-gray-900 hover:no-underline">
          <span class="flex items-center gap-3">
            <Briefcase class="h-5 w-5 text-gray-600" aria-hidden="true" />
            <span>Professional Information</span>
          </span>
        </AccordionTrigger>
        <AccordionContent class="pt-4">
          <section aria-labelledby="professional-heading">
            <h3 id="professional-heading" class="sr-only">Professional Details</h3>

            <dl class="space-y-6">
              <div v-if="currentPerson.bio">
                <dt class="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Biography</dt>
                <dd class="text-base text-gray-950 leading-relaxed">{{ currentPerson.bio }}</dd>
              </div>

              <div v-if="currentPerson.skills && currentPerson.skills.length > 0">
                <dt class="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Skills & Expertise</dt>
                <dd>
                  <ul class="flex flex-wrap gap-2" role="list">
                    <li v-for="skill in currentPerson.skills" :key="skill">
                      <Badge variant="outline" class="border-green-300 text-green-700">
                        {{ skill }}
                      </Badge>
                    </li>
                  </ul>
                </dd>
              </div>

              <div v-if="currentPerson.certifications && currentPerson.certifications.length > 0">
                <dt class="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Certifications & Licenses</dt>
                <dd>
                  <ul class="flex flex-wrap gap-2" role="list">
                    <li v-for="cert in currentPerson.certifications" :key="cert">
                      <Badge variant="outline" class="border-blue-300 text-blue-700">
                        {{ cert }}
                      </Badge>
                    </li>
                  </ul>
                </dd>
              </div>

              <div v-if="currentPerson.languages && currentPerson.languages.length > 0">
                <dt class="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Languages</dt>
                <dd>
                  <ul class="flex flex-wrap gap-2" role="list">
                    <li v-for="lang in currentPerson.languages" :key="lang">
                      <Badge variant="outline" class="border-purple-300 text-purple-700">
                        {{ lang }}
                      </Badge>
                    </li>
                  </ul>
                </dd>
              </div>

              <div v-if="currentPerson.equipmentOwned">
                <dt class="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Equipment Owned</dt>
                <dd class="text-base text-gray-950">{{ currentPerson.equipmentOwned }}</dd>
              </div>
            </dl>
          </section>
        </AccordionContent>
      </AccordionItem>

      <!--  Account & Privacy -->
      <AccordionItem
        value="account"
        class="border border-gray-200/80 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow data-[state=open]:shadow-md data-[state=open]:border-gray-300 px-6 data-[state=open]:pb-6"
      >
        <AccordionTrigger class="py-5 text-base font-semibold text-gray-900 hover:no-underline">
          <span class="flex items-center gap-3">
            <SettingsIcon class="h-5 w-5 text-gray-600" aria-hidden="true" />
            <span>Account & Privacy Settings</span>
          </span>
        </AccordionTrigger>
        <AccordionContent class="pt-4">
          <section aria-labelledby="account-heading">
            <h3 id="account-heading" class="sr-only">Account and Privacy Details</h3>

            <div class="space-y-6">
              <!-- Privacy Settings -->
              <div>
                <h4 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Lock class="h-4 w-4" aria-hidden="true" />
                  Privacy Settings
                </h4>
                <p class="text-sm text-gray-600 mb-3">
                  Control who can view different sections of your profile.
                </p>
                <Button variant="outline" size="sm" @click="goToPrivacySettings">
                  <Lock class="h-4 w-4 mr-2" aria-hidden="true" />
                  Configure Privacy Settings
                </Button>
              </div>

              <!-- Account Info -->
              <div class="pt-6 border-t border-gray-200">
                <h4 class="text-sm font-bold text-gray-900 mb-4">Account Information</h4>
                <dl class="space-y-3">
                  <div>
                    <dt class="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Member Since</dt>
                    <dd class="text-base text-gray-950">{{ formatDate(currentPerson.createdAt.toISOString()) }}</dd>
                  </div>
                  <div>
                    <dt class="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Last Updated</dt>
                    <dd class="text-base text-gray-950">{{ formatDate(currentPerson.updatedAt.toISOString()) }}</dd>
                  </div>
                </dl>
              </div>

              <!-- Data Export -->
              <div class="pt-6 border-t border-gray-200">
                <h4 class="text-sm font-bold text-gray-900 mb-3">Data Management</h4>
                <p class="text-sm text-gray-600 mb-3">
                  Download a copy of your profile data in JSON format.
                </p>
                <Button variant="outline" size="sm">
                  <Upload class="h-4 w-4 mr-2" aria-hidden="true" />
                  Export Profile Data
                </Button>
              </div>
            </div>
          </section>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>

  <!-- Not Found State -->
  <div v-else class="flex flex-1 items-center justify-center" role="alert">
    <p class="text-sm text-gray-500">Unable to load profile</p>
  </div>
</template>
