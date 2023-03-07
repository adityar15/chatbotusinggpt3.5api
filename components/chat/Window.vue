<template>
  <div class="w-80 h-96 absolute bottom-[68px] right-8 shadow shadow-gray-600 rounded-lg overflow-hidden flex flex-col bg-black">
    <header class="w-full h-10 flex-none bg-gradient-to-r flex items-center justify-between px-3 from-purple-600 to-violet-600">
      <h1 class="text-lg text-gray-50 font-semibold">AI BOT</h1>
    </header>

    <div class="messages flex flex-col h-full
    space-y-4 w-full overflow-x-hidden overflow-y-auto py-8 scroll-smooth" ref="messageContainer">
      <ChatBubble v-for="(message, index) in messages" :key="index" :role="message.role">
        <span v-html="message.content">
        </span>
      </ChatBubble>
      <ChatBubble v-if="typing" role="assistant">
        <ChatTyping />
      </ChatBubble>
    </div>

    <form @submit.prevent="sendMessage" class="flex items-center mt-auto">
      <input
        v-model="messageText"
        type="text"
        class="w-full py-6 px-3 h-10 bg-gray-900 text-purple-200 border border-gray-900 placeholder:text-gray-600 outline-none focus:outline-none transition-all duration-150 ease-in-out focus:border-purple-600"
        placeholder="Enter your message here ..." />
      <button class="btn btn-md btn-primary rounded-none">
        <PaperAirplaneIcon class="h-6 w-6 fill-white -rotate-45" />
      </button>
    </form>
  </div>
</template>

<script setup>
import { PaperAirplaneIcon } from "@heroicons/vue/24/solid"

const messageText = ref("")

const typing = ref(false)

const messages = ref([
  { role: "assistant", content: "Hello, how can I help you?" },
  { role: "assistant", content: "You can ask me anything you like about our services." },
])

const messageContainer = ref()

function sendMessage() {
  messages.value = [...messages.value, { role: "user", content: messageText.value }]
  typing.value = true
  messageText.value = ""
  
  setTimeout(() => {
    messageContainer.value.scrollTop = messageContainer.value.scrollHeight
  }, 500)
 
  $fetch("/api/sendmessage", {
    method: "POST",
    body: JSON.stringify({ messages: messages.value }),
  }).then((res) => {
    let received = res.message
    // replace link with anchor tags
    received.content = replaceLinkWithAnchorTags(received.content)
    messages.value = [...messages.value, received]
    typing.value = false

    messageContainer.value.scrollTop = messageContainer.value.scrollHeight
    
  })
}

function replaceLinkWithAnchorTags(text) {
  let regex = /https?:\/\/[^\s]+/g;
  return text.replace(regex, (match)=> '<a href="' + match.replace(/\.$/,"") + '" class="underline" target="_blank">link here</a>');
}


</script>
