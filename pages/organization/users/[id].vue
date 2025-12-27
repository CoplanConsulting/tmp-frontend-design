<script setup lang="ts">
import { ArrowLeft, Mail, Phone, User, Shield, Calendar, Edit } from 'lucide-vue-next'
import { getUserById } from '@/utils/mockData/users'
import type { UserRole, UserStatus } from '@/utils/mockData/types'

definePageMeta({
  layout: 'default'
})

// Get user ID from route
const route = useRoute()
const userId = route.params.id as string

// Get user data
const user = computed(() => getUserById(userId))

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
    <div v-if="!user" class="flex flex-col items-center justify-center py-12">
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
      <!-- Page Header -->
      <div class="space-y-1">
        <div class="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <NuxtLink to="/organization/users" class="flex items-center gap-1 hover:text-gray-700">
            <ArrowLeft class="h-4 w-4" />
            Back to Users
          </NuxtLink>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <Avatar class="h-16 w-16">
              <AvatarFallback class="bg-gray-200 text-gray-700 text-xl">
                {{ user.firstName.charAt(0) }}{{ user.lastName.charAt(0) }}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 class="text-3xl font-bold text-gray-900">{{ user.firstName }} {{ user.lastName }}</h1>
              <p class="text-sm text-gray-500">{{ user.title || 'No title specified' }}</p>
            </div>
          </div>
          <Button variant="outline" class="flex items-center gap-2">
            <Edit class="h-4 w-4" />
            Edit User
          </Button>
        </div>
      </div>

      <!-- User Info Card -->
      <div class="border border-gray-200 rounded-lg p-6 bg-white">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">User Information</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Email -->
          <div class="flex items-start gap-3">
            <div class="flex items-center justify-center w-10 h-10 rounded-md bg-gray-100">
              <Mail class="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p class="text-xs font-medium text-gray-500 uppercase mb-1">Email</p>
              <p class="text-sm text-gray-900">{{ user.email }}</p>
            </div>
          </div>

          <!-- Phone -->
          <div class="flex items-start gap-3">
            <div class="flex items-center justify-center w-10 h-10 rounded-md bg-gray-100">
              <Phone class="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p class="text-xs font-medium text-gray-500 uppercase mb-1">Phone</p>
              <p class="text-sm text-gray-900">{{ user.phone || '—' }}</p>
            </div>
          </div>

          <!-- Role -->
          <div class="flex items-start gap-3">
            <div class="flex items-center justify-center w-10 h-10 rounded-md bg-gray-100">
              <Shield class="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p class="text-xs font-medium text-gray-500 uppercase mb-1">Role</p>
              <Badge :variant="getRoleBadgeVariant(user.role)" class="font-normal">
                {{ formatRole(user.role) }}
              </Badge>
            </div>
          </div>

          <!-- Status -->
          <div class="flex items-start gap-3">
            <div class="flex items-center justify-center w-10 h-10 rounded-md bg-gray-100">
              <User class="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p class="text-xs font-medium text-gray-500 uppercase mb-1">Status</p>
              <Badge :variant="getStatusBadgeVariant(user.status)" class="font-normal">
                {{ formatStatus(user.status) }}
              </Badge>
            </div>
          </div>

          <!-- Created Date -->
          <div class="flex items-start gap-3">
            <div class="flex items-center justify-center w-10 h-10 rounded-md bg-gray-100">
              <Calendar class="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p class="text-xs font-medium text-gray-500 uppercase mb-1">Member Since</p>
              <p class="text-sm text-gray-900">{{ formatDate(user.createdAt) }}</p>
            </div>
          </div>

          <!-- Last Login -->
          <div v-if="user.lastLoginAt" class="flex items-start gap-3">
            <div class="flex items-center justify-center w-10 h-10 rounded-md bg-gray-100">
              <Calendar class="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p class="text-xs font-medium text-gray-500 uppercase mb-1">Last Login</p>
              <p class="text-sm text-gray-900">{{ formatDate(user.lastLoginAt) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Permissions Card (Placeholder) -->
      <div class="border border-gray-200 rounded-lg p-6 bg-white">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Permissions</h2>
        <p class="text-sm text-gray-500">
          User permissions are determined by their role: <strong>{{ formatRole(user.role) }}</strong>
        </p>
        <div class="mt-4 p-4 border border-gray-200 rounded-md bg-gray-50">
          <p class="text-xs text-gray-600">
            User group management and detailed permission settings will be implemented here.
          </p>
        </div>
      </div>

      <!-- Activity Card (Placeholder) -->
      <div class="border border-gray-200 rounded-lg p-6 bg-white">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div class="p-8 border border-gray-200 rounded-md bg-gray-50 text-center">
          <p class="text-sm text-gray-600">Activity log will be displayed here.</p>
        </div>
      </div>
    </template>
  </div>
</template>
