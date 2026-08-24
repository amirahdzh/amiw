<template>
  <header
    :class="[
      'fixed w-full z-50 flex justify-center items-center pt-3 transition-transform duration-300',
      isHeaderVisible ? 'translate-y-0' : '-translate-y-full',
    ]"
  >
    <div
      class="flex items-center gap-0.5 sm:gap-1 hover:gap-2 px-2 sm:px-3 py-1 bg-secondary rounded-md border border-r-4 border-b-4 border-primary transition-all duration-300 ease-out"
    >
      <TooltipProvider :delayDuration="0">
        <!-- Loop sebelum separator -->
        <div
          v-for="(icon, index) in icons.slice(0, 3)"
          :key="icon.name"
          class="transition-[margin,transform] duration-300 ease-out hover:scale-110 hover:mx-2"
        >
          <Tooltip>
            <TooltipTrigger as-child>
              <NuxtLink
                :to="icon.link"
                :target="icon.external ? '_blank' : undefined"
                :rel="icon.external ? 'noopener noreferrer' : undefined"
                @click="handleIconClick($event, icon)"
                class="relative flex items-center justify-center p-1.5 sm:p-2 rounded-full transition-colors duration-300 hover:bg-accent"
              >
                <Icon :name="icon.name" class="w-5 h-5" />
                <span
                  v-if="icon.external"
                  class="absolute top-0.5 right-0.5 flex items-center justify-center w-3 h-3 rounded-full bg-[hsl(var(--pink))] ring-2 ring-secondary"
                >
                  <Icon
                    name="lucide:arrow-up-right"
                    class="w-2 h-2 text-secondary"
                  />
                </span>
              </NuxtLink>
            </TooltipTrigger>
            <TooltipContent>
              {{ icon.tooltip }}
            </TooltipContent>
          </Tooltip>
        </div>

        <!-- Separator -->
        <div class="w-[1px] h-6 bg-border"></div>

        <!-- Loop setelah separator -->
        <div
          v-for="(icon, index) in icons.slice(3)"
          :key="icon.name"
          class="transition-[margin,transform] duration-300 ease-out hover:scale-110 hover:mx-2"
        >
          <Tooltip>
            <TooltipTrigger as-child>
              <NuxtLink
                :to="icon.link"
                :target="icon.external ? '_blank' : undefined"
                :rel="icon.external ? 'noopener noreferrer' : undefined"
                @click="handleIconClick($event, icon)"
                class="relative flex items-center justify-center p-1.5 sm:p-2 rounded-full transition-colors duration-300 hover:bg-accent"
              >
                <Icon :name="icon.name" class="w-5 h-5" />
                <span
                  v-if="icon.external"
                  class="absolute top-0.5 right-0.5 flex items-center justify-center w-3 h-3 rounded-full bg-[hsl(var(--pink))] ring-2 ring-secondary"
                >
                  <Icon
                    name="lucide:arrow-up-right"
                    class="w-2 h-2 text-secondary"
                  />
                </span>
              </NuxtLink>
            </TooltipTrigger>
            <TooltipContent>
              {{ icon.tooltip }}
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>

    <Dialog v-model:open="isContactDialogOpen">
      <DialogContent
        class="border-2 border-r-4 border-b-4 border-primary bg-secondary text-primary"
      >
        <DialogHeader>
          <DialogTitle class="text-2xl font-bold">
            Open {{ pendingContact?.label }}?
          </DialogTitle>
          <DialogDescription class="text-muted-foreground">
            A tiny hello is waiting for you. This will open
            {{ pendingContact?.label }} in a new tab.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter class="gap-2 sm:gap-2">
          <DialogClose
            class="rounded-md border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-accent"
          >
            Maybe later
          </DialogClose>
          <button
            type="button"
            class="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-secondary hover:opacity-90"
            @click="openPendingContact"
          >
            Yes, open it
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

type NavbarIcon = {
  name: string;
  link: string;
  tooltip: string;
  external?: boolean;
};

type ContactTarget = {
  link: string;
  label: string;
};

const isContactDialogOpen = ref(false);
const pendingContact = ref<ContactTarget | null>(null);

const handleIconClick = (event: MouseEvent, icon: NavbarIcon) => {
  if (!icon.external) return;

  event.preventDefault();
  pendingContact.value = {
    ...icon,
    label: icon.tooltip,
  };
  isContactDialogOpen.value = true;
};

const openPendingContact = () => {
  if (!pendingContact.value) return;

  window.open(pendingContact.value.link, "_blank", "noopener,noreferrer");
  isContactDialogOpen.value = false;
  pendingContact.value = null;
};

// ShadCN Vue Tooltip components
// import {
//   Tooltip,
//   TooltipTrigger,
//   TooltipContent,
//   TooltipProvider,
// } from "@/components/ui/tooltip";

const lastScrollY = ref(0);
const isHeaderVisible = ref(true);

const handleScroll = () => {
  const currentScrollY = window.scrollY;
  isHeaderVisible.value =
    currentScrollY < lastScrollY.value || currentScrollY < 10;
  lastScrollY.value = currentScrollY;
};

onMounted(() => window.addEventListener("scroll", handleScroll));
onUnmounted(() => window.removeEventListener("scroll", handleScroll));

const icons: NavbarIcon[] = [
  { name: "lucide:home", link: "/", tooltip: "Home" },
  { name: "lucide:briefcase", link: "/portfolio", tooltip: "Portfolio" },
  { name: "lucide:book-text", link: "/blog", tooltip: "Blog" },
  // {
  //   name: "simple-icons:github",
  //   link: "https://github.com/amirahdzh",
  //   external: true,
  //   tooltip: "GitHub",
  // },
  // {
  //   name: "simple-icons:facebook",
  //   link: "https://facebook.com/amiwdzh",
  //   external: true,
  //   tooltip: "Facebook",
  // },
  {
    name: "simple-icons:whatsapp",
    link: "https://wa.me/6282114643544",
    external: true,
    tooltip: "WhatsApp",
  },
  {
    name: "lucide:mail",
    link: "mailto:amirahdzh@gmail.com",
    external: true,
    tooltip: "Email",
  },
];
</script>
