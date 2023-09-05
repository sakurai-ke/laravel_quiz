<script setup>
// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import { ref, onMounted, defineProps, defineEmits, nextTick } from 'vue';
import axios from 'axios';
import Result from './Result.vue'; // Result コンポーネントをインポート
import { computed } from 'vue';
import MicroModal from '@/MicroModal/QuizModal.vue'

// 親コンポーネントから渡されるプロパティを定義
const props = defineProps({
    quizData: Object, // 親コンポーネントから渡されるクイズデータ
    selectedNumQuestions: Number, // 親コンポーネントから渡される問題数データ
    // record_id: Number, // Top.vueから受け取るrecord_id
    selectedCategory: Number, 
});
console.log('selectedNumQuestionsの値:', props.selectedNumQuestions);
console.log('record_idの値:', props.record_id);
console.log('selectedCategoryの値:', props.selectedCategory);

// ユーザが選択した回答を保持するためのリアクティブな変数
// ラジオボタンなどのフォームコントロールの v-model ディレクティブにバインドされ、ユーザが選択した回答が保持
const selectedChoice = ref(null);
// シャッフルされたクイズの選択肢を保持する
const shuffledChoices = ref([]);

// クイズが終了した際のメッセージ
const quizEndMessage = ref('');
// const showQuiz = ref(true); // 新しい変数を追加

// const quizList = ref([]);
// この変数の初期値を -1 に設定しているのは、クイズが開始された直後に最初のクイズが表示されるようにするため。インデックスは通常 0 
// から始まるが、初回のクイズ表示時に onMounted フックで fetchNextQuiz 関数が呼ばれると、まず最初にインデックスが 0 に増加してからクイズを表示する。
let currentQuizIndex = 0;

// シャッフルされたクイズリストを保持する変数
let shuffledQuizList = [];

const quizData = ref(props.quizData); // Create a reactive variable

    // レコードIDのプロパティ
// const record_id = ref(props.record_id);
const selectedCategory = ref(props.selectedCategory);
const selectedNumQuestions = ref(props.selectedNumQuestions);
// この変数を使用して「回答」ボタンの表示/非表示を制御
const showAnswerButton = ref(true);
const correctAnswers = []; // 正解したクイズのデータを格納するための配列

const correctPercentage = ref(0); // 仮に初期値として 0 を設定
// const accuracy = ref(0); // 初期値として 0 を設定
const record_id = ref(null); // もしくは、適切な値を代入
const answeredQuestions = ref(0);

// ボタンの表示制御に使用する変数
const showNextButton = ref(true);
const showPrevButton = ref(false);
const showResultButton = ref(false);

// 新しい変数を追加
const usedQuizIds = new Set();

// 初回にクイズデータを取得してシャッフル
onMounted(() => {
  fetchAndShuffleQuizzes();
});

  // 各クイズデータの user_answer プロパティを空文字列にリセット
  shuffledQuizList.forEach(quiz => {
    quiz.user_answer = ''; // 初期値を空文字列に設定
    quiz.answered = false; // 回答したクイズがどれかを管理する
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
    // shuffledQuizList 配列の currentQuizIndex 番目の要素を newQuizData 変数に格納
    const newQuizData = shuffledQuizList[currentQuizIndex];
    
    // クイズが回答済みの場合は回答結果を表示
    if (newQuizData.answered) {
      quizEndMessage.value = `正解！\n${newQuizData.explain}`;
      // 「回答」ボタンを非表示にする
      showAnswerButton.value = false;
    } else {
      quizEndMessage.value = '';
      // 「回答」ボタンを表示する
      showAnswerButton.value = true;
    }
    
    // 新しく取得したクイズデータ newQuizData を quizData.value に代入して画面上のクイズ情報も更新する
    quizData.value = newQuizData;
    console.log('quizData.value', quizData.value);
    
    // シャッフルされた選択肢を shuffledChoices.value に代入して画面上のクイズ選択肢も更新する
    shuffledChoices.value = newQuizData.choices;

        // ユーザー選択の状態を更新
        selectedChoice.value = newQuizData.user_choice;
  } else {
    console.log('すべてのクイズが終了しました');
    // showQuiz.value = false;
    quizEndMessage.value = 'お疲れ様です！クイズが終了しました！';
  }
}

