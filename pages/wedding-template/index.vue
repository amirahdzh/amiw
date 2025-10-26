<template>
  <div class="min-h-screen bg-secondary py-20 px-4">
    <div class="max-w-6xl mx-auto">
      <header class="text-center mb-12">
        <h1 class="text-4xl font-light text-slate-800">
          Wedding Invitation Templates
        </h1>
        <p class="mt-2 text-lg text-slate-500">
          Choose the perfect template for your special day
        </p>
      </header>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Available Template -->
        <article
          class="rounded-lg border-2 border-primary overflow-hidden bg-secondary transition"
        >
          <div class="relative h-48 md:h-56 overflow-hidden">
            <img
              src="/gif/wedding_inv.gif"
              alt="Classic Wedding Template"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="p-6">
            <h3 class="text-lg font-semibold text-slate-800">
              Classic Elegance
            </h3>
            <p class="mt-2 text-sm text-slate-500">
              Timeless and sophisticated design
            </p>
            <div class="mt-4 flex gap-3">
              <a
                href="https://wedding.amiw.dev/classic?bride=Sara&groom=Alex&bride_fn=Sara+Amelia&groom_fn=Alexander+Pratama&bride_desc=Putri+dari+Bapak+Budi+dan+Ibu+Siti&groom_desc=Putra+dari+Bapak+Setiawan+dan+Ibu+Sri&date=2025-10-11T00%3A01&akad_date=2025-10-30&akad_time=10%3A00&akad_place=Masjid+Agung&akad_place_desc=Jl.+Merdeka+no+1&akad_place_maps=link&resepsi_time=00%3A00&resepsi_place=Hotel+Grand+Jakarta&resepsi_place_desc=Ballroom+lantai+2&resepsi_place_maps=link"
                class="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md text-sm font-medium transition"
                >Use Template</a
              >
              <button
                @click.prevent="openCustomize(null)"
                class="inline-flex items-center px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-md text-sm font-medium hover:shadow"
              >
                Customize
              </button>
            </div>
          </div>
        </article>

        <!-- Coming Soon Templates  -->
        <article
          v-for="template in comingSoonTemplates"
          :key="template.id"
          class="rounded-lg border-2 border-primary overflow-hidden bg-secondary transition"
        >
          <div class="relative">
            <img
              :src="template.image"
              :alt="template.name"
              class="w-full h-48 md:h-56 object-cover"
            />
            <div
              class="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-lg font-semibold"
            >
              Coming Soon
            </div>
          </div>
          <div class="p-4 space-y-3">
            <h3 class="text-xl font-semibold">{{ template.name }}</h3>
            <p class="text-primary text-sm">{{ template.description }}</p>

            <div class="flex items-center gap-3 pt-3">
              <button
                class="px-3 py-1 bg-gray-400 text-white rounded-md text-sm font-medium cursor-not-allowed opacity-70"
                disabled
                aria-disabled="true"
              >
                Coming Soon
              </button>
              <button
                class="px-3 py-1 bg-white border border-primary text-primary rounded-md text-sm font-medium cursor-not-allowed opacity-70"
                disabled
                aria-disabled="true"
              >
                Customize
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>

    <!-- Modal (inside main template) -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
    >
      <div
        ref="modalRef"
        class="w-full max-w-2xl bg-white rounded-lg shadow-lg overflow-auto max-h-[90vh]"
      >
        <header class="flex items-center justify-between p-4 border-b">
          <h3 class="text-lg font-semibold">Customize Template</h3>
          <button
            @click="closeModal"
            class="text-slate-500 hover:text-slate-700"
          >
            Close
          </button>
        </header>
        <div class="p-4 space-y-4">
          <p class="text-sm text-slate-600">
            Fill fields you want to override. All fields are optional.
          </p>
          <!-- Guest section moved to the top for easier access -->
          <div class="mb-4">
            <h4 class="text-sm font-semibold">Guest</h4>
            <div class="mt-2">
              <label
                for="name"
                class="block text-xs font-medium mb-1 text-slate-700"
                >Guest name</label
              >
              <input
                id="name"
                v-model="form.name"
                type="text"
                placeholder="Ayu"
                class="w-full px-3 py-2 border rounded"
              />
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <!-- Basic names -->
            <div>
              <label
                for="bride"
                class="block text-xs font-medium mb-1 text-slate-700"
                >Bride</label
              >
              <input
                id="bride"
                v-model="form.bride"
                type="text"
                placeholder="Sara"
                class="w-full px-3 py-2 border rounded"
              />
            </div>

            <div>
              <label
                for="groom"
                class="block text-xs font-medium mb-1 text-slate-700"
                >Groom</label
              >
              <input
                id="groom"
                v-model="form.groom"
                type="text"
                placeholder="Alex"
                class="w-full px-3 py-2 border rounded"
              />
            </div>

            <!-- guest field moved to its own section below -->

            <!-- Full/display names -->
            <div>
              <label
                for="bride_fn"
                class="block text-xs font-medium mb-1 text-slate-700"
                >Bride (full)</label
              >
              <input
                id="bride_fn"
                v-model="form.bride_fn"
                type="text"
                placeholder="Sara Amelia"
                class="w-full px-3 py-2 border rounded"
              />
            </div>

            <!-- Bride description moved next to bride fields -->
            <div class="sm:col-span-2">
              <label
                for="bride_desc"
                class="block text-xs font-medium mb-1 text-slate-700"
                >Bride description</label
              >
              <textarea
                id="bride_desc"
                v-model="form.bride_desc"
                rows="3"
                class="w-full px-3 py-2 border rounded"
                placeholder="Daughter of Mr. & Mrs. Wijaya — loves travel & coffee"
              ></textarea>
            </div>

            <div>
              <label
                for="groom_fn"
                class="block text-xs font-medium mb-1 text-slate-700"
                >Groom (full)</label
              >
              <input
                id="groom_fn"
                v-model="form.groom_fn"
                type="text"
                placeholder="Alexander Pratama"
                class="w-full px-3 py-2 border rounded"
              />
            </div>

            <!-- Groom description grouped with groom fields -->
            <div class="sm:col-span-2">
              <label
                for="groom_desc"
                class="block text-xs font-medium mb-1 text-slate-700"
                >Groom description</label
              >
              <textarea
                id="groom_desc"
                v-model="form.groom_desc"
                rows="3"
                class="w-full px-3 py-2 border rounded"
                placeholder="Son of Mr. & Mrs. Santoso — software engineer & musician"
              ></textarea>
            </div>

            <!-- Dates & times -->
            <div>
              <label
                for="date"
                class="block text-xs font-medium mb-1 text-slate-700"
                >Event (datetime)</label
              >
              <input
                id="date"
                v-model="form.date"
                type="datetime-local"
                placeholder="2026-06-12T17:00"
                class="w-full px-3 py-2 border rounded"
              />
            </div>

            <div>
              <label
                for="akad_date"
                class="block text-xs font-medium mb-1 text-slate-700"
                >Akad date</label
              >
              <input
                id="akad_date"
                v-model="form.akad_date"
                type="date"
                placeholder="2026-06-12"
                class="w-full px-3 py-2 border rounded"
              />
            </div>

            <div>
              <label
                for="akad_time"
                class="block text-xs font-medium mb-1 text-slate-700"
                >Akad time</label
              >
              <input
                id="akad_time"
                v-model="form.akad_time"
                type="time"
                placeholder="09:00"
                class="w-full px-3 py-2 border rounded"
              />
            </div>

            <div>
              <label
                for="resepsi_time"
                class="block text-xs font-medium mb-1 text-slate-700"
                >Reception time</label
              >
              <input
                id="resepsi_time"
                v-model="form.resepsi_time"
                type="time"
                placeholder="19:00"
                class="w-full px-3 py-2 border rounded"
              />
            </div>

            <!-- Places -->
            <div>
              <label
                for="akad_place"
                class="block text-xs font-medium mb-1 text-slate-700"
                >Akad place</label
              >
              <input
                id="akad_place"
                v-model="form.akad_place"
                type="text"
                placeholder="Masjid Agung"
                class="w-full px-3 py-2 border rounded"
              />
            </div>

            <div>
              <label
                for="resepsi_place"
                class="block text-xs font-medium mb-1 text-slate-700"
                >Reception place</label
              >
              <input
                id="resepsi_place"
                v-model="form.resepsi_place"
                type="text"
                placeholder="Hotel Grand Jakarta"
                class="w-full px-3 py-2 border rounded"
              />
            </div>

            <!-- Maps URLs -->
            <div>
              <label
                for="akad_place_maps"
                class="block text-xs font-medium mb-1 text-slate-700"
                >Akad map URL</label
              >
              <input
                id="akad_place_maps"
                v-model="form.akad_place_maps"
                type="url"
                placeholder="https://maps.app.goo.gl/xyz"
                class="w-full px-3 py-2 border rounded"
              />
            </div>

            <div>
              <label
                for="resepsi_place_maps"
                class="block text-xs font-medium mb-1 text-slate-700"
                >Reception map URL</label
              >
              <input
                id="resepsi_place_maps"
                v-model="form.resepsi_place_maps"
                type="url"
                placeholder="https://maps.app.goo.gl/abc"
                class="w-full px-3 py-2 border rounded"
              />
            </div>

            <!-- Place descriptions (longer) -->
            <div>
              <label
                for="akad_place_desc"
                class="block text-xs font-medium mb-1 text-slate-700"
                >Akad place details</label
              >
              <textarea
                id="akad_place_desc"
                v-model="form.akad_place_desc"
                placeholder="Jl. Merdeka No. 1, Central City"
                rows="2"
                class="w-full px-3 py-2 border rounded"
              ></textarea>
            </div>

            <div>
              <label
                for="resepsi_place_desc"
                class="block text-xs font-medium mb-1 text-slate-700"
                >Reception place details</label
              >
              <textarea
                id="resepsi_place_desc"
                v-model="form.resepsi_place_desc"
                placeholder="Ballroom Lantai 2, Hotel Grand Jakarta"
                rows="2"
                class="w-full px-3 py-2 border rounded"
              ></textarea>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <button
              @click="openLink"
              class="px-4 py-2 bg-primary text-white rounded"
            >
              Open Link
            </button>
            <button @click="copyLink" class="px-4 py-2 border rounded">
              Copy Link
            </button>
            <div class="text-sm text-slate-600 ml-auto">
              Preview:
              <a
                :href="builtUrl"
                target="_blank"
                class="text-blue-600 underline truncate block w-64"
                >{{ builtUrl }}</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount } from "vue";

