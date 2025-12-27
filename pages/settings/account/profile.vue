<script setup lang="ts">
import {
  User,
  Phone,
  ShieldAlert,
  Plane,
  Ruler,
  Mail,
  MapPin,
  Calendar,
  Heart,
  Briefcase,
  Lock,
  ChevronRight,
  Camera
} from 'lucide-vue-next'
import { getPersonById } from '@/utils/mockData/people'
import type { Person } from '@/utils/mockData/types'

definePageMeta({
  layout: 'default'
})

// Load current user (hardcoded to person-1 for mock)
const currentPerson = ref<Person | undefined>(getPersonById('person-1'))

// Form data - initialize with current person data
const formData = ref({
  // Basic Info
  firstName: currentPerson.value?.firstName || '',
  middleName: currentPerson.value?.middleName || '',
  lastName: currentPerson.value?.lastName || '',

  // Contact Information
  email: currentPerson.value?.email || '',
  phone: currentPerson.value?.phone || '',
  address: currentPerson.value?.address || '',

  // Emergency Contact
  emergencyContactName: currentPerson.value?.emergencyContactName || '',
  emergencyContactRelationship: currentPerson.value?.emergencyContactRelationship || '',
  emergencyContactPhone: currentPerson.value?.emergencyContactPhone || '',
  emergencyContactEmail: currentPerson.value?.emergencyContactEmail || '',

  // Medical Info (placeholders - not fully in type yet)
  dietaryRestrictions: '',
  allergies: '',
  medications: '',

  // Travel Documents
  passportNumber: currentPerson.value?.passportNumber || '',
  passportCountry: currentPerson.value?.passportCountry || '',
  passportExpiration: currentPerson.value?.passportExpiration || '',
  nationality: currentPerson.value?.nationality || '',

  // Personal Details
  dateOfBirth: currentPerson.value?.dateOfBirth || '',
  pronouns: '',

  // Sizing
  shirtSize: currentPerson.value?.shirtSize || '',
  jacketSize: currentPerson.value?.jacketSize || '',

  // Professional (placeholders)
  skills: '',
  languages: '',

  // Notes
  notes: currentPerson.value?.notes || ''
})

// Privacy settings
const privacySettings = ref(currentPerson.value?.privacySettings || {
  contactInfo: 'organization',
  emergencyContact: 'organization',
  medicalInfo: 'private',
  travelDocuments: 'organization',
  personalDetails: 'private',
  sizing: 'tourTeam',
  professional: 'organization'
})

// Get privacy label
const getPrivacyLabel = (setting: string | undefined) => {
  switch (setting) {
    case 'private': return 'Private'
    case 'organization': return 'Organization'
    case 'tourTeam': return 'Tour Team'
    default: return 'Organization'
  }
}

// Get privacy icon color
const getPrivacyColor = (setting: string | undefined) => {
  switch (setting) {
    case 'private': return 'text-red-600'
    case 'organization': return 'text-blue-600'
    case 'tourTeam': return 'text-green-600'
    default: return 'text-blue-600'
  }
}

// Handle form submission
const handleSave = () => {
  console.log('Saving profile data:', formData.value)
  console.log('Privacy settings:', privacySettings.value)
  // TODO: Implement actual save logic
}

// Navigate to privacy settings
const router = useRouter()
const goToPrivacySettings = () => {
  router.push('/settings/account/privacy')
}
</script>

