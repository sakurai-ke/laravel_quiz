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

//各クイズデータのuser_answerプロパティを空文字列にリセットし、answeredプロパティをfalseに設定することで、全てのクイズが未回答の状態にリセットする
shuffledQuizList.forEach(quiz => {
  // 選択した回答を保持。初期値として空 '' が設定され、ユーザーが回答する前は未選択状態を示す。
  quiz.user_answer = '';
  // クイズが回答されたかどうかを管理。初期値としてfalseが設定され、ユーザーが回答する前はクイズが未回答状態を示す。
  quiz.answered = false;
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
// ランダムなクイズを出題
function presentRandomQuiz() {
    // shuffledQuizList配列のcurrentQuizIndex番目の要素をnewQuizData変数に格納
    const newQuizData = shuffledQuizList[currentQuizIndex];
    console.log('newQuizData', newQuizData);
    //新しく取得したクイズデータnewQuizDataを quizData.valueに代入して画面上のクイズ情報が更新される
    quizData.value = newQuizData;
    //シャッフルされたクイズの選択肢をshuffledChoices.valueに代入して保持する
    shuffledChoices.value = newQuizData.choices;
    //ユーザが選択した選択肢を保持するためにselectedChoice.value変数に保持
    selectedChoice.value = newQuizData.user_choice;
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
      //shuffledQuizListの各要素に対してquiz.idを抽出し、それを新しい配列excludedQuizIdsに格納の処理により、
      //すでに選ばれたクイズIDが含まれる配列が作成される
      const excludedQuizIds = shuffledQuizList.map(quiz => quiz.id);

    //nextQuizzesから取得されたクイズデータを処理し、新しい配列shuffledQuizListを生成
    shuffledQuizList = nextQuizzes
      // クイズIDがexcludedQuizIds配列に含まれていないクイズデータのみを抽出
        .filter(quiz => !excludedQuizIds.includes(quiz.id)) // 除外対象のクイズを除外
        .map(quiz => ({
          ...quiz,
          //ユーザーが選択した回答と 正解の回答を比較して計算され、正解の場合はtrue、不正解の場合はfalse。回答が正解かどうかを示すブール値を格納する。
          isCorrect: selectedChoice.value === quiz.correct_answer,
          // ユーザーが選択した回答を保持します。初期値は空文字。
          user_choice: '',
          //shuffleChoices関数により、選択肢をランダムにシャッフルした配列を格納
          choices: shuffleChoices([
            quiz.correct_answer,
            quiz.wrong_answer_1,
            quiz.wrong_answer_2,
            quiz.wrong_answer_3,
          ]),
        }));
        console.log('shuffledQuizList', shuffledQuizList);
      //現在のクイズ（currentQuizIndexが指すクイズ）が回答済みの場合
      if (shuffledQuizList[currentQuizIndex].answered) {
        // ユーザーの選択肢がselectedChoice.valueに格納される
        selectedChoice.value = shuffledQuizList[currentQuizIndex].user_answer;
      }

      // currentQuizIndex = 0; 
      presentRandomQuiz(); // ランダムなクイズを出題
      showAnswerButton.value = true;
      quizEndMessage.value = '';
      updateButtonVisibility(); // クイズ画面ごとの前後のクイズへの遷移ボタン制御を行う
    } else {
      console.error('次のクイズデータがありません');
    }
  } catch (error) {
    console.error('クイズの取得に失敗しました', error);
  }
}

