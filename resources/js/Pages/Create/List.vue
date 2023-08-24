<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Link, Head } from '@inertiajs/vue3';
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
  <Head title="クイズ一覧" />

  <AuthenticatedLayout>
    <template #header>
        <h2 class="font-semibold text-2xl text-gray-800 leading-tight">クイズ一覧</h2>
    </template>
    <div class="bg-gray-100 py-8">
      <div class="max-w-3xl mx-auto px-4">
        <ul class="space-y-4">
          <li v-for="quiz in quizzes" :key="quiz.id" class="bg-white rounded shadow-md p-4">
            <Link :href="'/list/' + quiz.id" class="block hover:underline">{{ quiz.title}}</Link>
          </li>
        </ul>
      </div>  
    </div>
  </AuthenticatedLayout>
</template>

