<script setup lang="ts">
// Updated to use new mockData structure
// getTicketAllocationSummary returns: { comp: {...}, vip: {...}, guest: {...} }
// Each type has: { allowed, used, remaining }

interface AllocationSummary {
  comp: { allowed: number; used: number; remaining: number }
  vip: { allowed: number; used: number; remaining: number }
  guest: { allowed: number; used: number; remaining: number }
}

defineProps<{
  allocations: AllocationSummary
}>()
</script>

<template>
  <Card class="border border-gray-200 bg-white">
    <CardHeader class="pb-3">
      <CardTitle class="text-base font-bold text-gray-900">Ticket Allocations</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="overflow-hidden">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="text-left py-2 px-0 font-semibold text-gray-900"></th>
              <th class="text-center py-2 px-3 font-semibold text-gray-900">Comp</th>
              <th class="text-center py-2 px-3 font-semibold text-gray-900">VIP</th>
              <th class="text-center py-2 px-3 font-semibold text-gray-900">Guest</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-gray-200">
              <td class="py-2 px-0 font-medium text-gray-700">Allowed</td>
              <td class="text-center py-2 px-3 font-semibold text-gray-900">{{ allocations.comp.allowed }}</td>
              <td class="text-center py-2 px-3 font-semibold text-gray-900">{{ allocations.vip.allowed }}</td>
              <td class="text-center py-2 px-3 font-semibold text-gray-900">{{ allocations.guest.allowed }}</td>
            </tr>
            <tr class="border-b border-gray-200">
              <td class="py-2 px-0 font-medium text-gray-700">Used</td>
              <td class="text-center py-2 px-3 font-semibold text-gray-900">{{ allocations.comp.used }}</td>
              <td class="text-center py-2 px-3 font-semibold text-gray-900">{{ allocations.vip.used }}</td>
              <td class="text-center py-2 px-3 font-semibold text-gray-900">{{ allocations.guest.used }}</td>
            </tr>
            <tr>
              <td class="py-2 px-0 font-medium text-gray-700">Remaining</td>
              <td class="text-center py-2 px-3 font-semibold text-gray-900">{{ allocations.comp.remaining }}</td>
              <td class="text-center py-2 px-3 font-semibold text-gray-900">{{ allocations.vip.remaining }}</td>
              <td class="text-center py-2 px-3 font-semibold text-gray-900">{{ allocations.guest.remaining }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
</template>
