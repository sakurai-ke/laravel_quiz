<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// データを取得するためのリファレンス
const quizRecords = ref([]);
const expandedRecordId = ref(null); // アコーディオンの展開状態を管理する

// データを取得する関数
async function fetchQuizRecords() {
    try {
        const response = await axios.get('/api/quiz-results'); // データ取得エンドポイントを適切に変更
        quizRecords.value = response.data.sort((a, b) => {
            // created_at を比較して降順に並び替え
            return new Date(b.created_at) - new Date(a.created_at);
        });
        console.log('quizResults.value', response.data);
    } catch (error) {
        console.error('クイズの結果情報の取得に失敗しました', error);
    }
}

function toggleAccordion(recordId) {
    if (expandedRecordId.value === recordId) {
        expandedRecordId.value = null; // 同じアコーディオンをクリックで閉じる
    } else {
        expandedRecordId.value = recordId; // 別のアコーディオンを展開
    }
}

// コンポーネントがマウントされたときにデータを取得
onMounted(() => {
    fetchQuizRecords();
});
</script>

<template>
  <div class="bg-gray-100 py-8 px-4">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl font-semibold mb-4">クイズの結果情報</h1>
      <ul>
        <li v-for="record in quizRecords" :key="record.id" class="bg-white shadow-md p-4 mb-4 rounded-md">
          <div class="flex justify-between items-center">
            <h2 class="text-lg font-semibold">{{ new Date(record.created_at).toLocaleString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }) }}</h2>
            <button class="bg-blue-500 text-white px-3 py-1 rounded-md" @click="toggleAccordion(record.id)">
              回答詳細
            </button>
          </div>
          <div v-if="expandedRecordId === record.id" class="mt-2">
            <p class="text-gray-600">カテゴリー: {{ record.category.name }}</p>
            <p class="text-gray-600">問題数: {{ record.total_questions }}</p>
            <p class="text-gray-600">正解数: {{ record.correct_answers }}</p>
            <p class="text-gray-600">正答率: {{ record.accuracy }}%</p>
            <ul class="mt-2">
              <li v-for="result in record.results" :key="result.id" class="border-t border-gray-300 pt-2 mt-2">
                <p class="font-semibold">問題: {{ result.quiz.title }}</p>
                <p>選択した回答: {{ result.selected_choice }}</p>
                <p>結果: {{ result.correct ? '正解' : '不正解' }}</p>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

