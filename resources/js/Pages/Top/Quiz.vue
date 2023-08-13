<script setup>
// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import { ref, onMounted, defineProps, nextTick } from 'vue';
import axios from 'axios';
import Result from './Result.vue'; // Result コンポーネントをインポート
import { computed } from 'vue';


// import FlashMessage from '@/Components/FlashMessage.vue';

// 親コンポーネントから渡されるプロパティを定義
const props = defineProps({
    quizData: Object, // 親コンポーネントから渡されるクイズデータ
    selectedNumQuestions: Number // 親コンポーネントから渡される問題数データ
});
console.log('selectedNumQuestionsの値:', props.selectedNumQuestions);


// ユーザが選択した回答を保持するためのリアクティブな変数
// ラジオボタンなどのフォームコントロールの v-model ディレクティブにバインドされ、ユーザが選択した回答が保持
const selectedChoice = ref(null);
// シャッフルされたクイズの選択肢を保持する
const shuffledChoices = ref([]);

// クイズが終了した際のメッセージ
const quizEndMessage = ref('');
const showQuiz = ref(true); // 新しい変数を追加

// const quizList = ref([]);
// この変数の初期値を -1 に設定しているのは、クイズが開始された直後に最初のクイズが表示されるようにするため。インデックスは通常 0 
// から始まるが、初回のクイズ表示時に onMounted フックで fetchNextQuiz 関数が呼ばれると、まず最初にインデックスが 0 に増加してからクイズを表示する。
let currentQuizIndex = 0;

// シャッフルされたクイズリストを保持する変数
let shuffledQuizList = [];

const quizData = ref(props.quizData); // Create a reactive variable

// const quizState = ref(''); // 初期値は空文字列

// 結果画面を表示するためのフラグ
const showResultComponent = ref(false);

// この変数を使用して「回答」ボタンの表示/非表示を制御
const showAnswerButton = ref(true);
const correctAnswers = []; // 正解したクイズのデータを格納するための配列

const correctPercentage = ref(0); // 仮に初期値として 0 を設定


