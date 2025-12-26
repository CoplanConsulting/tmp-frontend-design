<script setup lang="ts">
import {
  Building2,
  Phone,
  Globe,
  Mail,
  MapPin,
  Users,
  ArrowLeft,
  FileEdit,
  User,
  Send
} from 'lucide-vue-next'
import { companies, getCompanyById, getContactsByCompanyId, contacts } from '@/utils/mockData/people'
import type { Company, Contact } from '@/utils/mockData/types'

definePageMeta({
  layout: 'default'
})

const route = useRoute()
const router = useRouter()

const companyId = computed(() => route.params.id as string)

// Get company and its contacts
const company = computed(() => getCompanyById(companyId.value))
const companyContacts = computed(() => getContactsByCompanyId(companyId.value))

// Get all contact emails for bulk email
const contactEmails = computed(() => {
  return companyContacts.value
    .filter(c => c.email)
    .map(c => c.email)
    .join(',')
})

// Enhanced badge styling with custom colors
const getTypeBadgeClass = (type: string) => {
  switch (type) {
    case 'Promoter':
      return 'bg-purple-100 text-purple-700 border-purple-300'
    case 'Venue':
      return 'bg-green-100 text-green-700 border-green-300'
    case 'Production':
      return 'bg-blue-100 text-blue-700 border-blue-300'
    default:
      return 'bg-gray-100 text-gray-700 border-gray-300'
  }
}

// Navigate back to companies list
const goBack = () => {
  router.push('/companies')
}

// Navigate to contact detail
const viewContact = (contactId: string) => {
  router.push(`/contacts/${contactId}`)
}

// Email all contacts
const emailAllContacts = () => {
  if (contactEmails.value) {
    window.location.href = `mailto:${contactEmails.value}?subject=Message from ${company.value?.name || 'Company'}`
  }
}

// Quick action handlers
const emailContact = (email: string) => {
  window.location.href = `mailto:${email}`
}

const callContact = (phone: string) => {
  window.location.href = `tel:${phone}`
}
</script>

