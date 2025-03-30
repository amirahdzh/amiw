<template>
  <footer class="w-full border-t bg-muted py-6">
    <div
      class="container mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground"
    >
      <p>&copy; {{ new Date().getFullYear() }} Amiw. All rights reserved.</p>
      <div class="flex gap-4 mt-4 md:mt-0">
        <Button
          v-for="link in socialLinks"
          :key="link.url"
          variant="ghost"
          as="a"
          :href="link.url"
          target="_blank"
        >
          <Icon :name="link.icon" class="w-5 h-5" />
        </Button>
      </div>
    </div>
  </footer>
</template>

<script setup>
// import { Button } from "@/components/ui/button";
// import { Icon } from "@/components/ui/icon";

const socialLinks = [
  { url: "https://facebook.com/amirahdzh", icon: "fa:facebook" },
  { url: "https://medium.com/@amiwdzh", icon: "fa:medium" },
  { url: "https://github.com/amirahdzh", icon: "fa:github" },
];
</script>
