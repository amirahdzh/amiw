<template>
  <div
    class="py-20 px-4 min-h-screen bg-gradient-to-br from-[hsl(var(--alternate-background))] to-[hsl(var(--amiw)/0.08)]"
  >
    <div
      class="max-w-2xl mx-auto bg-white/80 dark:bg-black/40 rounded-xl shadow-lg p-8 mt-6"
    >
      <h1
        class="text-2xl font-bold mb-6 text-[hsl(var(--amiw))] flex items-center gap-2"
      >
        <svg
          class="w-7 h-7 text-[hsl(var(--amiw))]"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Amiw's Account List 🌺
      </h1>
      <p class="mb-4 text-gray-600 dark:text-gray-300 text-sm">
        Note: The account data shown below may contain minor inconsistencies or
        outdated information. Please tell to <b>Amiw</b> if there are any
        issues.
      </p>
      <div class="mb-6 flex items-center gap-3">
        <input
          v-model="unlockCode"
          type="text"
          placeholder="Enter unlock code"
          class="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--amiw))] bg-white/80 dark:bg-black/30"
        />
        <button
          @click="tryUnlock"
          class="px-4 py-2 rounded bg-[hsl(var(--amiw))] text-white font-semibold shadow hover:bg-[hsl(var(--amiw)/0.85)] transition"
        >
          Unlock
        </button>
        <span v-if="unlockError" class="text-red-500 text-sm ml-2"
          >Invalid code</span
        >
      </div>
      <div class="overflow-x-auto rounded-lg shadow">
        <table class="min-w-full bg-white/90 dark:bg-black/30 rounded-lg">
          <thead>
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider bg-[hsl(var(--amiw)/0.1)]"
              >
                Email
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider bg-[hsl(var(--amiw)/0.1)]"
              >
                Password
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider bg-[hsl(var(--amiw)/0.1)]"
              >
                Nickname
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(account, index) in accounts"
              :key="index"
              class="hover:bg-[hsl(var(--amiw)/0.07)] transition"
            >
              <td
                class="px-6 py-4 font-mono text-[15px] text-gray-900 dark:text-gray-100"
              >
                {{ unlocked ? account.username : "••••••••••" }}
              </td>
              <td
                class="px-6 py-4 font-mono text-[15px] text-gray-900 dark:text-gray-100"
              >
                {{ unlocked ? account.password : "••••••••••" }}
              </td>
              <td
                class="px-6 py-4 text-[15px] text-gray-700 dark:text-gray-200"
              >
                {{ account.nickname }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const codes = [
  "A9X2B7C4D1",
  "Q8W3E6R5T2",
  "Z7X6C5V4B3",
  "M1N2B3V4C5",
  "L6K7J8H9G0",
  "P2O3I4U5Y6",
  "T7R8E9W0Q1",
  "S2D3F4G5H6",
  "J7K8L9M0N1",
  "B2V3C4X5Z6",
  "Y7U8I9O0P1",
  "G2F3D4S5A6",
  "H7J8K9L0M1",
  "N2M3B4V5C6",
  "X7Z8A9S0D1",
  "F2G3H4J5K6",
  "L7M8N9B0V1",
  "C2X3Z4A5S6",
  "D7F8G9H0J1",
  "K2L3M4N5B6",
  "V7C8X9Z0A1",
  "A1B2C3D4E5",
  "F6G7H8I9J0",
  "K1L2M3N4O5",
  "P6Q7R8S9T0",
  "U1V2W3X4Y5",
  "Z6A7B8C9D0",
  "E1F2G3H4I5",
  "J6K7L8M9N0",
  "O1P2Q3R4S5",
  "T6U7V8W9X0",
  "Y1Z2A3B4C5",
  "D6E7F8G9H0",
  "I1J2K3L4M5",
  "N6O7P8Q9R0",
];

const accounts = ref([
  { username: "amirahdzh123", password: "Onepiece123", nickname: "Amy." },
  { username: "amirahdzh321", password: "Onepiece123", nickname: "a i r a" },
  { username: "erihicks123", password: "Onepiece123", nickname: "• S O R A •" },
  { username: "erihicks321", password: "Onepiece123", nickname: "=AIRA=" },
  {
    username: "viola321",
    password: "Onepiece123",
    nickname: "⏚ | S O R Δ | ⏚",
  },
  { username: "hiblues123", password: "Onepiece123", nickname: "miraaaaa" },
  { username: "hiblues321", password: "Onepiece123", nickname: "Phan Tat" },
  { username: "higreens123", password: "Onepiece123", nickname: "a m e e ." },
  { username: "higreens321", password: "Onepiece123", nickname: "Mii72" },
  { username: "sleepysleep", password: "Poochie098", nickname: "sleepysleep" },
]);

const unlockCode = ref("");
const unlocked = ref(false);
const unlockError = ref(false);

function tryUnlock() {
  if (codes.includes(unlockCode.value.trim())) {
    unlocked.value = true;
    unlockError.value = false;
  } else {
    unlockError.value = true;
    unlocked.value = false;
  }
}
</script>
