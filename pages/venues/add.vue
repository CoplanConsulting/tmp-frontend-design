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
  <div class="page-container">
    <!-- Back Navigation -->
    <div class="page-nav">
      <NuxtLink to="/venues" class="back-link">
        <ArrowLeft class="back-link-icon" />
        Back to Venues
      </NuxtLink>
    </div>

    <!-- Page Header Bar -->
    <header class="page-header">
      <!-- Left: Content -->
      <div class="header-content">
        <div class="header-meta">
          <span class="header-badge">
            <MapPin class="badge-icon" />
            New Venue
          </span>
        </div>
        <div class="header-text">
          <h1 class="header-title">Add New Venue</h1>
          <p class="header-subtitle">Add a performance venue with technical specs and logistics details</p>
        </div>
      </div>

      <!-- Right: Actions -->
      <div class="header-actions">
        <Button
          type="button"
          variant="outline"
          size="lg"
          @click="handleCancel"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          size="lg"
          class="bg-black text-white hover:bg-gray-800"
          @click="handleSubmit"
        >
          <Save class="h-4 w-4 mr-2" />
          Save
        </Button>
      </div>
    </header>

    <!-- Form Container -->
    <form @submit.prevent="handleSubmit" class="form-wrapper">
      <Card class="form-card">
        <CardContent class="form-content">
          <div class="form-sections">
            <!-- Basic Information Section -->
            <div class="form-section">
              <h3 class="section-heading">Basic Information</h3>

              <!-- Venue Name -->
              <div class="field-group">
                <Label for="name" class="field-label field-label--required">
                  Venue Name <span class="required-indicator">*</span>
                </Label>
                <Input
                  id="name"
                  v-model="form.name"
                  type="text"
                  placeholder="Enter venue name"
                  required
                  class="field-input"
                />
              </div>

              <!-- Street Address -->
              <div class="field-group">
                <Label for="address" class="field-label">
                  Street Address
                </Label>
                <Input
                  id="address"
                  v-model="form.address"
                  type="text"
                  placeholder="123 Main St"
                  class="field-input"
                />
              </div>

              <!-- City, State, Postal Code -->
              <div class="field-row field-row--three">
                <div class="field-group">
                  <Label for="city" class="field-label">
                    City
                  </Label>
                  <Input
                    id="city"
                    v-model="form.city"
                    type="text"
                    placeholder="Los Angeles"
                    class="field-input"
                  />
                </div>

                <div class="field-group">
                  <Label for="state" class="field-label">
                    State
                  </Label>
                  <Input
                    id="state"
                    v-model="form.state"
                    type="text"
                    placeholder="CA"
                    maxlength="2"
                    class="field-input"
                  />
                </div>

                <div class="field-group">
                  <Label for="postalCode" class="field-label">
                    Postal Code
                  </Label>
                  <Input
                    id="postalCode"
                    v-model="form.postalCode"
                    type="text"
                    placeholder="90001"
                    class="field-input"
                  />
                </div>
              </div>

              <!-- Phone, Website, Capacity -->
              <div class="field-row field-row--three">
                <div class="field-group">
                  <Label for="phone" class="field-label">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    v-model="form.phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    class="field-input"
                  />
                </div>

                <div class="field-group">
                  <Label for="website" class="field-label">
                    Website
                  </Label>
                  <Input
                    id="website"
                    v-model="form.website"
                    type="url"
                    placeholder="https://venue.com"
                    class="field-input"
                  />
                </div>

                <div class="field-group">
                  <Label for="capacity" class="field-label">
                    Capacity
                  </Label>
                  <Input
                    id="capacity"
                    v-model="form.capacity"
                    type="number"
                    placeholder="5000"
                    class="field-input"
                  />
                </div>
              </div>
            </div>

            <!-- Section Divider -->
            <div class="section-divider" />

            <!-- Contacts Section -->
            <div class="form-section">
              <h3 class="section-heading">Contacts</h3>

              <div class="field-row field-row--two">
                <div class="field-group">
                  <Label for="venueContactName" class="field-label">
                    Venue Contact Name
                  </Label>
                  <Input
                    id="venueContactName"
                    v-model="form.venueContactName"
                    type="text"
                    placeholder="Contact name"
                    class="field-input"
                  />
                </div>

                <div class="field-group">
                  <Label for="productionContactName" class="field-label">
                    Production Contact Name
                  </Label>
                  <Input
                    id="productionContactName"
                    v-model="form.productionContactName"
                    type="text"
                    placeholder="Production contact"
                    class="field-input"
                  />
                </div>
              </div>
            </div>

            <!-- Section Divider -->
            <div class="section-divider" />

            <!-- Technical Specs Section -->
            <div class="form-section">
              <h3 class="section-heading">Technical Specs</h3>

              <div class="field-group">
                <Label for="stageDimensions" class="field-label">
                  Stage Dimensions
                </Label>
                <Input
                  id="stageDimensions"
                  v-model="form.stageDimensions"
                  type="text"
                  placeholder="40' x 30'"
                  class="field-input"
                />
              </div>

              <div class="field-group">
                <Label for="loadInInfo" class="field-label">
                  Load In Info
                </Label>
                <Textarea
                  id="loadInInfo"
                  v-model="form.loadInInfo"
                  placeholder="Load-in details, dock access, restrictions..."
                  rows="3"
                  class="field-input field-input--textarea"
                />
              </div>

              <div class="field-group">
                <Label for="powerInfo" class="field-label">
                  Power Info
                </Label>
                <Input
                  id="powerInfo"
                  v-model="form.powerInfo"
                  type="text"
                  placeholder="Power specifications"
                  class="field-input"
                />
              </div>
            </div>

            <!-- Section Divider -->
            <div class="section-divider" />

            <!-- Logistics & Amenities Section -->
            <div class="form-section">
              <h3 class="section-heading">Logistics & Amenities</h3>

              <div class="field-group">
                <Label for="dressingRoomInfo" class="field-label">
                  Dressing Room Info
                </Label>
                <Input
                  id="dressingRoomInfo"
                  v-model="form.dressingRoomInfo"
                  type="text"
                  placeholder="Number and size of dressing rooms"
                  class="field-input"
                />
              </div>

              <div class="field-row field-row--two">
                <div class="field-group">
                  <Label for="laundryInfo" class="field-label">
                    Laundry Info
                  </Label>
                  <Input
                    id="laundryInfo"
                    v-model="form.laundryInfo"
                    type="text"
                    placeholder="Laundry facilities available"
                    class="field-input"
                  />
                </div>

                <div class="field-group">
                  <Label for="runnerInfo" class="field-label">
                    Runner Info
                  </Label>
                  <Input
                    id="runnerInfo"
                    v-model="form.runnerInfo"
                    type="text"
                    placeholder="Runner availability"
                    class="field-input"
                  />
                </div>
              </div>
            </div>

            <!-- Section Divider -->
            <div class="section-divider" />

            <!-- Hospitality Section -->
            <div class="form-section">
              <h3 class="section-heading">Hospitality</h3>

              <div class="field-group">
                <Label for="wifiInfo" class="field-label">
                  WiFi Info
                </Label>
                <Input
                  id="wifiInfo"
                  v-model="form.wifiInfo"
                  type="text"
                  placeholder="WiFi network details"
                  class="field-input"
                />
              </div>

              <div class="field-row field-row--two">
                <div class="field-group">
                  <Label for="merchSplit" class="field-label">
                    Merch Split
                  </Label>
                  <Input
                    id="merchSplit"
                    v-model="form.merchSplit"
                    type="text"
                    placeholder="e.g., 85/15"
                    class="field-input"
                  />
                </div>

                <div class="field-group">
                  <Label for="merchContact" class="field-label">
                    Merch Contact
                  </Label>
                  <Input
                    id="merchContact"
                    v-model="form.merchContact"
                    type="text"
                    placeholder="Merchandise contact name"
                    class="field-input"
                  />
                </div>
              </div>
            </div>

            <!-- Section Divider -->
            <div class="section-divider" />

            <!-- Parking Section -->
            <div class="form-section">
              <h3 class="section-heading">Parking</h3>

              <div class="field-row field-row--two">
                <div class="field-group">
                  <Label for="busParking" class="field-label">
                    Bus Parking
                  </Label>
                  <Input
                    id="busParking"
                    v-model="form.busParking"
                    type="text"
                    placeholder="Bus parking location"
                    class="field-input"
                  />
                </div>

                <div class="field-group">
                  <Label for="parkingInstructions" class="field-label">
                    Parking Instructions
                  </Label>
                  <Input
                    id="parkingInstructions"
                    v-model="form.parkingInstructions"
                    type="text"
                    placeholder="Parking details and access"
                    class="field-input"
                  />
                </div>
              </div>
            </div>

            <!-- Section Divider -->
            <div class="section-divider" />

            <!-- Notes Section -->
            <div class="field-group">
              <Label for="notes" class="field-label field-label--required">
                Additional Notes
              </Label>
              <Textarea
                id="notes"
                v-model="form.notes"
                placeholder="Add any additional notes or special considerations for this venue..."
                rows="4"
                class="field-input field-input--textarea"
              />
              <p class="field-help">Internal notes visible only to your team</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Action Buttons -->
      <div class="form-actions">
        <Button
          type="button"
          variant="outline"
          class="form-action-btn form-action-btn--cancel"
          @click="handleCancel"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          class="form-action-btn form-action-btn--submit"
        >
          <Save class="btn-icon" />
          Save Venue
        </Button>
      </div>
    </form>

    <!-- Helper Card -->
    <div class="info-card-wrapper">
      <Card class="info-card info-card--info">
        <CardContent class="info-card__content">
          <h3 class="info-card__heading">💡 What happens next?</h3>
          <ul class="info-card__list">
            <li>• The venue will be added to your venue database</li>
            <li>• Link this venue to events when planning shows and tours</li>
            <li>• Technical specs and logistics info will be available for advance planning</li>
            <li>• You can add or update venue contacts at any time</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<style scoped>
