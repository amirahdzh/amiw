<script setup lang="ts">
// The sign-up form, shared by the footer and the /newsletter page.
//
// It posts straight to the newsletter service (opens its confirmation page in
// a new tab), so there is no backend of our own. Without an action URL the
// form is shown switched off. See nuxt.config.ts.
defineProps<{
  // Makes the input id unique when the form appears twice on one page.
  id: string;
}>();

const config = useRuntimeConfig();
const action = config.public.newsletterAction;
const field = config.public.newsletterField || "email";
const enabled = !!action;
</script>

<template>
  <form
    :action="enabled ? action : undefined"
    method="post"
    target="_blank"
    @submit="(e) => { if (!enabled) e.preventDefault(); }"
  >
    <label :for="id" class="sr-only">Get new posts by email</label>
    <div class="flex gap-2">
      <input
        :id="id"
        :name="field"
        type="email"
        required
        autocomplete="email"
        placeholder="Email for new posts"
        :disabled="!enabled"
        class="min-w-0 flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60"
      />
      <button
        type="submit"
        :disabled="!enabled"
        class="btn-solid shrink-0 px-5 py-2.5 text-sm focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60"
      >
        Subscribe
      </button>
    </div>
    <slot v-if="!enabled" name="disabled">
      <p class="mt-2 text-xs">Opening soon.</p>
    </slot>
  </form>
</template>
