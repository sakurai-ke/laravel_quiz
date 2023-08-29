<template>
  <div>
        <!-- セレクトボックスを追加 -->
        <select v-model="selectedCategory">
      <option value="all">全て</option>
      <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
    </select>
    <!-- グラフを表示するためのキャンバス要素 -->
    <canvas ref="lineChartCanvas" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch, defineProps, onBeforeUnmount } from 'vue';
import Chart from 'chart.js/auto';
import axios from 'axios'; // axios をインポート


// props の受け取り
const { quizRecords, fromDate, toDate } = defineProps([
  'quizRecords',
  'fromDate',
  'toDate',
]);

// チャートのインスタンス
const lineChartCanvas = ref(null);
const lineChartInstance = ref(null); // グラフのインスタンスを保持する変数を宣言

// カテゴリーのプロパティを定義
const categories = ref([]);

// セレクトボックスで選択したカテゴリーのID
const selectedCategory = ref('all');

// fetchCategories 関数を定義
async function fetchCategories() {
  try {
    const response = await axios.get('/api/categories');
    categories.value = response.data;
  } catch (error) {
    console.error('カテゴリー情報の取得に失敗しました', error);
  }
}


// フィルタリングされた正答率データを監視
watch(
  () => filterAccuracyData(quizRecords),
  (filteredData) => {
    drawLineChart(filteredData);
  }
);

// コンポーネントがアンマウントされる前にグラフのインスタンスを破棄
onBeforeUnmount(() => {
  if (lineChartInstance.value) {
    lineChartInstance.value.destroy();
    lineChartInstance.value = null; // インスタンスを null に設定して解放
  }
});

// 正答率データをフィルタリングする関数
function filterAccuracyData(data) {
  if (!fromDate && !toDate) {
    return data; // FromとToが未選択の場合は全データを表示
  }

  const fromDateValue = fromDate ? new Date(fromDate).getTime() : 0;
  const toDateValue = toDate ? new Date(toDate).getTime() : Date.now();

  return data.filter(record => {
    const recordDate = new Date(record.created_at).getTime();
    return recordDate >= fromDateValue && recordDate <= toDateValue;
  });
}

// グラフを描画する関数
function drawLineChart(data) {
  if (!lineChartCanvas.value) {
    return;
  }

  if (lineChartInstance.value) {
    console.log('Destroying previous chart instance'); // 以前のグラフが破棄されることを確認
    lineChartInstance.value.destroy();
    lineChartInstance.value = null; // インスタンスを null に設定して解放
  }

  if (data.length === 0) {
    return;
  }

  const accuracyData = data.map(record => record.accuracy);
  const dateLabels = data.map(record => new Date(record.created_at).toLocaleDateString());

  const ctx = lineChartCanvas.value.getContext('2d');
  lineChartInstance.value = new Chart(ctx, {
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
          reverse: true, // 横軸の方向を逆にする
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
  console.log('lineChartInstance', lineChartInstance.value.data);
  console.log('Chart instance created'); // グラフが描画されたことを確認
}
// セレクトボックスで選択されたカテゴリー情報を取得する関数
function getSelectedCategoryData() {
  if (selectedCategory.value === 'all') {
    return quizRecords;
  } else {
    return quizRecords.filter(record => record.category_id === selectedCategory.value);
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
  await fetchCategories(); // カテゴリー情報を取得

  // データをフィルタリングしてグラフを描画
  const filteredData = filterAccuracyData(getSelectedCategoryData(quizRecords));
  drawLineChart(filteredData);
});

// watch を使用して、データや選択されたカテゴリーが変更されたらグラフを再描画
watch(
  () => [quizRecords, selectedCategory], // 正しい監視ソースの形に修正
  ([records, category]) => {
    const filteredData = filterAccuracyData(getSelectedCategoryData(records));
    drawLineChart(filteredData);
  }
);


</script>
