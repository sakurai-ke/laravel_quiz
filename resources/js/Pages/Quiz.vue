<script setup>
// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import { ref, onMounted, defineProps, nextTick } from 'vue';
import axios from 'axios';
import Result from './Result.vue'; // Result コンポーネントをインポート

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

// クイズが終了した際のメッセージ
const quizEndMessage = ref('');
const showQuiz = ref(true); // 新しい変数を追加

const quizList = ref([]);
// この変数の初期値を -1 に設定しているのは、クイズが開始された直後に最初のクイズが表示されるようにするため。インデックスは通常 0 
// から始まるが、初回のクイズ表示時に onMounted フックで fetchNextQuiz 関数が呼ばれると、まず最初にインデックスが 0 に増加してからクイズを表示する。
let currentQuizIndex = 0;

// シャッフルされたクイズリストを保持する変数
let shuffledQuizList = [];

const quizData = ref(props.quizData); // Create a reactive variable

const quizState = ref(''); // 初期値は空文字列

// 結果画面を表示するためのフラグ
const showResultComponent = ref(false);

// 初回にクイズデータを取得してシャッフル
onMounted(() => {
  fetchAndShuffleQuizzes();
});


// クイズの選択肢をシャッフルする関数
function shuffleChoices(choices) {
    for (let i = choices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [choices[i], choices[j]] = [choices[j], choices[i]];
    }
    console.log('choices', choices);
    return choices;
}


// ランダムな順序でクイズリストをシャッフルする関数
function shuffleQuizList(quizList) {
  for (let i = quizList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [quizList[i], quizList[j]] = [quizList[j], quizList[i]];
  }
  return quizList;
}

//  クイズデータの取得とシャッフル
async function fetchAndShuffleQuizzes() {
  // 特定のカテゴリーのクイズデータを一括で取得
  try {
    const response = await axios.get('/api/quizzes', {
      params: {
        category_id: quizData.value.category_id,
        num_questions: props.selectedNumQuestions,
      },
    });
    // クイズデータの問題部分をnextQuizzesに格納
    const nextQuizzes = response.data;
    console.log('nextQuizzes', nextQuizzes);
    if (nextQuizzes.length > 0) {
      // クイズリストをシャッフルしてshuffledQuizListに代入
      shuffledQuizList = shuffleQuizList(nextQuizzes); 
      console.log('shuffledQuizListの値:', shuffledQuizList);
      // 新しいセットのクイズが取得されるたびにクイズのindexをリセット
      currentQuizIndex = 0; 
      // presentRandomQuiz関数でランダムなクイズを出題
      presentRandomQuiz();
    } else {
      console.error('次のクイズデータがありません');
    }
  } catch (error) {
    console.error('クイズの取得に失敗しました', error);
  }
}


// ランダムなクイズを出題
function presentRandomQuiz() {
    // 現在のクイズのインデックスがシャッフルされたクイズリストの要素数未満であるかどうかをチェック
  if (currentQuizIndex < shuffledQuizList.length) {
    // shuffledQuizList 配列の currentQuizIndex 番目の要素をnewQuizData変数に格納
    const newQuizData = shuffledQuizList[currentQuizIndex];
    // 新しく取得したクイズデータnewQuizDataをquizData.valueに代入して画面上のクイズ情報も更新する
    quizData.value = newQuizData;
    // シャッフルされた選択肢をshuffledChoices.value代入して画面上のクイズ選択肢も更新する
    shuffledChoices.value = shuffleChoices([
      newQuizData.correct_answer,
      newQuizData.wrong_answer_1,
      newQuizData.wrong_answer_2,
      newQuizData.wrong_answer_3,
    ]);
  } else {
    console.log('すべてのクイズが終了しました');
    // showQuiz.value = false;
    quizEndMessage.value = 'お疲れ様です！クイズが終了しました！';
  }
}

// gdfhgdfgdsdfdsg

// 「回答」ボタンがクリックされたときの処理
async function submitAnswer() {
  const newQuizData = shuffledQuizList[currentQuizIndex];
  if (selectedChoice.value === newQuizData.correct_answer) {
    quizEndMessage.value = `正解！\n${newQuizData.explain}`;
  } else {
    quizEndMessage.value = `不正解！正解は「${newQuizData.correct_answer}」です。\n${newQuizData.explain}`;
  }

  quizState.value = 'answer'; // 「回答」後の状態に変更

  // メッセージ更新が完了したら次のクイズに進む
  await nextTick();
  presentRandomQuiz();
}


// fsdgsdgdsgsdfsdfdsfsdfsdfsdf

// 「結果を見る」ボタンがクリックされた際の処理
async function showResult() {
  // 結果画面用のメッセージを作成
  const totalQuestions = shuffledQuizList.length;
  // 　user_answer（ユーザが選択した回答）がcorrect_answer（正解の回答）と一致するクイズだけを抽出する
  const correctAnswers = shuffledQuizList.filter(quiz => quiz.user_answer === quiz.correct_answer);
  const correctPercentage = (correctAnswers.length / totalQuestions) * 100;
  const resultMessage = `正答率: ${correctPercentage.toFixed(2)}% (${correctAnswers.length}/${totalQuestions})`;

  // クイズ結果メッセージを表示
  quizEndMessage.value = 'お疲れ様です！クイズが終了しました！\n' + resultMessage;
  
  // クイズ表示を非表示にする
  showQuiz.value = false;

  // 結果画面を表示するためのフラグをセット
  showResult.value = true;

  showResultComponent.value = true;
}

// 「次へ」ボタンがクリックされた際の処理
async function goToNextQuestion() {
  // 前のクイズの情報をリセット
  quizEndMessage.value = '';
  selectedChoice.value = '';

  currentQuizIndex++;
  if (currentQuizIndex < shuffledQuizList.length) {
    // 次のクイズを表示する前に showQuiz を true に戻す
    showQuiz.value = true;
    presentRandomQuiz();
  } else {
    showResult(); // 最後の問題が終了した場合に結果を表示
  }
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
    <button @click="submitAnswer" :disabled="selectedChoice === ''" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
      回答
    </button>
    <div v-if="quizEndMessage !== ''">
      <p v-if="quizEndMessage.startsWith('正解')" class="font-semibold">{{ quizEndMessage }}</p>
      <p v-else>{{ quizEndMessage }}</p>
      <button v-if="currentQuizIndex < shuffledQuizList.length - 1" @click="goToNextQuestion" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
        次へ
      </button>
      <Link v-else :href="route('quiz.result')" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
        結果を見る
      </Link>
    </div>
    <Result v-if="showResultComponent" :resultMessage="quizEndMessage" />
  </div>
</template>
