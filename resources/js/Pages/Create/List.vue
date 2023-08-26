<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Link, Head } from '@inertiajs/vue3';
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

const quizzes = ref([]);
console.log('quizzes', quizzes);
const categories = ref([]);
const selectedCategory = ref('all'); // 初期選択は「全て」

onMounted(() => {
  getquizzes();
  getCategories();
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

async function getCategories() {
  try {
    const response = await axios.get('/api/categories');
    categories.value = response.data;
  } catch (error) {
    console.error('カテゴリー一覧の取得に失敗しました', error);
  }
}

// カテゴリー別のクイズ一覧を計算する算出プロパティ
const filteredQuizzes = computed(() => {
  if (selectedCategory.value === 'all') { // .value を追加
    return quizzes.value;
  } else {
    return quizzes.value.filter(quiz => quiz.category_id === selectedCategory.value); // .value を追加
  }
});

// 作成日時をフォーマットするヘルパー関数
function formatDate(dateTime) {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  return new Date(dateTime).toLocaleDateString(undefined, options);
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

        <select v-model="selectedCategory" class="block w-40 bg-white border border-gray-300 p-2 rounded shadow-sm">
          <option value="all">全て</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
        </select>

        <ul class="mt-4 space-y-4">
          <li v-for="quiz in filteredQuizzes" :key="quiz.id" class="bg-white rounded shadow-md p-4">
            <Link :href="'/list/' + quiz.id" class="block hover:underline text-xl font-semibold mb-2">{{ quiz.title }}</Link>
            <p class="text-gray-600">作成日時: {{ formatDate(quiz.created_at) }}</p>
            <p class="text-gray-600">カテゴリー名: {{ quiz.category.name }}</p>
          </li>
        </ul>
      </div>
    </div>
  </AuthenticatedLayout>
</template>

<style scoped>
/* 背景カラーを設定 */
.bg-gray-100 {
  background-color: #f7fafc;
}

/* ボックスシャドウを追加 */
.shadow-md {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* リンクのスタイルを設定 */
.hover\:underline:hover {
  text-decoration: underline;
}

/* テキストのカラーを調整 */
.text-gray-600 {
  color: #718096;
}
</style>
