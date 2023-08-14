<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Quiz from './Quiz.vue'; // Quiz.vue のインポート
import Record from '@/Pages/Record/Record.vue'; // Record.vue のインポート

// import FlashMessage from '@/Components/FlashMessage.vue';

// カテゴリー名の選択肢
const selectedCategory = ref(null);
const selectedNumQuestions = ref(5); // 問題数の選択肢（初期値を10に設定）
const categories = ref([]);
const isQuizStarted = ref(false); // クイズ開始する際にtrueに切り替える
const currentQuiz = ref({
    // クイズ情報のプロパティ
    id: null,
    title: '',
    image_src: '',
    user_id: null,
    category_id: null,
    delete_flag: false,
    correct_answer: '', // 正解の選択肢を格納
    wrong_answer_1: '', // 正解以外の選択肢1を格納
    wrong_answer_2: '', // 正解以外の選択肢2を格納
    wrong_answer_3: '', // 正解以外の選択肢3を格納
    hint: '', // ヒント
    explain: '', // 解説
});

// カテゴリーの一覧データを取得する関数
async function fetchCategories() {
    try {
    const response = await axios.get('/api/categories');
    console.log('Response:', response.data); // 追加
    categories.value = response.data;
    } catch (error) {
        console.error('カテゴリーの取得に失敗しました', error);
    }
}

// コンポーネントがマウントされたときにカテゴリーデータを取得
onMounted(() => {
    fetchCategories();
});

// 選択したカテゴリーと出題数をもとにクイズデータを一括で取得する関数
async function fetchQuizzes(categoryId, numQuestions) {
    try {
        const response = await axios.get('/api/quizzes', {
            params: { category_id: categoryId, num_questions: selectedNumQuestions.value }
        });
        console.log('response.dataの値:', response.data);
        return response.data;
    } catch (error) {
        console.error('クイズの取得に失敗しました', error);
        return [];
    }
}

// 特定のクイズ情報と選択肢を取得
async function fetchChoicesAndCorrectAnswer(quizId) {
    try {
        console.log('fetchChoicesAndCorrectAnswer - quizId:', quizId);

        // クイズ情報を取得
        const quizResponse = await axios.get(`/api/quizzes/${quizId}`);
        console.log('quizResponse:', quizResponse.data);
        const quizData = quizResponse.data;
        console.log('quizData:', quizData);

        console.log('answer1:', quizData.correct_answer);
        console.log('answer2:', quizData.quiz.choices.correct_answer);
        console.log('answer3:', quizData.quiz.choices.wrong_answer_3);

        // クイズ情報から正解情報と選択肢情報を抽出してリターン
        return {
            choices: [
                quizData.quiz.choices.correct_answer,
                quizData.quiz.choices.wrong_answer_1,
                quizData.quiz.choices.wrong_answer_2,
                quizData.quiz.choices.wrong_answer_3,
            ],
        };

    } catch (error) {
        console.error('Fetch failed with error:', error);
        return { choices: [] };
    }
}

async function startQuiz() {
    try {
        // 選択したカテゴリーIDと出題数を取得
        const categoryId = selectedCategory.value;
        // const numQuestions = selectedNumQuestions.value;

        console.log('選択したカテゴリーID:', selectedCategory.value);
        console.log('選択した出題数:', selectedNumQuestions.value);


        // クイズデータを取得し、最初のクイズを表示するなどの処理を行う
        const quizzes = await fetchQuizzes(categoryId);
        console.log('quizzes:', quizzes);
        if (quizzes.length > 0) {
            // currentQuizオブジェクトに最初のクイズデータをセット
            currentQuiz.value = quizzes[0];
            console.log('currentQuiz.value:', currentQuiz.value);
            // Answerテーブルから選択肢と正解情報を取得
            const result = await fetchChoicesAndCorrectAnswer(currentQuiz.value.id);
            currentQuiz.value.choices = result.choices;
            console.log('result.choices:', result.choices); 
            console.log('currentQuiz.value.choices:', currentQuiz.value.choices);

            isQuizStarted.value = true; // クイズが開始されたことをフラグで示す

        } else {
            console.error('取得したクイズデータがありません');
        }
    } catch (error) {
        console.error('クイズ開始時にエラーが発生しました', error);
    }
}




</script>

<template>
    <Head title="トップ" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-2xl text-gray-800 leading-tight">トップ</h2>
        </template>
    
        <div class="flex flex-col items-center justify-start h-screen p-16">
            <div v-if="!isQuizStarted" class="max-w-md mb-6 text-center">
                <h2 class="text-xl font-semibold mb-2 mx-auto">クイズカテゴリーを選択してください</h2>
                <select v-model="selectedCategory" class="py-2 px-4 border rounded-md w-full">
                    <option v-for="category in categories" :value="category.id" :key="category.id">
                        {{ category.name }}
                    </option>
                </select>
    
                <h2 class="text-lg font-semibold mt-4">出題数を選択してください</h2>
                <select v-model="selectedNumQuestions" class="py-2 px-4 border rounded-md w-full">
                    <option value="5">5問</option>
                    <option value="10">10問</option>
                    <option value="15">15問</option>
                    <option value="20">20問</option>
                </select>
    
                <button @click="startQuiz" class="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full hover:opacity-90 focus:outline-none shadow-lg w-full">
                    クイズ開始！
                </button>
            </div>
    
            <div v-else class="w-full max-w-md">
                <!-- クイズが開始された場合、クイズ出題画面を表示 -->
                <Quiz :quizData="currentQuiz" :selectedNumQuestions="selectedNumQuestions"/>
            </div>
        </div>
    </AuthenticatedLayout>
</template>