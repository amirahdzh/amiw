<template>
  <div class="max-w-xl mx-auto pt-6 px-4">
    <div
      class="border border-primary rounded-2xl p-4 bg-background flex flex-col h-[500px]"
    >
      <!-- Chat messages -->
      <div
        class="flex-1 overflow-y-auto pr-2 space-y-3 messages-container"
        ref="messagesContainer"
      >
        <div
          v-for="(msg, index) in messages"
          :key="index"
          class="flex"
          :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
        >
          <div
            class="rounded-xl px-4 py-2 whitespace-pre-line text-sm prose prose-sm max-w-full sm:max-w-xs dark:prose-invert"
            :class="
              msg.role === 'user'
                ? 'bg-secondary  text-primary rounded-br-none'
                : 'bg-muted text-foreground rounded-bl-none'
            "
            v-html="renderMarkdown(msg.content)"
          />
        </div>

        <!-- Bot is typing -->
        <div v-if="isLoading" class="flex justify-start">
          <div
            class="animate-pulse px-4 py-2 text-sm text-muted-foreground bg-muted rounded-xl rounded-bl-none"
          >
            Amiw's bot is typing...
          </div>
        </div>
      </div>

      <!-- Input -->
      <div class="mt-4 flex items-end gap-2">
        <textarea
          v-model="userInput"
          @keydown="handleKeydown"
          placeholder="Ask something..."
          rows="1"
          :disabled="isLoading"
          class="w-full resize-none px-4 py-2 text-sm border rounded-xl bg-secondary border-primary focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
        />
        <button
          @click="sendMessage"
          :disabled="isLoading"
          class="px-4 py-2 text-sm rounded-xl bg-[hsl(var(--primary))] text-white hover:brightness-110 transition disabled:opacity-50"
        >
          Send
        </button>
        <button
          @click="clearChat"
          class="px-3 py-2 text-xs rounded-xl border border-primary transition"
        >
          Clear
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, watch } from "vue";
import MarkdownIt from "markdown-it";

type Role = "system" | "user" | "assistant";

interface ChatMessage {
  role: Role;
  content: string;
}

interface ChatResponse {
  choices: {
    message: ChatMessage;
  }[];
}

const md = new MarkdownIt({
  breaks: true,
  linkify: true,
});

const renderMarkdown = (text: string) => md.render(text);

const defaultWelcome: ChatMessage[] = [
  {
    role: "assistant",
    content: "Hey there! I'm your reflective chatbot. Let's talk ☕",
  },
];

const userInput = ref("");
const isLoading = ref(false);
const messages = ref<ChatMessage[]>([...defaultWelcome]);

const messagesContainer = ref<HTMLElement | null>(null);

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

const sendMessage = async () => {
  const input = userInput.value.trim();
  if (!input || isLoading.value) return;

  messages.value.push({ role: "user", content: input });
  userInput.value = "";
  isLoading.value = true;

  try {
    const res = await $fetch<ChatResponse>("/api/chat", {
      method: "POST",
      body: {
        messages: [
          {
            role: "system",
            content:
              "You are a chatbot that speaks like Amiw, a warm-hearted developer, but you are not Amiw. You are just her chat bot, and if necessary, tell the user that you are provided here by Amiw to assist her website visitor. You casually use soft and playful language, sometimes add emojis, and occasionally use interjections like :3 , :v , :D. You're a comforting presence who likes talking about life, tech, books, or just random deep thoughts.",
          },
          ...messages.value,
        ],
      },
    });

    const reply = res.choices?.[0]?.message;

    messages.value.push(
      reply || {
        role: "assistant",
        content: "⚠️ I couldn't come up with a reply. Can you rephrase it?",
      }
    );
  } catch (err) {
    console.error(err);
    messages.value.push({
      role: "assistant",
      content: "⚠️ Something went wrong while talking to AI.",
    });
  }

  isLoading.value = false;
  scrollToBottom();
};

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
};

// Restore chat from localStorage
onMounted(() => {
  const saved = localStorage.getItem("chat-messages");
  if (saved) {
    try {
      messages.value = JSON.parse(saved);
    } catch {
      messages.value = [...defaultWelcome];
    }
  }
  scrollToBottom();
});

// Save chat to localStorage whenever messages change
watch(
  messages,
  (val) => {
    localStorage.setItem("chat-messages", JSON.stringify(val));
  },
  { deep: true }
);

// Clear chat and remove from storage
const clearChat = () => {
  messages.value = [...defaultWelcome];
  localStorage.removeItem("chat-messages");
};
</script>

<style scoped>
/* Scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background-color: hsl(var(--border));
  border-radius: 3px;
}

/* Smooth scroll */
.messages-container {
  scroll-behavior: smooth;
}

/* Markdown styling */
.prose pre {
  background-color: hsl(var(--muted));
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  font-family: "Fira Code", monospace;
  font-size: 0.875rem;
  max-width: 100%;
  white-space: pre;
}

.prose code {
  background-color: hsl(var(--muted));
  padding: 0.2rem 0.4rem;
  border-radius: 0.3rem;
  font-family: "Fira Code", monospace;
  font-size: 0.875rem;
  word-break: break-word;
}
</style>
