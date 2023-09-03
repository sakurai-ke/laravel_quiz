<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import { ref, onMounted, computed, onBeforeUnmount, watch } from 'vue';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import Chart from './Chart.vue';
import Line from 'chart.js/auto';

const currentPage = ref(1); // 現在のページ
let totalPages = computed(() => Math.ceil(quizRecords.value.length / 10)); // 10件ずつのページ数

const quizRecords = ref([]); // クイズの結果情報を格納
const expandedRecordId = ref(null); // アコーディオンの展開状態を管理する
const fromDate = ref(null); // Fromの日付
const toDate = ref(null); // Toの日付
const categoryAccuracyData = ref([]); // カテゴリーごとの正答率データを格納




// チャートのインスタンス
const lineChartCanvas = ref(null);
const lineChartInstance = ref(null); // グラフのインスタンスを保持する変数を宣言
// カテゴリーのプロパティを定義
const categories = ref([]);
// セレクトボックスで選択したカテゴリーのID
const selectedCategory = ref('all');




const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const paginatedRecords = computed(() => {
    const startIndex = (currentPage.value - 1) * 10;
    const endIndex = startIndex + 10;
    return quizRecords.value.slice(startIndex, endIndex);
  });

// 省略部分を含むページネーションのリンクを生成
function generatePaginationLinks(totalPages, currentPage) {
  const maxVisibleLinks = 5; // 表示するページリンクの最大数
  const links = [];

    // totalPagesが1以下の場合はページネーションを表示しない
    if (totalPages <= 1) {
    return links;
  }
  
  // 常に最初のページを表示
  links.push(1);

  // 省略部分の追加
  if (currentPage > 3) {
    links.push('...'); // 省略部分の前に「...」を追加
  }

  // 現在のページの前後に一定数のページリンクを表示
  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    if (i > 1 && i < totalPages) {
      links.push(i);
    }
  }

  // 省略部分の追加
  if (currentPage < totalPages - 2) {
    links.push('...'); // 省略部分の後に「...」を追加
  }

  // 常に最後のページを表示
  links.push(totalPages);

  return links;
}


// クイズの結果情報を取得する
async function fetchQuizRecords() {
    try {
        const response = await axios.get('/api/quiz-results'); // クイズの結果情報を取得
        quizRecords.value = response.data.sort((a, b) => {
            // created_at を比較して降順に並び替え
            return new Date(b.created_at) - new Date(a.created_at);
        });

        // 正しい時間帯で created_at を修正
        quizRecords.value.forEach(record => {
            record.created_at = utcToZonedTime(new Date(record.created_at), 'Asia/Tokyo');
        });

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
    const newQuizRecords = response.data.sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });

    let filteredResults = newQuizRecords;

    if (fromDate.value && toDate.value && new Date(fromDate.value) > new Date(toDate.value)) {
      validationError.value = errorMessages.dateValidation;
      return;
    } else {
      validationError.value = "";
    }

    const fromDateTime = fromDate.value ? utcToZonedTime(parseISO(fromDate.value), 'Asia/Tokyo') : null;
    const toDateTime = toDate.value ? utcToZonedTime(parseISO(toDate.value), 'Asia/Tokyo') : null;
    if (toDateTime) {
  toDateTime.setHours(toDateTime.getHours() + 24);
}
    console.log('fromDateTime', fromDateTime);
   console.log('toDateTime', toDateTime);

    filteredResults = filteredResults.filter(record => {
      const recordDateTime = utcToZonedTime(parseISO(record.created_at), 'Asia/Tokyo');
      return (!fromDateTime || recordDateTime >= fromDateTime) && (!toDateTime || recordDateTime <= toDateTime);
    });

    // 正しい時間帯で created_at を修正
    filteredResults.forEach(record => {
      record.created_at = utcToZonedTime(new Date(record.created_at), 'Asia/Tokyo');
    });

    // 更新されたフィルタリング結果を保持
    lastFilteredResults = filteredResults;

    // カテゴリー別の正答率データを取得
    await fetchCategoryAccuracyData();
    // 正答率の折れ線グラフのデータをフィルタリングして再描画
    const filteredQuizRecords = filterQuizRecordsByDate(filteredResults);
    console.log('filteredQuizRecords', filteredQuizRecords);
    quizRecords.value = filteredQuizRecords;
    updateLineGraphKey();
    drawLineChart(filterAccuracyData(filteredQuizRecords));
    console.log('quizRecords.value', quizRecords.value);
  } catch (error) {
    console.error('クイズの結果情報の取得に失敗しました', error);
  }
}


