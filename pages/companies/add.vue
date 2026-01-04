<script setup lang="ts">
import { ArrowLeft, Building2, Save } from 'lucide-vue-next'

definePageMeta({
  layout: 'default'
})

// Form state
const form = ref({
  name: '',
  type: 'Promoter',
  address: '',
  city: '',
  state: '',
  postalCode: '',
  mainPhone: '',
  website: '',
  notes: ''
})

// Handle form submission
const handleSubmit = () => {
  console.log('Creating company with data:', form.value)
  navigateTo('/companies')
}

// Handle cancel
const handleCancel = () => {
  navigateTo('/companies')
}
</script>

<template>
  <div class="flex-1 p-[var(--spacing-8)] bg-[var(--background)]">
    <!-- Page Header -->
    <div class="mb-[var(--spacing-6)]">
      <div class="flex items-center gap-[var(--spacing-2)] text-[var(--font-size-sm)] text-[var(--muted-foreground)] mb-[var(--spacing-2)]">
        <NuxtLink
          to="/companies"
          class="flex items-center gap-[var(--spacing-1)] hover:text-[var(--foreground)] transition-colors duration-[var(--transition-duration-fast)]"
        >
          <ArrowLeft class="h-4 w-4" />
          Back to Companies
        </NuxtLink>
      </div>
      <div class="flex items-center gap-[var(--spacing-3)] mb-[var(--spacing-1)]">
        <div class="flex items-center justify-center w-12 h-12 rounded-[var(--radius-lg)] bg-[var(--muted)] border border-[var(--border)]">
          <Building2 class="h-6 w-6 text-[var(--muted-foreground)]" />
        </div>
        <h1 class="text-[var(--font-size-3xl)] font-bold text-[var(--foreground)]">Add New Company</h1>
      </div>
      <p class="text-[var(--font-size-sm)] text-[var(--muted-foreground)] ml-[60px]">Add a promoter, venue, or production company to your network</p>
    </div>

    <!-- Form Container -->
    <form @submit.prevent="handleSubmit" class="max-w-4xl">
      <Card class="border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow-sm)]">
        <CardContent class="p-[var(--spacing-8)]">
          <div class="space-y-[var(--spacing-6)]">
            <!-- Company Name & Type Row -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-[var(--spacing-6)]">
              <div class="md:col-span-2 space-y-[var(--spacing-2)]">
                <Label for="name" class="text-[var(--font-size-sm)] font-semibold text-[var(--foreground)]">
                  Company Name <span class="text-[var(--color-destructive)]">*</span>
                </Label>
                <Input
                  id="name"
                  v-model="form.name"
                  type="text"
                  placeholder="Enter company name"
                  required
                  class="bg-[var(--card)] border-[var(--border)]"
                />
              </div>

              <div class="space-y-[var(--spacing-2)]">
                <Label for="type" class="text-[var(--font-size-sm)] font-semibold text-[var(--foreground)]">
                  Type <span class="text-[var(--color-destructive)]">*</span>
                </Label>
                <Select v-model="form.type">
                  <SelectTrigger id="type" class="bg-[var(--card)] border-[var(--border)]">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent class="bg-[var(--card)]">
                    <SelectItem value="Promoter">Promoter</SelectItem>
                    <SelectItem value="Venue">Venue</SelectItem>
                    <SelectItem value="Production">Production</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <!-- Divider -->
            <div class="border-t border-[var(--border)]" />

            <!-- Address Section -->
            <div class="space-y-[var(--spacing-4)]">
              <h3 class="text-[var(--font-size-sm)] font-semibold text-[var(--foreground)] uppercase tracking-wide">Location</h3>

              <!-- Street Address -->
              <div class="space-y-[var(--spacing-2)]">
                <Label for="address" class="text-[var(--font-size-sm)] font-medium text-[var(--muted-foreground)]">
                  Street Address
                </Label>
                <Input
                  id="address"
                  v-model="form.address"
                  type="text"
                  placeholder="123 Main St"
                  class="bg-[var(--card)] border-[var(--border)]"
                />
              </div>

              <!-- City, State, Postal Code -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-[var(--spacing-4)]">
                <div class="md:col-span-1 space-y-[var(--spacing-2)]">
                  <Label for="city" class="text-[var(--font-size-sm)] font-medium text-[var(--muted-foreground)]">
                    City
                  </Label>
                  <Input
                    id="city"
                    v-model="form.city"
                    type="text"
                    placeholder="Los Angeles"
                    class="bg-[var(--card)] border-[var(--border)]"
                  />
                </div>

                <div class="space-y-[var(--spacing-2)]">
                  <Label for="state" class="text-[var(--font-size-sm)] font-medium text-[var(--muted-foreground)]">
                    State
                  </Label>
                  <Input
                    id="state"
                    v-model="form.state"
                    type="text"
                    placeholder="CA"
                    maxlength="2"
                    class="bg-[var(--card)] border-[var(--border)]"
                  />
                </div>

                <div class="space-y-[var(--spacing-2)]">
                  <Label for="postalCode" class="text-[var(--font-size-sm)] font-medium text-[var(--muted-foreground)]">
                    Postal Code
                  </Label>
                  <Input
                    id="postalCode"
                    v-model="form.postalCode"
                    type="text"
                    placeholder="90001"
                    class="bg-[var(--card)] border-[var(--border)]"
                  />
                </div>
              </div>
            </div>

            <!-- Divider -->
            <div class="border-t border-[var(--border)]" />

            <!-- Contact Information Section -->
            <div class="space-y-[var(--spacing-4)]">
              <h3 class="text-[var(--font-size-sm)] font-semibold text-[var(--foreground)] uppercase tracking-wide">Contact Information</h3>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-[var(--spacing-4)]">
                <!-- Main Phone -->
                <div class="space-y-[var(--spacing-2)]">
                  <Label for="mainPhone" class="text-[var(--font-size-sm)] font-medium text-[var(--muted-foreground)]">
                    Main Phone
                  </Label>
                  <Input
                    id="mainPhone"
                    v-model="form.mainPhone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    class="bg-[var(--card)] border-[var(--border)]"
                  />
                </div>

                <!-- Website -->
                <div class="space-y-[var(--spacing-2)]">
                  <Label for="website" class="text-[var(--font-size-sm)] font-medium text-[var(--muted-foreground)]">
                    Website
                  </Label>
                  <Input
                    id="website"
                    v-model="form.website"
                    type="url"
                    placeholder="https://example.com"
                    class="bg-[var(--card)] border-[var(--border)]"
                  />
                </div>
              </div>
            </div>

            <!-- Divider -->
            <div class="border-t border-[var(--border)]" />

            <!-- Notes Section -->
            <div class="space-y-[var(--spacing-2)]">
              <Label for="notes" class="text-[var(--font-size-sm)] font-semibold text-[var(--foreground)]">
                Notes
              </Label>
              <Textarea
                id="notes"
                v-model="form.notes"
                placeholder="Add any additional notes or details about this company..."
                rows="4"
                class="bg-[var(--card)] border-[var(--border)] resize-none"
              />
              <p class="text-[var(--font-size-xs)] text-[var(--muted-foreground)]">Internal notes visible only to your team</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Action Buttons -->
      <div class="flex items-center justify-between mt-[var(--spacing-6)]">
        <Button
          type="button"
          variant="outline"
          class="border-[var(--border)] transition-colors duration-[var(--transition-duration-base)]"
          @click="handleCancel"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          class="bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--foreground)]/90 gap-[var(--spacing-2)] transition-colors duration-[var(--transition-duration-base)]"
        >
          <Save class="h-4 w-4" />
          Save Company
        </Button>
      </div>
    </form>

    <!-- Helper Card -->
    <Card class="mt-[var(--spacing-6)] max-w-4xl border-[var(--accent)] bg-[var(--accent)]/5">
      <CardContent class="p-[var(--spacing-6)]">
        <h3 class="font-semibold text-[var(--foreground)] mb-[var(--spacing-2)] text-[var(--font-size-sm)]">💡 What happens next?</h3>
        <ul class="text-[var(--font-size-sm)] text-[var(--muted-foreground)] space-y-[calc(var(--spacing-1)*1.5)]">
          <li>• The company will be added to your network directory</li>
          <li>• You can add individual contacts for this company from the Contacts page</li>
          <li>• Link this company to events when creating or editing show details</li>
        </ul>
      </CardContent>
    </Card>
  </div>
</template>