// クイズデータの取得とシャッフル
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
      // 除外するクイズIDを収集
      const excludedQuizIds = shuffledQuizList.map(quiz => quiz.id);

      // 各クイズデータに正解フラグとユーザー選択プロパティを追加
      shuffledQuizList = nextQuizzes
        .filter(quiz => !excludedQuizIds.includes(quiz.id)) // 除外対象のクイズを除外
        .map(quiz => ({
          ...quiz,
          isCorrect: selectedChoice.value === quiz.correct_answer,
          user_choice: '',
          // 選択肢のシャッフル
          choices: shuffleChoices([
            quiz.correct_answer,
            quiz.wrong_answer_1,
            quiz.wrong_answer_2,
            quiz.wrong_answer_3,
          ]),
        }));

      // 以前の選択肢選択状態を更新
      if (shuffledQuizList[currentQuizIndex].answered) {
        selectedChoice.value = shuffledQuizList[currentQuizIndex].user_answer;
      }

      currentQuizIndex = 0; 
      presentRandomQuiz();
      showAnswerButton.value = true;
      quizEndMessage.value = '';
      updateButtonVisibility();
    } else {
      console.error('次のクイズデータがありません');
    }
  } catch (error) {
    console.error('クイズの取得に失敗しました', error);
  }
}

// 「回答」ボタンがクリックされたときの処理
async function submitAnswer() {
  // 現在のクイズを表示するためのデータを取得しnewQuizDataに格納
  const newQuizData = shuffledQuizList[currentQuizIndex];

  // 選択した回答が正解かどうかの判定処理を行う
  const isCorrect = selectedChoice.value === newQuizData.correct_answer;

  // 回答結果に基づいてメッセージを更新
  if (isCorrect) {
    quizEndMessage.value = `正解！\n${newQuizData.explain}`;
    // ユーザが選択した回答をnewQuizDataオブジェクトのuser_answerプロパティに代入
    newQuizData.user_answer = selectedChoice.value;
    newQuizData.answered = true; // クイズが回答されたことを示すフラグを立てる

    // 回答が正解の場合に、そのクイズデータをcorrectAnswer配列に追加
    correctAnswers.push(newQuizData);
    correctPercentage.value = (correctAnswers.length / shuffledQuizList.length) * 100;
  } else {
    quizEndMessage.value = `不正解！正解は「${newQuizData.correct_answer}」です。\n${newQuizData.explain}`;
    // ユーザが選択した回答をnewQuizDataオブジェクトのuser_answerプロパティに代入
    newQuizData.user_answer = selectedChoice.value;
    newQuizData.answered = true; // クイズが回答されたことを示すフラグを立てる

  }

  // メッセージ更新が完了したら次のクイズに進む
  await nextTick();
  
  // 「回答」ボタンを非表示にする
  showAnswerButton.value = false;

  // 正解か不正解に関わらず、回答が行われたことを記録
  answeredQuestions.value++;

  // もしすべてのクイズが回答された場合、結果を保存
  if (answeredQuestions.value === shuffledQuizList.length) {
    try {
      // すべてのクイズが終了した場合に結果を保存
      const record = {
        category_id: selectedCategory.value,
        total_questions: shuffledQuizList.length,
        correct_answers: correctAnswers.length,
        accuracy: correctPercentage.value,
        created_at: new Date(),
        updated_at: new Date(),
      };

      // レコードを保存
      const response = await axios.post('/api/record', record);
      const recordId = response.data.data.id;

      // クイズ結果を保存
      for (const quizResult of shuffledQuizList) {
        const result = {
          record_id: recordId,
          quiz_id: quizResult.id,
          selected_choice: quizResult.user_answer,
          correct: quizResult.user_answer === quizResult.correct_answer,
          created_at: new Date(),
          updated_at: new Date(),
        };
        await axios.post('/api/result', result);
      }

      // すべてのクイズが終了したことを判定し、結果を見るボタンを表示
      if (answeredQuestions.value === shuffledQuizList.length) {
        showResultButton.value = true;
      }

    } catch (error) {
      console.error('結果の保存に失敗しました', error);
      // エラー処理を追加
    }
  }
}

