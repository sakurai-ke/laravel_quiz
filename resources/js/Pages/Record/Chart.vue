<template>
    <div>
      <canvas ref="radarChart"></canvas>
      <!-- 未回答のカテゴリーを表示 -->
      <div v-for="(category, index) in props.categoryData" :key="index">
        <p v-if="category.accuracy === 0" class="unanswered-category">未回答: {{ category.name }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import Chart from 'chart.js/auto';
  
  const props = defineProps({
    categoryData: {
      type: Array,
      required: true,
    },
  });
  
  const radarChart = ref(null);
  
  onMounted(() => {
    // 初回描画
    drawRadarChart();
  
    // 監視してデータ更新時に再描画
    watch(() => props.categoryData, () => {
      drawRadarChart();
    });
  });
  
  function drawRadarChart() {
    const ctx = radarChart.value.getContext('2d');
  
    const labels = [];
    const dataValues = [];
  
    for (const category of props.categoryData) {
      labels.push(category.name);
      dataValues.push(category.accuracy);
    }
  
    while (labels.length < 5) {
      labels.push('未回答');
      dataValues.push(0);
    }
  
    // チャートが既に存在する場合は破棄
    if (radarChartInstance) {
      radarChartInstance.destroy();
    }
  
    // レーダーチャートを描画
    radarChartInstance = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [
          {
            label: '正答率',
            data: dataValues,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          r: {
            beginAtZero: true,
          },
        },
      },
    });
  }
  
  let radarChartInstance = null;
  </script>
  
  <style>
  .unanswered-category {
    color: red;
    font-weight: bold;
  }
  </style>
  