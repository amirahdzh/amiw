<template>
  <div class="container">
    <h1>Discord Bot Dashboard</h1>
    <p>Welcome to your Discord bot management page!</p>
    <div
      class="bot-card"
      @click="$router.push(`${$route.fullPath.replace(/\/$/, '')}/amiws-bot`)"
      style="
        cursor: pointer;
        margin-top: 32px;
        padding: 20px;
        background: #2c2f33;
        border-radius: 6px;
        box-shadow: 0 2px 8px #0003;
        transition: box-shadow 0.2s;
      "
    >
      <img
        src="https://cdn.discordapp.com/app-icons/123456789012345678/amiwsbot.png"
        alt="AmiwsBot"
        style="
          width: 64px;
          height: 64px;
          border-radius: 50%;
          margin-bottom: 12px;
        "
      />
      <h2 style="color: #43b581; margin-bottom: 8px">AmiwsBot</h2>
      <p style="color: #b9bbbe">Manage AmiwsBot settings and features.</p>
    </div>
  </div>
</template>

<script setup>
// No script logic for this simple page
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 40px auto;
  padding: 24px;
  background: #23272a;
  color: #fff;
  border-radius: 8px;
  text-align: center;
}
h1 {
  margin-bottom: 16px;
  color: #7289da;
}
</style>
