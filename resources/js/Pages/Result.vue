<script setup>
import { Link } from '@inertiajs/vue3';
import { defineProps } from 'vue';

const props = defineProps({
  resultMessage: String
});
</script>

<template>
  <div class="mt-8"> <!-- ここで全体的に少し下に移動 -->
    <div class="w-full max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 class="text-xl font-semibold mb-4">クイズ結果</h2>
      <p>{{ resultMessage }}</p>
      <p>お疲れ様です！クイズが終了しました！</p>
      
      <!-- ここで "トップへ戻る" リンクを表示 -->
      <div class="mt-4">
        <Link :href="route('top')" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
          トップへ戻る
        </Link>
      </div>
    </div>
  </div>
</template>