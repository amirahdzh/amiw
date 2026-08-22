<template>
  <main class="flex items-center justify-center min-h-screen bg-background">
    <div class="text-center bg-secondary p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-3xl font-bold text-foreground mb-4">Under Development!</h1>
      <p class="text-lg text-muted-foreground mb-6">
        This page is currently under development. Please check back later!
      </p>

      <!-- Link to go back to the previous page -->
      <NuxtLink
        to="javascript:history.back()"
        class="text-[hsl(var(--amiw))] text-sm hover:underline"
      >
        ← Back to Previous Page
      </NuxtLink>
    </div>
  </main>
</template>

<style scoped>
/* Center the content vertically and horizontally */
main {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
</style>
