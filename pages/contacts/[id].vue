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
  <div v-if="selectedContact" class="flex flex-1 flex-col gap-[var(--spacing-6)]">
    <!-- Back Button -->
    <div>
      <Button
        variant="ghost"
        size="sm"
        @click="goBack"
        class="text-[var(--muted-foreground)] hover:text-[var(--foreground)] -ml-2 transition-colors duration-[var(--transition-duration-fast)]"
      >
        <ArrowLeft class="h-4 w-4 mr-[var(--spacing-2)]" />
        Back to Contacts
      </Button>
    </div>

    <!-- Page Header -->
    <div class="flex items-start justify-between">
      <div class="flex items-center gap-[var(--spacing-4)]">
        <Avatar class="h-16 w-16 border-2 border-[var(--border)]">
          <AvatarFallback class="text-[length:var(--font-size-xl)] bg-[var(--muted)] text-[var(--foreground)] font-semibold">
            {{ selectedContact.firstName.charAt(0) }}{{ selectedContact.lastName.charAt(0) }}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 class="text-[length:var(--font-size-2xl)] font-bold text-[var(--foreground)]">
            {{ selectedContact.firstName }} {{ selectedContact.lastName }}
          </h1>
          <div class="flex items-center gap-[var(--spacing-3)] mt-[var(--spacing-2)]">
            <Badge :variant="getRoleBadgeVariant(selectedContact.role)" class="text-[length:var(--font-size-xs)] font-semibold">
              {{ selectedContact.role }}
            </Badge>
            <p v-if="selectedContact.title" class="text-[length:var(--font-size-sm)] text-[var(--muted-foreground)]">{{ selectedContact.title }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Information Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-[var(--spacing-6)]">
      <!-- Contact Information -->
      <Card class="border border-[var(--border)] bg-[var(--card)]">
        <CardHeader class="pb-[var(--spacing-3)]">
          <div class="flex items-center gap-[var(--spacing-2)]">
            <Phone class="h-5 w-5 text-[var(--muted-foreground)]" />
            <CardTitle class="text-[length:var(--font-size-base)] font-bold text-[var(--foreground)]">Contact Information</CardTitle>
          </div>
        </CardHeader>
        <CardContent class="flex flex-col gap-[var(--spacing-3)]">
          <div v-if="selectedContact.email">
            <p class="text-[length:var(--font-size-xs)] font-semibold text-[var(--muted-foreground)] uppercase">Email</p>
            <a :href="`mailto:${selectedContact.email}`" class="text-[length:var(--font-size-sm)] text-[var(--primary)] hover:underline mt-[var(--spacing-1)] block break-all transition-colors duration-[var(--transition-duration-fast)]">
              {{ selectedContact.email }}
            </a>
          </div>
          <Separator v-if="selectedContact.email && selectedContact.phone" class="bg-[var(--border)]" />
          <div v-if="selectedContact.phone">
            <p class="text-[length:var(--font-size-xs)] font-semibold text-[var(--muted-foreground)] uppercase">Phone</p>
            <a :href="`tel:${selectedContact.phone}`" class="text-[length:var(--font-size-sm)] text-[var(--primary)] hover:underline mt-[var(--spacing-1)] block transition-colors duration-[var(--transition-duration-fast)]">
              {{ selectedContact.phone }}
            </a>
          </div>
          <Separator v-if="selectedContact.address" class="bg-[var(--border)]" />
          <div v-if="selectedContact.address">
            <p class="text-[length:var(--font-size-xs)] font-semibold text-[var(--muted-foreground)] uppercase">Address</p>
            <p class="text-[length:var(--font-size-sm)] text-[var(--foreground)] mt-[var(--spacing-1)]">{{ selectedContact.address }}</p>
          </div>
          <Separator v-if="selectedContact.website" class="bg-[var(--border)]" />
          <div v-if="selectedContact.website">
            <p class="text-[length:var(--font-size-xs)] font-semibold text-[var(--muted-foreground)] uppercase">Website</p>
            <a :href="selectedContact.website" target="_blank" class="text-[length:var(--font-size-sm)] text-[var(--primary)] hover:underline mt-[var(--spacing-1)] block break-all transition-colors duration-[var(--transition-duration-fast)]">
              {{ selectedContact.website }}
            </a>
          </div>
          <div v-if="!selectedContact.email && !selectedContact.phone && !selectedContact.address && !selectedContact.website">
            <p class="text-[length:var(--font-size-sm)] text-[var(--muted-foreground)] italic">No contact information available</p>
          </div>
        </CardContent>
      </Card>

      <!-- Company Information -->
      <Card v-if="selectedContact.companyName || companyDetails" class="border border-[var(--border)] bg-[var(--card)]">
        <CardHeader class="pb-[var(--spacing-3)]">
          <div class="flex items-center gap-[var(--spacing-2)]">
            <Building2 class="h-5 w-5 text-[var(--muted-foreground)]" />
            <CardTitle class="text-[length:var(--font-size-base)] font-bold text-[var(--foreground)]">Company</CardTitle>
          </div>
        </CardHeader>
        <CardContent class="flex flex-col gap-[var(--spacing-3)]">
          <div>
            <p class="text-[length:var(--font-size-xs)] font-semibold text-[var(--muted-foreground)] uppercase">Company Name</p>
            <p class="text-[length:var(--font-size-sm)] text-[var(--foreground)] mt-[var(--spacing-1)]">{{ selectedContact.companyName || companyDetails?.name }}</p>
          </div>
          <Separator v-if="companyDetails?.type" class="bg-[var(--border)]" />
          <div v-if="companyDetails?.type">
            <p class="text-[length:var(--font-size-xs)] font-semibold text-[var(--muted-foreground)] uppercase">Type</p>
            <p class="text-[length:var(--font-size-sm)] text-[var(--foreground)] mt-[var(--spacing-1)]">{{ companyDetails.type }}</p>
          </div>
          <Separator v-if="companyDetails?.mainPhone" class="bg-[var(--border)]" />
          <div v-if="companyDetails?.mainPhone">
            <p class="text-[length:var(--font-size-xs)] font-semibold text-[var(--muted-foreground)] uppercase">Main Phone</p>
            <a :href="`tel:${companyDetails.mainPhone}`" class="text-[length:var(--font-size-sm)] text-[var(--primary)] hover:underline mt-[var(--spacing-1)] block transition-colors duration-[var(--transition-duration-fast)]">
              {{ companyDetails.mainPhone }}
            </a>
          </div>
          <Separator v-if="companyDetails?.mainEmail" class="bg-[var(--border)]" />
          <div v-if="companyDetails?.mainEmail">
            <p class="text-[length:var(--font-size-xs)] font-semibold text-[var(--muted-foreground)] uppercase">Main Email</p>
            <a :href="`mailto:${companyDetails.mainEmail}`" class="text-[length:var(--font-size-sm)] text-[var(--primary)] hover:underline mt-[var(--spacing-1)] block break-all transition-colors duration-[var(--transition-duration-fast)]">
              {{ companyDetails.mainEmail }}
            </a>
          </div>
          <Separator v-if="companyDetails?.website" class="bg-[var(--border)]" />
          <div v-if="companyDetails?.website">
            <p class="text-[length:var(--font-size-xs)] font-semibold text-[var(--muted-foreground)] uppercase">Website</p>
            <a :href="companyDetails.website" target="_blank" class="text-[length:var(--font-size-sm)] text-[var(--primary)] hover:underline mt-[var(--spacing-1)] block break-all transition-colors duration-[var(--transition-duration-fast)]">
              {{ companyDetails.website }}
            </a>
          </div>
          <Separator v-if="companyDetails?.address || (companyDetails?.city && companyDetails?.state)" class="bg-[var(--border)]" />
          <div v-if="companyDetails?.address || (companyDetails?.city && companyDetails?.state)">
            <p class="text-[length:var(--font-size-xs)] font-semibold text-[var(--muted-foreground)] uppercase">Location</p>
            <p class="text-[length:var(--font-size-sm)] text-[var(--foreground)] mt-[var(--spacing-1)]">
              <span v-if="companyDetails.address">{{ companyDetails.address }}<br /></span>
              <span v-if="companyDetails.city">{{ companyDetails.city }}<span v-if="companyDetails.state">, {{ companyDetails.state }}</span></span>
              <span v-if="companyDetails.country"><br />{{ companyDetails.country }}</span>
            </p>
          </div>
        </CardContent>
      </Card>

      <!-- Role & Department -->
      <Card class="border border-[var(--border)] bg-[var(--card)]">
        <CardHeader class="pb-[var(--spacing-3)]">
          <div class="flex items-center gap-[var(--spacing-2)]">
            <Briefcase class="h-5 w-5 text-[var(--muted-foreground)]" />
            <CardTitle class="text-[length:var(--font-size-base)] font-bold text-[var(--foreground)]">Professional Details</CardTitle>
          </div>
        </CardHeader>
        <CardContent class="flex flex-col gap-[var(--spacing-3)]">
          <div>
            <p class="text-[length:var(--font-size-xs)] font-semibold text-[var(--muted-foreground)] uppercase">Role</p>
            <p class="text-[length:var(--font-size-sm)] text-[var(--foreground)] mt-[var(--spacing-1)]">{{ selectedContact.role }}</p>
          </div>
          <Separator v-if="selectedContact.title" class="bg-[var(--border)]" />
          <div v-if="selectedContact.title">
            <p class="text-[length:var(--font-size-xs)] font-semibold text-[var(--muted-foreground)] uppercase">Title</p>
            <p class="text-[length:var(--font-size-sm)] text-[var(--foreground)] mt-[var(--spacing-1)]">{{ selectedContact.title }}</p>
          </div>
          <Separator v-if="selectedContact.isActive !== undefined" class="bg-[var(--border)]" />
          <div v-if="selectedContact.isActive !== undefined">
            <p class="text-[length:var(--font-size-xs)] font-semibold text-[var(--muted-foreground)] uppercase">Status</p>
            <Badge :variant="selectedContact.isActive ? 'default' : 'secondary'" class="mt-[var(--spacing-1)]">
              {{ selectedContact.isActive ? 'Active' : 'Inactive' }}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Notes (Full Width) -->
    <Card v-if="selectedContact.notes" class="border border-[var(--border)] bg-[var(--card)]">
      <CardHeader class="pb-[var(--spacing-3)]">
        <div class="flex items-center gap-[var(--spacing-2)]">
          <FileText class="h-5 w-5 text-[var(--muted-foreground)]" />
          <CardTitle class="text-[length:var(--font-size-base)] font-bold text-[var(--foreground)]">Notes</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p class="text-[length:var(--font-size-sm)] text-[var(--foreground)] whitespace-pre-wrap leading-relaxed">{{ selectedContact.notes }}</p>
      </CardContent>
    </Card>
  </div>

  <!-- Not Found State -->
  <div v-else class="flex flex-1 items-center justify-center">
    <div class="text-center">
      <Briefcase class="h-12 w-12 text-[var(--muted-foreground)] opacity-60 mx-auto mb-[var(--spacing-4)]" />
      <h2 class="text-[length:var(--font-size-xl)] font-bold text-[var(--foreground)] mb-[var(--spacing-2)]">Contact Not Found</h2>
      <p class="text-[length:var(--font-size-sm)] text-[var(--muted-foreground)] mb-[var(--spacing-6)]">The contact you're looking for doesn't exist.</p>
      <Button variant="outline" @click="goBack">
        <ArrowLeft class="h-4 w-4 mr-[var(--spacing-2)]" />
        Back to Contacts
      </Button>
    </div>
  </div>
</template>
