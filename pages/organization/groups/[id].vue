<script setup lang="ts">
import { ArrowLeft, Users, UserPlus, Mail, Trash2, Shield, Edit } from 'lucide-vue-next'
import { getUserGroupById } from '@/utils/mockData/userGroups'
import { users } from '@/utils/mockData/users'
import type { UserGroup, User } from '@/utils/mockData/types'

definePageMeta({
  layout: 'default'
})

// Get group ID from route
const route = useRoute()
const groupId = route.params.id as string

// Get group data
const group = computed<UserGroup | undefined>(() => getUserGroupById(groupId))

// Get members of this group
const groupMembers = computed<User[]>(() => {
  if (!group.value) return []
  return users.filter(user => user.userGroupIds?.includes(groupId))
})

// Get available users (not in this group)
const availableUsers = computed<User[]>(() => {
  if (!group.value) return []
  const currentOrgId = group.value.organizationId
  return users.filter(user => !user.userGroupIds?.includes(groupId) && user.organizationId === currentOrgId)
})

// State for add member dialog
const showAddMemberDialog = ref(false)
const searchMemberQuery = ref('')

// Filtered available users for search
const filteredAvailableUsers = computed(() => {
  if (!searchMemberQuery.value.trim()) return availableUsers.value

  const query = searchMemberQuery.value.toLowerCase()
  return availableUsers.value.filter(user => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase()
    const email = user.email.toLowerCase()
    return fullName.includes(query) || email.includes(query)
  })
})

// Get permission summary
const getPermissionSummary = (group: UserGroup | undefined) => {
  if (!group) return []

  const perms = group.permissions
  const summary: { category: string; permissions: string[] }[] = []

  Object.entries(perms).forEach(([category, actions]) => {
    const allowedActions: string[] = []
    Object.entries(actions).forEach(([action, allowed]) => {
      if (allowed) {
        allowedActions.push(action.charAt(0).toUpperCase() + action.slice(1))
      }
    })

    if (allowedActions.length > 0) {
      summary.push({
        category: category.charAt(0).toUpperCase() + category.slice(1),
        permissions: allowedActions
      })
    }
  })

  return summary
}

// Computed permission summary for the current group
const permissionSummary = computed(() => getPermissionSummary(group.value))

// Handle remove member (stub)
const handleRemoveMember = (userId: string) => {
  const user = users.find(u => u.id === userId)
  if (user) {
    console.log('Removing user from group:', user.firstName, user.lastName)
    // TODO: Implement actual remove logic
    alert(`Remove functionality coming soon for ${user.firstName} ${user.lastName}`)
  }
}

// Handle add member (stub)
const handleAddMember = (userId: string) => {
  const user = users.find(u => u.id === userId)
  if (user) {
    console.log('Adding user to group:', user.firstName, user.lastName)
    // TODO: Implement actual add logic
    alert(`Add functionality coming soon for ${user.firstName} ${user.lastName}`)
    showAddMemberDialog.value = false
    searchMemberQuery.value = ''
  }
}

// Format role for display
const formatRole = (role: string): string => {
  return role.charAt(0).toUpperCase() + role.slice(1)
}

// Redirect if group not found
watchEffect(() => {
  if (!group.value && groupId) {
    navigateTo('/organization/groups')
  }
})
</script>

