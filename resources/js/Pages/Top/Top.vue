<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import { ref, onMounted, onUnmounted  } from 'vue';
import axios from 'axios';
import Quiz from './Quiz.vue'; // Quiz.vue のインポート
import mitt from 'mitt';
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
    console.log('Response:', response.data);
    categories.value = response.data;
    } catch (error) {
        console.error('カテゴリーの取得に失敗しました', error);
    }
}

// コンポーネントがマウントされたときにカテゴリーデータを取得
onMounted(() => {
    fetchCategories();


        // イベントリスナーが未登録の場合のみ登録する
        // eventBusというイベントバスを介して「quizCompleted」というイベントをリッスンする
        // quizCompletedイベント（クイズが終了したことを通知するイベント）を受け取るたびにhandleQuizCompleted関数を実行する 
    eventBus.on('quizCompleted', handleQuizCompleted);
    console.log('Top.vue - quizCompleted event listener added');
});


// もし eventBus.off を使用せずにリスナーを削除しない場合、コンポーネントがアンマウントされてもリスナーが残り、
// 不要なイベント処理が続行される可能性があるため
// アンマウント時にイベントリスナーを削除
onUnmounted(() => {
    // eventBusというイベントバスから「quizCompleted」というイベントのリスナーを削除する
    eventBus.off('quizCompleted', handleQuizCompleted);
    console.log('Top.vue - quizCompleted event listener removed');
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

// イベントバスオブジェクトを作成
const eventBus = mitt();
const quizResults = ref([]);

// クイズ終了時の処理
const handleQuizCompleted = ({ result, category, numQuestions }) => {
  // quizResultsに追加する部分は変更なし
  // ...
    eventBus.emit('quizCompleted', {
        result,
        category,
        numQuestions,
    });
};

// フラッシュメッセージを管理
const flashMessage = ref(null);

// コンポーネントがマウントされた際にフラッシュメッセージを取得
onMounted(() => {
    // フラッシュメッセージをLocalStorageから取得
    flashMessage.value = localStorage.getItem('flashMessage');
    // フラッシュメッセージをLocalStorageから削除
    localStorage.removeItem('flashMessage');
});

</script>

<template>
    <Head title="クイズ画面" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-2xl text-gray-800 leading-tight">クイズ画面</h2>
        </template>
    
    <!-- フラッシュメッセージを表示 -->
    <div v-if="flashMessage" class="bg-green-200 p-2 mb-4 rounded-md">
        {{ flashMessage }}
    </div>

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
                <Quiz :quizData="currentQuiz" :selectedNumQuestions="selectedNumQuestions" @quizCompleted="handleQuizCompleted" />
            </div>
        </div>
    </AuthenticatedLayout>
</template>