 <script setup>
  import { ref, onMounted, watch } from 'vue';
  import Chart from 'chart.js/auto';
  
const props = defineProps({
  categoryData: {
    type: Array,
    required: true,
  },
});
  // Canva要素に対するチャートの描画コンテキストを参照するために使用
  const radarChart = ref(null);
  
  onMounted(() => {
    // 初回描画
    drawRadarChart();
  
    // 監視してデータ更新時に再描画
    watch(() => props.categoryData, () => {
      drawRadarChart();
    });
  });
  
  // ウィンドウのリサイズイベントを監視
window.addEventListener('resize', () => {
  // レーダーチャートが描画済みであれば再描画
  if (radarChartInstance) {
    updateChartSize();
  }
});

// チャートのサイズを更新する関数
function updateChartSize() {
  const ctx = radarChart.value.getContext('2d');

  // チャートのサイズを調整
  radarChartInstance.resize();

  radarChartInstance.update();
}

  function drawRadarChart() {
    const ctx = radarChart.value.getContext('2d');
  
    const labels = []; //カテゴリー名を格納
    const dataValues = []; //正答率を格納
  
    // labels配列にはカテゴリー名、dataValues配列には各カテゴリーの正答率が順番に追加
    for (const category of props.categoryData) {
      labels.push(category.name);
      dataValues.push(category.accuracy);
    }
  
    // もしカテゴリーが5つ未満の場合、足りない分のlabels配列には文字列「未回答」を、dataValues配列には数値0を追加
    while (labels.length < 5) {
      labels.push('未回答');
      dataValues.push(0);
    }
  
    // 新しいデータでレーダーチャートを再描画する前に古い情報を削除する（データの切り替えや更新時に問題が発生するのを防ぐため）
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
  
  <template>
    <div>
      <canvas ref="radarChart"></canvas>
      <!-- 未回答のカテゴリーを表示 -->
      <div v-for="(category, index) in props.categoryData" :key="index">
        <p v-if="category.accuracy === 0" class="unanswered-category">未回答: {{ category.name }}</p>
      </div>
    </div>
  </template>
  
  <style>
  .unanswered-category {
    color: red;
    font-weight: bold;
  }
  </style>
  