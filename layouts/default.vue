<script setup lang="ts">
import AppSidebar from "@/components/AppSidebar.vue"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"

const { currentPageTitle } = useNavigation()
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header class="flex h-[var(--spacing-16)] shrink-0 items-center gap-[var(--spacing-2)] transition-[width,height] duration-[var(--transition-duration-base)] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-[var(--spacing-12)]">
        <div class="flex items-center gap-[var(--spacing-2)] px-[var(--spacing-4)]">
          <SidebarTrigger class="-ml-[var(--spacing-1)]" />
          <Separator orientation="vertical" class="mr-[var(--spacing-2)] h-[var(--spacing-4)]" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>{{ currentPageTitle }}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div class="flex flex-1 flex-col gap-[var(--spacing-4)] p-[var(--layout-gutter)] bg-[var(--background)]">
        <slot />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