// 「次へ」ボタンがクリックされた際の処理
async function goToNextQuestion() {
  // 前のクイズの情報をリセット
  quizEndMessage.value = ''; // クイズ終了メッセージをリセット
  selectedChoice.value = ''; // 選択した回答をリセット

  if (currentQuizIndex < shuffledQuizList.length-1) {
    currentQuizIndex++; // インデックスを次のクイズに更新
    presentRandomQuiz(); //次のクイズを出題する

    // 回答済みクイズの場合は「回答」ボタンを非表示にする
    if (shuffledQuizList[currentQuizIndex].answered) {
      showAnswerButton.value = false;
    } else {
      // 未回答クイズの場合は「回答」ボタンを表示する
      showAnswerButton.value = true;
    }

    updateButtonVisibility(); // ボタンの表示を更新
  } else {
    // もしクイズが最後まで行った場合、新しいクイズデータを取得する
    fetchAndShuffleQuizzes();
  }
}

// 「前のクイズへ」ボタンがクリックされた際の処理
function goToPrevQuestion() {
  // 前のクイズの情報をリセット
  quizEndMessage.value = ''; // クイズ終了メッセージをリセット
  selectedChoice.value = ''; // 選択した回答をリセット

  if (currentQuizIndex > 0) {
    currentQuizIndex--; // インデックスを前のクイズに更新
    presentRandomQuiz(); // 前のクイズを出題する
    updateButtonVisibility(); // ボタンの表示を更新
  }
}

// クイズ画面ごとの前後のクイズへの遷移ボタン制御を行う関数
function updateButtonVisibility() {
  // 最初のクイズ画面では「前のクイズへ」ボタンを非表示、
  // 「次のクイズへ」ボタンを表示
  if (currentQuizIndex === 0) {
    showPrevButton.value = false;
    showNextButton.value = true;
  } 
  // 最後のクイズ画面では「前のクイズへ」ボタンを表示し、
  // 「次のクイズへ」ボタンを非表示
  else if (currentQuizIndex === shuffledQuizList.length - 1) {
    showPrevButton.value = true;
    showNextButton.value = false;
  } 
  // それ以外のクイズ画面では両方のボタンを表示
  else {
    showPrevButton.value = true;
    showNextButton.value = true;
  }
}

// 選択肢を選択する関数
function selectChoice(choice) {
  // 回答済みクイズの場合、選択肢のクリックを無効にする
  if (shuffledQuizList[currentQuizIndex].answered) {
    return;
  }

  // それ以外の場合は選択した回答を設定
  selectedChoice.value = choice;
  selectedChoiceColor.value = choice;

  // ユーザー選択プロパティを更新
  shuffledQuizList[currentQuizIndex].user_choice = choice;
}


// 画像のパスを生成する関数
function getImageUrl(imageName) {
  // Laravelのassetヘルパーを使って画像のパスを生成
  return "{{ asset('storage/images') }}/" + imageName;
}

const selectedChoiceColor = ref(null);

// クイズ画面を表示する関数
function goToQuiz(index) {
  // クイズ番号をクリックしたときに、そのクイズの index を受け取り、該当するクイズを表示
  currentQuizIndex = index;

  // 回答済みクイズの場合、選択肢のクリックを無効にする
  if (shuffledQuizList[currentQuizIndex].answered) {
    selectedChoiceColor.value = shuffledQuizList[currentQuizIndex].user_choice;
  } else {
    selectedChoiceColor.value = null;
  }

  presentRandomQuiz();
  showAnswerButton.value = true;
  updateButtonVisibility();
}

const hint = ref(''); // ヒントの初期値は空

// ヒントを取得する関数
async function getHint() {
    try {
        // クイズの問題文（title）と正解をコントローラに送信
        const response = await axios.post('/api/get-hint', {
            problem_statement: quizData.value.title, // titleを使用
            correct_answer: quizData.value.correct_answer,
        });
        console.log('responseの値:', response);

        // レスポンスデータからヒントを取得
        const hintData = response.data.hint;

        if (hintData) {
            // ヒントが含まれている場合、hint変数に代入
            hint.value = hintData;
            console.log('ヒントの値:', hint.value); // ヒントの値をコンソールに表示
        } else {
            // ヒントが含まれていない場合、適切なメッセージを設定
            hint.value = 'このクイズにはヒントがありません。';
        }
    } catch (error) {
        console.error('ヒントの取得に失敗しました', error);
        // エラー処理を追加
    }
}

const quizResults = ref([]);
const userIsLoggedIn = ref(false); // デフォルトでは未ログイン状態



