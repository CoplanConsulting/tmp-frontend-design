<script setup lang="ts">
definePageMeta({
  layout: false,
})

const router = useRouter()

const email = ref('')

const handleResetRequest = () => {
  console.log('Password reset requested for:', email.value)

  alert(`Password reset link sent to ${email.value}`)
  router.push('/auth/login')
}
</script>

<template>
  <div class="min-h-screen bg-[#F5F5F5] flex flex-col items-center justify-center p-6 gap-6">
    <Card class="w-full max-w-sm bg-white shadow-sm py-12">
      <CardHeader class="pb-8">
        <CardTitle class="text-2xl font-bold text-black mb-2">
          Forgot your password?
        </CardTitle>
        <CardDescription class="text-gray-600">
          Enter your email address and we'll send you a link to reset your password
        </CardDescription>
      </CardHeader>

      <CardContent class="px-8 pb-8">
        <form @submit.prevent="handleResetRequest" class="grid gap-6">
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

          <!-- Send Reset Link Button -->
          <Button
            type="submit"
            class="w-full bg-black text-white hover:bg-gray-800 h-11 mt-2"
          >
            Send reset link
          </Button>

          <!-- Back to Login Link -->
          <div class="text-center text-sm text-gray-600">
            Remember your password?
            <NuxtLink
              to="/auth/login"
              class="text-black font-medium hover:underline"
            >
              Back to login
            </NuxtLink>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
