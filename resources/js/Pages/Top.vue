<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Quiz from './Quiz.vue'; // Quiz.vue のインポート

// import FlashMessage from '@/Components/FlashMessage.vue';

const selectedCategory = ref(null);
const selectedNumQuestions = ref('10'); // 初期値を10に設定
const categories = ref([]);
const isQuizStarted = ref(false); // クイズ開始する際にtrueに切り替える
const currentQuiz = ref({
    id: null,
    title: '',
    image_src: '',
    user_id: null,
    answer_id: null,
    category_id: null,
    delete_flag: false,
    choices: [], // Answerテーブルから取得した選択肢を格納
    correct_answer_no: null // Answerテーブルから取得した正解情報を格納
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



async function startQuiz() {
    try {
        // 選択したカテゴリーIDと出題数を取得
        const categoryId = selectedCategory.value;
        const numQuestions = selectedNumQuestions.value;

        console.log('選択したカテゴリーID:', selectedCategory.value);
        console.log('選択した出題数:', selectedNumQuestions.value);


        // クイズデータを取得し、最初のクイズを表示するなどの処理を行う
        const quizzes = await fetchQuizzes(categoryId, numQuestions); // クイズの取得
        if (quizzes.length > 0) {
            // currentQuizオブジェクトに最初のクイズデータをセット
            currentQuiz.value = quizzes[0];

            // currentQuizオブジェクトに問題情報をセット
            currentQuiz.id = currentQuiz.value.id;
            currentQuiz.title = currentQuiz.value.title;
            currentQuiz.image_src = currentQuiz.value.image_src;
            currentQuiz.user_id = currentQuiz.value.user_id;
            currentQuiz.answer_id = currentQuiz.value.answer_id;
            currentQuiz.category_id = currentQuiz.value.category_id;
            currentQuiz.delete_flag = currentQuiz.value.delete_flag;

        // 特定のクイズ情報のquizIdを取得
        const quizId = currentQuiz.id;
        console.log('quizId:', quizId);
        // Answerテーブルから選択肢と正解情報を取得
        const result = await fetchChoicesAndCorrectAnswer(quizId);
        console.log('result:', result);
        currentQuiz.choices = result.choices;
        currentQuiz.correct_answer_no = result.correct_answer_no;

        console.log('isQuizStarted.value:', isQuizStarted.value) 
        // クイズが開始されたことをフラグで示す
        isQuizStarted.value = true;

        } else {
            console.error('取得したクイズデータがありません');
        }
    } catch (error) {
        console.error('クイズ開始時にエラーが発生しました', error);
    }
}

// Top.vue の中の fetchChoicesAndCorrectAnswer 関数
async function fetchChoicesAndCorrectAnswer(quizId) {

    try {
        
        console.log('fetchChoicesAndCorrectAnswer - quizId:', quizId);

        // クイズ情報を取得
        const quizResponse = await axios.get(`/api/quizzes/${quizId}`);
        console.log('fetchChoicesAndCorrectAnswer - quizResponse:', quizResponse.data); // この行を追加
        const quizData = quizResponse.data; // クイズ情報を取得

        // クイズ情報から正解情報と選択肢情報を抽出
        const correctAnswerNo = quizData.answer_id; // 例として answer_id から取得
        const choices = quizData.choices; // クイズ情報内の選択肢データを取得

        return { choices, correct_answer_no: correctAnswerNo };
    } catch (error) {
        console.error('Fetch failed with error:', error);
        return { choices: [], correct_answer_no: null };
    }
}





// function startQuiz() {

//     console.log('選択したカテゴリーID:', selectedCategory.value);
//     console.log('選択した出題数:', selectedNumQuestions.value);

//     // 選択したカテゴリーIDと出題数を一時変数に代入
//     const categoryId = selectedCategory.value;
//     const numQuestions = selectedNumQuestions.value;

//     // クイズが開始されたことをフラグで示す
//     isQuizStarted.value = true;
//     console.log('クイズスタートか', isQuizStarted.value);
    
// クイズデータを取得する関数
async function fetchQuizzes(categoryId, numQuestions) {
    try {
        const response = await axios.get('/api/quizzes', {
        params: { category_id: categoryId, num_questions: numQuestions }
        });
        console.log('response.dataの値:', response.data);
        return response.data;
    } catch (error) {
        console.error('クイズの取得に失敗しました', error);
        return [];
    }
}

//     // クイズのデータを取得し、最初のクイズを表示するなどの処理を行う
//     fetchQuizzes(categoryId, numQuestions).then((quizzes) => {
//         // quizzesの中から最初のクイズを選び、currentQuizにセットするなどの処理
//         currentQuiz.value = quizzes[0];
//         console.log('最初の問題:', currentQuiz.value);
//     });

// }


</script>

<template>
    <Head title="トップ" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">トップ</h2>
        </template>

    <div>
        <h2>クイズカテゴリーを選択してください</h2>
            <!-- クイズが開始されていない場合はトップ画面を表示 -->
            <div v-if="!isQuizStarted">
                <select v-model="selectedCategory">
                    <option v-for="category in categories" :value="category.id" :key="category.id">
                        {{ category.name }}
                    </option>
                </select>

            <h2>出題数を選択してください</h2>
                <select v-model="selectedNumQuestions">
                    <option value="5">5問</option>
                    <option value="10">10問</option>
                    <option value="15">15問</option>
                    <option value="20">20問</option>
                </select>

            <button @click="startQuiz">クイズ開始！</button>
            </div>

            <!-- クイズが開始された場合、クイズ出題画面を表示 -->
            <div v-else>
                <Quiz :quizData="currentQuiz" />
            </div>

    </div>

    </AuthenticatedLayout>
</template>