const comingSoonTemplates = [
  {
    id: 1,
    name: "Modern Minimalist",
    description: "Clean and contemporary design",
    image: "/img/angel_maple.jpg",
  },
  {
    id: 2,
    name: "Vintage Romance",
    description: "Romantic vintage-inspired style",
    image: "/img/angel_maple.jpg",
  },
  {
    id: 3,
    name: "Garden Party",
    description: "Fresh and floral themed",
    image: "/img/angel_maple.jpg",
  },
];

// Modal state and form
const showModal = ref(false);
const selectedTemplate = ref(null);
const modalRef = ref(null);

const form = reactive({
  bride: "",
  groom: "",
  name: "",
  bride_fn: "",
  groom_fn: "",
  bride_desc: "",
  groom_desc: "",
  date: "",
  akad_date: "",
  akad_time: "",
  akad_place: "",
  akad_place_desc: "",
  akad_place_maps: "",
  resepsi_date: "",
  resepsi_time: "",
  resepsi_place: "",
  resepsi_place_desc: "",
  resepsi_place_maps: "",
});

function openCustomize(template) {
  selectedTemplate.value = template;
  // reset form
  Object.keys(form).forEach((k) => (form[k] = ""));
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}

// Close modal when clicking outside the modal container (native implementation)
function handleOutsideClick(e) {
  const el = modalRef && modalRef.value;
  if (!el) return;
  const target = e.target;
  // If modal is open and click target is outside modal element -> close
  if (showModal.value && target instanceof Node && !el.contains(target)) {
    closeModal();
  }
}

onMounted(() => document.addEventListener("pointerdown", handleOutsideClick));
onBeforeUnmount(() =>
  document.removeEventListener("pointerdown", handleOutsideClick)
);

const builtUrl = computed(() => {
  const base =
    selectedTemplate.value === null
      ? "https://wedding.amiw.dev/classic"
      : typeof window !== "undefined"
      ? window.location.origin + "/"
      : "/";
  const params = new URLSearchParams();
  for (const key of Object.keys(form)) {
    const v = form[key];
    if (v && v.toString().trim() !== "") params.append(key, v);
  }
  const qs = params.toString();
  return qs ? base + (base.includes("?") ? "&" : "?") + qs : base;
});

async function copyLink() {
  try {
    await navigator.clipboard.writeText(builtUrl.value);
    alert("Link copied to clipboard");
  } catch (e) {
    const ta = document.createElement("textarea");
    ta.value = builtUrl.value;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
    alert("Link copied to clipboard");
  }
}

function openLink() {
  window.open(builtUrl.value, "_blank");
}
</script>
