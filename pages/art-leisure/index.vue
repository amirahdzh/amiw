<template>
  <section class="w-full bg-background pt-12 pb-16 md:pt-16 md:pb-20">
    <div class="mx-auto max-w-6xl px-6">
      <p class="eyebrow">A shared canvas</p>
      <h1
        class="heading-marker mt-2 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl"
      >
        Art &amp; Leisure
      </h1>
      <p class="mt-4 max-w-[60ch] text-base leading-relaxed text-muted-foreground md:text-lg">
        You can do whatever you want here. I won't record or track anything you do.
        Leave a mark, draw a doddle, messing around (I'd rather you didn't xD), or
        just relax and enjoy this shared space! ^^
      </p>
      <p v-if="syncUri" class="mt-2 max-w-[60ch] text-sm text-muted-foreground">
        Pro tip: open the Rooms row to start a brand new canvas, or rename one to make
        it yours.
      </p>

      <!-- Rooms only exist with the self-hosted sync worker, so this row is
           simply absent in demo mode (no syncUri). -->
      <div v-if="syncUri" class="mt-7">
        <div class="flex flex-wrap items-center gap-2">
          <span class="eyebrow mr-1">Rooms</span>

          <span v-if="roomsLoading" class="text-sm text-muted-foreground">Loading rooms…</span>

          <template v-for="room in rooms" :key="room.id">
            <form
              v-if="renamingId === room.id"
              class="inline-flex"
              @submit.prevent="submitRename(room.id)"
            >
              <input
                ref="renameInputEl"
                v-model="renameValue"
                maxlength="60"
                aria-label="Room name"
                :class="roomInputClass"
                @keydown.esc="cancelRename"
                @blur="submitRename(room.id)"
              />
            </form>

            <span
              v-else-if="deletingId === room.id"
              class="inline-flex items-center gap-1 rounded-full border border-destructive/40 bg-destructive/10 py-1 pl-4 pr-1.5 text-[13px] text-destructive"
            >
              <span class="max-w-[14rem] truncate">Delete "{{ room.name }}"?</span>
              <button
                type="button"
                class="rounded-full p-1.5 transition-colors hover:bg-destructive/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Confirm delete"
                @click="confirmDelete(room.id)"
              >
                <Icon name="lucide:check" class="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                class="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Cancel delete"
                @click="deletingId = null"
              >
                <Icon name="lucide:x" class="h-3.5 w-3.5" />
              </button>
            </span>

            <span
              v-else
              class="inline-flex items-center rounded-full border transition-colors"
              :class="
                room.id === activeRoomId
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border text-muted-foreground hover:border-primary hover:text-foreground'
              "
            >
              <button
                type="button"
                class="max-w-[14rem] truncate rounded-full px-4 py-1.5 text-[13px] font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                :aria-current="room.id === activeRoomId ? 'true' : undefined"
                @click="selectRoom(room.id)"
              >
                {{ room.name }}
              </button>
              <template v-if="room.id === activeRoomId">
                <button
                  type="button"
                  class="rounded-full p-1.5 transition-colors hover:bg-primary-foreground/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  :class="room.id === DEFAULT_ROOM_ID ? 'mr-1' : ''"
                  aria-label="Rename room"
                  @click="startRename(room)"
                >
                  <Icon name="lucide:pencil" class="h-3.5 w-3.5" />
                </button>
                <button
                  v-if="room.id !== DEFAULT_ROOM_ID"
                  type="button"
                  class="mr-1 rounded-full p-1.5 transition-colors hover:bg-primary-foreground/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="Delete room"
                  @click="deletingId = room.id"
                >
                  <Icon name="lucide:trash-2" class="h-3.5 w-3.5" />
                </button>
              </template>
            </span>
          </template>

          <form v-if="isCreating" class="inline-flex" @submit.prevent="submitCreate">
            <input
              ref="createInputEl"
              v-model="newRoomName"
              maxlength="60"
              placeholder="Room name"
              aria-label="New room name"
              :class="roomInputClass"
              @keydown.esc="cancelCreate"
              @blur="submitCreate"
            />
          </form>
          <button
            v-else
            type="button"
            class="inline-flex items-center gap-1 rounded-full border border-dashed border-border px-4 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:border-primary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
            @click="startCreating"
          >
            <Icon name="lucide:plus" class="h-3.5 w-3.5" />
            New room
          </button>
        </div>
        <p v-if="roomError" class="mt-2 text-xs text-destructive">{{ roomError }}</p>
      </div>

      <div
        class="shadow-soft relative mt-6 h-[70vh] min-h-[420px] overflow-hidden rounded-[14px] border border-border"
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
          class="absolute inset-0 flex items-center justify-center bg-secondary text-muted-foreground"
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
          class="right-3 bottom-14 flex h-10 w-10 items-center justify-center rounded-full border border-primary bg-secondary text-primary shadow transition-colors hover:bg-accent"
          :class="isFullscreen ? 'fixed z-[61]' : 'absolute z-[1]'"
          :aria-label="isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'"
        >
          <Icon
            :name="isFullscreen ? 'lucide:minimize-2' : 'lucide:maximize-2'"
            class="h-4 w-4"
          />
        </button>
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

const roomInputClass =
  "w-44 rounded-full border border-primary bg-background px-4 py-1.5 text-[13px] text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const rooms = ref<RoomEntry[]>([]);
const roomsLoading = ref(true);
const roomError = ref("");

const isCreating = ref(false);
const newRoomName = ref("");
const createInputEl = useTemplateRef<HTMLInputElement>("createInputEl");

const renamingId = ref<string | null>(null);
const renameValue = ref("");
// Sits inside a v-for, so Vue hands back an array of elements.
const renameInputEl = useTemplateRef<HTMLInputElement[]>("renameInputEl");

const deletingId = ref<string | null>(null);

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
  } catch (err: any) {
    roomError.value = err?.message || "Couldn't create room";
  }
}

function startRename(room: RoomEntry) {
  renamingId.value = room.id;
  renameValue.value = room.name;
  roomError.value = "";
  nextTick(() => renameInputEl.value?.[0]?.focus());
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
  }
});

usePageSeo({
  title: "Art & Leisure | Amiw",
  description:
    "A shared canvas on Amiw's site. Draw, doodle or just relax. Nothing you do there is recorded.",
});
</script>
