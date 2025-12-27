<script setup lang="ts">
import {
  Lock,
  Phone,
  ShieldAlert,
  Heart,
  Plane,
  Calendar,
  Ruler,
  Briefcase,
  Eye,
  EyeOff,
  Users,
  Building2,
  Shield,
  AlertCircle,
  ArrowLeft
} from 'lucide-vue-next'
import { getPersonById } from '@/utils/mockData/people'
import type { Person } from '@/utils/mockData/types'

definePageMeta({
  layout: 'default'
})

const router = useRouter()

// Load current user (hardcoded to person-1 for mock)
const currentPerson = ref<Person | undefined>(getPersonById('person-1'))

// Privacy settings (initialize from current person or defaults)
const privacySettings = ref({
  contactInfo: currentPerson.value?.privacySettings?.contactInfo || 'organization',
  emergencyContact: currentPerson.value?.privacySettings?.emergencyContact || 'organization',
  medicalInfo: currentPerson.value?.privacySettings?.medicalInfo || 'private',
  travelDocuments: currentPerson.value?.privacySettings?.travelDocuments || 'organization',
  personalDetails: currentPerson.value?.privacySettings?.personalDetails || 'private',
  sizing: currentPerson.value?.privacySettings?.sizing || 'tourTeam',
  professional: currentPerson.value?.privacySettings?.professional || 'organization'
})

// Organization-required sections (mock - normally from org settings or API)
const orgRequiredSections = ref(currentPerson.value?.orgRequiredSections || ['contactInfo', 'emergencyContact'])

