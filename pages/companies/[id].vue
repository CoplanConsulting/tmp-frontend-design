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
  <div class="flex-1 p-[var(--spacing-8)] bg-[var(--background)]" v-if="company">
    <!-- Back Button -->
    <Button
      variant="ghost"
      @click="goBack"
      class="mb-[var(--spacing-4)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-[var(--transition-duration-fast)]"
    >
      <ArrowLeft class="h-4 w-4 mr-[var(--spacing-2)]" />
      Back to Companies
    </Button>

    <!-- Page Header -->
    <div class="flex items-start justify-between mb-[var(--spacing-6)]">
      <div>
        <div class="flex items-center gap-[var(--spacing-3)] mb-[var(--spacing-3)]">
          <h1 class="text-[var(--font-size-2xl)] font-bold text-[var(--foreground)]">{{ company.name }}</h1>
          <StatusBadge :type="company.type">
            {{ company.type }}
          </StatusBadge>
        </div>
        <div class="flex items-center gap-[var(--spacing-4)] text-[var(--font-size-sm)] text-[var(--muted-foreground)]">
          <div v-if="company.mainPhone" class="flex items-center gap-[var(--spacing-2)]">
            <Phone class="h-4 w-4" />
            <a
              :href="`tel:${company.mainPhone}`"
              class="hover:text-[var(--accent)] transition-colors duration-[var(--transition-duration-fast)]"
            >
              {{ company.mainPhone }}
            </a>
          </div>
          <div v-if="company.website" class="flex items-center gap-[var(--spacing-2)]">
            <Globe class="h-4 w-4" />
            <a
              :href="company.website"
              target="_blank"
              rel="noopener noreferrer"
              class="text-[var(--accent)] hover:opacity-80 hover:underline transition-all duration-[var(--transition-duration-fast)]"
            >
              Website
            </a>
          </div>
          <div v-if="company.mainEmail" class="flex items-center gap-[var(--spacing-2)]">
            <Mail class="h-4 w-4" />
            <a
              :href="`mailto:${company.mainEmail}`"
              class="text-[var(--accent)] hover:opacity-80 hover:underline transition-all duration-[var(--transition-duration-fast)]"
            >
              {{ company.mainEmail }}
            </a>
          </div>
        </div>
      </div>

      <Button
        variant="outline"
        class="text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors duration-[var(--transition-duration-base)]"
      >
        <FileEdit class="h-4 w-4 mr-[var(--spacing-2)]" />
        Edit Company
      </Button>
    </div>

    <!-- Company Information Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-[var(--spacing-6)] mb-[var(--spacing-8)]">
      <!-- Company Details -->
      <Card class="border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow-sm)]">
        <CardHeader class="pb-[var(--spacing-3)]">
          <div class="flex items-center gap-[var(--spacing-2)]">
            <Building2 class="h-5 w-5 text-[var(--muted-foreground)]" />
            <CardTitle class="text-[var(--font-size-base)] font-bold text-[var(--foreground)]">Company Information</CardTitle>
          </div>
        </CardHeader>
        <CardContent class="space-y-[var(--spacing-3)]">
          <div>
            <p class="text-[var(--font-size-xs)] font-semibold text-[var(--muted-foreground)] uppercase">Company Type</p>
            <p class="text-[var(--font-size-sm)] text-[var(--foreground)] mt-[var(--spacing-1)]">{{ company.type }}</p>
          </div>
          <Separator class="bg-[var(--border)]" v-if="company.mainPhone || company.mainEmail" />
          <div v-if="company.mainPhone">
            <p class="text-[var(--font-size-xs)] font-semibold text-[var(--muted-foreground)] uppercase">Main Phone</p>
            <p class="text-[var(--font-size-sm)] text-[var(--foreground)] mt-[var(--spacing-1)]">{{ company.mainPhone }}</p>
          </div>
          <Separator class="bg-[var(--border)]" v-if="company.mainEmail" />
          <div v-if="company.mainEmail">
            <p class="text-[var(--font-size-xs)] font-semibold text-[var(--muted-foreground)] uppercase">Main Email</p>
            <p class="text-[var(--font-size-sm)] text-[var(--foreground)] mt-[var(--spacing-1)]">{{ company.mainEmail }}</p>
          </div>
          <Separator class="bg-[var(--border)]" v-if="company.website" />
          <div v-if="company.website">
            <p class="text-[var(--font-size-xs)] font-semibold text-[var(--muted-foreground)] uppercase">Website</p>
            <a
              :href="company.website"
              target="_blank"
              class="text-[var(--font-size-sm)] text-[var(--accent)] hover:underline mt-[var(--spacing-1)] inline-block transition-all duration-[var(--transition-duration-fast)]"
            >
              {{ company.website }}
            </a>
          </div>
        </CardContent>
      </Card>

      <!-- Location Information -->
      <Card class="border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow-sm)]" v-if="company.address || company.city">
        <CardHeader class="pb-[var(--spacing-3)]">
          <div class="flex items-center gap-[var(--spacing-2)]">
            <MapPin class="h-5 w-5 text-[var(--muted-foreground)]" />
            <CardTitle class="text-[var(--font-size-base)] font-bold text-[var(--foreground)]">Location</CardTitle>
          </div>
        </CardHeader>
        <CardContent class="space-y-[var(--spacing-3)]">
          <div v-if="company.address">
            <p class="text-[var(--font-size-xs)] font-semibold text-[var(--muted-foreground)] uppercase">Address</p>
            <p class="text-[var(--font-size-sm)] text-[var(--foreground)] mt-[var(--spacing-1)]">{{ company.address }}</p>
          </div>
          <Separator class="bg-[var(--border)]" v-if="company.city" />
          <div v-if="company.city">
            <p class="text-[var(--font-size-xs)] font-semibold text-[var(--muted-foreground)] uppercase">City / State</p>
            <p class="text-[var(--font-size-sm)] text-[var(--foreground)] mt-[var(--spacing-1)]">
              {{ company.city }}{{ company.state ? `, ${company.state}` : '' }}
            </p>
          </div>
          <Separator class="bg-[var(--border)]" v-if="company.country" />
          <div v-if="company.country">
            <p class="text-[var(--font-size-xs)] font-semibold text-[var(--muted-foreground)] uppercase">Country</p>
            <p class="text-[var(--font-size-sm)] text-[var(--foreground)] mt-[var(--spacing-1)]">{{ company.country }}</p>
          </div>
          <Separator class="bg-[var(--border)]" v-if="company.postalCode" />
          <div v-if="company.postalCode">
            <p class="text-[var(--font-size-xs)] font-semibold text-[var(--muted-foreground)] uppercase">Postal Code</p>
            <p class="text-[var(--font-size-sm)] text-[var(--foreground)] mt-[var(--spacing-1)]">{{ company.postalCode }}</p>
          </div>
        </CardContent>
      </Card>

      <!-- Notes -->
      <Card class="border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow-sm)] lg:col-span-2" v-if="company.notes">
        <CardHeader class="pb-[var(--spacing-3)]">
          <CardTitle class="text-[var(--font-size-base)] font-bold text-[var(--foreground)]">Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <p class="text-[var(--font-size-sm)] text-[var(--foreground)]">{{ company.notes }}</p>
        </CardContent>
      </Card>
    </div>

    <!-- Contacts Section -->
    <div>
      <div class="flex items-center justify-between mb-[var(--spacing-4)]">
        <div class="flex items-center gap-[var(--spacing-2)]">
          <Users class="h-5 w-5 text-[var(--muted-foreground)]" />
          <h2 class="text-[var(--font-size-lg)] font-bold text-[var(--foreground)]">Contacts</h2>
          <Badge variant="secondary" class="font-semibold border border-[var(--border)]">{{ companyContacts.length }}</Badge>
        </div>
        <Button
          v-if="contactEmails"
          variant="outline"
          @click="emailAllContacts"
          class="text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors duration-[var(--transition-duration-base)]"
        >
          <Send class="h-4 w-4 mr-[var(--spacing-2)]" />
          Email All Contacts
        </Button>
      </div>

      <!-- Contacts Table -->
      <Card class="border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow-sm)]" v-if="companyContacts.length > 0">
        <Table>
          <TableHeader>
            <TableRow class="border-b border-[var(--border)]">
              <TableHead class="font-bold text-[var(--foreground)]">Name</TableHead>
              <TableHead class="font-bold text-[var(--foreground)]">Role / Title</TableHead>
              <TableHead class="font-bold text-[var(--foreground)]">Email</TableHead>
              <TableHead class="font-bold text-[var(--foreground)]">Phone</TableHead>
              <TableHead class="font-bold text-[var(--foreground)] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow
              v-for="contact in companyContacts"
              :key="contact.id"
              class="border-b border-[var(--border)] hover:bg-[var(--muted)] cursor-pointer transition-colors duration-[var(--transition-duration-fast)] group"
              @click="viewContact(contact.id)"
            >
              <TableCell class="font-semibold text-[var(--foreground)]">
                <div class="flex items-center gap-[var(--spacing-3)]">
                  <div class="flex-shrink-0 flex items-center justify-center w-9 h-9 border border-[var(--border)] rounded-[var(--radius-md)] bg-[var(--card)] shadow-[var(--shadow-xs)]">
                    <User class="h-4 w-4 text-[var(--muted-foreground)]" />
                  </div>
                  <span class="group-hover:text-[var(--accent)] transition-colors duration-[var(--transition-duration-fast)]">
                    {{ contact.firstName }} {{ contact.lastName }}
                  </span>
                </div>
              </TableCell>
              <TableCell class="text-[var(--muted-foreground)]">
                <div class="flex flex-col">
                  <span class="font-medium text-[var(--foreground)]">{{ contact.role }}</span>
                  <span v-if="contact.title" class="text-[var(--font-size-xs)] text-[var(--muted-foreground)]">{{ contact.title }}</span>
                </div>
              </TableCell>
              <TableCell class="text-[var(--muted-foreground)]">
                <a
                  v-if="contact.email"
                  :href="`mailto:${contact.email}`"
                  class="text-[var(--accent)] hover:opacity-80 hover:underline text-[var(--font-size-sm)] transition-all duration-[var(--transition-duration-fast)]"
                  @click.stop
                >
                  {{ contact.email }}
                </a>
                <span v-else class="opacity-40">-</span>
              </TableCell>
              <TableCell class="text-[var(--muted-foreground)]">
                <a
                  v-if="contact.phone"
                  :href="`tel:${contact.phone}`"
                  class="hover:text-[var(--accent)] transition-colors duration-[var(--transition-duration-fast)]"
                  @click.stop
                >
                  {{ contact.phone }}
                </a>
                <span v-else class="opacity-40">-</span>
              </TableCell>
              <TableCell class="text-right">
                <div class="flex items-center justify-end gap-[var(--spacing-2)]">
                  <Button
                    v-if="contact.email"
                    variant="ghost"
                    size="sm"
                    @click.stop="emailContact(contact.email)"
                    class="h-8 px-[var(--spacing-2)] text-[var(--muted-foreground)] hover:text-[var(--accent)] hover:bg-[var(--muted)] transition-colors duration-[var(--transition-duration-fast)]"
                  >
                    <Mail class="h-4 w-4" />
                  </Button>
                  <Button
                    v-if="contact.phone"
                    variant="ghost"
                    size="sm"
                    @click.stop="callContact(contact.phone)"
                    class="h-8 px-[var(--spacing-2)] text-[var(--muted-foreground)] hover:text-[var(--accent)] hover:bg-[var(--muted)] transition-colors duration-[var(--transition-duration-fast)]"
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
      <Card class="border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow-sm)]" v-else>
        <CardContent class="py-[var(--spacing-12)] text-center">
          <Users class="h-12 w-12 text-[var(--muted-foreground)] mx-auto mb-[var(--spacing-4)]" />
          <p class="text-[var(--muted-foreground)]">No contacts found for this company</p>
        </CardContent>
      </Card>
    </div>
  </div>

  <!-- Company Not Found -->
  <div v-else class="flex-1 p-[var(--spacing-8)] bg-[var(--background)]">
    <Card class="border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow-sm)]">
      <CardContent class="py-[var(--spacing-12)] text-center">
        <Building2 class="h-12 w-12 text-[var(--muted-foreground)] mx-auto mb-[var(--spacing-4)]" />
        <p class="text-[var(--muted-foreground)] mb-[var(--spacing-4)]">Company not found</p>
        <Button
          @click="goBack"
          variant="outline"
          class="transition-colors duration-[var(--transition-duration-base)]"
        >
          <ArrowLeft class="h-4 w-4 mr-[var(--spacing-2)]" />
          Back to Companies
        </Button>
      </CardContent>
    </Card>
  </div>
</template>
