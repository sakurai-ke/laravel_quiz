<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import Chart from './Chart.vue';

// データを取得するためのリファレンス
const quizRecords = ref([]);
const expandedRecordId = ref(null); // アコーディオンの展開状態を管理する

const fromDate = ref(null); // Fromの日付
const toDate = ref(null); // Toの日付

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

const errorMessages = {
  dateValidation: "Fromの日付はTo以前の日付を選択してください"
};

let validationError = ref("");

let lastFilteredResults = []; // 前回の検索結果を保存する変数

// 検索ボタンがクリックされたときの処理
async function searchQuizResults() {
  try {
    const response = await axios.get('/api/quiz-results');
    const newQuizRecords = response.data.sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });

    let filteredResults = newQuizRecords;

    if (fromDate.value && toDate.value && new Date(fromDate.value) > new Date(toDate.value)) {
      // バリデーションエラーがある場合、エラーメッセージを表示して処理を中断
      validationError.value = errorMessages.dateValidation;

      // エラーがある場合は前回の検索結果をそのまま表示
      quizRecords.value = lastFilteredResults;
      return;
    } else {
      // エラーメッセージをクリア
      validationError.value = "";
    }

    if (fromDate.value) {
      // 日付をISO 8601 形式に変換してタイムゾーンを UTC に設定
      const fromDateTime = utcToZonedTime(parseISO(fromDate.value), 'UTC');
      filteredResults = filteredResults.filter(record => new Date(record.created_at) >= fromDateTime);
    }

    if (toDate.value) {
      // 日付をISO 8601 形式に変換してタイムゾーンを UTC に設定
      // const toDateTime = utcToZonedTime(parseISO(toDate.value), 'UTC');
      const nextDay = new Date(toDate.value);
      nextDay.setDate(nextDay.getDate() + 1);
      filteredResults = filteredResults.filter(record => new Date(record.created_at) < nextDay);
    }

    quizRecords.value = filteredResults;
    lastFilteredResults = filteredResults; // 新しい検索結果を保存
  } catch (error) {
    console.error('クイズの結果情報の取得に失敗しました', error);
  }
}


// レーダーチャートのデータを作成する関数
function generateCategoryChartData(records) {
  const categoryData = {};

  // カテゴリーごとに正答率を集計
  records.value.forEach(record => { // recordsの値には.valueを使用
    if (!categoryData[record.category.name]) {
      categoryData[record.category.name] = {
        category: record.category.name,
        accuracy: 0,
        count: 0,
      };
    }
    categoryData[record.category.name].accuracy += record.accuracy;
    categoryData[record.category.name].count++;
  });

  // 正答率を平均に変換
  Object.keys(categoryData).forEach(categoryName => {
    const category = categoryData[categoryName];
    category.accuracy = category.accuracy / category.count;
  });

  return Object.values(categoryData);
}

// カテゴリーごとのデータを計算
const categoryData = computed(() => generateCategoryChartData(quizRecords));

// コンポーネントがマウントされたときにデータを取得
onMounted(() => {
    fetchQuizRecords();
});
</script>

<template>
  <Head title="クイズの結果情報" />

  <AuthenticatedLayout>
    <template #header>
        <h2 class="font-semibold text-2xl text-gray-800 leading-tight">クイズの結果情報</h2>
    </template>

    <div class="bg-gray-100 py-8 px-4">
      <div class="max-w-3xl mx-auto">

        <!-- FromとToの日付選択フォーム -->
        <div class="flex space-x-4 mb-4">
          <label for="fromDate" class="flex items-center">
            <span class="mr-1">From:</span>
            <input type="date" id="fromDate" v-model="fromDate" class="px-2 py-1 border rounded-md">
          </label>
          <label for="toDate" class="flex items-center">
            <span class="mr-1">To:</span>
            <input type="date" id="toDate" v-model="toDate" class="px-2 py-1 border rounded-md">
          </label>
          <button @click="searchQuizResults" class="bg-blue-500 text-white px-3 py-1 rounded-md">
            検索
          </button>
        </div>

              <!-- バリデーションエラーメッセージを表示 -->
              <p v-if="validationError" class="text-red-500">{{ validationError }}</p>

              <Chart :categoryData="categoryData"></Chart>
                          
        <ul>
          <li v-for="record in quizRecords" :key="record.id" class="bg-white shadow-md p-4 mb-4 rounded-md">
            <div class="flex justify-between items-center">
              <div>
                <h2 class="text-lg font-semibold">{{ new Date(record.created_at).toLocaleString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }) }}</h2>
                <!-- 日付の横にクイズのカテゴリー名を表示 -->
                <p class="text-gray-600">カテゴリー: {{ record.category.name }}</p>
                <!-- 日付の横にクイズの出題数を表示 -->
                <p class="text-gray-600">出題数: {{ record.total_questions }}</p>
              </div>
              <button class="bg-blue-500 text-white px-3 py-1 rounded-md" @click="toggleAccordion(record.id)">
                回答詳細
              </button>
            </div>
            <div v-if="expandedRecordId === record.id" class="mt-2">
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
  </AuthenticatedLayout>
</template>

<style scoped>
/* カテゴリー名と出題数を横並びにする */
.text-gray-600 {
  display: inline-block;
  margin-right: 10px;
}

/* 「回答詳細」ボタンのスタイルを調整 */
button.bg-blue-500 {
  background-color: #3490dc;
  transition: background-color 0.3s ease-in-out;
}
button.bg-blue-500:hover {
  background-color: #2779bd;
}
</style>