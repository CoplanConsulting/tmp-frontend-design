<script setup lang="ts">
definePageMeta({
  layout: false,
})

const router = useRouter()

const email = ref('')
const password = ref('')

const handleLogin = () => {
  console.log('Login submitted with:', {
    email: email.value,
    password: password.value,
  })

  router.push('/dashboard')
}
</script>

<template>
  <div class="min-h-screen bg-[#F5F5F5] flex flex-col items-center justify-center p-6 gap-6">
    <Card class="w-full max-w-md bg-white shadow-sm">
      <CardHeader class="text-center pb-8">
        <CardTitle class="text-2xl font-bold text-black mb-2">
          Welcome back
        </CardTitle>
        <CardDescription class="text-gray-600">
          Login to your TMPro account
        </CardDescription>
      </CardHeader>

      <CardContent class="px-8 pb-8">
        <form @submit.prevent="handleLogin" class="grid gap-6">
          <!-- Email Field -->
          <div class="grid gap-2">
            <Label for="email" class="text-sm font-medium text-black">
              Email
            </Label>
            <Input
              id="email"
              v-model="email"
              type="email"
              placeholder="name@example.com"
              class="h-11"
            />
          </div>

          <!-- Password Field -->
          <div class="grid gap-2">
            <div class="flex items-center justify-between">
              <Label for="password" class="text-sm font-medium text-black">
                Password
              </Label>
              <NuxtLink
                to="/auth/forgot-password"
                class="text-sm text-gray-600 hover:text-black transition-colors"
              >
                Forgot your password?
              </NuxtLink>
            </div>
            <Input
              id="password"
              v-model="password"
              type="password"
              placeholder="name@example.com"
              class="h-11"
            />
          </div>

          <!-- Login Button -->
          <Button
            type="submit"
            class="w-full bg-black text-white hover:bg-gray-800 h-11 mt-2"
          >
            Login
          </Button>

          <!-- Sign Up Link -->
          <div class="text-center text-sm text-gray-600">
            Don't have an account?
            <NuxtLink
              to="/auth/signup"
              class="text-black font-medium hover:underline"
            >
              Sign Up
            </NuxtLink>
          </div>
        </form>
      </CardContent>
    </Card>

    <!-- Terms Footer - OUTSIDE card -->
    <p class="text-xs text-gray-500 text-center max-w-md">
      By clicking login, you agree to our
      <a href="#" class="underline hover:text-black">Terms of Service</a>
      and
      <a href="#" class="underline hover:text-black">Privacy Policy</a>.
    </p>
  </div>
</template>
