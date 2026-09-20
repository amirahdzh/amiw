<script setup lang="ts">
interface Nested {
  company: string;
  period: string;
  logo?: string;
  details: string;
  tools: string[];
}

defineProps<{ nested: Nested }>();
</script>

<template>
  <div class="mt-3 rounded-xl border-2 border-dashed border-sage bg-[hsl(var(--alternate-background))] px-3 py-2.5">
    <div class="flex items-center gap-2.5">
      <div class="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-sage">
        <img :src="nested.logo" alt="" class="h-full w-full object-contain p-1" />
      </div>
      <div class="min-w-0 font-mono">
        <p class="truncate text-xs font-bold text-sage">{{ nested.company }}</p>
        <p class="text-[10px] text-sage">{{ nested.period }}</p>
      </div>
    </div>
    <p class="mt-2 text-[11px] leading-relaxed text-muted-foreground">{{ nested.details }}</p>
    <div class="mt-2 flex flex-wrap gap-1.5">
      <span
        v-for="tool in nested.tools"
        :key="tool"
        class="rounded border border-sage px-1.5 py-0.5 font-mono text-[10px] text-sage"
      >
        {{ tool }}
      </span>
    </div>
  </div>
</template>
