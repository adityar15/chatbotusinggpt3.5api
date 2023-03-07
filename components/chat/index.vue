<template>
  <div class="fixed bottom-1 right-2">
    <div class="relative">
      <ChatWindow v-if="chatWindow" />
      <ChatButton />
    </div>
  </div>
</template>

<script setup>
const { chatWindow } = useChatState()
</script>
