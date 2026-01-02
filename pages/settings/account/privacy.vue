<script setup lang="ts">
import {
  Lock,
  User,
  Shield,
  Eye,
  EyeOff,
  Users,
  Building2,
  ArrowLeft,
  Plane,
  Heart,
  Briefcase,
  Settings as SettingsIcon
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
  personalDetails: currentPerson.value?.privacySettings?.personalDetails || 'private',
  contactInfo: currentPerson.value?.privacySettings?.contactInfo || 'organization',
  emergencyContact: currentPerson.value?.privacySettings?.emergencyContact || 'organization',
  travelPreferences: currentPerson.value?.privacySettings?.travelPreferences || 'tourTeam',
  travelDocuments: currentPerson.value?.privacySettings?.travelDocuments || 'organization',
  frequentFlyer: currentPerson.value?.privacySettings?.frequentFlyer || 'private',
  sizing: currentPerson.value?.privacySettings?.sizing || 'tourTeam',
  family: currentPerson.value?.privacySettings?.family || 'private',
  medical: currentPerson.value?.privacySettings?.medical || 'private',
  professional: currentPerson.value?.privacySettings?.professional || 'organization'
})

// Organization-required sections (mock - normally from org settings or API)
const orgRequiredSections = ref(currentPerson.value?.orgRequiredSections || ['contactInfo', 'emergencyContact', 'travelDocuments'])

// Default accordion value (expanded by default)
const accordionValue = ref(['personal-contact'])

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

