<script setup lang="ts">
type Color = "amiw" | "terracotta" | "sage";

interface Node {
  id: string;
  company: string;
  role?: string;
  period: string;
  logo?: string;
  color: Color;
}

const props = defineProps<{
  node: Node;
  /** Mobile list rendering — fills its column instead of the fixed desktop width. */
  full?: boolean;
}>();

defineEmits<{ select: [] }>();

const colorClasses: Record<Color, { border: string; text: string; ring: string }> = {
  amiw: { border: "border-amiw", text: "text-amiw", ring: "focus-visible:ring-amiw" },
  terracotta: { border: "border-terracotta", text: "text-terracotta", ring: "focus-visible:ring-terracotta" },
  sage: { border: "border-sage", text: "text-sage", ring: "focus-visible:ring-sage" },
};
const c = colorClasses[props.node.color];
</script>

<template>
  <button
    type="button"
    class="rounded-xl border-2 bg-secondary px-3 py-2 text-left transition-transform duration-300 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--alternate-background))] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    :class="[c.border, c.ring, full ? 'w-full' : 'w-[210px]']"
    @click="$emit('select')"
  >
    <div class="flex items-center gap-2">
      <div class="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border-2" :class="c.border">
        <img v-if="node.logo" :src="node.logo" alt="" class="h-full w-full object-contain p-1" />
        <Icon v-else name="lucide:user" class="h-3.5 w-3.5" :class="c.text" />
      </div>
      <div class="min-w-0 font-mono">
        <p class="truncate text-xs font-bold" :class="c.text">{{ node.company }}</p>
        <p class="text-[10px]" :class="c.text">{{ node.period }}</p>
        <p v-if="node.role" class="truncate text-[10px]" :class="c.text">{{ node.role }}</p>
      </div>
      <Icon name="lucide:arrow-up-right" class="ml-auto h-3 w-3 shrink-0 self-center" :class="c.text" />
    </div>
  </button>
</template>
