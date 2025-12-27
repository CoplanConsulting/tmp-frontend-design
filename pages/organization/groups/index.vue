<script setup lang="ts">
import { Search, Users, UserPlus } from 'lucide-vue-next'
import { userGroups, searchUserGroups, getUserGroupsByOrganizationId } from '@/utils/mockData/userGroups'
import type { UserGroup } from '@/utils/mockData/types'

definePageMeta({
  layout: 'default'
})

// State
const searchQuery = ref('')
const selectedPermissionLevel = ref<string>('all')

// For now, filtering by current organization (org-1)
const currentOrgId = 'org-1'

// Permission levels for filtering (based on analysis of group types)
const permissionLevels = computed(() => ['full-access', 'manager', 'editor', 'viewer'])

// Get groups for current organization
const orgGroups = computed(() => getUserGroupsByOrganizationId(currentOrgId))

// Filtered groups
const filteredGroups = computed(() => {
  let result = orgGroups.value

  // Filter by search
  if (searchQuery.value.trim()) {
    result = searchUserGroups(searchQuery.value).filter(g => g.organizationId === currentOrgId)
  }

  // Filter by permission level (simplified categorization)
  if (selectedPermissionLevel.value !== 'all') {
    result = result.filter(group => {
      const level = getPermissionLevel(group)
      return level === selectedPermissionLevel.value
    })
  }

  return result
})

// Determine permission level from group permissions
const getPermissionLevel = (group: UserGroup): string => {
  const perms = group.permissions

  // Full access - can delete and edit settings
  if (perms.tours.delete && perms.settings.edit) return 'full-access'

  // Manager - can edit most things but not delete
  if (perms.tours.edit && perms.events.edit && !perms.tours.delete) return 'manager'

  // Editor - can edit some things
  if (perms.events.edit || perms.guests.edit) return 'editor'

  // Viewer - read-only
  return 'viewer'
}

// Get permission level badge variant
const getPermissionBadgeVariant = (level: string): 'default' | 'outline' | 'secondary' | 'destructive' => {
  if (level === 'full-access') return 'destructive'
  if (level === 'manager') return 'default'
  if (level === 'editor') return 'secondary'
  return 'outline'
}

// Format permission level for display
const formatPermissionLevel = (level: string): string => {
  return level.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

// Get primary permissions as badges (show main edit permissions)
const getPrimaryPermissions = (group: UserGroup): string[] => {
  const perms: string[] = []
  const p = group.permissions

  if (p.tours.edit) perms.push('Tours')
  if (p.events.edit) perms.push('Events')
  if (p.personnel.edit) perms.push('Personnel')
  if (p.guests.edit) perms.push('Guests')
  if (p.venues.edit) perms.push('Venues')
  if (p.settings.edit) perms.push('Settings')

  return perms
}
</script>

<template>
  <div class="flex flex-1 flex-col gap-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div class="space-y-1">
        <h1 class="text-3xl font-bold text-gray-900">User Groups</h1>
        <p class="text-sm text-gray-500">Manage user groups and permissions</p>
      </div>
      <Button as-child variant="default">
        <NuxtLink to="/organization/groups/add" class="flex items-center gap-2">
          <UserPlus class="h-4 w-4" />
          Add Group
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
            placeholder="Search by group name or description..."
            class="pl-9 bg-white"
          />
        </div>

        <!-- Filters Row -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <!-- Permission Level Filter -->
          <Select v-model="selectedPermissionLevel">
            <SelectTrigger class="bg-white">
              <SelectValue placeholder="All Permission Levels" />
            </SelectTrigger>
            <SelectContent class="bg-white">
              <SelectItem value="all">All Permission Levels</SelectItem>
              <SelectItem v-for="level in permissionLevels" :key="level" :value="level">
                {{ formatPermissionLevel(level) }}
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
            <TableHead class="font-semibold">Group Name</TableHead>
            <TableHead class="font-semibold">Description</TableHead>
            <TableHead class="font-semibold">Members</TableHead>
            <TableHead class="font-semibold">Permissions</TableHead>
            <TableHead class="text-right font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            v-if="filteredGroups.length === 0"
            class="hover:bg-transparent"
          >
            <TableCell colspan="5" class="h-32 text-center">
              <div class="flex flex-col items-center justify-center gap-2 text-gray-500">
                <Users class="h-8 w-8" />
                <p class="text-sm font-medium">No groups found</p>
                <p class="text-xs">Try adjusting your search or filters</p>
              </div>
            </TableCell>
          </TableRow>
          <TableRow
            v-for="group in filteredGroups"
            :key="group.id"
            class="border-b border-gray-200 last:border-0 hover:bg-gray-50"
          >
            <TableCell class="font-medium">
              <div class="flex items-center gap-3">
                <div class="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
                  <Users class="h-4 w-4 text-gray-700" />
                </div>
                <div>
                  <div class="font-semibold text-gray-900">{{ group.name }}</div>
                  <Badge :variant="getPermissionBadgeVariant(getPermissionLevel(group))" class="mt-1 font-normal text-xs">
                    {{ formatPermissionLevel(getPermissionLevel(group)) }}
                  </Badge>
                </div>
              </div>
            </TableCell>
            <TableCell class="text-gray-600 max-w-sm">
              {{ group.description || '—' }}
            </TableCell>
            <TableCell>
              <Badge variant="secondary" class="font-normal">
                {{ group.userCount || 0 }} {{ group.userCount === 1 ? 'member' : 'members' }}
              </Badge>
            </TableCell>
            <TableCell>
              <div class="flex flex-wrap gap-1">
                <Badge
                  v-for="perm in getPrimaryPermissions(group).slice(0, 3)"
                  :key="perm"
                  variant="outline"
                  class="font-normal text-xs"
                >
                  {{ perm }}
                </Badge>
                <Badge
                  v-if="getPrimaryPermissions(group).length > 3"
                  variant="outline"
                  class="font-normal text-xs"
                >
                  +{{ getPrimaryPermissions(group).length - 3 }}
                </Badge>
              </div>
            </TableCell>
            <TableCell class="text-right">
              <Button
                variant="link"
                size="sm"
                as-child
                class="text-gray-900 hover:text-gray-700"
              >
                <NuxtLink :to="`/organization/groups/${group.id}`">
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