// Check if section is required by organization
const isSectionRequired = (sectionKey: string) => {
  return orgRequiredSections.value.includes(sectionKey)
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
  <div class="flex flex-1 flex-col gap-6 max-w-5xl mx-auto p-8">
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
          <p class="text-sm text-gray-600 mt-1">Control who can see your personal and contact information</p>
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
          <Shield class="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
          <div class="space-y-2">
            <p class="text-sm font-semibold text-gray-900">How Privacy Settings Work</p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div class="flex items-start gap-2">
                <EyeOff class="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p class="font-semibold text-red-800">Private</p>
                  <p class="text-gray-700">Only you can see this information</p>
                </div>
              </div>
              <div class="flex items-start gap-2">
                <Building2 class="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p class="font-semibold text-blue-800">Organization</p>
                  <p class="text-gray-700">All members of your organization</p>
                </div>
              </div>
              <div class="flex items-start gap-2">
                <Users class="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
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

    <!-- Accordion Sections (Matching Profile Structure) -->
    <Accordion
      type="multiple"
      v-model="accordionValue"
      class="w-full space-y-4"
    >
      <!-- Personal & Contact Information Section -->
      <AccordionItem
        value="personal-contact"
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
            <TabsList class="mb-6">
              <TabsTrigger value="personal">Personal Details</TabsTrigger>
              <TabsTrigger value="contact">Contact Info</TabsTrigger>
              <TabsTrigger value="emergency">Emergency Contact</TabsTrigger>
            </TabsList>

            <!-- Personal Details Tab -->
            <TabsContent value="personal" class="space-y-6">
              <div>
                <h3 class="text-sm font-bold text-gray-900 mb-2">What's included in Personal Details</h3>
                <p class="text-sm text-gray-600">
                  Preferred Name, Full Legal Name, Nickname, Date of Birth, Gender, Pronouns, Birthplace, Nationality
                </p>
              </div>

              <PrivacyControl
                section-key="personalDetails"
                :current-value="privacySettings.personalDetails"
                :is-required="isSectionRequired('personalDetails')"
                :privacy-options="privacyOptions"
                help-text="Personal details help the team address you correctly and plan celebrations. Some information may be required by your organization."
                @update:value="(val) => handlePrivacyChange('personalDetails', val)"
              />
            </TabsContent>

            <!-- Contact Info Tab -->
            <TabsContent value="contact" class="space-y-6">
              <div>
                <h3 class="text-sm font-bold text-gray-900 mb-2">What's included in Contact Info</h3>
                <p class="text-sm text-gray-600">
                  Email Address, Phone Number, Mailing Address
                </p>
              </div>

              <PrivacyControl
                section-key="contactInfo"
                :current-value="privacySettings.contactInfo"
                :is-required="isSectionRequired('contactInfo')"
                :privacy-options="privacyOptions"
                help-text="Sharing your contact info helps the team reach you quickly for show updates and emergencies."
                @update:value="(val) => handlePrivacyChange('contactInfo', val)"
              />
            </TabsContent>

            <!-- Emergency Contact Tab -->
            <TabsContent value="emergency" class="space-y-6">
              <div>
                <h3 class="text-sm font-bold text-gray-900 mb-2">What's included in Emergency Contact</h3>
                <p class="text-sm text-gray-600">
                  Contact Name, Relationship, Phone Number, Email Address
                </p>
              </div>

              <PrivacyControl
                section-key="emergencyContact"
                :current-value="privacySettings.emergencyContact"
                :is-required="isSectionRequired('emergencyContact')"
                :privacy-options="privacyOptions"
                help-text="Emergency contacts are critical for your safety on tour. Tour managers need this information."
                @update:value="(val) => handlePrivacyChange('emergencyContact', val)"
              />
            </TabsContent>
          </Tabs>
        </AccordionContent>
      </AccordionItem>

      <!-- Travel & Tour Preferences Section -->
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
            <TabsList class="mb-6">
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="frequent-flyer">Frequent Flyer</TabsTrigger>
              <TabsTrigger value="sizing">Sizing</TabsTrigger>
            </TabsList>

            <!-- Preferences Tab -->
            <TabsContent value="preferences" class="space-y-6">
              <div>
                <h3 class="text-sm font-bold text-gray-900 mb-2">What's included in Travel Preferences</h3>
                <p class="text-sm text-gray-600">
                  Hotel room preferences, flight seating choices, bus bunk assignments, meal preferences, and other tour travel logistics
                </p>
              </div>

              <PrivacyControl
                section-key="travelPreferences"
                :current-value="privacySettings.travelPreferences"
                :is-required="isSectionRequired('travelPreferences')"
                :privacy-options="privacyOptions"
                help-text="Sharing your travel preferences helps tour managers book the right accommodations and make you comfortable on the road."
                @update:value="(val) => handlePrivacyChange('travelPreferences', val)"
              />
            </TabsContent>

            <!-- Documents Tab -->
            <TabsContent value="documents" class="space-y-6">
              <div>
                <h3 class="text-sm font-bold text-gray-900 mb-2">What's included in Travel Documents</h3>
                <p class="text-sm text-gray-600">
                  Passport Number, Passport Country, Passport Expiration Date, TSA PreCheck/KTN, Global Entry, Driver's License
                </p>
              </div>

              <PrivacyControl
                section-key="travelDocuments"
                :current-value="privacySettings.travelDocuments"
                :is-required="isSectionRequired('travelDocuments')"
                :privacy-options="privacyOptions"
                help-text="Travel documents are essential for international tours. Tour managers and production coordinators need this information to book flights and arrange border crossings."
                @update:value="(val) => handlePrivacyChange('travelDocuments', val)"
              />
            </TabsContent>

            <!-- Frequent Flyer Tab -->
            <TabsContent value="frequent-flyer" class="space-y-6">
              <div>
                <h3 class="text-sm font-bold text-gray-900 mb-2">What's included in Frequent Flyer</h3>
                <p class="text-sm text-gray-600">
                  Airline loyalty program account numbers and membership details
                </p>
              </div>

              <PrivacyControl
                section-key="frequentFlyer"
                :current-value="privacySettings.frequentFlyer"
                :is-required="isSectionRequired('frequentFlyer')"
                :privacy-options="privacyOptions"
                help-text="Sharing your frequent flyer numbers allows tour managers to ensure you get credit for tour-related flights."
                @update:value="(val) => handlePrivacyChange('frequentFlyer', val)"
              />
            </TabsContent>

            <!-- Sizing Tab -->
            <TabsContent value="sizing" class="space-y-6">
              <div>
                <h3 class="text-sm font-bold text-gray-900 mb-2">What's included in Sizing</h3>
                <p class="text-sm text-gray-600">
                  Height, Weight, T-Shirt, Hoodie, Pants, Shoes, Jacket, Hat sizes
                </p>
              </div>

              <PrivacyControl
                section-key="sizing"
                :current-value="privacySettings.sizing"
                :is-required="isSectionRequired('sizing')"
                :privacy-options="privacyOptions"
                help-text="Sizing information helps the merch team order the right gear and wardrobe for tour personnel."
                @update:value="(val) => handlePrivacyChange('sizing', val)"
              />
            </TabsContent>
          </Tabs>
        </AccordionContent>
      </AccordionItem>

      <!-- Health & Family Section -->
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
            <TabsList class="mb-6">
              <TabsTrigger value="family">Family</TabsTrigger>
              <TabsTrigger value="medical">Medical & Health</TabsTrigger>
            </TabsList>

            <!-- Family Tab -->
            <TabsContent value="family" class="space-y-6">
              <div>
                <h3 class="text-sm font-bold text-gray-900 mb-2">What's included in Family Information</h3>
                <p class="text-sm text-gray-600">
                  Marital Status, Spouse Name & Birthday, Anniversary, Children, Family Notes
                </p>
              </div>

              <PrivacyControl
                section-key="family"
                :current-value="privacySettings.family"
                :is-required="isSectionRequired('family')"
                :privacy-options="privacyOptions"
                help-text="Sharing family information helps the team celebrate important milestones and understand your personal commitments while on tour."
                @update:value="(val) => handlePrivacyChange('family', val)"
              />
            </TabsContent>

            <!-- Medical & Health Tab -->
            <TabsContent value="medical" class="space-y-6">
              <div>
                <h3 class="text-sm font-bold text-gray-900 mb-2">What's included in Medical & Health</h3>
                <p class="text-sm text-gray-600">
                  Blood Type, Medical Conditions, Allergies, Dietary Restrictions
                </p>
              </div>

              <PrivacyControl
                section-key="medical"
                :current-value="privacySettings.medical"
                :is-required="isSectionRequired('medical')"
                :privacy-options="privacyOptions"
                help-text="Medical information is critical in emergencies. Consider sharing with tour managers and key personnel for your safety. Dietary restrictions help catering provide appropriate meals."
                @update:value="(val) => handlePrivacyChange('medical', val)"
              />
            </TabsContent>
          </Tabs>
        </AccordionContent>
      </AccordionItem>

      <!-- Professional Information Section -->
      <AccordionItem
        value="professional"
        class="border border-gray-200/80 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow data-[state=open]:shadow-md data-[state=open]:border-gray-300 px-6 data-[state=open]:pb-6"
      >
        <AccordionTrigger class="py-5 text-base font-semibold text-gray-900 hover:no-underline">
          <span class="flex items-center gap-3">
            <Briefcase class="h-5 w-5 text-gray-600" aria-hidden="true" />
            <span>Professional Information</span>
          </span>
        </AccordionTrigger>

        <AccordionContent class="pt-4 space-y-6">
          <div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">What's included in Professional Information</h3>
            <p class="text-sm text-gray-600">
              Biography, Skills & Expertise, Certifications & Licenses, Languages, Equipment Owned
            </p>
          </div>

          <PrivacyControl
            section-key="professional"
            :current-value="privacySettings.professional"
            :is-required="isSectionRequired('professional')"
            :privacy-options="privacyOptions"
            help-text="Sharing professional information helps tour managers understand your capabilities and assign appropriate roles. This information is typically shared across the organization."
            @update:value="(val) => handlePrivacyChange('professional', val)"
          />
        </AccordionContent>
      </AccordionItem>

      <!-- Account & Privacy Settings Section -->
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

        <AccordionContent class="pt-4 space-y-6">
          <div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">About Account Privacy</h3>
            <p class="text-sm text-gray-600 break-words">
              Account-level privacy settings apply globally to your profile. The privacy controls on this page determine who can view each section of your personal information.
            </p>
          </div>

          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 class="text-sm font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <Shield class="h-4 w-4" aria-hidden="true" />
              How Your Privacy is Protected
            </h4>
            <ul class="text-xs text-blue-800 space-y-2 list-disc list-inside break-words">
              <li class="break-words">Privacy settings apply immediately when saved</li>
              <li class="break-words">Administrators may access all information for legal and safety compliance</li>
              <li class="break-words">Organization-required sections cannot be set to private</li>
              <li class="break-words">Update your privacy settings anytime from your profile</li>
            </ul>
          </div>

          <div class="pt-2">
            <h4 class="text-sm font-bold text-gray-900 mb-3">Data Rights & Management</h4>
            <p class="text-sm text-gray-600 mb-3 break-words">
              You have the right to view, export, and request deletion of your personal data in accordance with applicable privacy laws.
            </p>
            <div class="flex gap-3">
              <Button variant="outline" size="sm" @click="goBack">
                View Full Profile
              </Button>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>

    <!-- Important Notice -->
    <Card class="border border-gray-300 bg-gray-50">
      <CardContent class="p-4">
        <div class="flex items-start gap-3">
          <Eye class="h-5 w-5 text-gray-600 mt-0.5 shrink-0" />
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
