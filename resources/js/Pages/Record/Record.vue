<script setup>
import { defineProps, onMounted, computed, ref  } from 'vue';

// 親コンポーネントから渡されるプロパティを定義
const props = defineProps({
    'quizData': Object,
    'selectedNumQuestions': Number,
    'correctPercentage': Number,
    'categoryInfo': Object,
    'numQuestions': Number,
    'correctCount': Number,
    'quizzes': Array, // 各クイズの情報を保持する配列
    'selectedChoice': Array, // ユーザが選択した選択肢を保持する配列
    'quizDate': String, // クイズ実施日を保持する変数
});


</script>

<template>
    <div class="w-full max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
        <h2 class="text-xl font-semibold mb-4">クイズ結果</h2>
        <p>カテゴリー: {{ categoryInfo }}</p>
        <p>問題数: {{ numQuestions }}</p>
        <p>正解数: {{ correctCount }}</p>
        <p>正答率: {{ correctPercentage }}%</p>
        <p>クイズ実施日: {{ quizDate }}</p>
    
        <h3 class="mt-4 mb-2 font-semibold">クイズ詳細</h3>
        <ul class="space-y-2">
            <li v-for="(quiz, index) in quizzes" :key="index">
            <div>
                <p><strong>問題: </strong>{{ quiz.title }}</p>
                <p><strong>正解: </strong>{{ quiz.correct_answer }}</p>
                <p><strong>選択肢: </strong>{{ quiz.choices.join(', ') }}</p>
                <p><strong>ユーザの選択: </strong>{{ getSelectedChoice(index) }}</p>
            </div>
            </li>
        </ul>
    </div>
</template>