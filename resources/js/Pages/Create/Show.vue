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

function getImageUrl(imageSrc) {
    if (imageSrc) {
        return "/storage/images/" + imageSrc; // 画像ファイルのパスを生成
    }
    return null;
}

</script>

<template>
    <div class="bg-gray-100 py-8">
        <div class="max-w-3xl mx-auto px-4">
            <div class="bg-white rounded shadow-md p-4 space-y-4">
                <!-- クイズの詳細情報を表示 -->
                <div class="border-b pb-2">
                    <p class="text-lg font-semibold">問題文</p>
                    <p class="text-gray-700">{{ quiz.title }}</p>
                </div>
                <div class="border-b pb-2">
                    <p class="text-lg font-semibold">正解</p>
                    <p class="text-gray-700">{{ quiz.correct_answer }}</p>
                </div>
                <div class="border-b pb-2">
                    <p class="text-lg font-semibold">選択肢1</p>
                    <p class="text-gray-670">{{ quiz.wrong_answer_1 }}</p>
                </div>
                <div class="border-b pb-2">
                    <p class="text-lg font-semibold">選択肢2</p>
                    <p class="text-gray-700">{{ quiz.wrong_answer_2 }}</p>
                </div>
                <div class="border-b pb-2">
                    <p class="text-lg font-semibold">選択肢3</p>
                    <p class="text-gray-700">{{ quiz.wrong_answer_3 }}</p>
                </div>
                <div class="border-b pb-2">
                    <p class="text-lg font-semibold">ヒント</p>
                    <p class="text-gray-700">{{ quiz.hint }}</p>
                </div>
                <div class="border-b pb-2">
                    <p class="text-lg font-semibold">解説</p>
                    <p class="text-gray-700">{{ quiz.explain }}</p>
                </div>

                <div class="border-b pb-2">
                    <p class="text-lg font-semibold">画像</p>
                    <!-- データベースに画像ファイルの情報があるかどうかをチェック -->
                    <template v-if="quiz.image_src">
                        <img :src="getImageUrl(quiz.image_src)" alt="クイズの画像" class="max-h-40">
                    </template>
                    <template v-else>
                        <p class="text-gray-700">画像なし</p>
                    </template>
                </div>

            </div>
            <div class="mt-4">
                <Link :href="'/list/' + quiz.id + '/edit'" class="text-blue-500 hover:underline">編集</Link>
            </div>
        </div>
    </div>
</template>


