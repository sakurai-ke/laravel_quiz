<template>
    <div v-if="message" class="fixed top-0 left-0 w-full p-4 bg-green-500 text-white text-center z-50">
        {{ message }}
    </div>
</template>

<script setup>
const { ref, watch } = Vue;

const message = ref('');

watch(message, () => {
    if (message.value) {
        setTimeout(() => {
        message.value = '';
      }, 3000); // メッセージを3秒後に非表示にする
    }
});
</script>