<template>
    <button class="absolute bottom-0 right-0 rounded-full h-16 w-16 p-1 bg-purple-700 grid place-items-center" @click="toggleStates">
        <ChatBubbleLeftIcon class="h-10 w-10 fill-white" />
    </button>
</template>

<script setup>
import {ChatBubbleLeftIcon} from "@heroicons/vue/24/solid"

const {chatWindow, chatInitiated} = useChatState()

function toggleStates() {
    chatWindow.value = !chatWindow.value
    chatInitiated.value = true
}

</script>

