<template>
  <section class="w-full min-h-screen pt-28 pb-16 bg-background">
    <div class="max-w-5xl mx-auto px-4 md:px-6">
      <div class="mb-6">
        <h1 class="text-4xl font-bold text-primary mb-2">Art & Leisure</h1>
        <p class="text-muted-foreground max-w-xl text-sm italic">
          You can do whatever you want here. I won't record or track anything
          you do. Leave a mark, draw a doddle, messing around (I'd rather you
          didn't xD), or just relax and enjoy this shared space! ^^
        </p>
        <p v-if="syncUri" class="text-muted-foreground max-w-xl text-xs mt-2">
          Pro tip: open the Rooms panel to start a brand new canvas, or
          rename one to make it yours.
        </p>
      </div>

      <div class="flex flex-col md:flex-row gap-4">
        <!-- Room directory — only meaningful against the self-hosted sync
             worker, so it's simply absent in demo mode (no syncUri). -->
        <aside
          v-if="syncUri"
          class="w-full shrink-0 flex flex-col rounded-2xl border border-r-4 border-b-4 border-primary bg-secondary overflow-hidden transition-[height] duration-200 md:w-60 md:h-[70vh] md:min-h-[420px]"
          :class="isDrawerOpen ? 'h-56' : ''"
        >
          <!--
            The whole bar is the toggle now, not just the chevron — a much
            easier target than a lone 28px icon, especially on mobile.
            Collapsing only ever makes sense on mobile, where the drawer
            competes with the canvas for vertical space by stacking above
            it — on large screens (md:flex-row) it sits beside the canvas
            with room to spare, so toggleDrawer() no-ops there (see its own
            comment) rather than silently swapping the title/+ button out
            from under a stray desktop click on this now much bigger area.
          -->
          <div
            role="button"
            tabindex="0"
            @click="toggleDrawer"
            @keydown.enter="toggleDrawer"
            @keydown.space.prevent="toggleDrawer"
            :aria-expanded="isDrawerOpen"
            aria-label="Toggle rooms panel"
            class="flex items-center justify-between gap-2 px-4 py-3 border-b border-border cursor-pointer md:cursor-default"
          >
            <h2
              class="flex-1 min-w-0 truncate text-xs font-bold text-primary uppercase tracking-wide"
            >
              <template v-if="isDrawerOpen">Rooms</template>
              <template v-else>Rooms - {{ activeRoomName }}</template>
            </h2>
            <div class="flex items-center gap-1 shrink-0">
              <button
                v-if="isDrawerOpen"
                type="button"
                @click.stop="startCreating"
                class="p-1.5 rounded-md text-primary hover:bg-accent transition-colors"
                aria-label="New room"
              >
                <Icon name="lucide:plus" class="w-4 h-4" />
              </button>
              <!-- Decorative now — the whole bar above carries the click/keyboard handling. -->
              <span class="md:hidden p-1.5 rounded-md text-primary" aria-hidden="true">
                <Icon
                  :name="isDrawerOpen ? 'lucide:chevron-up' : 'lucide:chevron-down'"
                  class="w-4 h-4"
                />
              </span>
            </div>
          </div>

          <div v-show="isDrawerOpen" class="relative flex-1 min-h-0">
            <div
              ref="roomListEl"
              class="h-full overflow-y-auto p-2 space-y-1"
              @scroll="checkRoomListOverflow"
            >
            <p v-if="roomsLoading" class="text-xs text-muted-foreground px-2 py-3">
              Loading rooms…
            </p>

            <div v-for="room in rooms" :key="room.id" class="group relative">
              <form
                v-if="renamingId === room.id"
                @submit.prevent="submitRename(room.id)"
                class="px-1"
              >
                <input
                  ref="renameInputEl"
                  v-model="renameValue"
                  maxlength="60"
                  class="w-full text-sm px-2 py-1.5 rounded-lg border border-primary bg-background text-foreground focus:outline-none"
                  @keydown.esc="cancelRename"
                  @blur="submitRename(room.id)"
                />
              </form>

              <div
                v-else-if="deletingId === room.id"
                class="flex items-center gap-1 pl-2 pr-1 py-1.5 rounded-lg bg-destructive/10"
              >
                <span class="flex-1 text-xs text-destructive truncate">
                  Delete "{{ room.name }}"?
                </span>
                <button
                  type="button"
                  @click="confirmDelete(room.id)"
                  class="p-1 rounded-md text-destructive hover:bg-destructive/20 transition-colors"
                  aria-label="Confirm delete"
                >
                  <Icon name="lucide:check" class="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  @click="deletingId = null"
                  class="p-1 rounded-md text-muted-foreground hover:bg-background transition-colors"
                  aria-label="Cancel delete"
                >
                  <Icon name="lucide:x" class="w-3.5 h-3.5" />
                </button>
              </div>

              <template v-else>
                <button
                  type="button"
                  @click="selectRoom(room.id)"
                  class="w-full flex items-center gap-2 pl-2 py-2 rounded-lg text-sm text-left transition-colors"
                  :class="[
                    room.id === DEFAULT_ROOM_ID ? 'pr-7' : 'pr-12',
                    room.id === activeRoomId
                      ? 'bg-primary text-secondary font-semibold'
                      : 'hover:bg-accent text-foreground',
                  ]"
                >
                  <Icon name="lucide:palette" class="w-4 h-4 shrink-0 opacity-70" />
                  <span class="flex-1 truncate">{{ room.name }}</span>
                </button>
                <div
                  class="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity"
                >
                  <button
                    type="button"
                    @click.stop="startRename(room)"
                    class="p-1 rounded-md transition-colors"
                    :class="
                      room.id === activeRoomId
                        ? 'text-secondary hover:bg-primary/70'
                        : 'text-muted-foreground hover:bg-background'
                    "
                    aria-label="Rename room"
                  >
                    <Icon name="lucide:pencil" class="w-3.5 h-3.5" />
                  </button>
                  <button
                    v-if="room.id !== DEFAULT_ROOM_ID"
                    type="button"
                    @click.stop="deletingId = room.id"
                    class="p-1 rounded-md transition-colors"
                    :class="
                      room.id === activeRoomId
                        ? 'text-secondary hover:bg-destructive/70'
                        : 'text-muted-foreground hover:bg-destructive/10 hover:text-destructive'
                    "
                    aria-label="Delete room"
                  >
                    <Icon name="lucide:trash-2" class="w-3.5 h-3.5" />
                  </button>
                </div>
              </template>
            </div>

            <form v-if="isCreating" @submit.prevent="submitCreate" class="px-1 pt-1">
              <input
                ref="createInputEl"
                v-model="newRoomName"
                maxlength="60"
                placeholder="Room name"
                class="w-full text-sm px-2 py-1.5 rounded-lg border border-primary bg-background text-foreground focus:outline-none"
                @keydown.esc="cancelCreate"
                @blur="submitCreate"
              />
            </form>
            </div>

            <!--
              The list only fits ~3 rooms before it scrolls, with nothing
              else on screen suggesting that — this fade + bouncing chevron
              is the only cue there's more below. Hidden once you've
              actually scrolled to the bottom (see checkRoomListOverflow),
              so it never lies about there being more to see.
            -->
            <div
              v-if="hasMoreRooms"
              class="pointer-events-none absolute bottom-0 inset-x-0 h-7 flex items-end justify-center pb-0.5 bg-gradient-to-t from-secondary to-transparent rounded-b-2xl"
            >
              <Icon name="lucide:chevron-down" class="w-3.5 h-3.5 text-muted-foreground animate-bounce" />
            </div>
          </div>

          <p v-if="isDrawerOpen && roomError" class="text-xs text-destructive px-3 pb-3">
            {{ roomError }}
          </p>
        </aside>

        <div
          class="relative md:flex-1 h-[70vh] min-h-[420px] rounded-2xl overflow-hidden border border-r-4 border-b-4 border-primary"
        >
          <ClientOnly>
            <CanvasTldrawBoard
              :key="displayRoomId"
              :room-id="displayRoomId"
              :sync-uri="syncUri"
              :license-key="licenseKey"
              :fullscreen="isFullscreen"
              @ready="boardReady = true"
            />
          </ClientOnly>

          <!--
            Not inside <ClientOnly> — this is plain SSR'd markup, so it's
            already on screen before any JS runs. <ClientOnly>'s own
            mount/fallback swap only covers the pre-hydration gap; it doesn't
            cover the time spent downloading CanvasTldrawBoard's chunk
            (tldraw+React, ~550KB, loaded lazily as a .client.vue), which is
            exactly the gap that showed up as an empty box with nothing in it
            on a cold load. This single overlay covers both gaps and only
            goes away once the board actually confirms it rendered — and
            reappears whenever :key changes the room, since that remounts
            the whole board.
          -->
          <div
            v-if="!boardReady"
            class="absolute inset-0 flex items-center justify-center text-muted-foreground bg-secondary"
          >
            Loading canvas…
          </div>

          <!--
            Bottom-right, snug against tldraw's own "Get a license for
            production" watermark that already lives in that corner — sits
            just above it with the same inset instead of floating with a
            big dead gap beneath. Positioned absolute (anchored to this
            box) when not fullscreen, but fixed (anchored to the viewport)
            once fullscreen — the board itself switches to position:fixed
            at that point (see TldrawBoard.client.vue's hostStyle), so a
            button that stayed absolute here would scroll out of view along
            with this now-empty box while the fullscreen canvas stays put.
            Only needs to clear the canvas itself, not the whole page — the
            canvas host now always sits in its own real stacking context
            (z-index: 0 windowed, z-index: 60 fullscreen, see
            TldrawBoard.client.vue's hostStyle), which properly contains
            tldraw's own internal panels no matter how high they're layered
            internally. So this only needs one step above whichever of
            those two the canvas is currently using — going much higher
            (the old z-[200]) meant this button also out-ranked page-level
            modals (z-50) that are supposed to cover the whole page,
            poking through them instead of being covered like everything
            else. Fixed w-10 h-10 + flex centering (rather than sizing from
            padding) guarantees a true circle regardless of the icon's own
            rendered box.
          -->
          <button
            type="button"
            @click="isFullscreen = !isFullscreen"
            class="right-3 bottom-14 w-10 h-10 flex items-center justify-center rounded-full bg-secondary border border-primary text-primary shadow hover:bg-accent transition-colors"
            :class="isFullscreen ? 'fixed z-[61]' : 'absolute z-[1]'"
            :aria-label="isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'"
          >
            <Icon
              :name="isFullscreen ? 'lucide:minimize-2' : 'lucide:maximize-2'"
              class="w-4 h-4"
            />
          </button>
        </div>
      </div>
    </div>
  </section>

  <!--
    v-if, not v-show — this needs to actually unmount while fullscreen, not
    just hide. Its own modals (game choice, chat) carry local open/closed
    state that's otherwise untouched by anything on this page; if one was
    already open before fullscreen was entered, unmounting is what actually
    closes it, rather than leaving it sitting there fighting the canvas's
    own stacking for the top spot.
  -->
  <MemoirPlaygroundSection v-if="!isFullscreen" />
</template>

<script setup lang="ts">
import {
  fetchRooms,
  createRoom as apiCreateRoom,
  renameRoom as apiRenameRoom,
  deleteRoom as apiDeleteRoom,
  type RoomEntry,
} from "@/components/Canvas/roomDirectory";

// The original, pre-rooms canvas — see rooms.ts's DEFAULT_ROOM on the
// worker side. Used both as the fallback when there's no sync worker (demo
// mode) and as the initial guess before the room list has loaded.
const DEFAULT_ROOM_ID = "amiw-public-canvas";

const config = useRuntimeConfig();
const syncUri = config.public.tldrawSyncUrl || undefined;
const licenseKey = config.public.tldrawLicenseKey || undefined;

const boardReady = ref(false);
const isFullscreen = ref(false);

function handleFullscreenKeydown(e: KeyboardEvent) {
  if (e.key === "Escape" && isFullscreen.value) {
    isFullscreen.value = false;
  }
}

// Lock background scroll while fullscreen — otherwise the page behind the
// fixed-position canvas (see TldrawBoard.client.vue) can still scroll,
// which reads as broken since the canvas visually covers everything.
watch(isFullscreen, (fullscreen) => {
  document.body.style.overflow = fullscreen ? "hidden" : "";
});

onMounted(() => window.addEventListener("keydown", handleFullscreenKeydown));
onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleFullscreenKeydown);
  document.body.style.overflow = "";
});

