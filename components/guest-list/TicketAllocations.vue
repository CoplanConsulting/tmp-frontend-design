<script setup lang="ts">
import type { TicketAllocation } from '~/utils/mockGuestList'

defineProps<{
  allocations: TicketAllocation
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
              <th class="text-center py-2 px-3 font-semibold text-gray-900"># Tix</th>
              <th class="text-center py-2 px-3 font-semibold text-gray-900">VIP</th>
              <th class="text-center py-2 px-3 font-semibold text-gray-900">M&G</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-gray-200">
              <td class="py-2 px-0 font-medium text-gray-700">Allowed</td>
              <td class="text-center py-2 px-3 font-semibold text-gray-900">{{ allocations.allowed.tix }}</td>
              <td class="text-center py-2 px-3 font-semibold text-gray-900">{{ allocations.allowed.vip }}</td>
              <td class="text-center py-2 px-3 font-semibold text-gray-900">{{ allocations.allowed.mng }}</td>
            </tr>
            <tr class="border-b border-gray-200">
              <td class="py-2 px-0 font-medium text-gray-700">Approved</td>
              <td class="text-center py-2 px-3 font-semibold text-gray-900">{{ allocations.approved.tix }}</td>
              <td class="text-center py-2 px-3 font-semibold text-gray-900">{{ allocations.approved.vip }}</td>
              <td class="text-center py-2 px-3 font-semibold text-gray-900">{{ allocations.approved.mng }}</td>
            </tr>
            <tr>
              <td class="py-2 px-0 font-medium text-gray-700">Remaining</td>
              <td class="text-center py-2 px-3 font-semibold text-gray-900">{{ allocations.remaining.tix }}</td>
              <td class="text-center py-2 px-3 font-semibold text-gray-900">{{ allocations.remaining.vip }}</td>
              <td class="text-center py-2 px-3 font-semibold text-gray-900">{{ allocations.remaining.mng }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
</template>
