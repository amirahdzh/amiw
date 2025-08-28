<template>
  <div class="readme-container">
    <h1>amiw-bot</h1>
    <p class="lead">
      A customizable Discord bot for your server, featuring slash commands,
      reaction roles, and more. Easily extendable for future features.
    </p>

    <section>
      <h2>Features</h2>
      <ul>
        <li>
          Slash commands (e.g., <code>/ping</code>, <code>/account</code>)
        </li>
        <li>Dynamic reaction roles</li>
        <li>Private and public messaging</li>
        <li>Easy configuration and extension</li>
      </ul>
    </section>

    <section>
      <h2>Getting Started</h2>
      <ol>
        <li>Clone the repository</li>
        <li>Run <code>npm install</code></li>
        <li>Create a <code>.env</code> file (see <code>.env.example</code>)</li>
        <li>
          Deploy commands: <code>npx ts-node src/deploy-commands.ts</code>
        </li>
        <li>Start the bot: <code>npm run dev</code></li>
      </ol>
    </section>

    <section>
      <h2>Configuration</h2>
      <ul>
        <li>
          Edit <code>src/utils/reactionRoleMap.ts</code> for reaction roles
        </li>
        <li>Add or modify commands in <code>src/commands/</code></li>
      </ul>
    </section>

    <section>
      <h2>License</h2>
      <p>MIT</p>
    </section>
  </div>
</template>

<script setup lang="ts">
// No script logic needed for static README page
</script>

<style scoped>
.readme-container {
  max-width: 700px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.07);
  font-family: "Segoe UI", "Roboto", "Arial", sans-serif;
}
.lead {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 1.5rem;
}
h1 {
  color: #3eaf7c;
  margin-bottom: 0.5rem;
}
h2 {
  color: #35495e;
  margin-top: 2rem;
}
ul,
ol {
  margin-left: 1.5rem;
}
code {
  background: #f4f4f4;
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 0.95em;
}
</style>