const route = useRoute();
const router = useRouter();

const activeRoomId = ref<string>((route.query.room as string) || DEFAULT_ROOM_ID);
// Room switching only exists when there's a real backend to switch rooms
// on — in demo mode (no syncUri) this always resolves to the one fixed id,
// same as before the drawer existed.
const displayRoomId = computed(() => (syncUri ? activeRoomId.value : DEFAULT_ROOM_ID));

const rooms = ref<RoomEntry[]>([]);
const roomsLoading = ref(true);
const roomError = ref("");
const isDrawerOpen = ref(true);
// Shown in the collapsed header on mobile so you still know which room
// you're on without expanding the panel back open.
const activeRoomName = computed(
  () => rooms.value.find((r) => r.id === activeRoomId.value)?.name ?? "",
);

function toggleDrawer() {
  // Collapsing only exists on mobile — the header's md:hidden chevron and
  // the aside's unconditional md: sizing above both assume this. Now that
  // the whole bar (not just that 28px icon) triggers it, a stray click on
  // desktop is much more likely, so guard here too rather than let it
  // silently swap the title/+ button state with nothing visibly collapsing.
  if (window.matchMedia("(min-width: 768px)").matches) return;
  isDrawerOpen.value = !isDrawerOpen.value;
}

const isCreating = ref(false);
const newRoomName = ref("");
const createInputEl = useTemplateRef<HTMLInputElement>("createInputEl");