// 初回にクイズデータを取得してシャッフル
onMounted(() => {
  fetchAndShuffleQuizzes();
});


  // 各クイズデータの user_answer プロパティを空文字列にリセット
  shuffledQuizList.forEach(quiz => {
    quiz.user_answer = ''; // 初期値を空文字列に設定
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


// クイズデータの取得とシャッフル
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

      // 各クイズデータの user_answer プロパティを空文字列にリセット
      shuffledQuizList.forEach(quiz => {
        quiz.user_answer = ''; // 初期値を空文字列に設定
      });

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


// 「回答」ボタンがクリックされたときの処理
async function submitAnswer() {
  const newQuizData = shuffledQuizList[currentQuizIndex];
  // 選択した回答が正しい回答と一致した場合
  if (selectedChoice.value === newQuizData.correct_answer) {
    quizEndMessage.value = `正解！\n${newQuizData.explain}`;
    // ユーザーがクイズに対して選択した回答を newQuizData オブジェクト内の user_answer プロパティに保存
    newQuizData.user_answer = selectedChoice.value;
    // ユーザーがクイズに正解した場合に、その正解したクイズのデータを correctAnswers 配列に追加
    correctAnswers.push(newQuizData); 
    console.log('correctAnswers:', correctAnswers);
      // 正答率を計算する
  const totalQuestions = shuffledQuizList.length;
  correctPercentage.value = (correctAnswers.length / totalQuestions) * 100;

  } else {
    quizEndMessage.value = `不正解！正解は「${newQuizData.correct_answer}」です。\n${newQuizData.explain}`;
    newQuizData.user_answer = selectedChoice.value; // user_answer を更新
  }

  // quizState.value = 'answer'; // 「回答」後の状態に変更

  // メッセージ更新が完了したら次のクイズに進む
  await nextTick();
  
  // 「回答」ボタンを非表示にする
  showAnswerButton.value = false;
}

// 正答率を計算する computed プロパティ
// const computedCorrectPercentage = computed(() => {
//   const totalQuestions = shuffledQuizList.length;
//   const correctAnswersCount = correctAnswers.value.length; // 正解したクイズの数を取得
//   console.log('correctAnswers.length:', correctAnswers.value.length);
//   console.log('totalQuestions:', totalQuestions);
//   console.log('correctAnswersCount:', correctAnswersCount);
//   return (correctAnswersCount / totalQuestions) * 100;
// });

// 「結果を見る」ボタンがクリックされた際の処理
async function showResult() {
  // const totalQuestions = shuffledQuizList.length;
  // const correctAnswersCount = correctAnswers.length; // 正解したクイズの数を取得

  // // 正答率を計算
  // correctPercentage.value = (correctAnswersCount / totalQuestions) * 100;
  // console.log('correctPercentage.value', correctPercentage.value);
  // 結果画面を表示するためのフラグをセット
  showQuiz.value = false;
  showResultComponent.value = true;
}


// 「次へ」ボタンがクリックされた際の処理
async function goToNextQuestion() {
  
  // 前のクイズの情報をリセット
  quizEndMessage.value = '';
  selectedChoice.value = '';
  currentQuizIndex++;

  const totalQuestions = shuffledQuizList.length;
  const correctAnswersCount = correctAnswers.length; // 正解したクイズの数を取得
  console.log('correctAnswers.length:', correctAnswers.length);
  console.log('totalQuestions:', totalQuestions);
  console.log('correctAnswersCount:', correctAnswersCount);

  if (currentQuizIndex < shuffledQuizList.length) {
    // 次のクイズを表示する前に showQuiz を true に戻す
    showQuiz.value = true;
    presentRandomQuiz();
    // 「回答」ボタンを再度表示する
    showAnswerButton.value = true;
  // 正答率を更新せずに computedCorrectPercentage の値にアクセス

  correctPercentage.value = (correctAnswersCount / totalQuestions) * 100;
  } else {
    showResult(); // 最後の問題が終了した場合に結果を表示
  }
}

// 選択肢を選択する関数
function selectChoice(choice) {
  // 「回答」ボタンが表示されている場合
  if (showAnswerButton.value) {
    // 選択した回答をselectedChoice.valueに格納
    selectedChoice.value = choice;
  }
}
// ふぁlkfごgfdgっhsffjhfkjshfksdhfkjhdsgdfgfgdfg

</script>

<template>
<p>{{ correctPercentage }}</p>
  <div class="w-full max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
    <h2 class="text-xl font-semibold mb-4">{{ quizData.title }}</h2>
    <ul class="space-y-2">
      <li v-for="(choice, index) in shuffledChoices" :key="index">
        <label class="block cursor-pointer">
          <input type="radio" v-model="selectedChoice" :value="choice" class="hidden" />
          <button
            :class="{
              'bg-blue-500 hover:bg-blue-600 text-white': selectedChoice === choice,
              'bg-gray-200 hover:bg-gray-300 text-gray-700': selectedChoice !== choice,
            }"
            @click="selectChoice(choice)"
            class="w-full py-2 px-4 rounded-md transition duration-300"
          >
            {{ choice }}
          </button>
        </label>
      </li>
    </ul>
    <!-- 「次へ」をクリックすると回答ボタンを表示 -->
    <button v-if="showAnswerButton" @click="submitAnswer" :disabled="selectedChoice === ''" class="mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none transition duration-300">
      回答
    </button>
    <div v-if="quizEndMessage !== ''">
      <p v-if="quizEndMessage.startsWith('正解')" class="font-semibold">{{ quizEndMessage }}</p>
      <p v-else>{{ quizEndMessage }}</p>
      <button v-if="currentQuizIndex < shuffledQuizList.length - 1" @click="goToNextQuestion" class="mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none transition duration-300">
        次へ
      </button>
      <Link v-else :href="route('quiz.result', { correctPercentage: correctPercentage })" class="mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none transition duration-300">
        結果を見る
      </Link>

    </div>
  </div>
</template>