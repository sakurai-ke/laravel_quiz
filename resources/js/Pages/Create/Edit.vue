<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const quiz = ref({});

onMounted(() => {
  const quizId = window.location.pathname.split('/').pop();
  editQuizDetails(quizId);
});

async function editQuizDetails(quizId) {
  try {
    const response = await axios.get(`/api/editQuizzes/${quizId}`);
    console.log('API Response:', response.data); // デバッグログを追加
    quiz.value = response.data.quiz;
  } catch (error) {
    console.error('クイズの詳細情報の取得に失敗しました', error);
  }
}



async function updateQuiz() {
  try {
    await axios.put(`/api/updateQuizzes/${quiz.id}`, quiz.value);
    // 更新が成功したら成功メッセージを表示したり、リダイレクトしたり
  } catch (error) {
    console.error('クイズの更新に失敗しました', error);
  }
}
</script>

<template>
  <div class="bg-gray-100 py-8">
    <div class="max-w-3xl mx-auto px-4">
      <h2 class="text-2xl font-semibold mb-4">クイズ編集</h2>
      <form @submit.prevent="updateQuiz">
        <div class="bg-white rounded shadow-md p-4">
          <div class="mb-4">
            <label for="title" class="block font-semibold mb-1">問題文:</label>
            <input v-model="quiz.title" id="title" type="text" class="w-full rounded-md p-2 border" />
          </div>
          <div class="mb-4">
            <label for="correctAnswer" class="block font-semibold mb-1">正解:</label>
            <input v-model="quiz.correct_answer" id="correctAnswer" type="text" class="w-full rounded-md p-2 border" />
          </div>
          <div class="mb-4">
            <label for="wrongAnswer1" class="block font-semibold mb-1">選択肢1:</label>
            <input v-model="quiz.wrong_answer_1" id="wrongAnswer1" type="text" class="w-full rounded-md p-2 border" />
          </div>
          <div class="mb-4">
            <label for="wrongAnswer2" class="block font-semibold mb-1">選択肢2:</label>
            <input v-model="quiz.wrong_answer_2" id="wrongAnswer2" type="text" class="w-full rounded-md p-2 border" />
          </div>
          <div class="mb-4">
            <label for="wrongAnswer3" class="block font-semibold mb-1">選択肢3:</label>
            <input v-model="quiz.wrong_answer_3" id="wrongAnswer3" type="text" class="w-full rounded-md p-2 border" />
          </div>
          <div class="mb-4">
            <label for="hint" class="block font-semibold mb-1">ヒント:</label>
            <textarea v-model="quiz.hint" id="hint" type="text" class="w-full rounded-md p-2 border"></textarea>
          </div>
          <div class="mb-4">
            <label for="explain" class="block font-semibold mb-1">解説:</label>
            <textarea v-model="quiz.explain" id="explain" type="text" class="w-full rounded-md p-2 border"></textarea>
          </div>
        </div>
        <div class="mt-4">
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">更新</button>
        </div>
      </form>
    </div>
  </div>
</template>