const renamingId = ref<string | null>(null);
const renameValue = ref("");
const renameInputEl = useTemplateRef<HTMLInputElement>("renameInputEl");

const deletingId = ref<string | null>(null);

const roomListEl = useTemplateRef<HTMLDivElement>("roomListEl");
const hasMoreRooms = ref(false);

function checkRoomListOverflow() {
  const el = roomListEl.value;
  hasMoreRooms.value = !!el && el.scrollHeight - el.scrollTop - el.clientHeight > 1;
}

// The drawer's height is CSS-transitioned (duration-200) when it opens, so
// the scrollable area isn't at its final size the instant isDrawerOpen
// flips — recheck once after that settles, not just on the next tick.
watch(isDrawerOpen, () => {
  nextTick(checkRoomListOverflow);
  setTimeout(checkRoomListOverflow, 220);
});

onMounted(() => window.addEventListener("resize", checkRoomListOverflow));
onBeforeUnmount(() => window.removeEventListener("resize", checkRoomListOverflow));

function selectRoom(id: string) {
  if (id === activeRoomId.value) return;
  boardReady.value = false;
  activeRoomId.value = id;
  router.replace({ query: { ...route.query, room: id } });
}

function startCreating() {
  isCreating.value = true;
  newRoomName.value = "";
  roomError.value = "";
  nextTick(() => createInputEl.value?.focus());
}

