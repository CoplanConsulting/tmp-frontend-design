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
  <div class="flex-1 p-8 bg-gray-50">
    <!-- Page Header -->
    <div class="mb-6">
      <div class="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <NuxtLink to="/companies" class="flex items-center gap-1 hover:text-gray-700 transition-colors">
          <ArrowLeft class="h-4 w-4" />
          Back to Companies
        </NuxtLink>
      </div>
      <div class="flex items-center gap-3 mb-1">
        <div class="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100 border border-gray-200">
          <Building2 class="h-6 w-6 text-gray-600" />
        </div>
        <h1 class="text-3xl font-bold text-gray-900">Add New Company</h1>
      </div>
      <p class="text-sm text-gray-600 ml-[60px]">Add a promoter, venue, or production company to your network</p>
    </div>

    <!-- Form Container -->
    <form @submit.prevent="handleSubmit" class="max-w-4xl">
      <Card class="border border-gray-200 bg-white shadow-sm">
        <CardContent class="p-8">
          <div class="space-y-6">
            <!-- Company Name & Type Row -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="md:col-span-2 space-y-2">
                <Label for="name" class="text-sm font-semibold text-gray-900">
                  Company Name <span class="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  v-model="form.name"
                  type="text"
                  placeholder="Enter company name"
                  required
                  class="bg-white border-gray-300"
                />
              </div>

              <div class="space-y-2">
                <Label for="type" class="text-sm font-semibold text-gray-900">
                  Type <span class="text-red-500">*</span>
                </Label>
                <Select v-model="form.type">
                  <SelectTrigger id="type" class="bg-white border-gray-300">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent class="bg-white">
                    <SelectItem value="Promoter">Promoter</SelectItem>
                    <SelectItem value="Venue">Venue</SelectItem>
                    <SelectItem value="Production">Production</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <!-- Divider -->
            <div class="border-t border-gray-200" />

            <!-- Address Section -->
            <div class="space-y-4">
              <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wide">Location</h3>

              <!-- Street Address -->
              <div class="space-y-2">
                <Label for="address" class="text-sm font-medium text-gray-700">
                  Street Address
                </Label>
                <Input
                  id="address"
                  v-model="form.address"
                  type="text"
                  placeholder="123 Main St"
                  class="bg-white border-gray-300"
                />
              </div>

              <!-- City, State, Postal Code -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="md:col-span-1 space-y-2">
                  <Label for="city" class="text-sm font-medium text-gray-700">
                    City
                  </Label>
                  <Input
                    id="city"
                    v-model="form.city"
                    type="text"
                    placeholder="Los Angeles"
                    class="bg-white border-gray-300"
                  />
                </div>

                <div class="space-y-2">
                  <Label for="state" class="text-sm font-medium text-gray-700">
                    State
                  </Label>
                  <Input
                    id="state"
                    v-model="form.state"
                    type="text"
                    placeholder="CA"
                    maxlength="2"
                    class="bg-white border-gray-300"
                  />
                </div>

                <div class="space-y-2">
                  <Label for="postalCode" class="text-sm font-medium text-gray-700">
                    Postal Code
                  </Label>
                  <Input
                    id="postalCode"
                    v-model="form.postalCode"
                    type="text"
                    placeholder="90001"
                    class="bg-white border-gray-300"
                  />
                </div>
              </div>
            </div>

            <!-- Divider -->
            <div class="border-t border-gray-200" />

            <!-- Contact Information Section -->
            <div class="space-y-4">
              <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wide">Contact Information</h3>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Main Phone -->
                <div class="space-y-2">
                  <Label for="mainPhone" class="text-sm font-medium text-gray-700">
                    Main Phone
                  </Label>
                  <Input
                    id="mainPhone"
                    v-model="form.mainPhone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    class="bg-white border-gray-300"
                  />
                </div>

                <!-- Website -->
                <div class="space-y-2">
                  <Label for="website" class="text-sm font-medium text-gray-700">
                    Website
                  </Label>
                  <Input
                    id="website"
                    v-model="form.website"
                    type="url"
                    placeholder="https://example.com"
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
                placeholder="Add any additional notes or details about this company..."
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
          Save Company
        </Button>
      </div>
    </form>

    <!-- Helper Card -->
    <Card class="mt-6 max-w-4xl border-blue-200 bg-blue-50">
      <CardContent class="p-6">
        <h3 class="font-semibold text-blue-900 mb-2 text-sm">💡 What happens next?</h3>
        <ul class="text-sm text-blue-800 space-y-1.5">
          <li>• The company will be added to your network directory</li>
          <li>• You can add individual contacts for this company from the Contacts page</li>
          <li>• Link this company to events when creating or editing show details</li>
        </ul>
      </CardContent>
    </Card>
  </div>
</template>
