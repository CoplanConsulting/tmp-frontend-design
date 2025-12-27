<script setup lang="ts">
import { ArrowLeft, Save } from 'lucide-vue-next'

definePageMeta({
  layout: 'default'
})

// Form state
const groupName = ref('')
const description = ref('')

// Permissions state (organized by category)
const permissions = ref({
  tours: { view: false, edit: false, delete: false },
  events: { view: false, edit: false, delete: false },
  personnel: { view: false, edit: false, delete: false },
  guests: { view: false, edit: false, delete: false },
  venues: { view: false, edit: false, delete: false },
  settings: { view: false, edit: false },
})

// Permission categories for display
const permissionCategories = [
  {
    key: 'tours' as const,
    label: 'Tours',
    description: 'Manage tour schedules and information',
    actions: ['view', 'edit', 'delete'] as const
  },
  {
    key: 'events' as const,
    label: 'Events',
    description: 'Manage tour events and shows',
    actions: ['view', 'edit', 'delete'] as const
  },
  {
    key: 'personnel' as const,
    label: 'Personnel',
    description: 'Manage crew and staff members',
    actions: ['view', 'edit', 'delete'] as const
  },
  {
    key: 'guests' as const,
    label: 'Guests',
    description: 'Manage guest lists',
    actions: ['view', 'edit', 'delete'] as const
  },
  {
    key: 'venues' as const,
    label: 'Venues',
    description: 'Manage venue information',
    actions: ['view', 'edit', 'delete'] as const
  },
  {
    key: 'settings' as const,
    label: 'Settings',
    description: 'Manage organization settings',
    actions: ['view', 'edit'] as const
  }
]

// Format action label
const formatAction = (action: string): string => {
  return action.charAt(0).toUpperCase() + action.slice(1)
}

// Handle save (stub)
const handleSave = () => {
  console.log('Saving group:', {
    name: groupName.value,
    description: description.value,
    permissions: permissions.value
  })

  // TODO: Implement actual save logic
  alert('Save functionality coming soon!')
}

// Handle cancel
const handleCancel = () => {
  navigateTo('/organization/groups')
}
</script>

<template>
  <div class="flex flex-1 flex-col gap-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div class="space-y-1">
        <div class="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            as-child
            class="text-gray-600 hover:text-gray-900"
          >
            <NuxtLink to="/organization/groups" class="flex items-center gap-2">
              <ArrowLeft class="h-4 w-4" />
              Back
            </NuxtLink>
          </Button>
          <h1 class="text-3xl font-bold text-gray-900">Add User Group</h1>
        </div>
        <p class="text-sm text-gray-500">Create a new user group with custom permissions</p>
      </div>
      <div class="flex items-center gap-3">
        <Button variant="outline" @click="handleCancel">
          Cancel
        </Button>
        <Button variant="default" @click="handleSave" class="flex items-center gap-2">
          <Save class="h-4 w-4" />
          Save Group
        </Button>
      </div>
    </div>

    <!-- Form Container -->
    <div class="border border-gray-200 rounded-lg p-6 bg-white">
      <div class="space-y-6">
        <!-- Basic Information -->
        <div class="space-y-4">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
          </div>

          <!-- Group Name -->
          <div class="space-y-2">
            <Label for="groupName" class="text-sm font-medium text-gray-900">
              Group Name <span class="text-red-500">*</span>
            </Label>
            <Input
              id="groupName"
              v-model="groupName"
              placeholder="e.g., Production Team, Administrators"
              class="bg-white"
            />
            <p class="text-xs text-gray-500">Choose a descriptive name for this user group</p>
          </div>

          <!-- Description -->
          <div class="space-y-2">
            <Label for="description" class="text-sm font-medium text-gray-900">
              Description
            </Label>
            <Textarea
              id="description"
              v-model="description"
              placeholder="Describe the purpose and responsibilities of this group..."
              class="bg-white min-h-[100px]"
            />
            <p class="text-xs text-gray-500">Optional description to help identify the group's role</p>
          </div>
        </div>

        <!-- Divider -->
        <div class="border-t border-gray-200" />

        <!-- Permissions -->
        <div class="space-y-4">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-1">Permissions</h3>
            <p class="text-sm text-gray-500">Select what this group can access and modify</p>
          </div>

          <!-- Permission Categories -->
          <div class="space-y-4">
            <div
              v-for="category in permissionCategories"
              :key="category.key"
              class="border border-gray-200 rounded-lg p-4 bg-gray-50"
            >
              <div class="space-y-3">
                <!-- Category Header -->
                <div>
                  <h4 class="font-semibold text-gray-900">{{ category.label }}</h4>
                  <p class="text-xs text-gray-500">{{ category.description }}</p>
                </div>

                <!-- Permission Checkboxes -->
                <div class="flex flex-wrap gap-4">
                  <div
                    v-for="action in category.actions"
                    :key="`${category.key}-${action}`"
                    class="flex items-center gap-2"
                  >
                    <Checkbox
                      :id="`${category.key}-${action}`"
                      v-model:checked="(permissions[category.key] as any)[action]"
                    />
                    <Label
                      :for="`${category.key}-${action}`"
                      class="text-sm font-normal text-gray-700 cursor-pointer"
                    >
                      {{ formatAction(action) }}
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Action Buttons (Bottom) -->
    <div class="flex items-center justify-end gap-3 pb-6">
      <Button variant="outline" @click="handleCancel">
        Cancel
      </Button>
      <Button variant="default" @click="handleSave" class="flex items-center gap-2">
        <Save class="h-4 w-4" />
        Save Group
      </Button>
    </div>
  </div>
</template>