function cancelCreate() {
  isCreating.value = false;
}

async function submitCreate() {
  if (!isCreating.value) return;
  isCreating.value = false;
  const name = newRoomName.value.trim();
  if (!name || !syncUri) return;

  try {
    const room = await apiCreateRoom(syncUri, name);
    rooms.value.push(room);
    selectRoom(room.id);
    nextTick(checkRoomListOverflow);
  } catch (err: any) {
    roomError.value = err?.message || "Couldn't create room";
  }
}

function startRename(room: RoomEntry) {
  renamingId.value = room.id;
  renameValue.value = room.name;
  roomError.value = "";
  nextTick(() => renameInputEl.value?.focus());
}

function cancelRename() {
  renamingId.value = null;
}

async function submitRename(id: string) {
  if (renamingId.value !== id) return;
  renamingId.value = null;
  const name = renameValue.value.trim();
  const room = rooms.value.find((r) => r.id === id);
  if (!name || !room || name === room.name || !syncUri) return;

  try {
    const updated = await apiRenameRoom(syncUri, id, name);
    room.name = updated.name;
  } catch (err: any) {
    roomError.value = err?.message || "Couldn't rename room";
  }
}

async function confirmDelete(id: string) {
  if (deletingId.value !== id) return;
  deletingId.value = null;
  if (!syncUri) return;

  try {
    await apiDeleteRoom(syncUri, id);
    rooms.value = rooms.value.filter((r) => r.id !== id);
    // The room you were looking at just got wiped out from under you —
    // land somewhere that still exists rather than a dead id.
    if (activeRoomId.value === id) {
      selectRoom(rooms.value[0]?.id ?? DEFAULT_ROOM_ID);
    }
    nextTick(checkRoomListOverflow);
  } catch (err: any) {
    roomError.value = err?.message || "Couldn't delete room";
  }
}

onMounted(async () => {
  if (!syncUri) {
    roomsLoading.value = false;
    return;
  }

  try {
    rooms.value = await fetchRooms(syncUri);
    if (!rooms.value.some((r) => r.id === activeRoomId.value)) {
      activeRoomId.value = rooms.value[0]?.id ?? DEFAULT_ROOM_ID;
    }
  } catch {
    roomError.value = "Couldn't load rooms";
  } finally {
    roomsLoading.value = false;
    nextTick(checkRoomListOverflow);
  }
});

useHead({ title: "Art & Leisure — Amiw" });
</script>
