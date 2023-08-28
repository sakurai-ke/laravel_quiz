<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
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


async function fetchRankingData() {
  try {
    const categoryParam = selectedCategory.value === 'all' ? '' : `&category=${selectedCategory.value}`;
    let dateParams = '';

    if (fromDate.value && toDate.value) {
      const fromDateTime = new Date(fromDate.value).toISOString();
      const toDateTime = new Date(toDate.value).toISOString();
      dateParams = `fromDate=${fromDateTime}&toDate=${toDateTime}`;
    } else if (fromDate.value) {
      const fromDateTime = new Date(fromDate.value).toISOString();
      dateParams = `fromDate=${fromDateTime}`;
    } else if (toDate.value) {
      const toDateTime = new Date(toDate.value);
      toDateTime.setDate(toDateTime.getDate() + 1); // この行は不要
      dateParams = `toDate=${toDateTime.toISOString()}`;
    }

    const response = await axios.get(`/api/ranking?${dateParams}${categoryParam}`);
    const rankingData = response.data;

    rankingData.sort((a, b) => b.accuracy - a.accuracy);

    const labels = rankingData.map(entry => entry.user.name);
    const dataValues = rankingData.map(entry => entry.accuracy);

    drawRankingChart(labels, dataValues);
  } catch (error) {
    console.error('クイズ結果情報の取得に失敗しました', error);
  }
}




function getDateParams() {
  let dateParams = '';

  if (fromDate.value && toDate.value) {
    const fromDateTime = new Date(fromDate.value).toISOString();
    const toDateTime = new Date(toDate.value).toISOString();
    dateParams = `fromDate=${fromDateTime}&toDate=${toDateTime}`;
  } else if (fromDate.value) {
    const fromDateTime = new Date(fromDate.value).toISOString();
    dateParams = `fromDate=${fromDateTime}`;
  } else if (toDate.value) {
    const toDateTime = new Date(toDate.value);
    toDateTime.setDate(toDateTime.getDate() + 1); // この行は不要
    dateParams = `toDate=${toDateTime.toISOString()}`;
  }

  if (dateParams !== '') {
    dateParams = `?${dateParams}`;
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
    type: 'bar', // グラフの種類を bar に設定
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
      indexAxis: 'y', // x 軸をユーザー名にするために設定
      scales: {
        x: {
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
