<template>
  <div>
    <!-- グラフを表示するためのキャンバス要素 -->
    <canvas ref="lineChartCanvas" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch, defineProps } from 'vue';
import Chart from 'chart.js/auto';

// props の受け取り
const { categoryAccuracyData, fromDate, toDate } = defineProps([
  'categoryAccuracyData',
  'fromDate',
  'toDate',
]);

// チャートのインスタンス
const lineChartCanvas = ref(null);
let lineChartInstance = null;

// グラフを描画する関数
function drawLineChart(data) {
  if (lineChartInstance) {
    lineChartInstance.destroy(); // 既存のグラフを破棄
  }

  // 正答率データと日付データの抽出
  const accuracyData = data.map(data => parseFloat(data.accuracy)); // 正答率を数値に変換
  const dateLabels = data.map(data => data.created_at); // 正答率データの日付

  // グラフの描画処理
  const ctx = lineChartCanvas.value.getContext('2d');
  lineChartInstance = new Chart(ctx, {
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

// コンポーネントがマウントされたときにグラフを描画
onMounted(() => {
  drawLineChart(categoryAccuracyData);
});

// グラフを再描画するためのウォッチャー
watch([fromDate, toDate, categoryAccuracyData], () => {
  // 正答率データと日付データを抽出
  const filteredData = categoryAccuracyData.filter(data => {
    const date = new Date(data.created_at).getTime();
    const fromTime = fromDate ? new Date(fromDate).getTime() : 0;
    const toTime = toDate ? new Date(toDate).getTime() : Date.now();

    return date >= fromTime && date <= toTime;
  });

  // グラフを再描画
  drawLineChart(filteredData);
});
</script>
