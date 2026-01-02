<script setup lang="ts">
import { ArrowLeft, FileText } from 'lucide-vue-next'
import type { Person } from '@/utils/mockData/types'

type SectionName = 'basicIdentity' | 'contactInfo' | 'emergencyContact' | 'travelDocuments' | 'sizing' | 'tourPreferences' | 'professional'
type Context = 'account' | 'org' | 'tour'

interface Props {
  person: Person
  editable?: boolean
  sections?: SectionName[]
  context?: Context
  backRoute?: string
  backLabel?: string
  showNotes?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  editable: false,
  sections: () => ['basicIdentity', 'contactInfo', 'emergencyContact', 'travelDocuments', 'sizing', 'tourPreferences', 'professional'],
  context: 'tour',
  showNotes: true
})

const router = useRouter()

// Navigate back
const goBack = () => {
  if (props.backRoute) {
    router.push(props.backRoute)
  } else {
    router.back()
  }
}

// Check if section should be shown
const shouldShowSection = (sectionName: SectionName) => {
  return props.sections.includes(sectionName)
}
</script>

<template>
  <div class="flex flex-1 flex-col gap-6">
    <!-- Back Button -->
    <div v-if="backRoute || backLabel">
      <Button
        variant="ghost"
        size="sm"
        @click="goBack"
        class="text-gray-600 hover:text-gray-900 -ml-2"
      >
        <ArrowLeft class="h-4 w-4 mr-2" />
        {{ backLabel || 'Back' }}
      </Button>
    </div>

    <!-- Page Header with Basic Identity -->
    <BasicIdentitySection
      v-if="shouldShowSection('basicIdentity')"
      :person="person"
      :editable="editable"
    />

    <!-- Information Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Contact Information -->
      <ContactInfoSection
        v-if="shouldShowSection('contactInfo')"
        :person="person"
        :editable="editable"
      />

      <!-- Emergency Contact -->
      <EmergencyContactSection
        v-if="shouldShowSection('emergencyContact')"
        :person="person"
        :editable="editable"
      />

      <!-- Travel Documents -->
      <TravelDocumentsSection
        v-if="shouldShowSection('travelDocuments')"
        :person="person"
        :editable="editable"
      />

      <!-- Sizing -->
      <SizingSection
        v-if="shouldShowSection('sizing')"
        :person="person"
        :editable="editable"
      />

      <!-- Tour Preferences -->
      <TourPreferencesSection
        v-if="shouldShowSection('tourPreferences')"
        :person="person"
        :editable="editable"
      />

      <!-- Professional Information -->
      <ProfessionalSection
        v-if="shouldShowSection('professional')"
        :person="person"
        :editable="editable"
      />
    </div>

    <!-- Notes (Full Width) -->
    <Card v-if="showNotes && person.notes" class="border border-gray-200 bg-white">
      <CardHeader class="pb-3">
        <div class="flex items-center gap-2">
          <FileText class="h-5 w-5 text-gray-600" />
          <CardTitle class="text-base font-bold text-gray-900">Notes</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p class="text-sm text-gray-900 whitespace-pre-wrap leading-relaxed">{{ person.notes }}</p>
      </CardContent>
    </Card>

    <!-- Slot for additional content (e.g., action buttons) -->
    <slot />
  </div>
</template>
