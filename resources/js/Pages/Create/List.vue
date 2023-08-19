<script setup>
import { Link } from '@inertiajs/vue3';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const quizzes = ref([]);
console.log('quizzes', quizzes);

onMounted(() => {
  getquizzes();
});

async function getquizzes() {
  try {
    const response = await axios.get('/api/getQuizzes'); // クイズ一覧を取得するAPIエンドポイントに合わせて変更
    console.log('response.data', response.data.quizzes);
    quizzes.value = response.data.quizzes;
  } catch (error) {
    console.error('クイズ一覧の取得に失敗しました', error);
  }
}
</script>

<template>
  <div class="bg-gray-100 py-8">
    <div class="max-w-3xl mx-auto px-4">
      <h2 class="text-2xl font-semibold mb-4">クイズ一覧</h2>
      <ul class="space-y-4">
        <li v-for="quiz in quizzes" :key="quiz.id" class="bg-white rounded shadow-md p-4">
          <Link :href="'/list/' + quiz.id" class="block hover:underline">{{ quiz.title}}</Link>
        </li>
      </ul>
    </div>  
  </div>
</template>

