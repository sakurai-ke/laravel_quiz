<script setup>
// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import { ref, onMounted, defineProps } from 'vue';
import axios from 'axios';
// import FlashMessage from '@/Components/FlashMessage.vue';

// 親コンポーネントから渡されるプロパティを定義
const props = defineProps({
    quizData: Object, // 親コンポーネントから渡されるクイズデータ
    selectedNumQuestions: Number // 親コンポーネントから渡される問題数データ
});
console.log('selectedNumQuestionsの値:', props.selectedNumQuestions);


// ユーザが選択した回答を保持するためのリアクティブな変数
// ラジオボタンなどのフォームコントロールの v-model ディレクティブにバインドされ、ユーザが選択した回答が保持
const selectedChoice = ref('');
// シャッフルされたクイズの選択肢を保持する
const shuffledChoices = ref([]);

const quizData = ref(props.quizData); // Create a reactive variable

const quizList = ref([]);
// この変数の初期値を -1 に設定しているのは、クイズが開始された直後に最初のクイズが表示されるようにするため。インデックスは通常 0 
// から始まるが、初回のクイズ表示時に onMounted フックで fetchNextQuiz 関数が呼ばれると、まず最初にインデックスが 0 に増加してからクイズを表示する。
let currentQuizIndex = -1;

// シャッフルされたクイズリストを保持する変数
let shuffledQuizList = [];

// 初回にクイズデータを取得してシャッフル
onMounted(() => {
  fetchAndShuffleQuizzes();
});

// ランダムなクイズを出題
function presentRandomQuiz() {
    // 現在のクイズのインデックスがシャッフルされたクイズリストの要素数未満であるかどうかをチェック
  if (currentQuizIndex < shuffledQuizList.length) {
    const newQuizData = shuffledQuizList[currentQuizIndex];
    quizData.value = newQuizData;
    shuffledChoices.value = shuffleChoices([
      newQuizData.correct_answer,
      newQuizData.wrong_answer_1,
      newQuizData.wrong_answer_2,
      newQuizData.wrong_answer_3,
    ]);
  } else {
    console.log('すべてのクイズが終了しました');
  }
}

//  クイズデータの取得とシャッフル
async function fetchAndShuffleQuizzes() {
  try {
    const response = await axios.get('/api/quizzes', {
      params: {
        category_id: quizData.value.category_id,
        num_questions: props.selectedNumQuestions,
      },
    });
    const nextQuizzes = response.data;
    if (nextQuizzes.length > 0) {
      shuffledQuizList = shuffleQuizList(nextQuizzes); // クイズリストをシャッフル
      currentQuizIndex = 0; // インデックスをリセット
      presentRandomQuiz(); // ランダムなクイズを出題
    } else {
      console.error('次のクイズデータがありません');
    }
  } catch (error) {
    console.error('クイズの取得に失敗しました', error);
  }
}

// クイズの選択肢をシャッフルする関数
function shuffleChoices(choices) {
    for (let i = choices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [choices[i], choices[j]] = [choices[j], choices[i]];
    }
    console.log('choices', choices);
    return choices;
}

// いいいいいいいいいいいいいい

// ランダムな順序でクイズリストをシャッフルする関数
function shuffleQuizList(quizList) {
  for (let i = quizList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [quizList[i], quizList[j]] = [quizList[j], quizList[i]];
  }
  return quizList;
}


async function fetchNextQuiz() {
    // 特定のカテゴリーから指定した数のクイズデータを取得
    try {
        const response = await axios.get('/api/quizzes', {
            params: {
                category_id: quizData.value.category_id,
                num_questions: props.selectedNumQuestions,
            },
        });
        const nextQuizzes = response.data;
        console.log('nextQuizzes:', nextQuizzes);
        if (nextQuizzes.length > 0) {
            // nextQuizzesから最初のクイズデータを取り出し、newQuizDataに代入
            const newQuizData = nextQuizzes[0];
            // 現在のクイズデータを更新
            quizData.value = newQuizData;
            // クイズデータをquizListに追加
            quizList.value.push(newQuizData);
            console.log('quizList.value.:', quizList.value);
            // 選択肢をシャッフル
            shuffledChoices.value = shuffleChoices([
                newQuizData.correct_answer,
                newQuizData.wrong_answer_1,
                newQuizData.wrong_answer_2,
                newQuizData.wrong_answer_3,
            ]);
        } else {
            console.error('次のクイズデータがありません');
        }
    } catch (error) {
        console.error('次のクイズの取得に失敗しました', error);
    }
}



// 「次へ」ボタンがクリックされたときの処理
async function submitAnswer() {
  currentQuizIndex++; // 次のクイズを表示
  presentRandomQuiz(); // ランダムなクイズを出題
}



</script>

<template>
    <div class="w-full max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
        <h2 class="text-xl font-semibold mb-4">{{ quizData.title }}</h2>
        <ul class="space-y-2">
            <li v-for="(choice, index) in shuffledChoices" :key="index">
                <label class="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" v-model="selectedChoice" :value="choice" class="text-blue-500 focus:ring-2 focus:ring-blue-300" />
                    <span class="text-gray-800">{{ choice }}</span>
                </label>
            </li>
        </ul>
        <button @click="submitAnswer" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
            次へ
        </button>
    </div>
</template>


