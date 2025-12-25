<script setup lang="ts">
import type { SidebarProps } from "@/components/ui/sidebar"

import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
} from "lucide-vue-next"
import NavUser from "@/components/NavUser.vue"
import OrganizationSwitcher from "@/components/OrganizationSwitcher.vue"
import { navigationSections } from '~/utils/navigation'

import avatarImg from "~/assets/img/me.jpg"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const props = withDefaults(defineProps<SidebarProps>(), {
  variant: "inset",
  collapsible: "icon",
})

// This is sample data.
const data = {
  user: {
    name: "Steve C",
    email: "steve@steve.com",
    avatar: avatarImg,
  },
  teams: [
    {
      name: "Homecoming Tour 2.0",
      logo: GalleryVerticalEnd,
      plan: "2025",
    },
    {
      name: "HomeComing Tour",
      logo: AudioWaveform,
      plan: "2023",
    },
    {
      name: "2022 Tour",
      logo: Command,
      plan: "2022",
    },
  ],
//   navMain: [
//     {
//       title: "Dashboard",
//       url: "/",
//       icon: SquareTerminal,
//       isActive: true,
//       items: [
//         {
//           title: "Events",
//           url: "events",
//         },
//         {
//           title: "Starred",
//           url: "#",
//         },
//         {
//           title: "Settings",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Models",
//       url: "#",
//       icon: Bot,
//       items: [
//         {
//           title: "Genesis",
//           url: "#",
//         },
//         {
//           title: "Explorer",
//           url: "#",
//         },
//         {
//           title: "Quantum",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Documentation",
//       url: "#",
//       icon: BookOpen,
//       items: [
//         {
//           title: "Introduction",
//           url: "#",
//         },
//         {
//           title: "Get Started",
//           url: "#",
//         },
//         {
//           title: "Tutorials",
//           url: "#",
//         },
//         {
//           title: "Changelog",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Settings",
//       url: "#",
//       icon: Settings2,
//       items: [
//         {
//           title: "General",
//           url: "#",
//         },
//         {
//           title: "Team",
//           url: "#",
//         },
//         {
//           title: "Billing",
//           url: "#",
//         },
//         {
//           title: "Limits",
//           url: "#",
//         },
//       ],
//     },
//   ],
//   projects: [
//     {
//       name: "Design Engineering",
//       url: "#",
//       icon: Frame,
//     },
//     {
//       name: "Sales & Marketing",
//       url: "#",
//       icon: PieChart,
//     },
//     {
//       name: "Travel",
//       url: "#",
//       icon: Map,
//     },
//   ],
}
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <OrganizationSwitcher :teams="data.teams" />
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="navigationSections" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="data.user" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
