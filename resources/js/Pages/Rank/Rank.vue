<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Chart from 'chart.js/auto';

const rankingChart = ref(null);
const selectedCategory = ref('all');
const categories = ref([]);
const fromDate = ref(null);
const toDate = ref(null);

// バリデーションエラーメッセージ
let validationError = ref("");

onMounted(() => {
  fetchCategories();
  fetchRankingData();
});

// カテゴリー情報を非同期に取得
async function fetchCategories() {
  try {
    const response = await axios.get('/api/categories');
    categories.value = response.data;
  } catch (error) {
    console.error('カテゴリー情報の取得に失敗しました', error);
  }
}

// 検索ボタンがクリックされたときの処理
async function fetchRankingData() {
  try {
    // FromとToの日付が逆転している場合のバリデーション
    if (fromDate.value && toDate.value && new Date(fromDate.value) > new Date(toDate.value)) {
      validationError.value = "Fromの日付はTo以前の日付を選択してください";
      return; // バリデーションエラーがあるため処理を中断
    } else {
      validationError.value = ""; // バリデーションエラーメッセージをクリア
    }

    const categoryParam = selectedCategory.value === 'all' ? '' : `?category=${selectedCategory.value}`;
    const dateParams = getDateFormatParams();

    const response = await axios.get(`/api/ranking${categoryParam}${dateParams}`);
    const rankingData = response.data;

    rankingData.sort((a, b) => b.accuracy - a.accuracy);

    const labels = rankingData.map(entry => entry.user.name);
    const dataValues = rankingData.map(entry => entry.accuracy);

    drawRankingChart(labels, dataValues);

  } catch (error) {
    console.error('クイズ結果情報の取得に失敗しました', error);
  }
}


function getDateFormatParams() {
  let dateParams = '';

  if (fromDate.value) {
    dateParams += `&fromDate=${fromDate.value}`;
  }
  if (toDate.value) {
    dateParams += `&toDate=${toDate.value}`;
  }

  // 日付パラメータを正しく構築するための修正
  if (dateParams !== '') {
    dateParams = `?${dateParams.slice(1)}`;
  }

  return dateParams;
}


function drawRankingChart(labels, dataValues) {
  const ctx = rankingChart.value.getContext('2d');

  if (rankingChartInstance) {
    rankingChartInstance.destroy();
  }

  const maxAccuracy = Math.max(...dataValues);

  rankingChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: '正答率 (%)',
          data: dataValues,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: Math.ceil(maxAccuracy),
        },
      },
    },
  });
}

let rankingChartInstance = null;
</script>

<template>
  <Head title="ランキング" />

  <AuthenticatedLayout>
    <template #header>
        <h2 class="font-semibold text-2xl text-gray-800 leading-tight">ランキング</h2>
    </template>

    <div class="p-6">
      <div class="space-y-2">
        <div class="flex space-x-2 items-center">
          <label for="fromDate" class="text-gray-600">From:</label>
          <input type="date" id="fromDate" v-model="fromDate" class="border rounded-md p-1">
          <label for="toDate" class="text-gray-600">To:</label>
          <input type="date" id="toDate" v-model="toDate" class="border rounded-md p-1">
          <button @click="fetchRankingData" class="bg-blue-500 text-white rounded-md px-3 py-1 hover:bg-blue-600">
            検索
          </button>
          <!-- バリデーションエラーメッセージを表示 -->
          <p v-if="validationError" class="text-red-500">{{ validationError }}</p>
        </div>
        <div class="flex space-x-2 items-center">
          <label for="categorySelect" class="text-gray-600">カテゴリー:</label>
          <select id="categorySelect" v-model="selectedCategory" @change="fetchRankingData" class="border rounded-md p-1">
            <option value="all">全て</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
          </select>
        </div>
      </div>
      <div class="mt-6">
        <canvas ref="rankingChart" class="rounded-md border"></canvas>
      </div>
    </div>
</AuthenticatedLayout>
</template>

<style>
.date-select {
  margin-bottom: 10px;
}
.category-select {
  margin-bottom: 20px;
}
.ranking-chart {
  max-width: 800px;
  margin: 20px auto;
}
</style>
