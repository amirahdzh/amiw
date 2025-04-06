<script setup>
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer
    class="bg-secondary text-muted-foreground py-4 border-t-2 border-primary"
  >
    <div class="container mx-auto flex flex-col items-center space-y-4">
      <!-- Navigasi Footer -->
      <nav>
        <ul class="flex space-x-4 text-sm">
          <li>
            <NuxtLink to="/" class="hover:text-primary transition"
              >Home</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/blog" class="hover:text-primary transition"
              >Blog</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/memoir" class="hover:text-primary transition"
              >Memoir</NuxtLink
            >
          </li>
        </ul>
      </nav>

      <!-- Social Media Links (Icon-Only) -->
      <div class="flex space-x-3">
        <a
          href="https://facebook.com"
          target="_blank"
          class="hover:text-primary transition"
        >
          <Icon name="simple-icons:facebook" class="w-4 h-4" />
        </a>
        <a
          href="https://github.com"
          target="_blank"
          class="hover:text-primary transition"
        >
          <Icon name="simple-icons:github" class="w-4 h-4" />
        </a>
        <a
          href="https://medium.com"
          target="_blank"
          class="hover:text-primary transition"
        >
          <Icon name="simple-icons:medium" class="w-4 h-4" />
        </a>
      </div>

      <!-- Copyright -->
      <p class="text-xs text-muted-foreground">
        &copy; {{ currentYear }} Amiw. All rights reserved.
      </p>
    </div>
  </footer>
</template>