// Privacy options
const privacyOptions = [
  {
    value: 'private',
    label: 'Private',
    description: 'Only you can see this',
    icon: EyeOff,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200'
  },
  {
    value: 'organization',
    label: 'Organization',
    description: 'All organization members',
    icon: Building2,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  {
    value: 'tourTeam',
    label: 'Tour Team',
    description: 'Your tour crew only',
    icon: Users,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  }
]

// Privacy sections configuration
const privacySections = [
  {
    key: 'contactInfo',
    title: 'Contact Information',
    description: 'Email, phone number, and mailing address',
    icon: Phone,
    helpText: 'Sharing your contact info helps the team reach you quickly for show updates and emergencies.',
    defaultSetting: 'organization'
  },
  {
    key: 'emergencyContact',
    title: 'Emergency Contact',
    description: 'Emergency contact name, relationship, and phone',
    icon: ShieldAlert,
    helpText: 'Emergency contacts are critical for your safety on tour. Tour managers need this information.',
    defaultSetting: 'organization'
  },
  {
    key: 'medicalInfo',
    title: 'Medical Information',
    description: 'Dietary restrictions, allergies, and medications',
    icon: Heart,
    helpText: 'Medical info helps with catering and ensures your safety. Keep private if sensitive.',
    defaultSetting: 'private'
  },
  {
    key: 'travelDocuments',
    title: 'Travel Documents',
    description: 'Passport number, expiration, and nationality',
    icon: Plane,
    helpText: 'Travel document info is needed for international tours and border crossings.',
    defaultSetting: 'organization'
  },
  {
    key: 'personalDetails',
    title: 'Personal Details',
    description: 'Date of birth and pronouns',
    icon: Calendar,
    helpText: 'Personal details help the team address you correctly and plan celebrations.',
    defaultSetting: 'private'
  },
  {
    key: 'sizing',
    title: 'Sizing & Wardrobe',
    description: 'Shirt and jacket sizes',
    icon: Ruler,
    helpText: 'Sizing information is used to order tour merchandise and wardrobe.',
    defaultSetting: 'tourTeam'
  },
  {
    key: 'professional',
    title: 'Professional Information',
    description: 'Skills, certifications, and languages',
    icon: Briefcase,
    helpText: 'Professional skills help coordinate tasks and identify who can assist with specific needs.',
    defaultSetting: 'organization'
  }
]

// Check if section is required by organization
const isSectionRequired = (sectionKey: string) => {
  return orgRequiredSections.value.includes(sectionKey)
}

// Get current privacy option for a section
const getCurrentPrivacyOption = (sectionKey: string) => {
  const value = privacySettings.value[sectionKey as keyof typeof privacySettings.value]
  return privacyOptions.find(opt => opt.value === value) || privacyOptions[1]
}

// Handle privacy change
const handlePrivacyChange = (sectionKey: string, newValue: string) => {
  if (!isSectionRequired(sectionKey)) {
    privacySettings.value[sectionKey as keyof typeof privacySettings.value] = newValue as any
  }
}

// Save changes
const handleSave = () => {
  console.log('Saving privacy settings:', privacySettings.value)
  // TODO: Implement actual save logic
  router.push('/settings/account/profile')
}

// Go back to profile
const goBack = () => {
  router.push('/settings/account/profile')
}
</script>

<template>
  <div class="flex flex-1 flex-col gap-6">
    <!-- Back Button -->
    <div>
      <Button
        variant="ghost"
        size="sm"
        @click="goBack"
        class="text-gray-600 hover:text-gray-900 -ml-2"
      >
        <ArrowLeft class="h-4 w-4 mr-2" />
        Back to Profile
      </Button>
    </div>

    <!-- Page Header -->
    <div class="flex items-start justify-between">
      <div class="flex items-center gap-3">
        <div class="p-3 bg-blue-100 rounded-lg">
          <Lock class="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Privacy Settings</h1>
          <p class="text-sm text-gray-600 mt-1">Control who can see each section of your profile</p>
        </div>
      </div>
      <Button @click="handleSave" size="sm" class="bg-blue-600 hover:bg-blue-700 text-white">
        Save Changes
      </Button>
    </div>

    <!-- Privacy Guide -->
    <Card class="border border-blue-200 bg-blue-50">
      <CardContent class="p-4">
        <div class="flex items-start gap-3">
          <Shield class="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div class="space-y-2">
            <p class="text-sm font-semibold text-gray-900">How Privacy Settings Work</p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div class="flex items-start gap-2">
                <EyeOff class="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p class="font-semibold text-red-800">Private</p>
                  <p class="text-gray-700">Only you can see this information</p>
                </div>
              </div>
              <div class="flex items-start gap-2">
                <Building2 class="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p class="font-semibold text-blue-800">Organization</p>
                  <p class="text-gray-700">All members of your organization</p>
                </div>
              </div>
              <div class="flex items-start gap-2">
                <Users class="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p class="font-semibold text-green-800">Tour Team</p>
                  <p class="text-gray-700">Only members of your tour crew</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Privacy Sections -->
    <div class="space-y-4">
      <Card
        v-for="section in privacySections"
        :key="section.key"
        class="border border-gray-200 bg-white"
      >
        <CardHeader class="pb-3">
          <div class="flex items-start justify-between">
            <div class="flex items-start gap-3 flex-1">
              <component :is="section.icon" class="h-5 w-5 text-gray-600 mt-0.5 flex-shrink-0" />
              <div class="flex-1">
                <CardTitle class="text-base font-bold text-gray-900 mb-1">
                  {{ section.title }}
                </CardTitle>
                <p class="text-sm text-gray-600">{{ section.description }}</p>
                <p class="text-xs text-gray-500 mt-2 italic">{{ section.helpText }}</p>
              </div>
            </div>

            <!-- Organization Required Badge -->
            <Badge
              v-if="isSectionRequired(section.key)"
              variant="outline"
              class="ml-3 bg-amber-50 text-amber-800 border-amber-300 flex items-center gap-1.5 flex-shrink-0"
            >
              <AlertCircle class="h-3 w-3" />
              Required by Organization
            </Badge>
          </div>
        </CardHeader>

        <CardContent>
          <!-- Privacy Options -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              v-for="option in privacyOptions"
              :key="option.value"
              @click="handlePrivacyChange(section.key, option.value)"
              :disabled="isSectionRequired(section.key)"
              :class="[
                'flex items-start gap-3 p-3 rounded-lg border-2 transition-all',
                privacySettings[section.key as keyof typeof privacySettings] === option.value
                  ? `${option.borderColor} ${option.bgColor} border-2`
                  : 'border-gray-200 bg-white hover:border-gray-300',
                isSectionRequired(section.key) && privacySettings[section.key as keyof typeof privacySettings] !== option.value
                  ? 'opacity-40 cursor-not-allowed'
                  : isSectionRequired(section.key)
                  ? 'opacity-70 cursor-not-allowed'
                  : 'cursor-pointer'
              ]"
            >
              <component
                :is="option.icon"
                :class="[
                  'h-5 w-5 flex-shrink-0 mt-0.5',
                  privacySettings[section.key as keyof typeof privacySettings] === option.value
                    ? option.color
                    : 'text-gray-400'
                ]"
              />
              <div class="text-left flex-1">
                <p
                  :class="[
                    'text-sm font-semibold',
                    privacySettings[section.key as keyof typeof privacySettings] === option.value
                      ? 'text-gray-900'
                      : 'text-gray-600'
                  ]"
                >
                  {{ option.label }}
                </p>
                <p class="text-xs text-gray-500 mt-0.5">{{ option.description }}</p>
              </div>

              <!-- Selected Indicator -->
              <div
                v-if="privacySettings[section.key as keyof typeof privacySettings] === option.value"
                :class="['h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0', option.bgColor]"
              >
                <div :class="['h-3 w-3 rounded-full', option.color.replace('text-', 'bg-')]"></div>
              </div>
            </button>
          </div>

          <!-- Organization Override Warning -->
          <div
            v-if="isSectionRequired(section.key)"
            class="mt-3 flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg"
          >
            <AlertCircle class="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p class="text-xs text-amber-800">
              Your organization requires <strong>{{ getCurrentPrivacyOption(section.key).label }}</strong> sharing for this section. You cannot change this setting.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Important Notice -->
    <Card class="border border-gray-300 bg-gray-50">
      <CardContent class="p-4">
        <div class="flex items-start gap-3">
          <Eye class="h-5 w-5 text-gray-600 mt-0.5 flex-shrink-0" />
          <div class="space-y-2">
            <p class="text-sm font-semibold text-gray-900">Important Privacy Information</p>
            <ul class="text-xs text-gray-700 space-y-1 list-disc list-inside">
              <li>Administrators can always view all information for safety and operational purposes</li>
              <li>Information marked as "Required by Organization" cannot be made private</li>
              <li>Changing privacy settings may affect how your team can support you on tour</li>
              <li>Medical and emergency information should be shared appropriately for your safety</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Save Button (Bottom) -->
    <div class="flex justify-end gap-3 pb-6">
      <Button variant="outline" size="default" @click="goBack">
        Cancel
      </Button>
      <Button @click="handleSave" size="default" class="bg-blue-600 hover:bg-blue-700 text-white">
        Save Privacy Settings
      </Button>
    </div>
  </div>
</template>
