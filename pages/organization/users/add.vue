<script setup lang="ts">
import { ArrowLeft, Send } from 'lucide-vue-next'

definePageMeta({
  layout: 'default'
})

// Form state
const form = ref({
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
  title: '',
  role: 'viewer',
})

// Handle form submission
const handleSubmit = () => {
  // TODO: Implement actual user creation via API
  console.log('Creating user with data:', form.value)

  // For now, just navigate back to users list
  navigateTo('/organization/users')
}
</script>

<template>
  <div class="flex flex-1 flex-col gap-6">
    <!-- Page Header -->
    <div class="space-y-1">
      <div class="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <NuxtLink to="/organization/users" class="flex items-center gap-1 hover:text-gray-700">
          <ArrowLeft class="h-4 w-4" />
          Back to Users
        </NuxtLink>
      </div>
      <h1 class="text-3xl font-bold text-gray-900">Add New User</h1>
      <p class="text-sm text-gray-500">Send an invitation to a new organization member</p>
    </div>

    <!-- Form Container -->
    <div class="border border-gray-200 rounded-lg p-6 bg-white max-w-2xl">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Email -->
        <div class="space-y-2">
          <Label for="email" class="text-sm font-medium text-gray-900">
            Email <span class="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="user@example.com"
            required
            class="bg-white"
          />
          <p class="text-xs text-gray-500">An invitation will be sent to this email address</p>
        </div>

        <!-- Name Row -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- First Name -->
          <div class="space-y-2">
            <Label for="firstName" class="text-sm font-medium text-gray-900">
              First Name <span class="text-red-500">*</span>
            </Label>
            <Input
              id="firstName"
              v-model="form.firstName"
              type="text"
              placeholder="John"
              required
              class="bg-white"
            />
          </div>

          <!-- Last Name -->
          <div class="space-y-2">
            <Label for="lastName" class="text-sm font-medium text-gray-900">
              Last Name <span class="text-red-500">*</span>
            </Label>
            <Input
              id="lastName"
              v-model="form.lastName"
              type="text"
              placeholder="Doe"
              required
              class="bg-white"
            />
          </div>
        </div>

        <!-- Phone -->
        <div class="space-y-2">
          <Label for="phone" class="text-sm font-medium text-gray-900">Phone</Label>
          <Input
            id="phone"
            v-model="form.phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            class="bg-white"
          />
        </div>

        <!-- Title -->
        <div class="space-y-2">
          <Label for="title" class="text-sm font-medium text-gray-900">Job Title</Label>
          <Input
            id="title"
            v-model="form.title"
            type="text"
            placeholder="Production Manager"
            class="bg-white"
          />
        </div>

        <!-- Role -->
        <div class="space-y-2">
          <Label for="role" class="text-sm font-medium text-gray-900">
            Role <span class="text-red-500">*</span>
          </Label>
          <Select v-model="form.role">
            <SelectTrigger id="role" class="bg-white">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent class="bg-white">
              <SelectItem value="admin">Admin - Full access to all features</SelectItem>
              <SelectItem value="manager">Manager - Can manage tours and events</SelectItem>
              <SelectItem value="editor">Editor - Can edit tour details</SelectItem>
              <SelectItem value="viewer">Viewer - Read-only access</SelectItem>
            </SelectContent>
          </Select>
          <p class="text-xs text-gray-500">Determines what the user can view and edit</p>
        </div>

        <!-- Divider -->
        <div class="border-t border-gray-200" />

        <!-- Submit Button -->
        <div class="flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            as-child
          >
            <NuxtLink to="/organization/users">
              Cancel
            </NuxtLink>
          </Button>
          <Button
            type="submit"
            variant="default"
            class="flex items-center gap-2"
          >
            <Send class="h-4 w-4" />
            Send Invitation
          </Button>
        </div>
      </form>
    </div>

    <!-- Info Card -->
    <div class="border border-blue-200 rounded-lg p-6 bg-blue-50 max-w-2xl">
      <h3 class="font-semibold text-blue-900 mb-2">What happens next?</h3>
      <ul class="text-sm text-blue-800 space-y-1.5 list-disc list-inside">
        <li>The user will receive an email invitation</li>
        <li>They can set their password and complete their profile</li>
        <li>Their account will be marked as "Pending" until they accept</li>
        <li>You can manage their permissions at any time from the Users page</li>
      </ul>
    </div>
  </div>
</template>
