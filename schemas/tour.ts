/**
 * Tour Validation Schemas
 *
 * Zod schemas for tour form validation.
 * Used with vee-validate for client-side validation.
 */

import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

/**
 * Tour creation schema for onboarding
 */
export const createTourSchema = z.object({
  name: z
    .string()
    .min(1, 'Tour name is required')
    .min(3, 'Tour name must be at least 3 characters')
    .max(100, 'Tour name must be less than 100 characters'),

  startDate: z
    .string()
    .min(1, 'Start date is required')
    .refine((date) => {
      const parsedDate = new Date(date)
      return !isNaN(parsedDate.getTime())
    }, 'Invalid start date'),

  endDate: z
    .string()
    .min(1, 'End date is required')
    .refine((date) => {
      const parsedDate = new Date(date)
      return !isNaN(parsedDate.getTime())
    }, 'Invalid end date'),
}).refine(
  (data) => {
    const start = new Date(data.startDate)
    const end = new Date(data.endDate)
    return end >= start
  },
  {
    message: 'End date must be on or after start date',
    path: ['endDate'],
  }
)

/**
 * Typed schema for vee-validate integration
 */
export const createTourFormSchema = toTypedSchema(createTourSchema)

/**
 * Type inference for tour creation form
 */
export type CreateTourInput = z.infer<typeof createTourSchema>
