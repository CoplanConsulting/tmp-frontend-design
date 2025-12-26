<script setup lang="ts">
import {
  Mail,
  Phone,
  MapPin,
  User,
  FileText,
  Briefcase,
  Globe,
  ArrowLeft,
  Building2
} from 'lucide-vue-next'
import { contacts, getContactById, getCompanyById } from '@/utils/mockData/people'

definePageMeta({
  layout: 'default'
})

const route = useRoute()
const router = useRouter()
const contactId = computed(() => route.params.id as string)

// Find selected contact
const selectedContact = computed(() => {
  const contact = getContactById(contactId.value)
  return contact
})

// Get company details if contact has a companyId
const companyDetails = computed(() => {
  if (selectedContact.value?.companyId) {
    return getCompanyById(selectedContact.value.companyId)
  }
  return null
})

// Navigate back
const goBack = () => {
  router.push('/contacts')
}

// Get role badge variant
const getRoleBadgeVariant = (role: string): 'default' | 'outline' | 'secondary' => {
  if (role.toLowerCase().includes('promoter')) return 'default'
  if (role.toLowerCase().includes('venue')) return 'outline'
  return 'secondary'
}
</script>

<template>
  <div v-if="selectedContact" class="flex flex-1 flex-col gap-6">
    <!-- Back Button -->
    <div>
      <Button
        variant="ghost"
        size="sm"
        @click="goBack"
        class="text-gray-600 hover:text-gray-900 -ml-2"
      >
        <ArrowLeft class="h-4 w-4 mr-2" />
        Back to Contacts
      </Button>
    </div>

    <!-- Page Header -->
    <div class="flex items-start justify-between">
      <div class="flex items-center gap-4">
        <Avatar class="h-16 w-16 border-2 border-gray-200">
          <AvatarFallback class="text-xl bg-gray-100 text-gray-700 font-semibold">
            {{ selectedContact.firstName.charAt(0) }}{{ selectedContact.lastName.charAt(0) }}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 class="text-2xl font-bold text-gray-900">
            {{ selectedContact.firstName }} {{ selectedContact.lastName }}
          </h1>
          <div class="flex items-center gap-3 mt-2">
            <Badge :variant="getRoleBadgeVariant(selectedContact.role)" class="text-xs font-semibold">
              {{ selectedContact.role }}
            </Badge>
            <p v-if="selectedContact.title" class="text-sm text-gray-600">{{ selectedContact.title }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Information Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Contact Information -->
      <Card class="border border-gray-200 bg-white">
        <CardHeader class="pb-3">
          <div class="flex items-center gap-2">
            <Phone class="h-5 w-5 text-gray-600" />
            <CardTitle class="text-base font-bold text-gray-900">Contact Information</CardTitle>
          </div>
        </CardHeader>
        <CardContent class="space-y-3">
          <div v-if="selectedContact.email">
            <p class="text-xs font-semibold text-gray-500 uppercase">Email</p>
            <a :href="`mailto:${selectedContact.email}`" class="text-sm text-blue-600 hover:underline mt-1 block break-all">
              {{ selectedContact.email }}
            </a>
          </div>
          <Separator v-if="selectedContact.email && selectedContact.phone" class="bg-slate-200" />
          <div v-if="selectedContact.phone">
            <p class="text-xs font-semibold text-gray-500 uppercase">Phone</p>
            <a :href="`tel:${selectedContact.phone}`" class="text-sm text-blue-600 hover:underline mt-1 block">
              {{ selectedContact.phone }}
            </a>
          </div>
          <Separator v-if="selectedContact.address" class="bg-slate-200" />
          <div v-if="selectedContact.address">
            <p class="text-xs font-semibold text-gray-500 uppercase">Address</p>
            <p class="text-sm text-gray-900 mt-1">{{ selectedContact.address }}</p>
          </div>
          <Separator v-if="selectedContact.website" class="bg-slate-200" />
          <div v-if="selectedContact.website">
            <p class="text-xs font-semibold text-gray-500 uppercase">Website</p>
            <a :href="selectedContact.website" target="_blank" class="text-sm text-blue-600 hover:underline mt-1 block break-all">
              {{ selectedContact.website }}
            </a>
          </div>
          <div v-if="!selectedContact.email && !selectedContact.phone && !selectedContact.address && !selectedContact.website">
            <p class="text-sm text-gray-500 italic">No contact information available</p>
          </div>
        </CardContent>
      </Card>

      <!-- Company Information -->
      <Card v-if="selectedContact.companyName || companyDetails" class="border border-gray-200 bg-white">
        <CardHeader class="pb-3">
          <div class="flex items-center gap-2">
            <Building2 class="h-5 w-5 text-gray-600" />
            <CardTitle class="text-base font-bold text-gray-900">Company</CardTitle>
          </div>
        </CardHeader>
        <CardContent class="space-y-3">
          <div>
            <p class="text-xs font-semibold text-gray-500 uppercase">Company Name</p>
            <p class="text-sm text-gray-900 mt-1">{{ selectedContact.companyName || companyDetails?.name }}</p>
          </div>
          <Separator v-if="companyDetails?.type" class="bg-slate-200" />
          <div v-if="companyDetails?.type">
            <p class="text-xs font-semibold text-gray-500 uppercase">Type</p>
            <p class="text-sm text-gray-900 mt-1">{{ companyDetails.type }}</p>
          </div>
          <Separator v-if="companyDetails?.mainPhone" class="bg-slate-200" />
          <div v-if="companyDetails?.mainPhone">
            <p class="text-xs font-semibold text-gray-500 uppercase">Main Phone</p>
            <a :href="`tel:${companyDetails.mainPhone}`" class="text-sm text-blue-600 hover:underline mt-1 block">
              {{ companyDetails.mainPhone }}
            </a>
          </div>
          <Separator v-if="companyDetails?.mainEmail" class="bg-slate-200" />
          <div v-if="companyDetails?.mainEmail">
            <p class="text-xs font-semibold text-gray-500 uppercase">Main Email</p>
            <a :href="`mailto:${companyDetails.mainEmail}`" class="text-sm text-blue-600 hover:underline mt-1 block break-all">
              {{ companyDetails.mainEmail }}
            </a>
          </div>
          <Separator v-if="companyDetails?.website" class="bg-slate-200" />
          <div v-if="companyDetails?.website">
            <p class="text-xs font-semibold text-gray-500 uppercase">Website</p>
            <a :href="companyDetails.website" target="_blank" class="text-sm text-blue-600 hover:underline mt-1 block break-all">
              {{ companyDetails.website }}
            </a>
          </div>
          <Separator v-if="companyDetails?.address || (companyDetails?.city && companyDetails?.state)" class="bg-slate-200" />
          <div v-if="companyDetails?.address || (companyDetails?.city && companyDetails?.state)">
            <p class="text-xs font-semibold text-gray-500 uppercase">Location</p>
            <p class="text-sm text-gray-900 mt-1">
              <span v-if="companyDetails.address">{{ companyDetails.address }}<br /></span>
              <span v-if="companyDetails.city">{{ companyDetails.city }}<span v-if="companyDetails.state">, {{ companyDetails.state }}</span></span>
              <span v-if="companyDetails.country"><br />{{ companyDetails.country }}</span>
            </p>
          </div>
        </CardContent>
      </Card>

      <!-- Role & Department -->
      <Card class="border border-gray-200 bg-white">
        <CardHeader class="pb-3">
          <div class="flex items-center gap-2">
            <Briefcase class="h-5 w-5 text-gray-600" />
            <CardTitle class="text-base font-bold text-gray-900">Professional Details</CardTitle>
          </div>
        </CardHeader>
        <CardContent class="space-y-3">
          <div>
            <p class="text-xs font-semibold text-gray-500 uppercase">Role</p>
            <p class="text-sm text-gray-900 mt-1">{{ selectedContact.role }}</p>
          </div>
          <Separator v-if="selectedContact.title" class="bg-slate-200" />
          <div v-if="selectedContact.title">
            <p class="text-xs font-semibold text-gray-500 uppercase">Title</p>
            <p class="text-sm text-gray-900 mt-1">{{ selectedContact.title }}</p>
          </div>
          <Separator v-if="selectedContact.isActive !== undefined" class="bg-slate-200" />
          <div v-if="selectedContact.isActive !== undefined">
            <p class="text-xs font-semibold text-gray-500 uppercase">Status</p>
            <Badge :variant="selectedContact.isActive ? 'default' : 'secondary'" class="mt-1">
              {{ selectedContact.isActive ? 'Active' : 'Inactive' }}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Notes (Full Width) -->
    <Card v-if="selectedContact.notes" class="border border-gray-200 bg-white">
      <CardHeader class="pb-3">
        <div class="flex items-center gap-2">
          <FileText class="h-5 w-5 text-gray-600" />
          <CardTitle class="text-base font-bold text-gray-900">Notes</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p class="text-sm text-gray-900 whitespace-pre-wrap leading-relaxed">{{ selectedContact.notes }}</p>
      </CardContent>
    </Card>
  </div>

  <!-- Not Found State -->
  <div v-else class="flex flex-1 items-center justify-center">
    <div class="text-center">
      <Briefcase class="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <h2 class="text-xl font-bold text-gray-900 mb-2">Contact Not Found</h2>
      <p class="text-sm text-gray-600 mb-6">The contact you're looking for doesn't exist.</p>
      <Button variant="outline" @click="goBack">
        <ArrowLeft class="h-4 w-4 mr-2" />
        Back to Contacts
      </Button>
    </div>
  </div>
</template>
