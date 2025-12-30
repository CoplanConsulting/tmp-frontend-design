<script setup lang="ts">
import { ArrowLeft, MapPin, Save } from 'lucide-vue-next'

definePageMeta({
  layout: 'default'
})

// Form state
const form = ref({
  name: '',
  address: '',
  city: '',
  state: '',
  postalCode: '',
  phone: '',
  website: '',
  capacity: '',
  venueContactName: '',
  productionContactName: '',
  stageDimensions: '',
  loadInInfo: '',
  powerInfo: '',
  dressingRoomInfo: '',
  laundryInfo: '',
  runnerInfo: '',
  wifiInfo: '',
  merchSplit: '',
  merchContact: '',
  busParking: '',
  parkingInstructions: '',
  notes: ''
})

// Handle form submission
const handleSubmit = () => {
  console.log('Creating venue with data:', form.value)
  navigateTo('/venues')
}

// Handle cancel
const handleCancel = () => {
  navigateTo('/venues')
}
</script>

<template>
  <div class="flex-1 p-8 bg-gray-50">
    <!-- Page Header -->
    <div class="mb-6">
      <div class="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <NuxtLink to="/venues" class="flex items-center gap-1 hover:text-gray-700 transition-colors">
          <ArrowLeft class="h-4 w-4" />
          Back to Venues
        </NuxtLink>
      </div>
      <div class="flex items-center gap-3 mb-1">
        <div class="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100 border border-gray-200">
          <MapPin class="h-6 w-6 text-gray-600" />
        </div>
        <h1 class="text-3xl font-bold text-gray-900">Add New Venue</h1>
      </div>
      <p class="text-sm text-gray-600 ml-[60px]">Add a performance venue with technical specs and logistics details</p>
    </div>

    <!-- Form Container -->
    <form @submit.prevent="handleSubmit" class="max-w-4xl">
      <Card class="border border-gray-200 bg-white shadow-sm">
        <CardContent class="p-8">
          <div class="space-y-6">
            <!-- Basic Information Section -->
            <div class="space-y-4">
              <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wide">Basic Information</h3>

              <!-- Venue Name -->
              <div class="space-y-2">
                <Label for="name" class="text-sm font-semibold text-gray-900">
                  Venue Name <span class="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  v-model="form.name"
                  type="text"
                  placeholder="Enter venue name"
                  required
                  class="bg-white border-gray-300"
                />
              </div>

              <!-- Street Address -->
              <div class="space-y-2">
                <Label for="address" class="text-sm font-medium text-gray-700">
                  Street Address
                </Label>
                <Input
                  id="address"
                  v-model="form.address"
                  type="text"
                  placeholder="123 Main St"
                  class="bg-white border-gray-300"
                />
              </div>

              <!-- City, State, Postal Code -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="md:col-span-1 space-y-2">
                  <Label for="city" class="text-sm font-medium text-gray-700">
                    City
                  </Label>
                  <Input
                    id="city"
                    v-model="form.city"
                    type="text"
                    placeholder="Los Angeles"
                    class="bg-white border-gray-300"
                  />
                </div>

                <div class="space-y-2">
                  <Label for="state" class="text-sm font-medium text-gray-700">
                    State
                  </Label>
                  <Input
                    id="state"
                    v-model="form.state"
                    type="text"
                    placeholder="CA"
                    maxlength="2"
                    class="bg-white border-gray-300"
                  />
                </div>

                <div class="space-y-2">
                  <Label for="postalCode" class="text-sm font-medium text-gray-700">
                    Postal Code
                  </Label>
                  <Input
                    id="postalCode"
                    v-model="form.postalCode"
                    type="text"
                    placeholder="90001"
                    class="bg-white border-gray-300"
                  />
                </div>
              </div>

              <!-- Phone, Website, Capacity -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="space-y-2">
                  <Label for="phone" class="text-sm font-medium text-gray-700">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    v-model="form.phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    class="bg-white border-gray-300"
                  />
                </div>

                <div class="space-y-2">
                  <Label for="website" class="text-sm font-medium text-gray-700">
                    Website
                  </Label>
                  <Input
                    id="website"
                    v-model="form.website"
                    type="url"
                    placeholder="https://venue.com"
                    class="bg-white border-gray-300"
                  />
                </div>

                <div class="space-y-2">
                  <Label for="capacity" class="text-sm font-medium text-gray-700">
                    Capacity
                  </Label>
                  <Input
                    id="capacity"
                    v-model="form.capacity"
                    type="number"
                    placeholder="5000"
                    class="bg-white border-gray-300"
                  />
                </div>
              </div>
            </div>

            <!-- Divider -->
            <div class="border-t border-gray-200" />

            <!-- Contacts Section -->
            <div class="space-y-4">
              <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wide">Contacts</h3>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-2">
                  <Label for="venueContactName" class="text-sm font-medium text-gray-700">
                    Venue Contact Name
                  </Label>
                  <Input
                    id="venueContactName"
                    v-model="form.venueContactName"
                    type="text"
                    placeholder="Contact name"
                    class="bg-white border-gray-300"
                  />
                </div>

                <div class="space-y-2">
                  <Label for="productionContactName" class="text-sm font-medium text-gray-700">
                    Production Contact Name
                  </Label>
                  <Input
                    id="productionContactName"
                    v-model="form.productionContactName"
                    type="text"
                    placeholder="Production contact"
                    class="bg-white border-gray-300"
                  />
                </div>
              </div>
            </div>

            <!-- Divider -->
            <div class="border-t border-gray-200" />

            <!-- Technical Specs Section -->
            <div class="space-y-4">
              <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wide">Technical Specs</h3>

              <div class="space-y-2">
                <Label for="stageDimensions" class="text-sm font-medium text-gray-700">
                  Stage Dimensions
                </Label>
                <Input
                  id="stageDimensions"
                  v-model="form.stageDimensions"
                  type="text"
                  placeholder="40' x 30'"
                  class="bg-white border-gray-300"
                />
              </div>

              <div class="space-y-2">
                <Label for="loadInInfo" class="text-sm font-medium text-gray-700">
                  Load In Info
                </Label>
                <Textarea
                  id="loadInInfo"
                  v-model="form.loadInInfo"
                  placeholder="Load-in details, dock access, restrictions..."
                  rows="3"
                  class="bg-white border-gray-300 resize-none"
                />
              </div>

              <div class="space-y-2">
                <Label for="powerInfo" class="text-sm font-medium text-gray-700">
                  Power Info
                </Label>
                <Input
                  id="powerInfo"
                  v-model="form.powerInfo"
                  type="text"
                  placeholder="Power specifications"
                  class="bg-white border-gray-300"
                />
              </div>
            </div>

            <!-- Divider -->
            <div class="border-t border-gray-200" />

            <!-- Logistics & Amenities Section -->
            <div class="space-y-4">
              <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wide">Logistics & Amenities</h3>

              <div class="space-y-2">
                <Label for="dressingRoomInfo" class="text-sm font-medium text-gray-700">
                  Dressing Room Info
                </Label>
                <Input
                  id="dressingRoomInfo"
                  v-model="form.dressingRoomInfo"
                  type="text"
                  placeholder="Number and size of dressing rooms"
                  class="bg-white border-gray-300"
                />
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-2">
                  <Label for="laundryInfo" class="text-sm font-medium text-gray-700">
                    Laundry Info
                  </Label>
                  <Input
                    id="laundryInfo"
                    v-model="form.laundryInfo"
                    type="text"
                    placeholder="Laundry facilities available"
                    class="bg-white border-gray-300"
                  />
                </div>

                <div class="space-y-2">
                  <Label for="runnerInfo" class="text-sm font-medium text-gray-700">
                    Runner Info
                  </Label>
                  <Input
                    id="runnerInfo"
                    v-model="form.runnerInfo"
                    type="text"
                    placeholder="Runner availability"
                    class="bg-white border-gray-300"
                  />
                </div>
              </div>
            </div>

            <!-- Divider -->
            <div class="border-t border-gray-200" />

            <!-- Hospitality Section -->
            <div class="space-y-4">
              <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wide">Hospitality</h3>

              <div class="space-y-2">
                <Label for="wifiInfo" class="text-sm font-medium text-gray-700">
                  WiFi Info
                </Label>
                <Input
                  id="wifiInfo"
                  v-model="form.wifiInfo"
                  type="text"
                  placeholder="WiFi network details"
                  class="bg-white border-gray-300"
                />
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-2">
                  <Label for="merchSplit" class="text-sm font-medium text-gray-700">
                    Merch Split
                  </Label>
                  <Input
                    id="merchSplit"
                    v-model="form.merchSplit"
                    type="text"
                    placeholder="e.g., 85/15"
                    class="bg-white border-gray-300"
                  />
                </div>

                <div class="space-y-2">
                  <Label for="merchContact" class="text-sm font-medium text-gray-700">
                    Merch Contact
                  </Label>
                  <Input
                    id="merchContact"
                    v-model="form.merchContact"
                    type="text"
                    placeholder="Merchandise contact name"
                    class="bg-white border-gray-300"
                  />
                </div>
              </div>
            </div>

            <!-- Divider -->
            <div class="border-t border-gray-200" />

            <!-- Parking Section -->
            <div class="space-y-4">
              <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wide">Parking</h3>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-2">
                  <Label for="busParking" class="text-sm font-medium text-gray-700">
                    Bus Parking
                  </Label>
                  <Input
                    id="busParking"
                    v-model="form.busParking"
                    type="text"
                    placeholder="Bus parking location"
                    class="bg-white border-gray-300"
                  />
                </div>

                <div class="space-y-2">
                  <Label for="parkingInstructions" class="text-sm font-medium text-gray-700">
                    Parking Instructions
                  </Label>
                  <Input
                    id="parkingInstructions"
                    v-model="form.parkingInstructions"
                    type="text"
                    placeholder="Parking details and access"
                    class="bg-white border-gray-300"
                  />
                </div>
              </div>
            </div>

            <!-- Divider -->
            <div class="border-t border-gray-200" />

            <!-- Notes Section -->
            <div class="space-y-2">
              <Label for="notes" class="text-sm font-semibold text-gray-900">
                Additional Notes
              </Label>
              <Textarea
                id="notes"
                v-model="form.notes"
                placeholder="Add any additional notes or special considerations for this venue..."
                rows="4"
                class="bg-white border-gray-300 resize-none"
              />
              <p class="text-xs text-gray-500">Internal notes visible only to your team</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Action Buttons -->
      <div class="flex items-center justify-between mt-6">
        <Button
          type="button"
          variant="outline"
          class="border-gray-300"
          @click="handleCancel"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          class="bg-black text-white hover:bg-gray-800 gap-2"
        >
          <Save class="h-4 w-4" />
          Save Venue
        </Button>
      </div>
    </form>

    <!-- Helper Card -->
    <Card class="mt-6 max-w-4xl border-blue-200 bg-blue-50">
      <CardContent class="p-6">
        <h3 class="font-semibold text-blue-900 mb-2 text-sm">💡 What happens next?</h3>
        <ul class="text-sm text-blue-800 space-y-1.5">
          <li>• The venue will be added to your venue database</li>
          <li>• Link this venue to events when planning shows and tours</li>
          <li>• Technical specs and logistics info will be available for advance planning</li>
          <li>• You can add or update venue contacts at any time</li>
        </ul>
      </CardContent>
    </Card>
  </div>
</template>
