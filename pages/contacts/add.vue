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
  <div class="flex-1 p-8 bg-gray-50">
    <!-- Page Header -->
    <div class="mb-6">
      <div class="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <NuxtLink to="/contacts" class="flex items-center gap-1 hover:text-gray-700 transition-colors">
          <ArrowLeft class="h-4 w-4" />
          Back to Contacts
        </NuxtLink>
      </div>
      <div class="flex items-center gap-3 mb-1">
        <div class="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100 border border-gray-200">
          <UserPlus class="h-6 w-6 text-gray-600" />
        </div>
        <h1 class="text-3xl font-bold text-gray-900">Add New Contact</h1>
      </div>
      <p class="text-sm text-gray-600 ml-[60px]">Add a promoter, venue manager, or industry professional to your network</p>
    </div>

    <!-- Form Container -->
    <form @submit.prevent="handleSubmit" class="max-w-4xl">
      <Card class="border border-gray-200 bg-white shadow-sm">
        <CardContent class="p-8">
          <div class="space-y-6">
            <!-- Name Row -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <Label for="firstName" class="text-sm font-semibold text-gray-900">
                  First Name <span class="text-red-500">*</span>
                </Label>
                <Input
                  id="firstName"
                  v-model="form.firstName"
                  type="text"
                  placeholder="John"
                  required
                  class="bg-white border-gray-300"
                />
              </div>

              <div class="space-y-2">
                <Label for="lastName" class="text-sm font-semibold text-gray-900">
                  Last Name <span class="text-red-500">*</span>
                </Label>
                <Input
                  id="lastName"
                  v-model="form.lastName"
                  type="text"
                  placeholder="Doe"
                  required
                  class="bg-white border-gray-300"
                />
              </div>
            </div>

            <!-- Title & Role Row -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <Label for="title" class="text-sm font-semibold text-gray-900">
                  Title
                </Label>
                <Input
                  id="title"
                  v-model="form.title"
                  type="text"
                  placeholder="Venue Manager"
                  class="bg-white border-gray-300"
                />
              </div>

              <div class="space-y-2">
                <Label for="role" class="text-sm font-semibold text-gray-900">
                  Role <span class="text-red-500">*</span>
                </Label>
                <Select v-model="form.role">
                  <SelectTrigger id="role" class="bg-white border-gray-300">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent class="bg-white">
                    <SelectItem value="Promoter">Promoter</SelectItem>
                    <SelectItem value="Venue Contact">Venue Contact</SelectItem>
                    <SelectItem value="Production Contact">Production Contact</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <!-- Divider -->
            <div class="border-t border-gray-200" />

            <!-- Company Section -->
            <div class="space-y-2">
              <Label for="company" class="text-sm font-semibold text-gray-900">
                Company
              </Label>
              <Input
                id="company"
                v-model="form.company"
                type="text"
                placeholder="Company name"
                class="bg-white border-gray-300"
              />
              <p class="text-xs text-gray-500">💡 In production: Search and link to existing companies</p>
            </div>

            <!-- Divider -->
            <div class="border-t border-gray-200" />

            <!-- Contact Information Section -->
            <div class="space-y-4">
              <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wide">Contact Information</h3>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Email -->
                <div class="space-y-2">
                  <Label for="email" class="text-sm font-medium text-gray-700">
                    Email
                  </Label>
                  <Input
                    id="email"
                    v-model="form.email"
                    type="email"
                    placeholder="john@example.com"
                    class="bg-white border-gray-300"
                  />
                </div>

                <!-- Phone -->
                <div class="space-y-2">
                  <Label for="phone" class="text-sm font-medium text-gray-700">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    v-model="form.phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    class="bg-white border-gray-300"
                  />
                </div>
              </div>
            </div>

            <!-- Divider -->
            <div class="border-t border-gray-200" />

            <!-- Notes Section -->
            <div class="space-y-2">
              <Label for="notes" class="text-sm font-semibold text-gray-900">
                Notes
              </Label>
              <Textarea
                id="notes"
                v-model="form.notes"
                placeholder="Add any additional notes about this contact..."
                rows="4"
                class="bg-white border-gray-300 resize-none"
              />
              <p class="text-xs text-gray-500">Internal notes visible only to your team</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Action Buttons -->
      <div class="flex items-center justify-between mt-6">
        <Button
          type="button"
          variant="outline"
          class="border-gray-300"
          @click="handleCancel"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          class="bg-black text-white hover:bg-gray-800 gap-2"
        >
          <Save class="h-4 w-4" />
          Save Contact
        </Button>
      </div>
    </form>

    <!-- Helper Card -->
    <Card class="mt-6 max-w-4xl border-blue-200 bg-blue-50">
      <CardContent class="p-6">
        <h3 class="font-semibold text-blue-900 mb-2 text-sm">💡 What happens next?</h3>
        <ul class="text-sm text-blue-800 space-y-1.5">
          <li>• The contact will be added to your contacts directory</li>
          <li>• You can link this contact to events and companies</li>
          <li>• Contact information will be available when planning shows and tours</li>
        </ul>
      </CardContent>
    </Card>
  </div>
</template>
