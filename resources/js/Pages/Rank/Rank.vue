<template>
    <div>
      <h1>ユーザーごとのクイズ正答率ランキング</h1>
      <div class="ranking-chart">
        <canvas ref="rankingChart"></canvas>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import Chart from 'chart.js/auto';
  
  const rankingChart = ref(null);
  
  onMounted(() => {
    fetchRankingData();
  });
  
  async function fetchRankingData() {
    try {
      const response = await axios.get('/api/ranking'); // ユーザーごとのクイズ結果情報を取得するエンドポイント
      const rankingData = response.data;
  
      // データをグラフ用のフォーマットに変換
      const labels = rankingData.map(entry => entry.user.name);
      const dataValues = rankingData.map(entry => entry.accuracy);
  
      drawRankingChart(labels, dataValues);
    } catch (error) {
      console.error('クイズ結果情報の取得に失敗しました', error);
    }
  }
  
  function drawRankingChart(labels, dataValues) {
    const ctx = rankingChart.value.getContext('2d');
  
    // チャートが既に存在する場合は破棄
    if (rankingChartInstance) {
      rankingChartInstance.destroy();
    }
  
    // バー グラフを描画
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
            max: 100,
          },
        },
      },
    });
  }
  
  let rankingChartInstance = null;
  </script>
  
  <style>
  .ranking-chart {
    max-width: 800px;
    margin: 20px auto;
  }
  </style>
  