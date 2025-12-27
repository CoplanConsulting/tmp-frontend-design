<script setup lang="ts">
import {
  Building2,
  Mail,
  DollarSign,
  FileText,
  Hash,
  Landmark,
  Save,
  Edit3
} from 'lucide-vue-next'
import { currentOrganization } from '@/utils/mockData/organizations'
import type { OrgType } from '@/utils/mockData/types'

definePageMeta({
  layout: 'default'
})

// Organization data (reactive for future editing)
// Convert null values to empty strings for form inputs
const organization = ref({
  ...currentOrganization,
  contactEmail: currentOrganization.contactEmail ?? '',
  taxId: currentOrganization.taxId ?? '',
  wireInfo: currentOrganization.wireInfo ?? '',
  notes: currentOrganization.notes ?? '',
})
const isEditing = ref(false)

// Toggle edit mode
const toggleEdit = () => {
  isEditing.value = !isEditing.value
}

// Save changes (stub for now - just logs to console)
const saveChanges = () => {
  console.log('Saving organization settings:', organization.value)
  isEditing.value = false
  // TODO: API call to save organization data
}

// Organization type options for Select
const orgTypeOptions: { value: OrgType; label: string }[] = [
  { value: 'Music', label: 'Music' },
  { value: 'Sports/Athletics', label: 'Sports/Athletics' },
  { value: 'Theatre', label: 'Theatre' },
  { value: 'Festival', label: 'Festival' },
  { value: 'Other', label: 'Other' },
]

// Currency options
const currencyOptions = [
  { value: 'CAD', label: 'CAD (Canadian Dollar)' },
  { value: 'USD', label: 'USD (US Dollar)' },
  { value: 'EUR', label: 'EUR (Euro)' },
  { value: 'GBP', label: 'GBP (British Pound)' },
  { value: 'AUD', label: 'AUD (Australian Dollar)' },
]

// Get badge color based on org type
const getOrgTypeBadgeVariant = (type: OrgType) => {
  const variants: Record<OrgType, string> = {
    'Music': 'bg-green-100 text-green-800 border-green-200',
    'Sports/Athletics': 'bg-blue-100 text-blue-800 border-blue-200',
    'Theatre': 'bg-purple-100 text-purple-800 border-purple-200',
    'Festival': 'bg-orange-100 text-orange-800 border-orange-200',
    'Other': 'bg-gray-100 text-gray-800 border-gray-200',
  }
  return variants[type] || variants.Other
}
</script>

