<script setup lang="ts">
import { MoreVertical } from 'lucide-vue-next'
import type { Guest } from '~/utils/mockData'

defineProps<{
  guests: Guest[]
}>()

const route = useRoute()
const router = useRouter()
const eventId = route.params.id

const getStatusClass = (status: string) => {
  const classes = {
    'approved': 'bg-green-100 text-green-800 border-green-200',
    'pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'declined': 'bg-red-100 text-red-800 border-red-200'
  }
  return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-800 border-gray-200'
}

const getStatusText = (status: string) => {
  return status.charAt(0).toUpperCase() + status.slice(1)
}

const navigateToGuest = (guestId: string) => {
  router.push(`/guest-list/${eventId}/${guestId}`)
}
</script>

<template>
  <div class="border border-gray-200 rounded-md bg-white">
    <Table>
      <TableHeader>
        <TableRow class="border-b border-gray-200 hover:bg-transparent">
          <TableHead class="font-semibold text-gray-900 h-12">Name</TableHead>
          <TableHead class="text-center font-semibold text-gray-900 h-12">Tickets</TableHead>
          <TableHead class="text-center font-semibold text-gray-900 h-12">Passes</TableHead>
          <TableHead class="text-center font-semibold text-gray-900 h-12">Type</TableHead>
          <TableHead class="font-semibold text-gray-900 h-12">Status</TableHead>
          <TableHead class="font-semibold text-gray-900 h-12">Affiliation</TableHead>
          <TableHead class="font-semibold text-gray-900 h-12">Pickup</TableHead>
          <TableHead class="w-12"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          v-for="guest in guests"
          :key="guest.id"
          class="border-b border-gray-200 last:border-0 hover:bg-gray-50 cursor-pointer"
          @click="navigateToGuest(guest.id)"
        >
          <TableCell class="font-medium text-gray-900 py-4">{{ guest.name }}</TableCell>
          <TableCell class="text-center text-gray-900 py-4">{{ guest.tickets }}</TableCell>
          <TableCell class="text-center text-gray-900 py-4">{{ guest.passes }}</TableCell>
          <TableCell class="text-center text-gray-900 py-4">{{ guest.guestType }}</TableCell>
          <TableCell class="py-4">
            <Badge
              :class="getStatusClass(guest.status)"
              class="font-semibold border"
            >
              {{ getStatusText(guest.status) }}
            </Badge>
          </TableCell>
          <TableCell class="text-gray-900 py-4">{{ guest.affiliation ?? '-' }}</TableCell>
          <TableCell class="text-gray-900 py-4">{{ guest.pickupMethod ?? '-' }}</TableCell>
          <TableCell class="py-4" @click.stop>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button variant="ghost" size="icon" class="h-8 w-8 p-0">
                  <MoreVertical class="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem @click="navigateToGuest(guest.id)">View Details</DropdownMenuItem>
                <DropdownMenuItem>Edit Guest</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem class="text-red-600">Remove</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
