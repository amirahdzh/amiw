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
          <!-- <li>
            <NuxtLink to="/portfolio" class="hover:text-primary transition"
              >Portfolio</NuxtLink
            >
          </li> -->
          <li>
            <NuxtLink to="/art-leisure" class="hover:text-primary transition"
              >Art & Leisure</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/links" class="hover:text-primary transition"
              >Links</NuxtLink
            >
          </li>
        </ul>
      </nav>

      <!-- Social Media Links (Icon-Only) -->
      <div class="flex space-x-3">
        <a
          href="https://facebook.com/amiwdzh"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-primary transition"
        >
          <Icon name="simple-icons:facebook" class="w-4 h-4" />
        </a>
        <a
          href="https://github.com/amirahdzh"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-primary transition"
        >
          <Icon name="simple-icons:github" class="w-4 h-4" />
        </a>
        <a
          href="https://wa.me/6282114643544"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-primary transition"
        >
          <Icon name="simple-icons:whatsapp" class="w-4 h-4" />
        </a>
        <a
          href="mailto:amirahdzh@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-primary transition"
        >
          <Icon name="lucide:mail" class="w-4 h-4" />
        </a>
      </div>

      <!-- Copyright -->
      <p class="text-xs text-muted-foreground">
        &copy; {{ currentYear }} Amiw. All rights reserved.
      </p>
    </div>
  </footer>
</template>
