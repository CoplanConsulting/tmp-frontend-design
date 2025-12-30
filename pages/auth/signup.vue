<script setup lang="ts">
definePageMeta({
  layout: false,
})

const router = useRouter()

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const company = ref('')
const password = ref('')
const confirmPassword = ref('')

const handleSignUp = () => {
  console.log('Sign up submitted with:', {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    company: company.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
  })

  router.push('/onboarding')
}
</script>

<template>
  <div class="min-h-screen bg-[#F5F5F5] flex flex-col items-center justify-center p-6 gap-6">
    <Card class="w-full max-w-2xl bg-white shadow-sm">
      <CardHeader class="pb-8">
        <CardTitle class="text-2xl font-bold text-black">
          Create an account
        </CardTitle>
      </CardHeader>

      <CardContent class="px-8 pb-8">
        <form @submit.prevent="handleSignUp" class="grid gap-6">
          <!-- Name Fields Row -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="grid gap-2">
              <Label for="firstName" class="text-sm font-medium text-black">
                First Name
              </Label>
              <Input
                id="firstName"
                v-model="firstName"
                type="text"
                class="h-11"
              />
            </div>

            <div class="grid gap-2">
              <Label for="lastName" class="text-sm font-medium text-black">
                Last Name
              </Label>
              <Input
                id="lastName"
                v-model="lastName"
                type="text"
                class="h-11"
              />
            </div>
          </div>

          <!-- Email and Company Row -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="grid gap-2">
              <Label for="email" class="text-sm font-medium text-black">
                Email Address
              </Label>
              <Input
                id="email"
                v-model="email"
                type="email"
                class="h-11"
              />
            </div>

            <div class="grid gap-2">
              <Label for="company" class="text-sm font-medium text-black">
                Company
              </Label>
              <Input
                id="company"
                v-model="company"
                type="text"
                class="h-11"
              />
            </div>
          </div>

          <!-- Password Fields Row -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="grid gap-2">
              <Label for="password" class="text-sm font-medium text-black">
                Password
              </Label>
              <Input
                id="password"
                v-model="password"
                type="password"
                class="h-11"
              />
            </div>

            <div class="grid gap-2">
              <Label for="confirmPassword" class="text-sm font-medium text-black">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                v-model="confirmPassword"
                type="password"
                class="h-11"
              />
            </div>
          </div>

          <!-- Sign Up Button -->
          <div class="flex justify-center mt-2">
            <Button
              type="submit"
              class="bg-black text-white hover:bg-gray-800 h-11 px-16"
            >
              Sign Up
            </Button>
          </div>

          <!-- Login Link -->
          <div class="text-center text-sm text-gray-600">
            Already have an account?
            <NuxtLink
              to="/auth/login"
              class="text-black font-medium hover:underline"
            >
              Login
            </NuxtLink>
          </div>
        </form>
      </CardContent>
    </Card>

    <!-- Terms Footer - OUTSIDE card -->
    <p class="text-xs text-gray-500 text-center max-w-2xl">
      By clicking sign up, you agree to our
      <a href="#" class="underline hover:text-black">Terms of Service</a>
      and
      <a href="#" class="underline hover:text-black">Privacy Policy</a>.
    </p>
  </div>
</template>
