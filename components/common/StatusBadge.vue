<script setup lang="ts">
import { Badge } from '~/components/ui/badge'
import { cn } from '~/lib/utils'

/**
 * StatusBadge Component
 *
 * Replaces inline badge color logic across the app (37+ instances).
 * Uses global badge utility classes from main.css (@layer utilities).
 * Automatically handles dark mode via CSS variables (no JavaScript needed).
 */

export type BadgeType = 'Promoter' | 'Venue' | 'Production' | 'default'

const props = defineProps<{
  type: BadgeType
}>()

/**
 * Maps badge type to global utility class from main.css
 * Classes: .badge-promoter, .badge-venue, .badge-production, .badge-default
 */
const getBadgeClass = (type: BadgeType): string => {
  const classMap: Record<BadgeType, string> = {
    'Promoter': 'badge-promoter',
    'Venue': 'badge-venue',
    'Production': 'badge-production',
    'default': 'badge-default'
  }
  return classMap[type] || 'badge-default'
}
</script>

<template>
  <Badge :class="cn('font-semibold border', getBadgeClass(props.type))">
    <slot />
  </Badge>
</template>