<template>
  <div class="flex flex-1 flex-col gap-6">
    <!-- Page Header -->
    <div class="flex items-start justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Profile</h1>
        <p class="text-sm text-gray-600 mt-1">Manage your personal information and privacy settings</p>
      </div>
      <Button @click="handleSave" size="sm" class="bg-blue-600 hover:bg-blue-700 text-white">
        Save Changes
      </Button>
    </div>

    <!-- Privacy Settings Link -->
    <Card class="border border-blue-200 bg-blue-50">
      <CardContent class="p-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <Lock class="h-5 w-5 text-blue-600" />
            <div>
              <p class="text-sm font-semibold text-gray-900">Privacy Settings</p>
              <p class="text-xs text-gray-600 mt-0.5">Control who can see each section of your profile</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            @click="goToPrivacySettings"
            class="text-blue-600 hover:text-blue-700 hover:bg-blue-100"
          >
            Manage Privacy
            <ChevronRight class="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>

    <!-- Profile Photo Section -->
    <Card class="border border-gray-200 bg-white">
      <CardHeader class="pb-3">
        <div class="flex items-center gap-2">
          <Camera class="h-5 w-5 text-gray-600" />
          <CardTitle class="text-base font-bold text-gray-900">Profile Photo</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div class="flex items-center gap-4">
          <Avatar class="h-20 w-20 border-2 border-gray-200">
            <AvatarFallback class="text-2xl bg-gray-100 text-gray-700 font-semibold">
              {{ formData.firstName.charAt(0) }}{{ formData.lastName.charAt(0) }}
            </AvatarFallback>
          </Avatar>
          <div>
            <Button variant="outline" size="sm" class="text-sm">
              Upload Photo
            </Button>
            <p class="text-xs text-gray-500 mt-2">JPG, PNG or GIF. Max size 2MB.</p>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Form Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Basic Information -->
      <Card class="border border-gray-200 bg-white">
        <CardHeader class="pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <User class="h-5 w-5 text-gray-600" />
              <CardTitle class="text-base font-bold text-gray-900">Basic Information</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent class="space-y-4">
          <div>
            <Label for="firstName" class="text-xs font-semibold text-gray-500 uppercase">First Name</Label>
            <Input
              id="firstName"
              v-model="formData.firstName"
              placeholder="First name"
              class="mt-1"
            />
          </div>
          <div>
            <Label for="middleName" class="text-xs font-semibold text-gray-500 uppercase">Middle Name</Label>
            <Input
              id="middleName"
              v-model="formData.middleName"
              placeholder="Middle name (optional)"
              class="mt-1"
            />
          </div>
          <div>
            <Label for="lastName" class="text-xs font-semibold text-gray-500 uppercase">Last Name</Label>
            <Input
              id="lastName"
              v-model="formData.lastName"
              placeholder="Last name"
              class="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      <!-- Contact Information -->
      <Card class="border border-gray-200 bg-white">
        <CardHeader class="pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <Phone class="h-5 w-5 text-gray-600" />
              <CardTitle class="text-base font-bold text-gray-900">Contact Information</CardTitle>
            </div>
            <div class="flex items-center gap-1.5 text-xs">
              <Lock :class="['h-3.5 w-3.5', getPrivacyColor(privacySettings.contactInfo)]" />
              <span :class="['font-medium', getPrivacyColor(privacySettings.contactInfo)]">
                {{ getPrivacyLabel(privacySettings.contactInfo) }}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent class="space-y-4">
          <div>
            <Label for="email" class="text-xs font-semibold text-gray-500 uppercase">Email</Label>
            <Input
              id="email"
              v-model="formData.email"
              type="email"
              placeholder="email@example.com"
              class="mt-1"
            />
          </div>
          <div>
            <Label for="phone" class="text-xs font-semibold text-gray-500 uppercase">Phone</Label>
            <Input
              id="phone"
              v-model="formData.phone"
              type="tel"
              placeholder="615-555-1212"
              class="mt-1"
            />
          </div>
          <div>
            <Label for="address" class="text-xs font-semibold text-gray-500 uppercase">Address</Label>
            <Textarea
              id="address"
              v-model="formData.address"
              placeholder="Street address, city, state, zip"
              class="mt-1"
              rows="3"
            />
          </div>
        </CardContent>
      </Card>

      <!-- Emergency Contact -->
      <Card class="border border-gray-200 bg-white">
        <CardHeader class="pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <ShieldAlert class="h-5 w-5 text-gray-600" />
              <CardTitle class="text-base font-bold text-gray-900">Emergency Contact</CardTitle>
            </div>
            <div class="flex items-center gap-1.5 text-xs">
              <Lock :class="['h-3.5 w-3.5', getPrivacyColor(privacySettings.emergencyContact)]" />
              <span :class="['font-medium', getPrivacyColor(privacySettings.emergencyContact)]">
                {{ getPrivacyLabel(privacySettings.emergencyContact) }}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent class="space-y-4">
          <div>
            <Label for="emergencyContactName" class="text-xs font-semibold text-gray-500 uppercase">Name</Label>
            <Input
              id="emergencyContactName"
              v-model="formData.emergencyContactName"
              placeholder="Contact name"
              class="mt-1"
            />
          </div>
          <div>
            <Label for="emergencyContactRelationship" class="text-xs font-semibold text-gray-500 uppercase">Relationship</Label>
            <Input
              id="emergencyContactRelationship"
              v-model="formData.emergencyContactRelationship"
              placeholder="Spouse, Parent, Sibling, etc."
              class="mt-1"
            />
          </div>
          <div>
            <Label for="emergencyContactPhone" class="text-xs font-semibold text-gray-500 uppercase">Phone</Label>
            <Input
              id="emergencyContactPhone"
              v-model="formData.emergencyContactPhone"
              type="tel"
              placeholder="Emergency contact phone"
              class="mt-1"
            />
          </div>
          <div>
            <Label for="emergencyContactEmail" class="text-xs font-semibold text-gray-500 uppercase">Email</Label>
            <Input
              id="emergencyContactEmail"
              v-model="formData.emergencyContactEmail"
              type="email"
              placeholder="Emergency contact email"
              class="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      <!-- Medical Information -->
      <Card class="border border-gray-200 bg-white">
        <CardHeader class="pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <Heart class="h-5 w-5 text-gray-600" />
              <CardTitle class="text-base font-bold text-gray-900">Medical Information</CardTitle>
            </div>
            <div class="flex items-center gap-1.5 text-xs">
              <Lock :class="['h-3.5 w-3.5', getPrivacyColor(privacySettings.medicalInfo)]" />
              <span :class="['font-medium', getPrivacyColor(privacySettings.medicalInfo)]">
                {{ getPrivacyLabel(privacySettings.medicalInfo) }}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent class="space-y-4">
          <div>
            <Label for="dietaryRestrictions" class="text-xs font-semibold text-gray-500 uppercase">Dietary Restrictions</Label>
            <Input
              id="dietaryRestrictions"
              v-model="formData.dietaryRestrictions"
              placeholder="Vegetarian, Vegan, Gluten-free, etc."
              class="mt-1"
            />
          </div>
          <div>
            <Label for="allergies" class="text-xs font-semibold text-gray-500 uppercase">Allergies</Label>
            <Input
              id="allergies"
              v-model="formData.allergies"
              placeholder="Food allergies, medications, etc."
              class="mt-1"
            />
          </div>
          <div>
            <Label for="medications" class="text-xs font-semibold text-gray-500 uppercase">Medications</Label>
            <Textarea
              id="medications"
              v-model="formData.medications"
              placeholder="Current medications (optional)"
              class="mt-1"
              rows="2"
            />
          </div>
        </CardContent>
      </Card>

      <!-- Travel Documents -->
      <Card class="border border-gray-200 bg-white">
        <CardHeader class="pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <Plane class="h-5 w-5 text-gray-600" />
              <CardTitle class="text-base font-bold text-gray-900">Travel Documents</CardTitle>
            </div>
            <div class="flex items-center gap-1.5 text-xs">
              <Lock :class="['h-3.5 w-3.5', getPrivacyColor(privacySettings.travelDocuments)]" />
              <span :class="['font-medium', getPrivacyColor(privacySettings.travelDocuments)]">
                {{ getPrivacyLabel(privacySettings.travelDocuments) }}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent class="space-y-4">
          <div>
            <Label for="passportCountry" class="text-xs font-semibold text-gray-500 uppercase">Passport Country</Label>
            <Input
              id="passportCountry"
              v-model="formData.passportCountry"
              placeholder="USA, Canada, etc."
              class="mt-1"
            />
          </div>
          <div>
            <Label for="passportNumber" class="text-xs font-semibold text-gray-500 uppercase">Passport Number</Label>
            <Input
              id="passportNumber"
              v-model="formData.passportNumber"
              placeholder="Passport number"
              class="mt-1"
            />
          </div>
          <div>
            <Label for="passportExpiration" class="text-xs font-semibold text-gray-500 uppercase">Expiration Date</Label>
            <Input
              id="passportExpiration"
              v-model="formData.passportExpiration"
              type="date"
              class="mt-1"
            />
          </div>
          <div>
            <Label for="nationality" class="text-xs font-semibold text-gray-500 uppercase">Nationality</Label>
            <Input
              id="nationality"
              v-model="formData.nationality"
              placeholder="Nationality"
              class="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      <!-- Personal Details -->
      <Card class="border border-gray-200 bg-white">
        <CardHeader class="pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <Calendar class="h-5 w-5 text-gray-600" />
              <CardTitle class="text-base font-bold text-gray-900">Personal Details</CardTitle>
            </div>
            <div class="flex items-center gap-1.5 text-xs">
              <Lock :class="['h-3.5 w-3.5', getPrivacyColor(privacySettings.personalDetails)]" />
              <span :class="['font-medium', getPrivacyColor(privacySettings.personalDetails)]">
                {{ getPrivacyLabel(privacySettings.personalDetails) }}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent class="space-y-4">
          <div>
            <Label for="dateOfBirth" class="text-xs font-semibold text-gray-500 uppercase">Date of Birth</Label>
            <Input
              id="dateOfBirth"
              v-model="formData.dateOfBirth"
              type="date"
              class="mt-1"
            />
          </div>
          <div>
            <Label for="pronouns" class="text-xs font-semibold text-gray-500 uppercase">Pronouns</Label>
            <Input
              id="pronouns"
              v-model="formData.pronouns"
              placeholder="he/him, she/her, they/them, etc."
              class="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      <!-- Sizing & Wardrobe -->
      <Card class="border border-gray-200 bg-white">
        <CardHeader class="pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <Ruler class="h-5 w-5 text-gray-600" />
              <CardTitle class="text-base font-bold text-gray-900">Sizing & Wardrobe</CardTitle>
            </div>
            <div class="flex items-center gap-1.5 text-xs">
              <Lock :class="['h-3.5 w-3.5', getPrivacyColor(privacySettings.sizing)]" />
              <span :class="['font-medium', getPrivacyColor(privacySettings.sizing)]">
                {{ getPrivacyLabel(privacySettings.sizing) }}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent class="space-y-4">
          <div>
            <Label for="shirtSize" class="text-xs font-semibold text-gray-500 uppercase">Shirt Size</Label>
            <Select v-model="formData.shirtSize">
              <SelectTrigger id="shirtSize" class="mt-1">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="XS">XS</SelectItem>
                <SelectItem value="S">S</SelectItem>
                <SelectItem value="M">M</SelectItem>
                <SelectItem value="L">L</SelectItem>
                <SelectItem value="XL">XL</SelectItem>
                <SelectItem value="XXL">XXL</SelectItem>
                <SelectItem value="XXXL">XXXL</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label for="jacketSize" class="text-xs font-semibold text-gray-500 uppercase">Jacket Size</Label>
            <Select v-model="formData.jacketSize">
              <SelectTrigger id="jacketSize" class="mt-1">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="XS">XS</SelectItem>
                <SelectItem value="S">S</SelectItem>
                <SelectItem value="M">M</SelectItem>
                <SelectItem value="L">L</SelectItem>
                <SelectItem value="XL">XL</SelectItem>
                <SelectItem value="XXL">XXL</SelectItem>
                <SelectItem value="XXXL">XXXL</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <!-- Professional Information -->
      <Card class="border border-gray-200 bg-white">
        <CardHeader class="pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <Briefcase class="h-5 w-5 text-gray-600" />
              <CardTitle class="text-base font-bold text-gray-900">Professional Information</CardTitle>
            </div>
            <div class="flex items-center gap-1.5 text-xs">
              <Lock :class="['h-3.5 w-3.5', getPrivacyColor(privacySettings.professional)]" />
              <span :class="['font-medium', getPrivacyColor(privacySettings.professional)]">
                {{ getPrivacyLabel(privacySettings.professional) }}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent class="space-y-4">
          <div>
            <Label for="skills" class="text-xs font-semibold text-gray-500 uppercase">Skills & Certifications</Label>
            <Textarea
              id="skills"
              v-model="formData.skills"
              placeholder="Relevant skills, certifications, or expertise"
              class="mt-1"
              rows="2"
            />
          </div>
          <div>
            <Label for="languages" class="text-xs font-semibold text-gray-500 uppercase">Languages</Label>
            <Input
              id="languages"
              v-model="formData.languages"
              placeholder="English, Spanish, French, etc."
              class="mt-1"
            />
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Notes Section (Full Width) -->
    <Card class="border border-gray-200 bg-white">
      <CardHeader class="pb-3">
        <div class="flex items-center gap-2">
          <User class="h-5 w-5 text-gray-600" />
          <CardTitle class="text-base font-bold text-gray-900">Additional Notes</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Label for="notes" class="text-xs font-semibold text-gray-500 uppercase">Notes</Label>
        <Textarea
          id="notes"
          v-model="formData.notes"
          placeholder="Any additional information you'd like to share..."
          class="mt-1"
          rows="4"
        />
      </CardContent>
    </Card>

    <!-- Save Button (Bottom) -->
    <div class="flex justify-end gap-3 pb-6">
      <Button variant="outline" size="default">
        Cancel
      </Button>
      <Button @click="handleSave" size="default" class="bg-blue-600 hover:bg-blue-700 text-white">
        Save Changes
      </Button>
    </div>
  </div>
</template>
