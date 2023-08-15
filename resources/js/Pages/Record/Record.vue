<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import mitt from 'mitt';
import axios from 'axios';

const eventBus = mitt();
const quizResults = ref([]);

// クイズ終了時の処理
const handleQuizCompleted = ({ result, category, numQuestions }) => {
  // 受け取った結果データをリストに追加
    quizResults.value.push({
    ...result,
    quizData: {
        category,
        numQuestions,
    },
    quizDate: new Date(), // クイズ実施日を追加
    });

    // クイズ結果をデータベースに保存（追加）
    saveQuizResult(result);
};

// クイズ結果をデータベースに保存する関数（追加）
async function saveQuizResult(result) {
    try {
        const response = await axios.post('/api/save-quiz-result', result);
        console.log('Result saved:', response.data);
    } catch (error) {
        console.error('Failed to save result:', error);
    }
}


onMounted(() => {
    eventBus.on('quizCompleted', handleQuizCompleted);
    console.log('Record.vue - quizCompleted event listener added');
});

onUnmounted(() => {
    eventBus.off('quizCompleted', handleQuizCompleted);
    console.log('Record.vue - quizCompleted event listener removed');
});

// データをクイズ実施日で降順にソートする計算プロパティ
const sortedQuizResults = computed(() => {
    return quizResults.value.slice().sort((a, b) => b.quizDate - a.quizDate);
});

// 日付をフォーマットするヘルパー関数
function formatDate(date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Intl.DateTimeFormat('ja-JP', options).format(date);
}
</script>

<template>
    <div>
        <h2>クイズ結果一覧</h2>
        <div v-if="sortedQuizResults.length === 0">クイズ結果がありません。</div>
        <div v-for="(result, index) in sortedQuizResults" :key="index">
            <h3>クイズ実施日: {{ formatDate(result.quizDate) }}</h3>
            <p>カテゴリー: {{ result.quizData.category }}</p>
            <p>問題数: {{ result.quizData.numQuestions }}</p>
            <p>正解数: {{ result.correctCount }}</p>
            <p>正答率: {{ result.correctPercentage.toFixed(2) }}%</p>
            <ul>
            <li v-for="(quiz, quizIndex) in result.quizzes" :key="quizIndex">
                <h4>問題: {{ quiz.question }}</h4>
                <p>選択肢: {{ quiz.choices.join(', ') }}</p>
                <p>選択: {{ quiz.selectedChoice }}</p>
                <p>結果: {{ quiz.isCorrect ? '正解' : '不正解' }}</p>
            </li>
            </ul>
        </div>
    </div>
</template>