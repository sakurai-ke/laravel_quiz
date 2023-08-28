<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import Chart from './Chart.vue';

const quizRecords = ref([]); // クイズの結果情報を格納
const expandedRecordId = ref(null); // アコーディオンの展開状態を管理する

const fromDate = ref(null); // Fromの日付
const toDate = ref(null); // Toの日付

const categoryAccuracyData = ref([]); // カテゴリーごとの正答率データを格納

// クイズの結果情報を取得する
async function fetchQuizRecords() {
    try {
        const response = await axios.get('/api/quiz-results'); // クイズの結果情報を取得
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

// フィルタリングされたクイズの結果情報を一時的に保存するための変数（フィルタリング後の結果に問題がある場合、元の状態に戻す必要があるため）
let lastFilteredResults = [];

// 検索ボタンがクリックされたときの処理
async function searchQuizResults() {
  try {
    const response = await axios.get('/api/quiz-results');
    // sort関数で新しい順に並べる
    const newQuizRecords = response.data.sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });

    let filteredResults = newQuizRecords;

    // From日付とTo日付が選択され、From日付がTo日付よりも未来の日付である場合、以下の処理
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
    // フィルタリング条件を変更して新しい検索を行った場合、もしバリデーションエラーが発生して新しい検索結果が得られなかった場合でも、
    // 前回のフィルタリング結果を保持して表示が可能
    lastFilteredResults = filteredResults;

        // カテゴリー別の正答率データを取得
        await fetchCategoryAccuracyData();

        console.log('categoryAccuracyData.valueの値:', categoryAccuracyData.value);
  } catch (error) {
    console.error('クイズの結果情報の取得に失敗しました', error);
  }
}

const categoryMapping = ref({});

// カテゴリー情報を取得する関数
async function fetchCategories() {
  try {
    const response = await axios.get('/api/categories'); // カテゴリー情報を取得するエンドポイント
    const categories = response.data;

    // カテゴリー情報をマッピングにセット
    categories.forEach(category => {
      categoryMapping.value[category.id] = category.name;
    });
  } catch (error) {
    console.error('カテゴリー情報の取得に失敗しました', error);
  }
}

// カテゴリー別の正答率データを取得する関数
async function fetchCategoryAccuracyData() {
  try {
    // クイズ結果を取得（期間指定に基づいて）
    const response = await axios.get('/api/quiz-results');

    // 期間指定のフィルタリングを行う
    let filteredResults = response.data;
    
    if (fromDate.value) {
      const fromDateTime = utcToZonedTime(parseISO(fromDate.value), 'UTC');
      filteredResults = filteredResults.filter(record => new Date(record.created_at) >= fromDateTime);
    }

    if (toDate.value) {
      const nextDay = new Date(toDate.value);
      nextDay.setDate(nextDay.getDate() + 1);
      filteredResults = filteredResults.filter(record => new Date(record.created_at) < nextDay);
    }

    // カテゴリー別の正答数を計算
    const categoryCorrectAnswers = {};
    const categoryTotalQuestions = {};

    filteredResults.forEach(record => {
      const categoryId = record.category_id;

      if (!categoryCorrectAnswers[categoryId]) {
        categoryCorrectAnswers[categoryId] = 0;
      }
      if (!categoryTotalQuestions[categoryId]) {
        categoryTotalQuestions[categoryId] = 0;
      }

      categoryCorrectAnswers[categoryId] += record.correct_answers;
      categoryTotalQuestions[categoryId] += record.total_questions;
    });

    // カテゴリー別の正答率を計算して配列に格納
    categoryAccuracyData.value = Object.keys(categoryCorrectAnswers).map(categoryId => ({
      name: getCategoryName(categoryId),
      accuracy: calculateAccuracy(categoryCorrectAnswers[categoryId], categoryTotalQuestions[categoryId]),
    }));

        // 未回答のカテゴリーを追加
        const unansweredCategories = fetchUnansweredCategories(filteredResults.map(record => record.category_id));
    unansweredCategories.forEach(categoryId => {
      categoryAccuracyData.value.push({
        name: getCategoryName(categoryId),
        accuracy: 0,
      });
    });

  } catch (error) {
    console.error('カテゴリー別の正答率データの取得に失敗しました', error);
  }
}

// 未回答のカテゴリーを特定する関数
function fetchUnansweredCategories(answeredCategories) {
  // カテゴリー名を含む全てのカテゴリーの配列を作成
  const allCategories = Object.keys(categoryMapping.value).map(Number);
  return allCategories.filter(categoryId => !answeredCategories.includes(categoryId));
}

// カテゴリー名を取得するヘルパー関数
function getCategoryName(categoryId) {
  return categoryMapping.value[categoryId] || 'Unknown Category';
}

// 正答率を計算する関数
function calculateAccuracy(correctAnswers, totalQuestions) {
  if (totalQuestions === 0) {
    return 0;
  }
  return ((correctAnswers / totalQuestions) * 100).toFixed(2);
}


// コンポーネントがマウントされたときにデータを取得
onMounted(() => {
    fetchQuizRecords();
    fetchCategories(); // カテゴリー情報を取得
    fetchCategoryAccuracyData(); // レーダーチャートのデータを取得

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
                  
              <Chart :categoryData="categoryAccuracyData" v-if="categoryAccuracyData.length > 0" />


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
                  {{ expandedRecordId === record.id ? '閉じる' : '回答詳細' }}
              </button>

            </div>
            <div v-if="expandedRecordId === record.id" class="mt-4 p-4 bg-gray-100 rounded-md">
              <div class="border-b border-gray-300 pb-2 mb-2">
                <h3 class="text-xl font-semibold mb-1">回答詳細</h3>
                <p class="text-gray-600">問題数: {{ record.total_questions }}</p>
                <p class="text-gray-600">正解数: {{ record.correct_answers }}</p>
                <p class="text-gray-600">正答率: {{ record.accuracy }}%</p>
              </div>
              <ul class="space-y-4">
                <li v-for="result in record.results" :key="result.id">
                  <div class="border border-gray-300 rounded-md p-4">
                    <h4 class="text-lg font-semibold mb-2">{{ result.quiz.title }}</h4>
                    <p><strong>選択した回答:</strong> {{ result.selected_choice }}</p>
                    <p><strong>結果:</strong> {{ result.correct ? '正解' : '不正解' }}</p>
                    <p><strong>正解:</strong> {{ result.quiz.correct_answer }}</p>
                    <p><strong>誤答1:</strong> {{ result.quiz.wrong_answer_1 }}</p>
                    <p><strong>誤答2:</strong> {{ result.quiz.wrong_answer_2 }}</p>
                    <p><strong>誤答3:</strong> {{ result.quiz.wrong_answer_3 }}</p>
                    <p><strong>解説:</strong> {{ result.quiz.explain }}</p>
                  </div>
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