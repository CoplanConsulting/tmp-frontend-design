<script setup lang="ts">
import type { Component } from 'vue'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

defineProps<{
  items: {
    title: string
    items: {
      title: string
      url: string
      icon?: Component
      isActive?: boolean
    }[]
  }[]
}>()
</script>

<template>
  <SidebarGroup v-for="section in items" :key="section.title">
    <SidebarGroupLabel>{{ section.title }}</SidebarGroupLabel>
    <SidebarGroupContent>
      <SidebarMenu>
        <SidebarMenuItem v-for="item in section.items" :key="item.title">
          <SidebarMenuButton as-child :is-active="item.isActive">
            <NuxtLink :to="item.url">
              <component v-if="item.icon" :is="item.icon" />
              <span>{{ item.title }}</span>
            </NuxtLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
</template>
