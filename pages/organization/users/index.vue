<script setup lang="ts">
import { Search, Users, UserPlus, Mail } from 'lucide-vue-next'
import { users, searchUsers } from '@/utils/mockData/users'
import type { UserRole, UserStatus } from '@/utils/mockData/types'

definePageMeta({
  layout: 'default'
})

// State
const searchQuery = ref('')
const selectedRole = ref<string>('all')
const selectedStatus = ref<string>('all')

// Get unique roles
const roles = computed(() => ['admin', 'manager', 'editor', 'viewer'])

// Get unique statuses
const statuses = computed(() => ['active', 'inactive', 'pending'])

// Filtered users
const filteredUsers = computed(() => {
  let result = users

  // Filter by search
  if (searchQuery.value.trim()) {
    result = searchUsers(searchQuery.value)
  }

  // Filter by role
  if (selectedRole.value !== 'all') {
    result = result.filter(user => user.role === selectedRole.value)
  }

  // Filter by status
  if (selectedStatus.value !== 'all') {
    result = result.filter(user => user.status === selectedStatus.value)
  }

  return result
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
</script>

<template>
  <div class="flex flex-1 flex-col gap-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div class="space-y-1">
        <h1 class="text-3xl font-bold text-gray-900">Users</h1>
        <p class="text-sm text-gray-500">Manage organization users and their permissions</p>
      </div>
      <Button as-child variant="default">
        <NuxtLink to="/organization/users/add" class="flex items-center gap-2">
          <UserPlus class="h-4 w-4" />
          Add User
        </NuxtLink>
      </Button>
    </div>

    <!-- Search and Filters Container -->
    <div class="border border-gray-200 rounded-lg p-6 bg-white">
      <div class="space-y-4">
        <!-- Search Input -->
        <div class="relative">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            v-model="searchQuery"
            placeholder="Search by name, email, or title..."
            class="pl-9 bg-white"
          />
        </div>

        <!-- Filters Row -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <!-- Role Filter -->
          <Select v-model="selectedRole">
            <SelectTrigger class="bg-white">
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent class="bg-white">
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem v-for="role in roles" :key="role" :value="role">
                {{ formatRole(role) }}
              </SelectItem>
            </SelectContent>
          </Select>

          <!-- Status Filter -->
          <Select v-model="selectedStatus">
            <SelectTrigger class="bg-white">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent class="bg-white">
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem v-for="status in statuses" :key="status" :value="status">
                {{ formatStatus(status) }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>

    <!-- Table Container -->
    <div class="border border-gray-200 rounded-lg overflow-hidden bg-white">
      <Table>
        <TableHeader>
          <TableRow class="bg-white border-b border-gray-200">
            <TableHead class="font-semibold">Name</TableHead>
            <TableHead class="font-semibold">Email</TableHead>
            <TableHead class="font-semibold">Title</TableHead>
            <TableHead class="font-semibold">Role</TableHead>
            <TableHead class="font-semibold">Status</TableHead>
            <TableHead class="text-right font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            v-if="filteredUsers.length === 0"
            class="hover:bg-transparent"
          >
            <TableCell colspan="6" class="h-32 text-center">
              <div class="flex flex-col items-center justify-center gap-2 text-gray-500">
                <Users class="h-8 w-8" />
                <p class="text-sm font-medium">No users found</p>
                <p class="text-xs">Try adjusting your search or filters</p>
              </div>
            </TableCell>
          </TableRow>
          <TableRow
            v-for="user in filteredUsers"
            :key="user.id"
            class="border-b border-gray-200 last:border-0 hover:bg-gray-50"
          >
            <TableCell class="font-medium">
              <div class="flex items-center gap-3">
                <Avatar class="h-9 w-9">
                  <AvatarFallback class="bg-gray-100 text-gray-700">
                    {{ user.firstName.charAt(0) }}{{ user.lastName.charAt(0) }}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div class="font-semibold text-gray-900">{{ user.firstName }} {{ user.lastName }}</div>
                  <div v-if="user.phone" class="text-xs text-gray-500">{{ user.phone }}</div>
                </div>
              </div>
            </TableCell>
            <TableCell class="text-gray-600">
              <div class="flex items-center gap-2">
                <Mail class="h-3.5 w-3.5 text-gray-400" />
                {{ user.email }}
              </div>
            </TableCell>
            <TableCell class="text-gray-900">
              {{ user.title || '—' }}
            </TableCell>
            <TableCell>
              <Badge :variant="getRoleBadgeVariant(user.role)" class="font-normal">
                {{ formatRole(user.role) }}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge :variant="getStatusBadgeVariant(user.status)" class="font-normal">
                {{ formatStatus(user.status) }}
              </Badge>
            </TableCell>
            <TableCell class="text-right">
              <Button
                variant="link"
                size="sm"
                as-child
                class="text-gray-900 hover:text-gray-700"
              >
                <NuxtLink :to="`/organization/users/${user.id}`">
                  View Details
                </NuxtLink>
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
