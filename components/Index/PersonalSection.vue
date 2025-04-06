<template>
  <section
    v-motion-slide-bottom
    class="w-full flex flex-col justify-center bg-secondary"
  >
    <div v-motion-fade class="text-center max-w-2xl mx-auto px-6 py-12">
      <h3 class="text-2xl font-bold mb-4 text-primary">Beyond the Code</h3>

      <p class="text-muted-foreground leading-relaxed mb-4">
        Beyond the lines of code, I'm someone who enjoys reflecting,
        daydreaming, and documenting life's little moments.
        <span class="font-medium text-[hsl(var(--pink))] italic">Memoir</span>
        is my cozy corner — a space to share who I am, what I love, and
        everything else that doesn’t quite fit into a portfolio.
      </p>
      <NuxtLink
        to="/memoir"
        class="inline-flex items-center justify-center gap-2 px-6 py-2 text-foreground border border-foreground rounded hover:bg-foreground/10 transition mb-4"
      >
        🌿 Visit My Memoir
      </NuxtLink>

      <p class="text-muted-foreground leading-relaxed mb-6">
        Curious about my longer thoughts and stories? You can find those on the
        <NuxtLink to="/blog" class="underline text-amiw hover:text-amiw/80"
          >Blog</NuxtLink
        >, where I publish selected writings from my Medium.
      </p>
      <NuxtLink
        to="/blog"
        class="inline-flex items-center justify-center gap-2 px-6 py-2 text-foreground border border-foreground rounded hover:bg-foreground/10 transition"
      >
        ✍️ Read My Blog
      </NuxtLink>

      <p class="text-sm text-muted-foreground mt-6">
        Or follow my journey on
        <a
          href="https://medium.com/@amiwdzh"
          target="_blank"
          class="underline hover:text-amiw"
        >
          Medium
        </a>
        directly.
      </p>
    </div>
  </section>
</template>