// データを日付でフィルタリングする関数
function filterQuizRecordsByDate(data) {
  if (!fromDate.value && !toDate.value) {
    return data; // FromとToが未選択の場合は全データを表示
  }

  const fromDateValue = fromDate.value ? utcToZonedTime(new Date(fromDate.value), 'UTC') : null;
  const toDateValue = toDate.value ? utcToZonedTime(new Date(toDate.value), 'UTC') : null;

if (toDateValue) {
  toDateValue.setHours(toDateValue.getHours() + 24);
}
  console.log('fromDateValue3', fromDateValue);
  console.log('toDateValue3', toDateValue);
  return data.filter(record => {
    const recordDate = utcToZonedTime(new Date(record.created_at), 'Asia/Tokyo');

    // FromとToの日付範囲内にあるレコードをフィルタリング
    return (!fromDateValue || recordDate >= fromDateValue) && (!toDateValue || recordDate <= toDateValue);
  });
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
      const fromDateTime = utcToZonedTime(new Date(fromDate.value), 'UTC');
      filteredResults = filteredResults.filter(record => new Date(record.created_at) >= fromDateTime);
      console.log('fromDateTime2', fromDateTime);
    }

    if (toDate.value) {
      const nextDay = utcToZonedTime(new Date(toDate.value), 'UTC');
      nextDay.setDate(nextDay.getDate() + 1);
      filteredResults = filteredResults.filter(record => new Date(record.created_at) < nextDay);
      console.log('toDateTime2', nextDay);
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

    console.log('filteredResults: ', filteredResults);

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

const filteredQuizRecords = computed(() => filterQuizRecordsByDate(quizRecords.value));

// ランダムな値を生成する関数
function generateRandomKey() {
  return Math.random().toString(36).substring(7);
}

// リアクティブなキーを生成
const lineGraphKey = ref(generateRandomKey());

// fromDate か toDate が変更されたら新しいキーを設定する
function updateLineGraphKey() {
  lineGraphKey.value = generateRandomKey();
}




// フィルタリングされた正答率データを保持する変数を追加
const filteredCategoryAccuracyData = ref([]);

// フィルタリングされた正答率データを更新する関数
function updateFilteredCategoryAccuracyData() {
  // 正答率データをフィルタリング
  filteredCategoryAccuracyData.value = filterAccuracyData(categoryAccuracyData.value);
}

// fetchCategories 関数を定義
async function LinefetchCategories() {
  try {
    const response = await axios.get('/api/categories');
    categories.value = response.data;
  } catch (error) {
    console.error('カテゴリー情報の取得に失敗しました', error);
  }
}

const filteredData = ref([]); // filteredData を ref でラップ

// 正答率データのフィルタリングを監視
watch([categoryAccuracyData, fromDate, toDate], updateFilteredCategoryAccuracyData);

// ページがアンマウントされる前に選択カテゴリーをデフォルトにリセット
onBeforeUnmount(() => {
  selectedCategory.value = 'all'; // ページがアンマウントされる前に選択カテゴリーをデフォルトにリセット
});

// 正答率データをフィルタリングする関数
function filterAccuracyData(records) {
  if (!fromDate.value && !toDate.value) {
    return records; // FromとToが未選択の場合は全データを表示
  }

  const fromDateValue = fromDate.value ? utcToZonedTime(new Date(fromDate.value), 'UTC') : null;
const toDateValue = toDate.value ? utcToZonedTime(new Date(toDate.value), 'UTC') : null;
if (toDateValue) {
  toDateValue.setHours(toDateValue.getHours() + 24);
}

// fromDateValue と toDateValue が null でない場合にフォーマットする
const formattedFromDate = fromDateValue ? fromDateValue.toLocaleString('ja-JP') : '';
const formattedToDate = toDateValue ? toDateValue.toLocaleString('ja-JP') : '';

console.log('fromDateValue4', formattedFromDate);
console.log('toDateValue4', formattedToDate);

  return records.filter(record => {
    const recordDate = new Date(record.created_at).getTime();
    return recordDate >= fromDateValue && recordDate <= toDateValue;
  });
}

// drawLineChart 関数を修正
function drawLineChart(data) {
  if (!lineChartCanvas.value) {
    return;
  }

  if (lineChartInstance.value) {
    lineChartInstance.value.destroy();
    lineChartInstance.value = null;
  }

  if (Object.keys(data).length === 0) {
    return;
  }

  const selectedCategoryData = getSelectedCategoryData(); // 選択されたカテゴリーのデータを取得
  const accuracyData = [];
  const dateLabels = [];

  for (const key in selectedCategoryData) {
    const record = selectedCategoryData[key];
    accuracyData.push(record.accuracy);
    dateLabels.push(new Date(record.created_at).toLocaleDateString());
  }

  const ctx = lineChartCanvas.value.getContext('2d');
  lineChartInstance.value = new Line(ctx, {
    type: 'line',
    data: {
      labels: dateLabels,
      datasets: [
        {
          label: '正答率',
          data: accuracyData,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    },
    options: {
      scales: {
        x: {
          title: {
            display: true,
            text: '日付',
          },
          reverse: true,
        },
        y: {
          title: {
            display: true,
            text: '正答率 (%)',
          },
        },
      },
    },
  });
}


// セレクトボックスで選択したカテゴリー情報を取得する関数
function getSelectedCategoryData() {
  if (selectedCategory.value === 'all') {
    return quizRecords.value; // .value を追加して quizRecords を配列として取得
  } else {
    return quizRecords.value.filter(record => record.category_id === selectedCategory.value);
  }
}

// セレクトボックスで選択されたカテゴリーの表示ラベルを取得する関数
function getSelectedCategoryLabel() {
  if (selectedCategory.value === 'all') {
    return '全て';
  } else {
    const category = categories.value.find(cat => cat.id === selectedCategory.value);
    return category ? category.name : 'Unknown Category';
  }
}

// onMounted フックを使用してグラフを描画
onMounted(async () => {
  await LinefetchCategories();
  // グラフを初回描画
  drawLineChart(filterAccuracyData(getSelectedCategoryData()));
});


// セレクトボックスで選択されたカテゴリーの変更を監視
watch(selectedCategory, () => {
  // グラフを再描画
  drawLineChart(filterAccuracyData(getSelectedCategoryData()));
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

                <div>
    <select v-model="selectedCategory">
      <option value="all">全て</option>
      <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
    </select>
    <canvas ref="lineChartCanvas" />
  </div>

        <ul>
          <li v-for="record in quizRecords" :key="record.id" class="bg-white shadow-md p-4 mb-4 rounded-md">
            <div class="flex justify-between items-center">
              <div>
                <h2 class="text-lg font-semibold">{{ new Date(record.created_at).toLocaleString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }) }}</h2>
                <!-- 日付の横にクイズのカテゴリー名を表示 -->
                <p class="text-gray-600">カテゴリー: {{ record.category.name }}</p>
                <!-- 日付の横にクイズの出題数を表示 -->
                <p class="text-gray-600">出題数: {{ record.total_questions }}</p>
                <p class="text-gray-600">正答率: {{ record.accuracy }}%</p>
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

    <div class="mt-4 flex justify-center space-x-1">
      <button
    @click="goToPage(currentPage - 1)"
    :disabled="currentPage === 1"
    class="px-3 py-1 rounded-md bg-white text-blue-500 border border-blue-500"
  >
    前へ
  </button>
    <!-- ページネーション用のリンクを生成 -->
    <button
  v-for="page in generatePaginationLinks(totalPages, currentPage)"
  :key="page"
  @click="goToPage(page)"
  :class="[
      'px-3 py-1 rounded-md',
      currentPage === page ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border border-blue-500',
    ]"
>
  {{ page }}
</button>

<button
    @click="goToPage(currentPage + 1)"
    :disabled="currentPage === totalPages"
    class="px-3 py-1 rounded-md bg-white text-blue-500 border border-blue-500"
  >
    次へ
  </button>

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