<template>
  <div class="chart-container">
    <Radar :data="chartData" :options="chartOptions" />
  </div>
</template>


<script setup>
import { ref, watch } from 'vue';
import { Radar } from 'vue3-chart-v2'; // vue-chartjsのRadarコンポーネントを使います

// Propsから親コンポーネントから渡されたデータを受け取る
const props = defineProps({
  categoryData: Array, // カテゴリーごとのデータ（例: [{ category: 'カテゴリー名', accuracy: 正答率 }, ...]）
});

const chartData = ref({
  labels: props.categoryData.map(item => item.category),
  datasets: [
    {
      label: '正答率',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      pointBackgroundColor: 'rgba(75, 192, 192, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
      data: props.categoryData.map(item => item.accuracy),
    },
  ],
});

const chartOptions = ref({
  scale: {
    ticks: { beginAtZero: true, max: 100 },
  },
});

// categoryDataが変更された場合に、chartDataを更新
watch(() => props.categoryData, (newCategoryData) => {
  chartData.value.labels = newCategoryData.map(item => item.category);
  chartData.value.datasets[0].data = newCategoryData.map(item => item.accuracy);
});

// カテゴリー別の正答率を計算する関数
function calculateCategoryAccuracy(categoryName, startDate, endDate) {
  const recordsInPeriod = quizRecords.value.filter(record => {
    const recordDate = new Date(record.created_at);
    return recordDate >= startDate && recordDate <= endDate;
  });

  const categoryRecords = recordsInPeriod.filter(record => record.category.name === categoryName);

  if (categoryRecords.length === 0) {
    return 0; // 該当するレコードがない場合は正答率を0とする
  }

  const totalAccuracy = categoryRecords.reduce((sum, record) => sum + record.accuracy, 0);
  return totalAccuracy / categoryRecords.length;
}

// 日別、月別、年別の期間ごとの正答率データを計算する関数
function generatePeriodChartData(startDate, endDate) {
  return props.categoryData.map(category => ({
    category: category.category,
    accuracy: calculateCategoryAccuracy(category.category, startDate, endDate),
  }));
}

</script>

<style scoped>
.chart-container {
  max-width: 400px; /* チャートの幅を調整 */
  margin: 0 auto;
}
</style>
