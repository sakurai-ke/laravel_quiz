<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import axios from 'axios';
import { Head } from '@inertiajs/vue3';
import { ref, onMounted } from 'vue';
import BreezeValidationErrors from '@/Components/ValidationErrors.vue'

const selectedCategory = ref('');
const categories = ref([]);
// selectedImage の初期値と、画像プレビューの URL を管理するリアクティブな変数
const selectedImage = ref(null);
const selectedImagePreview = ref(null);

defineProps({
errors: Object
})

const quizData = ref({
    category_id: null,
    title: '',
    correct_answer: '',
    wrong_answer_1: '',
    wrong_answer_2: '',
    wrong_answer_3: '',
    explain: '',
    image_src: '', 
});


// コンポーネントがマウントされた際にカテゴリーデータを取得
onMounted(() => {
fetchCategories();

    // フラッシュメッセージをセットアップ
    flashMessage.value = localStorage.getItem('flashMessage');
    // フラッシュメッセージをlocalStorageから削除
    localStorage.removeItem('flashMessage');
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

// dataとしてフラッシュメッセージを管理
const flashMessage = ref(null);

const errorMessage = ref(null);


// クイズ作成フォームを送信する関数
// フォームをサーバーに送信する際に使用できる形式に変換する
async function submitForm() {
    const formData = new FormData(); 
    // サーバーに送信するために形式を変換
    formData.append('category_id', selectedCategory.value);
    formData.append('title', quizData.value.title);
    formData.append('correct_answer', quizData.value.correct_answer);
    formData.append('wrong_answer_1', quizData.value.wrong_answer_1);
    formData.append('wrong_answer_2', quizData.value.wrong_answer_2);
    formData.append('wrong_answer_3', quizData.value.wrong_answer_3);
    formData.append('explain', quizData.value.explain);

    // 画像ファイルが選択されていればフォームデータに追加
    if (selectedImage.value) {
        formData.append('image_src', selectedImage.value);
    } else {
        formData.append('image_src', ''); // 画像ファイルが選択されていない場合は空の値を設定
    }
    
    try {
        ///api/quizzesにクイズデータを送信する
        const response = await axios.post('/api/makeQuizzes', formData);
        console.log('クイズ作成成功:', response.data);

// submitForm内でのリダイレクトとフラッシュメッセージの表示
if (response.data.message === 'クイズが作成されました') {
    // フラッシュメッセージをlocalStorageに保存
    localStorage.setItem('flashMessage', 'クイズが作成されました');
    // リダイレクト
    window.location.href = '/top'; // トップページへリダイレクト
}

        // データ送信成功したらフォームをリセット
        quizData.value = {
            title: '',
            category_id: null,
            correct_answer: '',
            wrong_answer_1: '',
            wrong_answer_2: '',
            wrong_answer_3: '',
            explain: '',
            image_src: '', 
        };

} catch (error) {
        console.error('クイズ作成エラー:', error);

        // エラーをコンソールに出力し、詳細なエラーメッセージを表示
        if (error.response) {
            console.error('エラーレスポンス:', error.response.data);
            // バリデーションエラーがある場合、エラーメッセージを表示
            if (error.response.data.errors) {
            errorMessage.value = Object.values(error.response.data.errors).join('<br>');
            }
        }
    }
}

// 画像アップロードの処理
function handleImageUpload(event) {
    const file = event.target.files[0];
    selectedImage.value = file;

    // 画像プレビューのための URL を生成
    if (selectedImage.value) {
        // 選択された画像ファイルを表示するための一時的なURLが格納され、それを元にプレビュー画像が表示される
        selectedImagePreview.value = URL.createObjectURL(selectedImage.value);
    } else {
        selectedImagePreview.value = null;
    }
}

    // 画像を削除する処理
    function removeImage() {
        selectedImage.value = null;
        selectedImagePreview.value = null;
    }

</script>

<template>
    <Head title="クイズ作成" />
  
    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-2xl text-gray-800 leading-tight">クイズ作成</h2>
        </template>
        <div class="w-full max-w-screen-md mx-auto p-6 bg-white rounded-md shadow-md mt-4">
            <BreezeValidationErrors :errors="errors" />
            <div v-if="errorMessage" class="mb-4 text-red-600" v-html="errorMessage"></div>
    
            <form @submit.prevent="submitForm" enctype="multipart/form-data">
            <div class="mb-4">
                <label class="block font-semibold">クイズのジャンル</label>
                <select v-model="selectedCategory" class="w-full p-2 border rounded-md">
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
                <label class="block font-semibold">画像ファイル</label>
                <input type="file" @change="handleImageUpload" accept="image/*" class="w-full p-2 border rounded-md">
                <div v-if="selectedImage" class="mt-2">
                <img :src="selectedImagePreview" alt="選択した画像" class="max-h-40">
                <button type="button" @click="removeImage" class="mt-2 text-sm text-red-500 hover:text-red-700">
                    画像を削除
                </button>
                </div>
            </div>
    
            <div class="mb-4">
                <button type="submit" class="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none transition duration-300">
                送信
                </button>
            </div>
            </form>
        </div>
    </AuthenticatedLayout>
</template>

<style scoped>
/* 入力欄の横幅を広げるスタイル */
.w-full {
  width: 100%;
}

/* テキストエリアの縦幅を調整 */
textarea {
  resize: vertical;
}
</style>