<template>
  <div class="flex flex-1 flex-col gap-6">
    <!-- Page Header -->
    <div class="flex items-start justify-between">
      <div>
        <div class="flex items-center gap-3 mb-2">
          <Building2 class="h-8 w-8 text-gray-700" />
          <h1 class="text-2xl font-bold text-gray-900">{{ organization.name }}</h1>
        </div>
        <div class="flex items-center gap-3 mt-2">
          <Badge :class="getOrgTypeBadgeVariant(organization.orgType)" class="text-xs font-semibold border">
            {{ organization.orgType }}
          </Badge>
          <Badge
            :variant="organization.isActive ? 'default' : 'secondary'"
            :class="organization.isActive ? 'bg-green-600' : 'bg-gray-400'"
            class="text-xs font-semibold text-white"
          >
            {{ organization.isActive ? 'Active' : 'Inactive' }}
          </Badge>
          <span class="text-xs text-gray-500">
            Last updated: {{ new Date(organization.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}
          </span>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <Button
          v-if="!isEditing"
          variant="outline"
          class="text-gray-900"
          @click="toggleEdit"
        >
          <Edit3 class="h-4 w-4 mr-2" />
          Edit Settings
        </Button>
        <template v-else>
          <Button
            variant="outline"
            class="text-gray-900"
            @click="toggleEdit"
          >
            Cancel
          </Button>
          <Button
            class="bg-black text-white hover:bg-gray-800"
            @click="saveChanges"
          >
            <Save class="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </template>
      </div>
    </div>

    <!-- Settings Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Basic Information -->
      <Card class="border border-gray-200 bg-white">
        <CardHeader class="pb-3">
          <div class="flex items-center gap-2">
            <Building2 class="h-5 w-5 text-gray-600" />
            <CardTitle class="text-base font-bold text-gray-900">Basic Information</CardTitle>
          </div>
        </CardHeader>
        <CardContent class="space-y-4">
          <div>
            <Label for="org-name" class="text-xs font-semibold text-gray-500 uppercase">Organization Name</Label>
            <Input
              v-if="isEditing"
              id="org-name"
              v-model="organization.name"
              class="mt-1 border-gray-300"
            />
            <p v-else class="text-sm text-gray-900 mt-1">{{ organization.name }}</p>
          </div>
          <Separator class="bg-slate-200" />
          <div>
            <Label for="org-slug" class="text-xs font-semibold text-gray-500 uppercase">URL Slug</Label>
            <Input
              v-if="isEditing"
              id="org-slug"
              v-model="organization.slug"
              class="mt-1 border-gray-300 font-mono text-sm"
            />
            <p v-else class="text-sm text-gray-900 mt-1 font-mono">{{ organization.slug }}</p>
          </div>
          <Separator class="bg-slate-200" />
          <div>
            <Label for="org-type" class="text-xs font-semibold text-gray-500 uppercase">Organization Type</Label>
            <Select v-if="isEditing" v-model="organization.orgType">
              <SelectTrigger id="org-type" class="mt-1 border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="option in orgTypeOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </SelectItem>
              </SelectContent>
            </Select>
            <p v-else class="text-sm text-gray-900 mt-1">{{ organization.orgType }}</p>
          </div>
        </CardContent>
      </Card>

      <!-- Contact & Financial -->
      <Card class="border border-gray-200 bg-white">
        <CardHeader class="pb-3">
          <div class="flex items-center gap-2">
            <Mail class="h-5 w-5 text-gray-600" />
            <CardTitle class="text-base font-bold text-gray-900">Contact & Financial</CardTitle>
          </div>
        </CardHeader>
        <CardContent class="space-y-4">
          <div>
            <Label for="contact-email" class="text-xs font-semibold text-gray-500 uppercase">Contact Email</Label>
            <Input
              v-if="isEditing"
              id="contact-email"
              v-model="organization.contactEmail"
              type="email"
              class="mt-1 border-gray-300"
            />
            <a
              v-else-if="organization.contactEmail"
              :href="`mailto:${organization.contactEmail}`"
              class="text-sm text-blue-600 hover:underline mt-1 block break-all"
            >
              {{ organization.contactEmail }}
            </a>
            <p v-else class="text-sm text-gray-500 italic mt-1">Not provided</p>
          </div>
          <Separator class="bg-slate-200" />
          <div>
            <Label for="tax-id" class="text-xs font-semibold text-gray-500 uppercase">Tax ID / Business Number</Label>
            <Input
              v-if="isEditing"
              id="tax-id"
              v-model="organization.taxId"
              class="mt-1 border-gray-300 font-mono"
            />
            <p v-else-if="organization.taxId" class="text-sm text-gray-900 mt-1 font-mono">{{ organization.taxId }}</p>
            <p v-else class="text-sm text-gray-500 italic mt-1">Not provided</p>
          </div>
          <Separator class="bg-slate-200" />
          <div>
            <Label for="currency" class="text-xs font-semibold text-gray-500 uppercase">Default Currency</Label>
            <Select v-if="isEditing" v-model="organization.currency">
              <SelectTrigger id="currency" class="mt-1 border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="option in currencyOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </SelectItem>
              </SelectContent>
            </Select>
            <div v-else class="flex items-center gap-2 mt-1">
              <DollarSign class="h-4 w-4 text-gray-600" />
              <p class="text-sm text-gray-900">{{ organization.currency }}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Wire Transfer Information -->
      <Card class="border border-gray-200 bg-white lg:col-span-2">
        <CardHeader class="pb-3">
          <div class="flex items-center gap-2">
            <Landmark class="h-5 w-5 text-gray-600" />
            <CardTitle class="text-base font-bold text-gray-900">Wire Transfer Information</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <Label for="wire-info" class="text-xs font-semibold text-gray-500 uppercase">Banking Details</Label>
            <Textarea
              v-if="isEditing"
              id="wire-info"
              v-model="organization.wireInfo"
              rows="6"
              class="mt-1 border-gray-300 font-mono text-sm"
              placeholder="Bank name, account number, routing number, SWIFT code, etc."
            />
            <p
              v-else-if="organization.wireInfo"
              class="text-sm text-gray-900 mt-1 whitespace-pre-wrap font-mono leading-relaxed bg-gray-50 p-3 rounded-md border border-gray-200"
            >{{ organization.wireInfo }}</p>
            <p v-else class="text-sm text-gray-500 italic mt-1">No wire transfer information provided</p>
          </div>
        </CardContent>
      </Card>

      <!-- Notes -->
      <Card class="border border-gray-200 bg-white lg:col-span-2">
        <CardHeader class="pb-3">
          <div class="flex items-center gap-2">
            <FileText class="h-5 w-5 text-gray-600" />
            <CardTitle class="text-base font-bold text-gray-900">Additional Notes</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <Label for="notes" class="text-xs font-semibold text-gray-500 uppercase">Internal Notes</Label>
            <Textarea
              v-if="isEditing"
              id="notes"
              v-model="organization.notes"
              rows="4"
              class="mt-1 border-gray-300"
              placeholder="Internal notes about this organization..."
            />
            <p
              v-else-if="organization.notes"
              class="text-sm text-gray-900 mt-1 whitespace-pre-wrap leading-relaxed"
            >{{ organization.notes }}</p>
            <p v-else class="text-sm text-gray-500 italic mt-1">No additional notes</p>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
