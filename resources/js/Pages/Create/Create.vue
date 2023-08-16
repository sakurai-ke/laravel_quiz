<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

const selectedCategory = ref('');
const categories = ref([]);

const quizData = ref({
    title: '',
    category_id: null,
    correct_answer: '',
    wrong_answer_1: '',
    wrong_answer_2: '',
    wrong_answer_3: '',
    explain: '',
    // 他のプロパティも同様に追加
});

// コンポーネントがマウントされた際にカテゴリーデータを取得
onMounted(() => {
fetchCategories();
});

  // カテゴリーデータを取得
async function fetchCategories() {
    try {
        // サーバーからカテゴリーデータを取得
        const response = await axios.get('/api/categories');

        // 取得したデータをカテゴリーのリストに代入
        categories.value = response.data;

        // デフォルトカテゴリを設定
        // もしカテゴリーデータが1つ以上ある場合、最初のカテゴリーのIDを選択
        selectedCategory.value = categories.value.length > 0 ? categories.value[0].id : '';
    } catch (error) {
        console.error('カテゴリーの取得に失敗しました', error);
    }
}


// クイズ作成フォームを送信する関数
async function submitForm() {
    try {
        // 選択したカテゴリーのIDをquizData.value.category_id に代入
        quizData.value.category_id = selectedCategory.value;
        ///api/quizzesにクイズデータを送信する
        const response = await axios.post('/api/makeQuizzes', quizData.value);
        console.log('クイズ作成成功:', response.data);
        // データ送信成功したらフォームをリセット
        quizData.value = {
            title: '',
            category_id: null,
            correct_answer: '',
            wrong_answer_1: '',
            wrong_answer_2: '',
            wrong_answer_3: '',
            explain: '',
        };
} catch (error) {
        console.error('クイズ作成エラー:', error);

        // エラーをコンソールに出力し、詳細なエラーメッセージを表示
        if (error.response) {
            console.error('エラーレスポンス:', error.response.data);
        }
    }
}
</script>


<template>
    <div class="w-full max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
        <h2 class="text-xl font-semibold mb-4">クイズ作成</h2>
        <!-- preventはリロードされないように -->
        <form @submit.prevent="submitForm">
        <div class="mb-4">
            <label class="block font-semibold">クイズのジャンル</label>
            <select v-model="selectedCategory">
            <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
            </option>
        </select>
        </div>
        <div class="mb-4">
            <label class="block font-semibold">問題文</label>
            <textarea v-model="quizData.title" class="w-full p-2 border rounded-md"></textarea>
        </div>
        <!-- 他の入力フォームも同様に追加 -->

        <!-- 選択肢の追加 -->
        <div class="mb-4">
            <label class="block font-semibold">正解の選択肢</label>
            <input v-model="quizData.correct_answer" class="w-full p-2 border rounded-md" />
        </div>
        <div class="mb-4">
            <label class="block font-semibold">不正解の選択肢1</label>
            <input v-model="quizData.wrong_answer_1" class="w-full p-2 border rounded-md" />
        </div>
        <div class="mb-4">
            <label class="block font-semibold">不正解の選択肢2</label>
            <input v-model="quizData.wrong_answer_2" class="w-full p-2 border rounded-md" />
        </div>
        <div class="mb-4">
            <label class="block font-semibold">不正解の選択肢3</label>
            <input v-model="quizData.wrong_answer_3" class="w-full p-2 border rounded-md" />
        </div>
        <div class="mb-4">
            <label class="block font-semibold">解説</label>
            <textarea v-model="quizData.explain" class="w-full p-2 border rounded-md"></textarea>
        </div>
        <div class="mb-4">
            <button type="submit" class="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none transition duration-300">
                送信
            </button>
        </div>
        </form>
    </div>
</template>