/* ============================================================================
   PAGE LAYOUT
   ============================================================================ */
.page-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: var(--color-neutral-light);
}

/* ============================================================================
   BACK NAVIGATION
   ============================================================================ */
.page-nav {
  padding: var(--spacing-4) var(--spacing-6);
  background-color: var(--color-neutral-light);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: all var(--transition-duration-fast) var(--transition-timing);
}

.back-link:hover {
  color: var(--color-text-primary);
  transform: translateX(-2px);
}

.back-link-icon {
  width: 0.875rem;
  height: 0.875rem;
  opacity: 0.7;
  transition: opacity var(--transition-duration-fast) var(--transition-timing);
}

.back-link:hover .back-link-icon {
  opacity: 1;
}

/* ============================================================================
   PAGE HEADER BAR - Horizontal Layout (Matches Advance Page)
   ============================================================================ */
.page-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
  padding: var(--spacing-3) var(--spacing-6);
  background-color: white;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: var(--spacing-6);
}

/* Left: Header Content */
.header-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
  flex: 1;
}

.header-meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  margin-bottom: var(--spacing-2);
}

.header-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.5rem;
  background-color: oklch(0.55 0.22 250 / 0.1);
  color: oklch(0.55 0.22 250);
  border-radius: var(--radius-sm);
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: 0.01em;
}