// クイズ結果を保存する関数を修正
async function saveQuizResult() {
  const newQuizData = shuffledQuizList[currentQuizIndex];
  const isCorrect = selectedChoice.value === newQuizData.correct_answer;

  if (isCorrect) {
    quizEndMessage.value = `正解！\n${newQuizData.explain}`;
    newQuizData.user_answer = selectedChoice.value;
    newQuizData.answered = true;
    correctAnswers.push(newQuizData);
    correctPercentage.value = (correctAnswers.length / shuffledQuizList.length) * 100;
  } else {
    quizEndMessage.value = `不正解！正解は「${newQuizData.correct_answer}」です。\n${newQuizData.explain}`;
    newQuizData.user_answer = selectedChoice.value;
    newQuizData.answered = true;
  }

  answeredQuestions.value++;

  // 未ログインのユーザーの場合はクイズ結果をquizResultsに追加
  if (!userIsLoggedIn) {
    quizResults.value.push({
      isCorrect: isCorrect,
      quizData: newQuizData,
    });
  }

  await nextTick();

  showAnswerButton.value = false;

  if (answeredQuestions.value === shuffledQuizList.length) {
    showResultButton.value = true;
  }
}

</script>

<template>
          <div class="fixed top-40 right-4 z-50">
            <MicroModal />
        </div>
<p>正答率{{ correctPercentage }}</p>
<p>何問目か{{ currentQuizIndex + 1 }}</p>
<p>回答済みはいくつあるか{{ answeredQuestions }}</p>

<div class="w-full max-w4xl mx-auto p-6 bg-white rounded-md shadow-md h-auto">
    
    <!-- 画像を表示 -->
    <img :src="getImageUrl(quizData.image_src)" alt="Quiz Image" class="mb-4" />

    
    <div class="quiz-progress">
    <!-- クイズ番号のリストをループ -->
    <div
      v-for="(quiz, index) in shuffledQuizList"
      :key="index"
      :class="{
        'quiz-number': true,
        'answered-quiz': quiz.answered,
        'unanswered-quiz': !quiz.answered,
        'current-quiz': index === currentQuizIndex, // 現在の問題番号に対応する要素にクラスを追加
      }"

      @click="goToQuiz(index)"

    >
      {{ index + 1 }}
    </div>
  </div>

    <p class="mb-2 text-gray-600">
      {{ currentQuizIndex + 1 }}問目 / {{ shuffledQuizList.length }}問中
    </p>

    <h2 class="text-xl font-semibold mb-4">{{ quizData.title }}</h2>
    <ul class="choice-list">
      <li v-for="(choice, index) in shuffledChoices" :key="index">
        <label class="choice-label">
          <input type="radio" :disabled="quizData.answered" v-model="selectedChoice" :value="choice" class="hidden" />
          <button
            :class="{
              'choice-button': true,
              'selected-choice': selectedChoice === choice,
              'unselected-choice': selectedChoice !== choice,
            }"
            @click="selectChoice(choice)"
          >
            {{ choice }}
          </button>
        </label>
      </li>
    </ul>

    <!-- 「次へ」をクリックすると回答ボタンを表示 -->
    <button
    v-if="showAnswerButton && !quizData.answered"
      @click="submitAnswer"
      :class="{
        'answer-button': true,
        'bg-blue-500 hover:bg-blue-600 text-white': selectedChoice !== '',
        'bg-gray-300 cursor-not-allowed': selectedChoice === '',
      }"
      :disabled="selectedChoice === ''"
      class="mt-4 w-full py-2 px-4 rounded-md focus:outline-none transition duration-300"
    >
      回答
    </button>
      <div v-if="quizEndMessage !== ''" class="quiz-end-message">
        <p v-if="quizEndMessage.startsWith('正解')" class="font-semibold">{{ quizEndMessage }}</p>
        <p v-else>{{ quizEndMessage }}</p>
      <div class="mb-4"></div>
      <button v-if="currentQuizIndex < shuffledQuizList.length - 1" @click="goToNextQuestion" @quizCompleted="quizCompleted" 
      class="mt-4 w-1/2 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none transition duration-300"
      style="margin: 16px auto 0; display: block;">
        次へ
      </button>
      <Link
        v-if="showResultButton"
        :href="userIsLoggedIn ? route('quiz.result', { correctPercentage: correctPercentage }) : null"
        :quiz-results="userIsLoggedIn ? null : quizResults"
        class="mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none transition duration-300"
      
        >
        結果を見る
      </Link>


    </div>

  </div>

      <!-- ボタン表示部分 -->
    <div class="button-group">
      <!-- 「前のクイズへ」ボタン -->
      <button
        v-if="showPrevButton"
        @click="goToPrevQuestion"
        :class="{
          'bg-blue-500 hover:bg-blue-600 text-white': showPrevButton,
          'bg-gray-300 cursor-not-allowed': !showPrevButton,
        }"
        class="prev-button"
      >
        前のクイズへ
      </button>

      <!-- 「次のクイズへ」ボタン -->
      <button
        v-if="showNextButton"
        @click="goToNextQuestion"
        :class="{
          'bg-blue-500 hover:bg-blue-600 text-white': showNextButton,
          'bg-gray-300 cursor-not-allowed': !showNextButton,
        }"
        class="next-button"
      >
        次のクイズへ
      </button>
    </div>

    <!-- ヒントボタン -->
  <button
    @click="getHint"
    class="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none transition duration-300"
  >
    ヒント
  </button>

  <!-- ヒントの表示エリア -->
  <div v-if="hint" class="mt-4 p-4 bg-gray-100 rounded-md">
    <h3 class="text-lg font-semibold mb-2">ヒント</h3>
    <p class="text-gray-700">{{ hint }}</p>
  </div>
  
