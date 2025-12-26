<script setup lang="ts">
import { Calendar, Mic, Users, MapPin } from 'lucide-vue-next'
import { getDashboardData } from '~/utils/mockData'

const { stats, upcomingDays } = getDashboardData()

const statsCards = [
  { title: 'Dates', value: stats.dateRange, subtitle: `${stats.totalDays} Total Days`, icon: 'calendar' },
  { title: 'Show Count', value: stats.totalShows, subtitle: `${stats.completedShows} Completed - ${stats.remainingShows} Remain`, icon: 'mic' },
  { title: 'Tour Personnel', value: stats.totalCrew, subtitle: 'Active team members on tour', icon: 'users' },
  { title: 'Next Show Day', value: stats.nextShowDate?.slice(5) || 'TBD', subtitle: stats.nextShowCity || '', icon: 'map-pin' },
]

const getIconComponent = (iconName: string) => {
  const icons: Record<string, any> = {
    calendar: Calendar,
    mic: Mic,
    users: Users,
    'map-pin': MapPin
  }
  return icons[iconName] || Calendar
}
</script>

<template>
  <div class="flex flex-1 flex-col gap-4">
        <!-- Stats Grid -->
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card v-for="stat in statsCards" :key="stat.title" class="bg-white">
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium text-gray-500">
                {{ stat.title }}
              </CardTitle>
              <component
                :is="getIconComponent(stat.icon)"
                class="h-4 w-4 text-gray-400"
              />
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold text-gray-900">{{ stat.value }}</div>
              <p class="text-xs text-gray-500 mt-1">
                {{ stat.subtitle }}
              </p>
            </CardContent>
          </Card>
        </div>

        <!-- Tour Schedule -->
        <div class="space-y-4">
          <div>
            <h2 class="text-2xl font-bold text-gray-900">Tour Schedule</h2>
            <p class="text-sm text-gray-500 mt-1">Upcoming shows and travel days</p>
          </div>

          <div class="space-y-3">
            <Card v-for="day in upcomingDays" :key="day.id" class="bg-white border border-gray-200">
              <CardContent class="flex items-center gap-6 p-6">
                <div class="flex items-center justify-center w-16 h-16 rounded-lg bg-gray-100 shrink-0">
                  <span class="text-sm font-semibold text-gray-700 uppercase">{{ day.dayOfWeek }}</span>
                </div>

                <div class="flex-1 min-w-0">
                    <h3 class="text-base font-semibold text-gray-900">
                        {{ day.dateShort }} - {{ day.dayType }}
                    </h3>
                    <p class="text-sm text-gray-500 mt-1">
                        <template v-if="day.venue">
                            {{ day.venue.name }} • {{ day.location }}
                        </template>
                        <template v-else>
                            {{ day.location }}
                        </template>
                    </p>
                </div>

                <Button variant="outline" size="sm" class="shrink-0" as-child>
                  <NuxtLink :to="`/days/${day.id}`">View Details</NuxtLink>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
  </div>
</template>
