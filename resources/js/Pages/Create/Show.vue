<script setup>
import { Link } from '@inertiajs/vue3';
import { ref, onMounted } from 'vue';
import axios from 'axios';

  // クイズの詳細情報を格納するためのリアクティブ変数
const quiz = ref({});

onMounted(() => {
    // URLからクイズIDを取得
    const quizId = window.location.pathname.split('/').pop();
    // クイズの詳細情報を取得してリアクティブ変数に格納
    getQuizDetails(quizId);
});

async function getQuizDetails(quizId) {
    try {
        const response = await axios.get(`/api/showQuizzes/${quizId}`);
        quiz.value = response.data.quiz;
    } catch (error) {
        console.error('クイズの詳細情報の取得に失敗しました', error);
    }
}
</script>

<template>
    <div class="bg-gray-100 py-8">
        <div class="max-w-3xl mx-auto px-4">
            <div class="bg-white rounded shadow-md p-4">
                <!-- クイズの詳細情報を表示 -->
                <p><strong>問題文:</strong> {{ quiz.title }}</p>
                <p><strong>正解:</strong> {{ quiz.correct_answer }}</p>
                <p><strong>選択肢1:</strong> {{ quiz.wrong_answer_1 }}</p>
                <p><strong>選択肢2:</strong> {{ quiz.wrong_answer_2 }}</p>
                <p><strong>選択肢3:</strong> {{ quiz.wrong_answer_3 }}</p>
                <p><strong>ヒント:</strong> {{ quiz.hint }}</p>
                <p><strong>解説:</strong> {{ quiz.explain }}</p>
            </div>
            <div class="mt-4">
                <Link :href="'/list/' + quiz.id + '/edit'" class="text-blue-500">編集</Link>
            </div>
        </div>
    </div>
</template>