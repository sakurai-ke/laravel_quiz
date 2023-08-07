<script setup>
// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
// import FlashMessage from '@/Components/FlashMessage.vue';

// 親コンポーネントから渡されるプロパティを定義
const props = defineProps({
    quizData: Object, // 親コンポーネントから渡されるクイズデータ
});

onMounted(() => {
    console.log('データが渡されたか1:', props);
    console.log('データが渡されたか2:', props.quizData);
    console.log('データが渡されたか3:', props.quizData.choices);
});

// ユーザが選択した回答を保持するためのリアクティブな変数
// ラジオボタンなどのフォームコントロールの v-model ディレクティブにバインドされ、ユーザが選択した回答が保持
const selectedChoice = ref('');
// クイズ情報を更新するために使用される予定の変数と思われますが、このコード内では具体的な用途が記述されていません。
const currentQuiz = ref(null);


// クイズの選択肢をシャッフルする関数
function shuffleChoices(choices) {

    console.log('シャッフル前の選択肢:', choices);
    const shuffled = [...choices]; // 選択肢のコピーを作成

    // フィッシャー–イェーツシャッフルアルゴリズムを用いてシャッフル
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // 要素を入れ替え
    }
    console.log('シャッフル後の選択肢:', shuffled);
    console.log(typeof  selectedChoice);
    console.log(typeof  selectedChoice.value);
    return shuffled;
}


const shuffledChoices = ref([]);

onMounted(() => {
    shuffledChoices.value = shuffleChoices(props.quizData.choices);
});

function submitAnswer() {
    console.log('selectedChoice の値:', selectedChoice.value);
    if (selectedChoice.value === props.quizData.answer_id) { // ここで.valueを使って比較
        // 正解の場合の処理
        console.log('正解です！');
        // ここで得点を増やすなどの処理を行う
    } else {
        // 不正解の場合の処理
        console.log('不正解です...');
    }

    // 次の問題に進むための処理
    fetchNextQuiz();
}


async function fetchQuizzes(categoryId, numQuestions) {
    try {
        const response = await axios.get('/api/quizzes', {
            params: { category_id: categoryId, num_questions: numQuestions }
        });
        return response.data;
    } catch (error) {
        console.error('クイズの取得に失敗しました', error);
        return [];
    }
}


async function fetchNextQuiz() {
    // 次の問題のデータを取得してcurrentQuizにセットするなどの処理
    // ここでfetchQuizzes関数を使って次のクイズデータを取得する
    const categoryId = props.quizData.category_id; // quizDataからカテゴリーIDを取得
    const numQuestions = 10; // 例えば適切な値に置き換える
    const nextQuizzes = await fetchQuizzes(categoryId, numQuestions);
    currentQuiz.value = nextQuizzes[0];
}

</script>

<template>
    <div>
        <h2>{{ quizData.title }}</h2>
        <ul>
            <li v-for="choice in shuffledChoices" :key="choice.id">
                <label>
                    <input type="radio" v-model="selectedChoice" :value="choice.id" />
                    {{ choice.answer }}
                </label>
            </li>
        </ul>
        <button @click="submitAnswer">次へ</button>
    </div>
</template>