<script setup lang="ts">
import { Briefcase } from 'lucide-vue-next'
import type { Person } from '@/utils/mockData/types'

defineProps<{
  person: Person
  editable?: boolean
}>()

// Check if section has any data
const hasData = (person: Person) => {
  return !!(person.bio || person.skills?.length || person.certifications?.length || person.languages?.length || person.equipmentOwned || person.jobTitle || person.company || person.primaryArtistOrOrg)
}
</script>

<template>
  <Card v-if="hasData(person)" class="border border-gray-200 bg-white">
    <CardHeader class="pb-3">
      <div class="flex items-center gap-2">
        <Briefcase class="h-5 w-5 text-gray-600" />
        <CardTitle class="text-base font-bold text-gray-900">Professional Information</CardTitle>
      </div>
    </CardHeader>
    <CardContent class="space-y-3">
      <div v-if="person.jobTitle">
        <p class="text-xs font-semibold text-gray-500 uppercase">Job Title</p>
        <p class="text-sm text-gray-900 mt-1">{{ person.jobTitle }}</p>
      </div>
      <Separator v-if="person.company" class="bg-slate-200" />
      <div v-if="person.company">
        <p class="text-xs font-semibold text-gray-500 uppercase">Company</p>
        <p class="text-sm text-gray-900 mt-1">{{ person.company }}</p>
      </div>
      <Separator v-if="person.primaryArtistOrOrg" class="bg-slate-200" />
      <div v-if="person.primaryArtistOrOrg">
        <p class="text-xs font-semibold text-gray-500 uppercase">Primary Artist/Organization</p>
        <p class="text-sm text-gray-900 mt-1">{{ person.primaryArtistOrOrg }}</p>
      </div>
      <Separator v-if="person.bio" class="bg-slate-200" />
      <div v-if="person.bio">
        <p class="text-xs font-semibold text-gray-500 uppercase">Bio</p>
        <p class="text-sm text-gray-900 mt-1 whitespace-pre-wrap">{{ person.bio }}</p>
      </div>
      <Separator v-if="person.skills?.length" class="bg-slate-200" />
      <div v-if="person.skills?.length">
        <p class="text-xs font-semibold text-gray-500 uppercase mb-2">Skills</p>
        <div class="flex flex-wrap gap-2">
          <Badge v-for="skill in person.skills" :key="skill" variant="secondary" class="text-xs">
            {{ skill }}
          </Badge>
        </div>
      </div>
      <Separator v-if="person.certifications?.length" class="bg-slate-200" />
      <div v-if="person.certifications?.length">
        <p class="text-xs font-semibold text-gray-500 uppercase mb-2">Certifications</p>
        <div class="flex flex-wrap gap-2">
          <Badge v-for="cert in person.certifications" :key="cert" variant="outline" class="text-xs">
            {{ cert }}
          </Badge>
        </div>
      </div>
      <Separator v-if="person.languages?.length" class="bg-slate-200" />
      <div v-if="person.languages?.length">
        <p class="text-xs font-semibold text-gray-500 uppercase mb-2">Languages</p>
        <div class="flex flex-wrap gap-2">
          <Badge v-for="lang in person.languages" :key="lang" variant="secondary" class="text-xs">
            {{ lang }}
          </Badge>
        </div>
      </div>
      <Separator v-if="person.equipmentOwned" class="bg-slate-200" />
      <div v-if="person.equipmentOwned">
        <p class="text-xs font-semibold text-gray-500 uppercase">Equipment Owned</p>
        <p class="text-sm text-gray-900 mt-1 whitespace-pre-wrap">{{ person.equipmentOwned }}</p>
      </div>
    </CardContent>
  </Card>
</template>
