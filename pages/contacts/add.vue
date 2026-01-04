<script setup lang="ts">
import { ArrowLeft, UserPlus, Save } from 'lucide-vue-next'

definePageMeta({
  layout: 'default'
})

// Form state
const form = ref({
  firstName: '',
  lastName: '',
  title: '',
  role: 'Promoter',
  company: '',
  email: '',
  phone: '',
  notes: ''
})

// Handle form submission
const handleSubmit = () => {
  console.log('Creating contact with data:', form.value)
  navigateTo('/contacts')
}

// Handle cancel
const handleCancel = () => {
  navigateTo('/contacts')
}
</script>

<template>
  <div class="flex flex-1 flex-col gap-[var(--spacing-6)]">
    <!-- Page Header -->
    <div class="flex flex-col gap-[var(--spacing-2)]">
      <div class="flex items-center gap-[var(--spacing-2)] text-[length:var(--font-size-sm)] text-[var(--muted-foreground)]">
        <NuxtLink to="/contacts" class="flex items-center gap-[var(--spacing-1)] hover:text-[var(--foreground)] transition-colors duration-[var(--transition-duration-fast)]">
          <ArrowLeft class="h-4 w-4" />
          Back to Contacts
        </NuxtLink>
      </div>
      <div class="flex items-center gap-[var(--spacing-3)] mb-[var(--spacing-1)]">
        <div class="flex items-center justify-center w-12 h-12 rounded-[var(--radius-lg)] bg-[var(--muted)] border border-[var(--border)]">
          <UserPlus class="h-6 w-6 text-[var(--muted-foreground)]" />
        </div>
        <h1 class="text-[length:var(--font-size-3xl)] font-bold text-[var(--foreground)]">Add New Contact</h1>
      </div>
      <p class="text-[length:var(--font-size-sm)] text-[var(--muted-foreground)] ml-[60px]">Add a promoter, venue manager, or industry professional to your network</p>
    </div>

    <!-- Form Container -->
    <form @submit.prevent="handleSubmit" class="max-w-4xl">
      <Card class="border border-[var(--border)] bg-[var(--card)] shadow-card">
        <CardContent class="p-[var(--spacing-8)]">
          <div class="flex flex-col gap-[var(--spacing-6)]">
            <!-- Name Row -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-[var(--spacing-6)]">
              <div class="flex flex-col gap-[var(--spacing-2)]">
                <Label for="firstName" class="text-[length:var(--font-size-sm)] font-semibold text-[var(--foreground)]">
                  First Name <span class="text-[var(--destructive)]">*</span>
                </Label>
                <Input
                  id="firstName"
                  v-model="form.firstName"
                  type="text"
                  placeholder="John"
                  required
                  class="bg-[var(--card)] border-[var(--border)]"
                />
              </div>

              <div class="flex flex-col gap-[var(--spacing-2)]">
                <Label for="lastName" class="text-[length:var(--font-size-sm)] font-semibold text-[var(--foreground)]">
                  Last Name <span class="text-[var(--destructive)]">*</span>
                </Label>
                <Input
                  id="lastName"
                  v-model="form.lastName"
                  type="text"
                  placeholder="Doe"
                  required
                  class="bg-[var(--card)] border-[var(--border)]"
                />
              </div>
            </div>

            <!-- Title & Role Row -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-[var(--spacing-6)]">
              <div class="flex flex-col gap-[var(--spacing-2)]">
                <Label for="title" class="text-[length:var(--font-size-sm)] font-semibold text-[var(--foreground)]">
                  Title
                </Label>
                <Input
                  id="title"
                  v-model="form.title"
                  type="text"
                  placeholder="Venue Manager"
                  class="bg-[var(--card)] border-[var(--border)]"
                />
              </div>

              <div class="flex flex-col gap-[var(--spacing-2)]">
                <Label for="role" class="text-[length:var(--font-size-sm)] font-semibold text-[var(--foreground)]">
                  Role <span class="text-[var(--destructive)]">*</span>
                </Label>
                <Select v-model="form.role">
                  <SelectTrigger id="role" class="bg-[var(--card)] border-[var(--border)]">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent class="bg-[var(--card)]">
                    <SelectItem value="Promoter">Promoter</SelectItem>
                    <SelectItem value="Venue Contact">Venue Contact</SelectItem>
                    <SelectItem value="Production Contact">Production Contact</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <!-- Divider -->
            <div class="border-t border-[var(--border)]" />

            <!-- Company Section -->
            <div class="flex flex-col gap-[var(--spacing-2)]">
              <Label for="company" class="text-[length:var(--font-size-sm)] font-semibold text-[var(--foreground)]">
                Company
              </Label>
              <Input
                id="company"
                v-model="form.company"
                type="text"
                placeholder="Company name"
                class="bg-[var(--card)] border-[var(--border)]"
              />
              <p class="text-[length:var(--font-size-xs)] text-[var(--muted-foreground)]">💡 In production: Search and link to existing companies</p>
            </div>

            <!-- Divider -->
            <div class="border-t border-[var(--border)]" />

            <!-- Contact Information Section -->
            <div class="flex flex-col gap-[var(--spacing-4)]">
              <h3 class="text-[length:var(--font-size-sm)] font-semibold text-[var(--foreground)] uppercase tracking-wide">Contact Information</h3>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-[var(--spacing-4)]">
                <!-- Email -->
                <div class="flex flex-col gap-[var(--spacing-2)]">
                  <Label for="email" class="text-[length:var(--font-size-sm)] font-medium text-[var(--muted-foreground)]">
                    Email
                  </Label>
                  <Input
                    id="email"
                    v-model="form.email"
                    type="email"
                    placeholder="john@example.com"
                    class="bg-[var(--card)] border-[var(--border)]"
                  />
                </div>

                <!-- Phone -->
                <div class="flex flex-col gap-[var(--spacing-2)]">
                  <Label for="phone" class="text-[length:var(--font-size-sm)] font-medium text-[var(--muted-foreground)]">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    v-model="form.phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    class="bg-[var(--card)] border-[var(--border)]"
                  />
                </div>
              </div>
            </div>

            <!-- Divider -->
            <div class="border-t border-[var(--border)]" />

            <!-- Notes Section -->
            <div class="flex flex-col gap-[var(--spacing-2)]">
              <Label for="notes" class="text-[length:var(--font-size-sm)] font-semibold text-[var(--foreground)]">
                Notes
              </Label>
              <Textarea
                id="notes"
                v-model="form.notes"
                placeholder="Add any additional notes about this contact..."
                rows="4"
                class="bg-[var(--card)] border-[var(--border)] resize-none"
              />
              <p class="text-[length:var(--font-size-xs)] text-[var(--muted-foreground)]">Internal notes visible only to your team</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Action Buttons -->
      <div class="flex items-center justify-between mt-[var(--spacing-6)]">
        <Button
          type="button"
          variant="outline"
          class="border-[var(--border)]"
          @click="handleCancel"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          class="bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--foreground)]/90 gap-[var(--spacing-2)] transition-colors duration-[var(--transition-duration-base)]"
        >
          <Save class="h-4 w-4" />
          Save Contact
        </Button>
      </div>
    </form>

    <!-- Helper Card -->
    <Card class="max-w-4xl border border-[var(--primary)] bg-[var(--primary)]/5">
      <CardContent class="p-[var(--spacing-6)]">
        <h3 class="font-semibold text-[var(--primary)] mb-[var(--spacing-2)] text-[length:var(--font-size-sm)]">💡 What happens next?</h3>
        <ul class="text-[length:var(--font-size-sm)] text-[var(--primary)] flex flex-col gap-[var(--spacing-1)]">
          <li>• The contact will be added to your contacts directory</li>
          <li>• You can link this contact to events and companies</li>
          <li>• Contact information will be available when planning shows and tours</li>
        </ul>
      </CardContent>
    </Card>
  </div>
</template>
