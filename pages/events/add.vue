<script setup lang="ts">
import { Calendar as CalendarIcon, ChevronLeft } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { format } from 'date-fns'

definePageMeta({
  layout: 'default'
})

// Form validation schema
const formSchema = toTypedSchema(z.object({
  eventName: z.string().min(1, 'Event name is required').max(100),
  eventType: z.string().min(1, 'Event type is required'),
  venue: z.string().min(1, 'Venue is required').max(200),
  location: z.string().min(1, 'Location is required').max(200),
  startDate: z.date({
    required_error: 'Start date is required',
  }),
  endDate: z.date({
    required_error: 'End date is required',
  }),
  showTime: z.string().min(1, 'Show time is required'),
  capacity: z.string().min(1, 'Capacity is required'),
  description: z.string().max(500).optional(),
  notes: z.string().max(1000).optional(),
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit((values) => {
  console.log('Form submitted:', values)
  // Handle form submission
})

const eventTypes = [
  { value: 'concert', label: 'Concert' },
  { value: 'travel', label: 'Travel Day' },
  { value: 'rehearsal', label: 'Rehearsal' },
  { value: 'meet-greet', label: 'Meet & Greet' },
  { value: 'press', label: 'Press Event' },
]
</script>

<template>
  <div class="flex flex-1 flex-col gap-6">
    <!-- Page Header -->
    <div class="flex items-center gap-4">
          <Button variant="ghost" size="icon" as-child class="h-8 w-8">
            <a href="/events">
              <ChevronLeft class="h-5 w-5" />
            </a>
          </Button>
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Add Event</h1>
            <p class="text-sm text-gray-500 mt-1">Create a new event for the tour schedule</p>
          </div>
        </div>

        <!-- Form Card -->
        <Card class="border border-gray-200 bg-white">
          <CardContent class="p-8">
            <form @submit="onSubmit" class="space-y-8">
              <!-- Event Information Section -->
              <div class="space-y-6">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 mb-1">Event Information</h3>
                  <p class="text-sm text-gray-500">Basic details about the event</p>
                </div>

                <div class="grid grid-cols-2 gap-6">
                  <FormField v-slot="{ componentField }" name="eventName">
                    <FormItem>
                      <FormLabel class="text-sm font-medium text-gray-900">Event Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="e.g., Opening Night Concert"
                          v-bind="componentField"
                          class="border-gray-300"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormField>

                  <FormField v-slot="{ componentField }" name="eventType">
                    <FormItem>
                      <FormLabel class="text-sm font-medium text-gray-900">Event Type</FormLabel>
                      <Select v-bind="componentField">
                        <FormControl>
                          <SelectTrigger class="border-gray-300">
                            <SelectValue placeholder="Select event type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem
                            v-for="type in eventTypes"
                            :key="type.value"
                            :value="type.value"
                          >
                            {{ type.label }}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  </FormField>
                </div>
              </div>

              <!-- Location & Venue Section -->
              <div class="space-y-6">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 mb-1">Location & Venue</h3>
                  <p class="text-sm text-gray-500">Where the event will take place</p>
                </div>

                <div class="grid grid-cols-2 gap-6">
                  <FormField v-slot="{ componentField }" name="venue">
                    <FormItem>
                      <FormLabel class="text-sm font-medium text-gray-900">Venue Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="e.g., Madison Square Garden"
                          v-bind="componentField"
                          class="border-gray-300"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormField>

                  <FormField v-slot="{ componentField }" name="location">
                    <FormItem>
                      <FormLabel class="text-sm font-medium text-gray-900">Location</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="e.g., New York, NY"
                          v-bind="componentField"
                          class="border-gray-300"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormField>
                </div>
              </div>

              <!-- Date & Time Section -->
              <div class="space-y-6">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 mb-1">Date & Time</h3>
                  <p class="text-sm text-gray-500">Schedule details for the event</p>
                </div>

                <div class="grid grid-cols-3 gap-6">
                  <FormField v-slot="{ componentField }" name="startDate">
                    <FormItem class="flex flex-col">
                      <FormLabel class="text-sm font-medium text-gray-900">Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger as-child>
                          <FormControl>
                            <Button
                              variant="outline"
                              :class="[
                                'w-full justify-start text-left font-normal border-gray-300',
                                !componentField.modelValue && 'text-gray-500',
                              ]"
                            >
                              <CalendarIcon class="mr-2 h-4 w-4 text-gray-500" />
                              {{
                                componentField.modelValue
                                  ? format(componentField.modelValue, 'PPP')
                                  : 'Pick a date'
                              }}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent class="w-auto p-0">
                          <Calendar v-model="componentField.modelValue" />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  </FormField>

                  <FormField v-slot="{ componentField }" name="endDate">
                    <FormItem class="flex flex-col">
                      <FormLabel class="text-sm font-medium text-gray-900">End Date</FormLabel>
                      <Popover>
                        <PopoverTrigger as-child>
                          <FormControl>
                            <Button
                              variant="outline"
                              :class="[
                                'w-full justify-start text-left font-normal border-gray-300',
                                !componentField.modelValue && 'text-gray-500',
                              ]"
                            >
                              <CalendarIcon class="mr-2 h-4 w-4 text-gray-500" />
                              {{
                                componentField.modelValue
                                  ? format(componentField.modelValue, 'PPP')
                                  : 'Pick a date'
                              }}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent class="w-auto p-0">
                          <Calendar v-model="componentField.modelValue" />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  </FormField>

                  <FormField v-slot="{ componentField }" name="showTime">
                    <FormItem>
                      <FormLabel class="text-sm font-medium text-gray-900">Show Time</FormLabel>
                      <FormControl>
                        <Input
                          type="time"
                          v-bind="componentField"
                          class="border-gray-300"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormField>
                </div>
              </div>

              <!-- Capacity Section -->
              <div class="space-y-6">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 mb-1">Capacity</h3>
                  <p class="text-sm text-gray-500">Venue capacity information</p>
                </div>

                <div class="grid grid-cols-2 gap-6">
                  <FormField v-slot="{ componentField }" name="capacity">
                    <FormItem>
                      <FormLabel class="text-sm font-medium text-gray-900">Expected Capacity</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="e.g., 5,000"
                          v-bind="componentField"
                          class="border-gray-300"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormField>
                </div>
              </div>

              <!-- Additional Information Section -->
              <div class="space-y-6">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 mb-1">Additional Information</h3>
                  <p class="text-sm text-gray-500">Optional details and notes</p>
                </div>

                <FormField v-slot="{ componentField }" name="description">
                  <FormItem>
                    <FormLabel class="text-sm font-medium text-gray-900">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Brief description of the event..."
                        v-bind="componentField"
                        class="border-gray-300 resize-none h-24"
                      />
                    </FormControl>
                    <FormDescription class="text-xs text-gray-500">
                      Maximum 500 characters
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="notes">
                  <FormItem>
                    <FormLabel class="text-sm font-medium text-gray-900">Internal Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add any internal notes or special requirements..."
                        v-bind="componentField"
                        class="border-gray-300 resize-none h-32"
                      />
                    </FormControl>
                    <FormDescription class="text-xs text-gray-500">
                      These notes are for internal use only
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                </FormField>
              </div>

              <!-- Form Actions -->
              <div class="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
                <Button variant="outline" type="button" as-child class="border-gray-300">
                  <a href="/events">Cancel</a>
                </Button>
                <Button type="submit" class="bg-black text-white hover:bg-gray-800 px-8">
                  Create Event
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
  </div>
</template>