<template>
  <div class="flex-1 p-8 bg-gray-50" v-if="company">
    <!-- Back Button -->
    <Button variant="ghost" @click="goBack" class="mb-4 text-gray-600 hover:text-gray-900">
      <ArrowLeft class="h-4 w-4 mr-2" />
      Back to Companies
    </Button>

    <!-- Page Header -->
    <div class="flex items-start justify-between mb-6">
      <div>
        <div class="flex items-center gap-3 mb-3">
          <h1 class="text-2xl font-bold text-gray-900">{{ company.name }}</h1>
          <Badge :class="getTypeBadgeClass(company.type)" class="font-bold border text-sm px-3 py-1">
            {{ company.type }}
          </Badge>
        </div>
        <div class="flex items-center gap-4 text-sm text-gray-600">
          <div v-if="company.mainPhone" class="flex items-center gap-2">
            <Phone class="h-4 w-4" />
            <a :href="`tel:${company.mainPhone}`" class="hover:text-blue-600 transition-colors">
              {{ company.mainPhone }}
            </a>
          </div>
          <div v-if="company.website" class="flex items-center gap-2">
            <Globe class="h-4 w-4" />
            <a :href="company.website" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-700 hover:underline transition-colors">
              Website
            </a>
          </div>
          <div v-if="company.mainEmail" class="flex items-center gap-2">
            <Mail class="h-4 w-4" />
            <a :href="`mailto:${company.mainEmail}`" class="text-blue-600 hover:text-blue-700 hover:underline transition-colors">
              {{ company.mainEmail }}
            </a>
          </div>
        </div>
      </div>

      <Button variant="outline" class="text-gray-900 hover:bg-gray-50">
        <FileEdit class="h-4 w-4 mr-2" />
        Edit Company
      </Button>
    </div>

    <!-- Company Information Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Company Details -->
      <Card class="border border-gray-200 bg-white">
        <CardHeader class="pb-3">
          <div class="flex items-center gap-2">
            <Building2 class="h-5 w-5 text-gray-600" />
            <CardTitle class="text-base font-bold text-gray-900">Company Information</CardTitle>
          </div>
        </CardHeader>
        <CardContent class="space-y-3">
          <div>
            <p class="text-xs font-semibold text-gray-500 uppercase">Company Type</p>
            <p class="text-sm text-gray-900 mt-1">{{ company.type }}</p>
          </div>
          <Separator class="bg-slate-200" v-if="company.mainPhone || company.mainEmail" />
          <div v-if="company.mainPhone">
            <p class="text-xs font-semibold text-gray-500 uppercase">Main Phone</p>
            <p class="text-sm text-gray-900 mt-1">{{ company.mainPhone }}</p>
          </div>
          <Separator class="bg-slate-200" v-if="company.mainEmail" />
          <div v-if="company.mainEmail">
            <p class="text-xs font-semibold text-gray-500 uppercase">Main Email</p>
            <p class="text-sm text-gray-900 mt-1">{{ company.mainEmail }}</p>
          </div>
          <Separator class="bg-slate-200" v-if="company.website" />
          <div v-if="company.website">
            <p class="text-xs font-semibold text-gray-500 uppercase">Website</p>
            <a :href="company.website" target="_blank" class="text-sm text-blue-600 hover:underline mt-1 inline-block">
              {{ company.website }}
            </a>
          </div>
        </CardContent>
      </Card>

      <!-- Location Information -->
      <Card class="border border-gray-200 bg-white" v-if="company.address || company.city">
        <CardHeader class="pb-3">
          <div class="flex items-center gap-2">
            <MapPin class="h-5 w-5 text-gray-600" />
            <CardTitle class="text-base font-bold text-gray-900">Location</CardTitle>
          </div>
        </CardHeader>
        <CardContent class="space-y-3">
          <div v-if="company.address">
            <p class="text-xs font-semibold text-gray-500 uppercase">Address</p>
            <p class="text-sm text-gray-900 mt-1">{{ company.address }}</p>
          </div>
          <Separator class="bg-slate-200" v-if="company.city" />
          <div v-if="company.city">
            <p class="text-xs font-semibold text-gray-500 uppercase">City / State</p>
            <p class="text-sm text-gray-900 mt-1">
              {{ company.city }}{{ company.state ? `, ${company.state}` : '' }}
            </p>
          </div>
          <Separator class="bg-slate-200" v-if="company.country" />
          <div v-if="company.country">
            <p class="text-xs font-semibold text-gray-500 uppercase">Country</p>
            <p class="text-sm text-gray-900 mt-1">{{ company.country }}</p>
          </div>
          <Separator class="bg-slate-200" v-if="company.postalCode" />
          <div v-if="company.postalCode">
            <p class="text-xs font-semibold text-gray-500 uppercase">Postal Code</p>
            <p class="text-sm text-gray-900 mt-1">{{ company.postalCode }}</p>
          </div>
        </CardContent>
      </Card>

      <!-- Notes -->
      <Card class="border border-gray-200 bg-white lg:col-span-2" v-if="company.notes">
        <CardHeader class="pb-3">
          <CardTitle class="text-base font-bold text-gray-900">Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <p class="text-sm text-gray-900">{{ company.notes }}</p>
        </CardContent>
      </Card>
    </div>

    <!-- Contacts Section -->
    <div>
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-2">
          <Users class="h-5 w-5 text-gray-600" />
          <h2 class="text-lg font-bold text-gray-900">Contacts</h2>
          <Badge variant="secondary" class="font-semibold border border-gray-200">{{ companyContacts.length }}</Badge>
        </div>
        <Button
          v-if="contactEmails"
          variant="outline"
          @click="emailAllContacts"
          class="text-gray-900 hover:bg-gray-50"
        >
          <Send class="h-4 w-4 mr-2" />
          Email All Contacts
        </Button>
      </div>

      <!-- Contacts Table -->
      <Card class="border border-gray-200 bg-white" v-if="companyContacts.length > 0">
        <Table>
          <TableHeader>
            <TableRow class="border-b border-gray-200">
              <TableHead class="font-bold text-gray-900">Name</TableHead>
              <TableHead class="font-bold text-gray-900">Role / Title</TableHead>
              <TableHead class="font-bold text-gray-900">Email</TableHead>
              <TableHead class="font-bold text-gray-900">Phone</TableHead>
              <TableHead class="font-bold text-gray-900 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow
              v-for="contact in companyContacts"
              :key="contact.id"
              class="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors group"
              @click="viewContact(contact.id)"
            >
              <TableCell class="font-semibold text-gray-900">
                <div class="flex items-center gap-3">
                  <div class="flex-shrink-0 flex items-center justify-center w-9 h-9 border border-gray-200 rounded-md bg-white shadow-sm">
                    <User class="h-4 w-4 text-gray-600" />
                  </div>
                  <span class="group-hover:text-black transition-colors">
                    {{ contact.firstName }} {{ contact.lastName }}
                  </span>
                </div>
              </TableCell>
              <TableCell class="text-gray-600">
                <div class="flex flex-col">
                  <span class="font-medium text-gray-900">{{ contact.role }}</span>
                  <span v-if="contact.title" class="text-xs text-gray-500">{{ contact.title }}</span>
                </div>
              </TableCell>
              <TableCell class="text-gray-600">
                <a
                  v-if="contact.email"
                  :href="`mailto:${contact.email}`"
                  class="text-blue-600 hover:text-blue-700 hover:underline text-sm transition-colors"
                  @click.stop
                >
                  {{ contact.email }}
                </a>
                <span v-else class="text-gray-400">-</span>
              </TableCell>
              <TableCell class="text-gray-600">
                <a
                  v-if="contact.phone"
                  :href="`tel:${contact.phone}`"
                  class="hover:text-blue-600 transition-colors"
                  @click.stop
                >
                  {{ contact.phone }}
                </a>
                <span v-else class="text-gray-400">-</span>
              </TableCell>
              <TableCell class="text-right">
                <div class="flex items-center justify-end gap-2">
                  <Button
                    v-if="contact.email"
                    variant="ghost"
                    size="sm"
                    @click.stop="emailContact(contact.email)"
                    class="h-8 px-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  >
                    <Mail class="h-4 w-4" />
                  </Button>
                  <Button
                    v-if="contact.phone"
                    variant="ghost"
                    size="sm"
                    @click.stop="callContact(contact.phone)"
                    class="h-8 px-2 text-gray-600 hover:text-green-600 hover:bg-green-50"
                  >
                    <Phone class="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>

      <!-- Empty State -->
      <Card class="border border-gray-200 bg-white" v-else>
        <CardContent class="py-12 text-center">
          <Users class="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p class="text-gray-600">No contacts found for this company</p>
        </CardContent>
      </Card>
    </div>
  </div>

  <!-- Company Not Found -->
  <div v-else class="flex-1 p-8 bg-gray-50">
    <Card class="border border-gray-200 bg-white">
      <CardContent class="py-12 text-center">
        <Building2 class="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p class="text-gray-600 mb-4">Company not found</p>
        <Button @click="goBack" variant="outline">
          <ArrowLeft class="h-4 w-4 mr-2" />
          Back to Companies
        </Button>
      </CardContent>
    </Card>
  </div>
</template>