const loggedIn = ref(true); // ログインしている場合はtrueにセット

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
      // ログインしている場合のみクイズ結果を保存
      if (loggedIn.value) { // ログイン状態かどうかの条件を追加
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
</script>

<template>
  <div class="absolute top-40 right-4 z-50">
      <MicroModal />
  </div>
  <p class="text-blue-500 font-semibold">正答率{{ correctPercentage }}</p>
  <p class="text-blue-500 font-semibold">何問目か{{ currentQuizIndex + 1 }}</p>
  <p class="text-blue-500 font-semibold">回答済みはいくつあるか{{ answeredQuestions }}</p>

  <div class="w-full max-w-4xl mx-auto p-6 bg-white rounded-md shadow-md h-auto">

    <!-- 画像を表示 -->
    <img :src="getImageUrl(quizData.image_src)" alt="Quiz Image" class="mb-4" />

    <div class="quiz-progress flex justify-center items-center flex-wrap mb-4">
      <!-- クイズ番号のリストをループ -->
      <div
        v-for="(quiz, index) in shuffledQuizList"
        :key="index"
        :class="[
          'quiz-number',
          quiz.answered ? 'bg-green-500 text-white' : 'bg-white border',
          index === currentQuizIndex ? 'current-quiz' : '',
        ]"
        @click="goToQuiz(index)"
      >
        {{ index + 1 }}
      </div>
    </div>

    <p class="mb-2 text-gray-600">
      {{ currentQuizIndex + 1 }}問目 / {{ shuffledQuizList.length }}問中
    </p>

    <h2 class="text-xl font-semibold mb-4">{{ quizData.title }}</h2>
    <ul class="choice-list grid grid-cols-2 gap-4">
      <li v-for="(choice, index) in shuffledChoices" :key="index">
        <label class="choice-label block">
          <input
            type="radio"
            :disabled="quizData.answered"
            v-model="selectedChoice"
            :value="choice"
            class="hidden"
          />
          <button
            :class="[
              'choice-button w-full py-2 px-4 rounded-md focus:outline-none transition duration-300',
              selectedChoice === choice ? 'bg-blue-500 text-white' : 'bg-gray-300 cursor-not-allowed',
            ]"
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
      :class="[
        'answer-button mt-4 w-full py-2 px-4 rounded-md focus:outline-none transition duration-300',
        selectedChoice !== '' ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-300 cursor-not-allowed',
      ]"
      :disabled="selectedChoice === ''"
    >
      回答
    </button>

    <div v-if="quizEndMessage !== ''" class="quiz-end-message mt-4">
      <p v-if="quizEndMessage.startsWith('正解')" class="font-semibold text-green-500">{{ quizEndMessage }}</p>
      <p v-else>{{ quizEndMessage }}</p>
      <div class="mb-4"></div>
      <button
        v-if="currentQuizIndex < shuffledQuizList.length - 1"
        @click="goToNextQuestion"
        @quizCompleted="quizCompleted"
        class="w-1/2 mx-auto py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none transition duration-300"
      >
        次へ
      </button>
      <Link
        v-if="showResultButton"
        :href="route('quiz.result', { correctPercentage: correctPercentage })"
        class="mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none transition duration-300"
      >
        結果を見る
      </Link>
    </div>

    <!-- ボタン表示部分 -->
    <div class="button-group flex justify-between items-center mt-4">
      <!-- 「前のクイズへ」ボタン -->
      <button
        v-if="showPrevButton"
        @click="goToPrevQuestion"
        :class="[
          'prev-button',
          showPrevButton ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-300 cursor-not-allowed',
        ]"
      >
        前のクイズへ
      </button>

      <!-- 「次のクイズへ」ボタン -->
      <button
        v-if="showNextButton"
        @click="goToNextQuestion"
        :class="[
          'next-button',
          showNextButton ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-300 cursor-not-allowed',
        ]"
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
  </div>
</template>

<style scoped>
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

  /* 前のクイズへボタンのスタイル */
  .prev-button {
    width: calc(50% - 17%); /* 右側のボタン幅を調整 */
    padding: 10px;
    border-radius: 4px;
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
    width: 50%;
    display: flex;
    justify-content: center;
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
    /* 画面幅が小さい場合の回答選択肢リストのスタイル */
    .choice-list {
      grid-template-columns: repeat(1, 1fr); /* 4列に分割 */
    }

    /* 画面幅が小さい場合の回答ボタンのスタイル */
    .answer-button {
      width: 100%; /* 画面幅が小さい場合は選択肢と同じ横幅 */
    }

    /* 画面幅が小さい場合の前のクイズへボタンのスタイル */
    .prev-button {
      width: 46%;
    }

    /* 画面幅が小さい場合の次のクイズへボタンのスタイル */
    .next-button {
      width: 46%;
    }
  }
</style>