.badge-icon {
  width: 0.875rem;
  height: 0.875rem;
  opacity: 0.8;
}

.header-text {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.header-title {
  font-size: var(--font-size-4xl);
  font-weight: 600;
  color: var(--color-text-primary);
  line-height: 1.2;
  letter-spacing: -0.01em;
  margin: 0;
}

.header-subtitle {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.4;
  margin: 0;
}

/* Right: Header Actions */
.header-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  margin-left: auto;
  flex-shrink: 0;
}

/* ============================================================================
   FORM LAYOUT
   ============================================================================ */
.form-wrapper {
  flex: 1;
  padding: 0 var(--spacing-6) var(--spacing-8);
  max-width: 64rem; /* 1024px */
  margin: 0 auto;
  width: 100%;
}

.form-card {
  border: 1px solid var(--color-border);
  background-color: white;
  box-shadow: var(--shadow-sm);
}

.form-content {
  padding: var(--spacing-8);
}

.form-sections {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
}

/* ============================================================================
   FORM SECTIONS
   ============================================================================ */
.form-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

.section-heading {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.section-divider {
  border-top: 1px solid var(--color-border);
}

/* ============================================================================
   FORM FIELDS
   ============================================================================ */
.field-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}

.field-label {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-secondary);
}

.field-label--required {
  font-weight: 600;
  color: var(--color-text-primary);
}

.required-indicator {
  color: var(--color-destructive);
}

.field-input {
  background-color: white;
  border-color: var(--color-border);
}

.field-input--textarea {
  resize: none;
}

.field-help {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

/* Field Rows (Grid layouts) */
.field-row {
  display: grid;
  gap: var(--spacing-4);
}

.field-row--two {
  grid-template-columns: repeat(1, 1fr);
}

.field-row--three {
  grid-template-columns: repeat(1, 1fr);
}

@media (min-width: 768px) {
  .field-row--two {
    grid-template-columns: repeat(2, 1fr);
  }

  .field-row--three {
    grid-template-columns: repeat(3, 1fr);
  }

  .field-row--three .field-group:first-child {
    grid-column: span 1;
  }
}

/* ============================================================================
   FORM ACTIONS
   ============================================================================ */
.form-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: var(--spacing-6);
}

.form-action-btn--cancel {
  border-color: var(--color-border);
}

.form-action-btn--submit {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  background-color: var(--color-text-primary);
  color: white;
}

.form-action-btn--submit:hover {
  background-color: var(--color-neutral-dark);
}

.btn-icon {
  height: 1rem;
  width: 1rem;
}

/* ============================================================================
   INFO CARD (Helper Cards)
   ============================================================================ */
.info-card-wrapper {
  padding: 0 var(--spacing-6) var(--spacing-8);
  max-width: 64rem;
  margin: 0 auto;
  width: 100%;
}

.info-card {
  margin-top: var(--spacing-6);
}

.info-card--info {
  border-color: oklch(0.85 0.08 240); /* Blue border */
  background-color: oklch(0.95 0.05 240); /* Light blue bg */
}

.info-card__content {
  padding: var(--spacing-6);
}

.info-card__heading {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: oklch(0.3 0.15 240); /* Dark blue */
  margin-bottom: var(--spacing-2);
}

.info-card__list {
  font-size: var(--font-size-sm);
  color: oklch(0.35 0.12 240); /* Medium blue */
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing-1) * 1.5); /* 6px */
}
</style>