</template>

<style scoped>

.w-full {
    width: 96%;
}
/* クイズ番号のスタイル */
.quiz-progress {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

/* クイズ番号のデフォルトスタイル */
.quiz-number {
  width: 30px;
  height: 30px;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  cursor: pointer;
  margin: 0 5px;
  margin-bottom: 5px; /* クイズ番号が改行される際の余白を設定 */
}

/* 回答済みクイズの背景色スタイル */
.answered-quiz {
  background-color: #6ee7b7;
  color: white;
  border-radius: 50%; /* 丸くする */
}

/* 未回答クイズの背景色スタイル */
.unanswered-quiz {
  background-color: #ffffff;
  border-radius: 50%; /* 丸くする */
}

/* ボタンのスタイル */
.button-group {
  display: flex;
  justify-content: space-between; /* ボタンを両端に寄せる */
  align-items: center;
  margin-top: 20px;
}

/* 前のクイズへボタンのスタイル */
.prev-button {
  width: calc(50% - 17%); /* 右側のボタン幅を調整 */
  padding: 10px;
  border-radius: 4px;
  /* text-align: center; */
  background-color: #0074d9;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s, opacity 0.3s;
  margin: 0 auto;
}

.prev-button:hover {
  background-color: #0056b3;
}

/* 次のクイズへボタンのスタイル */
.next-button {
  width: calc(50% - 17%); /* 右側のボタン幅を調整 */
  padding: 10px;
  border-radius: 4px;
  /* text-align: center; */
  background-color: #0074d9;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s, opacity 0.3s;
  margin: 0 auto;
}
.next-button:hover {
  background-color: #0056b3;
}

/* 現在のクイズ番号を強調表示するスタイル */
.current-quiz {
  background-color: #0074d9;
  color: white;
  font-weight: bold;
  border-radius: 50%; /* 丸くする */
}

/* 回答選択肢リストのスタイル */
.choice-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2列に分割 */
  grid-gap: 10px; /* 選択肢間のスペース */
}

/* 回答選択肢のスタイル */
.choice-label {
  display: block;
}

.choice-button {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;
  text-align: center;
  cursor: pointer;
}

/* 選択された回答のスタイル */
.selected-choice {
  background-color: #0074d9;
  color: white;
}

/* 未選択の回答のスタイル */
.unselected-choice {
  background-color: #f0f0f0;
  color: #333;
}

/* 回答ボタンのスタイル */
.answer-button {
  width: 50%; /* ボタンを枠の幅に合わせる */
  display: flex; /* 子要素を横方向に並べる */
  justify-content: center; /* 子要素を横方向に中央寄せ */
  padding: 10px;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;
  text-align: center;
  cursor: pointer;
  margin: 0 auto;
  margin-top: 16px;

}

/* レスポンシブ対応: 画面幅が小さい場合に縦4列に */
@media (max-width: 768px) {
  .choice-list {
    grid-template-columns: repeat(1, 1fr); /* 4列に分割 */
  }
  
    /* 画面幅が小さい場合の回答ボタンのスタイル */
    .answer-button {
    width: 100%; /* 画面幅が小さい場合は選択肢と同じ横幅 */
  }
  
  .prev-button,
  .next-button {
    width: 46%;
  }
  
}
</style>