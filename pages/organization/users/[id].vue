<script setup lang="ts">
import { ArrowLeft, User, Shield, Calendar, Edit } from 'lucide-vue-next'
import { getUserById } from '@/utils/mockData/users'
import type { UserRole, UserStatus } from '@/utils/mockData/types'
import BasicIdentitySection from '@/components/person/sections/BasicIdentitySection.vue'
import ContactInfoSection from '@/components/person/sections/ContactInfoSection.vue'

definePageMeta({
  layout: 'default'
})

// Get user ID from route
const route = useRoute()
const userId = route.params.id as string

// Get user data
const user = computed(() => getUserById(userId))

// Convert User to Person format for PersonDetailLayout
const userAsPerson = computed(() => {
  if (!user.value) return null

  return {
    id: user.value.id,
    email: user.value.email,
    firstName: user.value.firstName,
    lastName: user.value.lastName,
    phone: user.value.phone,
    role: user.value.role,
    department: 'Organization',
    tourIds: [] as string[],
    createdAt: new Date(user.value.createdAt),
    updatedAt: new Date(user.value.createdAt),
  }
})

// Get role badge variant
const getRoleBadgeVariant = (role: UserRole): 'default' | 'outline' | 'secondary' | 'destructive' => {
  if (role === 'admin') return 'destructive'
  if (role === 'manager') return 'default'
  if (role === 'editor') return 'secondary'
  return 'outline'
}

// Get status badge variant
const getStatusBadgeVariant = (status: UserStatus): 'default' | 'outline' | 'secondary' => {
  if (status === 'active') return 'secondary'
  if (status === 'pending') return 'outline'
  return 'default'
}

// Format status for display
const formatStatus = (status: string): string => {
  return status.charAt(0).toUpperCase() + status.slice(1)
}

// Format role for display
const formatRole = (role: string): string => {
  return role.charAt(0).toUpperCase() + role.slice(1)
}

// Format date
const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
</script>

<template>
  <div class="flex flex-1 flex-col gap-6">
    <!-- 404 State -->
    <div v-if="!user || !userAsPerson" class="flex flex-col items-center justify-center py-12">
      <User class="h-12 w-12 text-gray-400 mb-4" />
      <h2 class="text-xl font-bold text-gray-900 mb-2">User Not Found</h2>
      <p class="text-sm text-gray-500 mb-6">The user you're looking for doesn't exist.</p>
      <Button as-child variant="default">
        <NuxtLink to="/organization/users">
          <ArrowLeft class="h-4 w-4 mr-2" />
          Back to Users
        </NuxtLink>
      </Button>
    </div>

    <!-- User Details -->
    <template v-else>
      <!-- Page Header with Edit Button -->
      <div class="space-y-1">
        <div class="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <NuxtLink to="/organization/users" class="flex items-center gap-1 hover:text-gray-700">
            <ArrowLeft class="h-4 w-4" />
            Back to Users
          </NuxtLink>
        </div>
        <div class="flex items-center justify-between">
          <BasicIdentitySection :person="userAsPerson" :editable="false" />
          <Button variant="outline" class="flex items-center gap-2">
            <Edit class="h-4 w-4" />
            Edit User
          </Button>
        </div>
      </div>

      <!-- Contact Info -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ContactInfoSection :person="userAsPerson" :editable="false" />

        <!-- Organization Role & Status Card -->
        <Card class="border border-gray-200 bg-white">
          <CardHeader class="pb-3">
            <div class="flex items-center gap-2">
              <Shield class="h-5 w-5 text-gray-600" />
              <CardTitle class="text-base font-bold text-gray-900">Organization Role</CardTitle>
            </div>
          </CardHeader>
          <CardContent class="space-y-3">
            <div>
              <p class="text-xs font-semibold text-gray-500 uppercase">Role</p>
              <Badge :variant="getRoleBadgeVariant(user.role)" class="mt-1">
                {{ formatRole(user.role) }}
              </Badge>
            </div>
            <Separator class="bg-slate-200" />
            <div>
              <p class="text-xs font-semibold text-gray-500 uppercase">Status</p>
              <Badge :variant="getStatusBadgeVariant(user.status)" class="mt-1">
                {{ formatStatus(user.status) }}
              </Badge>
            </div>
            <Separator v-if="user.title" class="bg-slate-200" />
            <div v-if="user.title">
              <p class="text-xs font-semibold text-gray-500 uppercase">Title</p>
              <p class="text-sm text-gray-900 mt-1">{{ user.title }}</p>
            </div>
          </CardContent>
        </Card>

        <!-- Account Dates Card -->
        <Card class="border border-gray-200 bg-white">
          <CardHeader class="pb-3">
            <div class="flex items-center gap-2">
              <Calendar class="h-5 w-5 text-gray-600" />
              <CardTitle class="text-base font-bold text-gray-900">Account Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent class="space-y-3">
            <div>
              <p class="text-xs font-semibold text-gray-500 uppercase">Member Since</p>
              <p class="text-sm text-gray-900 mt-1">{{ formatDate(user.createdAt) }}</p>
            </div>
            <Separator v-if="user.lastLoginAt" class="bg-slate-200" />
            <div v-if="user.lastLoginAt">
              <p class="text-xs font-semibold text-gray-500 uppercase">Last Login</p>
              <p class="text-sm text-gray-900 mt-1">{{ formatDate(user.lastLoginAt) }}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Permissions Card (Placeholder) -->
      <Card class="border border-gray-200 bg-white">
        <CardHeader class="pb-3">
          <CardTitle class="text-lg font-semibold text-gray-900">Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <p class="text-sm text-gray-500">
            User permissions are determined by their role: <strong>{{ formatRole(user.role) }}</strong>
          </p>
          <div class="mt-4 p-4 border border-gray-200 rounded-md bg-gray-50">
            <p class="text-xs text-gray-600">
              User group management and detailed permission settings will be implemented here.
            </p>
          </div>
        </CardContent>
      </Card>

      <!-- Activity Card (Placeholder) -->
      <Card class="border border-gray-200 bg-white">
        <CardHeader class="pb-3">
          <CardTitle class="text-lg font-semibold text-gray-900">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="p-8 border border-gray-200 rounded-md bg-gray-50 text-center">
            <p class="text-sm text-gray-600">Activity log will be displayed here.</p>
          </div>
        </CardContent>
      </Card>
    </template>
  </div>
</template>
