<template>
  <ClientOnly>
    <Motion v-motion-slide-visible class="p-6 bg-card shadow-sm rounded-xl">
      <div class="flex items-center gap-4">
        <Icon :name="icon" class="w-8 h-8 text-primary" />
        <h3 class="text-xl font-semibold text-foreground">{{ title }}</h3>
      </div>

      <div class="mt-4">
        <slot />
      </div>
    </Motion>
  </ClientOnly>
</template>

<script setup lang="ts">
defineProps<{ title: string; icon: string }>();
</script>