<template>
  <div v-if="group" class="flex flex-1 flex-col gap-6">
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
          <h1 class="text-3xl font-bold text-gray-900">{{ group.name }}</h1>
        </div>
        <p class="text-sm text-gray-500">{{ group.description || 'No description provided' }}</p>
      </div>
      <Button variant="outline" as-child class="flex items-center gap-2">
        <NuxtLink :to="`/organization/groups/${groupId}/edit`">
          <Edit class="h-4 w-4" />
          Edit Group
        </NuxtLink>
      </Button>
    </div>

    <!-- Group Info Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Members Count -->
      <div class="border border-gray-200 rounded-lg p-6 bg-white">
        <div class="flex items-center gap-3">
          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <Users class="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p class="text-sm text-gray-500">Total Members</p>
            <p class="text-2xl font-bold text-gray-900">{{ groupMembers.length }}</p>
          </div>
        </div>
      </div>

      <!-- Permission Count -->
      <div class="border border-gray-200 rounded-lg p-6 bg-white">
        <div class="flex items-center gap-3">
          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
            <Shield class="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p class="text-sm text-gray-500">Active Permissions</p>
            <p class="text-2xl font-bold text-gray-900">{{ permissionSummary.length }}</p>
          </div>
        </div>
      </div>

      <!-- Created Date -->
      <div class="border border-gray-200 rounded-lg p-6 bg-white">
        <div class="flex items-center gap-3">
          <div>
            <p class="text-sm text-gray-500">Created</p>
            <p class="text-lg font-semibold text-gray-900">
              {{ new Date(group.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Permissions Section -->
    <div class="border border-gray-200 rounded-lg p-6 bg-white">
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-900">Permissions</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="category in permissionSummary"
            :key="category.category"
            class="border border-gray-200 rounded-lg p-4 bg-gray-50"
          >
            <h4 class="font-semibold text-gray-900 mb-2">{{ category.category }}</h4>
            <div class="flex flex-wrap gap-1.5">
              <Badge
                v-for="perm in category.permissions"
                :key="perm"
                variant="secondary"
                class="font-normal text-xs"
              >
                {{ perm }}
              </Badge>
            </div>
          </div>
        </div>

        <div v-if="permissionSummary.length === 0" class="text-center py-8">
          <p class="text-sm text-gray-500">No permissions assigned to this group</p>
        </div>
      </div>
    </div>

    <!-- Members Section -->
    <div class="border border-gray-200 rounded-lg overflow-hidden bg-white">
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <div>
          <h3 class="text-lg font-semibold text-gray-900">Members</h3>
          <p class="text-sm text-gray-500">{{ groupMembers.length }} {{ groupMembers.length === 1 ? 'member' : 'members' }} in this group</p>
        </div>
        <Button variant="default" @click="showAddMemberDialog = true" class="flex items-center gap-2">
          <UserPlus class="h-4 w-4" />
          Add Member
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow class="bg-white border-b border-gray-200">
            <TableHead class="font-semibold">Name</TableHead>
            <TableHead class="font-semibold">Email</TableHead>
            <TableHead class="font-semibold">Title</TableHead>
            <TableHead class="font-semibold">Role</TableHead>
            <TableHead class="text-right font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            v-if="groupMembers.length === 0"
            class="hover:bg-transparent"
          >
            <TableCell colspan="5" class="h-32 text-center">
              <div class="flex flex-col items-center justify-center gap-2 text-gray-500">
                <Users class="h-8 w-8" />
                <p class="text-sm font-medium">No members yet</p>
                <p class="text-xs">Add members to this group to get started</p>
              </div>
            </TableCell>
          </TableRow>
          <TableRow
            v-for="member in groupMembers"
            :key="member.id"
            class="border-b border-gray-200 last:border-0 hover:bg-gray-50"
          >
            <TableCell class="font-medium">
              <div class="flex items-center gap-3">
                <Avatar class="h-9 w-9">
                  <AvatarFallback class="bg-gray-100 text-gray-700">
                    {{ member.firstName.charAt(0) }}{{ member.lastName.charAt(0) }}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div class="font-semibold text-gray-900">{{ member.firstName }} {{ member.lastName }}</div>
                  <div v-if="member.phone" class="text-xs text-gray-500">{{ member.phone }}</div>
                </div>
              </div>
            </TableCell>
            <TableCell class="text-gray-600">
              <div class="flex items-center gap-2">
                <Mail class="h-3.5 w-3.5 text-gray-400" />
                {{ member.email }}
              </div>
            </TableCell>
            <TableCell class="text-gray-900">
              {{ member.title || '—' }}
            </TableCell>
            <TableCell>
              <Badge variant="secondary" class="font-normal">
                {{ formatRole(member.role) }}
              </Badge>
            </TableCell>
            <TableCell class="text-right">
              <Button
                variant="ghost"
                size="sm"
                @click="handleRemoveMember(member.id)"
                class="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 class="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <!-- Add Member Dialog -->
    <Dialog v-model:open="showAddMemberDialog">
      <DialogContent class="bg-white max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Member to {{ group.name }}</DialogTitle>
          <DialogDescription>
            Search and select users to add to this group
          </DialogDescription>
        </DialogHeader>

        <div class="space-y-4 py-4">
          <!-- Search Input -->
          <div class="relative">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              v-model="searchMemberQuery"
              placeholder="Search by name or email..."
              class="pl-9 bg-white"
            />
          </div>

          <!-- Available Users List -->
          <div class="border border-gray-200 rounded-lg max-h-96 overflow-y-auto">
            <div v-if="filteredAvailableUsers.length === 0" class="p-8 text-center">
              <Users class="h-8 w-8 mx-auto text-gray-400" />
              <p class="mt-2 text-sm text-gray-500">No available users found</p>
            </div>
            <div
              v-for="user in filteredAvailableUsers"
              :key="user.id"
              class="flex items-center justify-between p-4 border-b border-gray-200 last:border-0 hover:bg-gray-50"
            >
              <div class="flex items-center gap-3">
                <Avatar class="h-9 w-9">
                  <AvatarFallback class="bg-gray-100 text-gray-700">
                    {{ user.firstName.charAt(0) }}{{ user.lastName.charAt(0) }}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div class="font-semibold text-gray-900">{{ user.firstName }} {{ user.lastName }}</div>
                  <div class="text-xs text-gray-500">{{ user.email }}</div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                @click="handleAddMember(user.id)"
                class="flex items-center gap-2"
              >
                <UserPlus class="h-3.5 w-3.5" />
                Add
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" @click="showAddMemberDialog = false">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
