<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Link, Head } from '@inertiajs/vue3';
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

const currentPage = ref(1); // 現在のページ
let totalPages = computed(() => Math.ceil(filteredQuizzes.value.length / 20)); // 10件ずつのページ数
// 1ページに表示するアイテム数
const itemsPerPage = 20;

const quizzes = ref([]);
console.log('quizzes', quizzes);
const categories = ref([]);
const selectedCategory = ref('all'); // 初期選択は「全て」

const isLoading = ref(true); // データが読み込まれるまでを示すフラグ

const usernames = ref([]); // ユーザー名の選択肢を格納するデータプロパティ
const selectedUsername = ref(''); // デフォルトの選択肢は空文字列

onMounted(() => {
  getQuizzes();
  getCategories();
});

onMounted(async () => {
  // ユーザー名の選択を設定
  selectedUsername.value = '<?= auth()->user()->name ?>'; // ログインユーザーのユーザー名をセット

  await Promise.all([getQuizzes(), getCategories(), getUsernames()]);
  isLoading.value = false;
});

onMounted(async () => {
  // ログインユーザーのユーザー名を取得するAPIリクエストなどを実行
  try {
    const response = await axios.get('/api/getLoggedInUsername');
    console.log('response', response);
    selectedUsername.value = response.data.username; // レスポンスからユーザー名を取得し、selectedUsernameに設定
    console.log('selectedUsername.value', selectedUsername.value);
  } catch (error) {
    console.error('ユーザー名の取得に失敗しました', error);
  }
});

async function getUsernames() {
  try {
    const response = await axios.get('/api/usernames'); // ユーザー名を取得するAPIエンドポイントを作成する必要があります
    usernames.value = response.data.usernames;
  } catch (error) {
    console.error('ユーザー名の取得に失敗しました', error);
  }
}

// ページネーション用の関数：指定したページに移動
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

// 現在のページに対応するクイズ結果の一部を取得する計算プロパティ
const paginatedRecords = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredQuizzes.value.slice(startIndex, endIndex);
});

// 省略部分を含むページネーションのリンクを生成
function generatePaginationLinks(totalPages, currentPage) {
  const maxVisibleLinks = 5; // 表示するページリンクの最大数
  const links = [];

    // totalPagesが1以下の場合はページネーションを表示しない
    if (totalPages <= 1) {
    return links;
  }
  
  // 常に最初のページを表示
  links.push(1);

  // 省略部分の追加
  if (currentPage > 3) {
    links.push('...'); // 省略部分の前に「...」を追加
  }

  // 現在のページの前後に一定数のページリンクを表示
  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    if (i > 1 && i < totalPages) {
      links.push(i);
    }
  }

  // 省略部分の追加
  if (currentPage < totalPages - 2) {
    links.push('...'); // 省略部分の後に「...」を追加
  }

  // 常に最後のページを表示
  links.push(totalPages);

  return links;
}

async function getCategories() {
  try {
    const response = await axios.get('/api/categories');
    categories.value = response.data;
  } catch (error) {
    console.error('カテゴリー一覧の取得に失敗しました', error);
  }
}

// カテゴリー別のクイズ一覧を計算する算出プロパティ
const filteredQuizzes = computed(() => {
  if (selectedCategory.value === 'all') {
    // カテゴリーが「全て」の場合、ユーザー名によるフィルタリングを適用
    if (selectedUsername === 'all') {
      return quizzes.value; // ユーザー名が「全て」の場合、フィルタリングをかけずに全てのクイズを表示
    } else {
      return quizzes.value.filter(quiz => quiz.user_name === selectedUsername);
    }
  } else {
    // カテゴリーが特定の場合、カテゴリーとユーザー名の両方でフィルタリングを適用
    return quizzes.value.filter(quiz => quiz.category_id === selectedCategory.value && quiz.user_name === selectedUsername);
  }
});

// 作成日時をフォーマットするヘルパー関数
function formatDate(dateTime) {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  return new Date(dateTime).toLocaleDateString(undefined, options);
}

// クイズアイテムごとに選択状態を管理するプロパティを追加
quizzes.value.forEach(quiz => {
  quiz.selected = false;
});

// クイズアイテムごとに選択状態を管理するプロパティを追加
const selectedQuizzes = ref([]);

// チェックボックスの状態変更を処理するメソッド
const handleCheckboxChange = (quiz) => {
  if (quiz.selected) {
    // 選択されている場合、選択リストから削除
    selectedQuizzes.value = selectedQuizzes.value.filter(selectedQuiz => selectedQuiz.id !== quiz.id);
  } else {
    // 選択されていない場合、選択リストに追加
    selectedQuizzes.value.push(quiz);
  }
  quiz.selected = !quiz.selected;
};

// 選択されたクイズの削除処理
const deleteSelectedQuizzes = async () => {
  if (selectedQuizzes.value.length === 0) {
    return; // 選択されたクイズがない場合は何もしない
  }

  try {
    const selectedQuizIds = selectedQuizzes.value.map(quiz => quiz.id);

    // 選択されたクイズのIDをサーバーに送信して削除を実行
    const response = await axios.delete('/api/deleteQuizzes', { data: { quiz_ids: selectedQuizIds } });

    if (response.status === 200) {
      // 削除成功時の処理
      // 削除されたクイズを一覧から削除
      quizzes.value = quizzes.value.filter(quiz => !selectedQuizIds.includes(quiz.id));
      // 選択リストをクリア
      selectedQuizzes.value = [];
    }
  } catch (error) {
    console.error('クイズの削除に失敗しました', error);
  }
};

// 削除ボタンがクリックされた際に確認ダイアログを表示
function confirmDelete() {
  if (confirm('本当にクイズデータを削除しますか？')) {
    // "はい" を選択した場合の処理
    deleteSelectedQuizzes();
  } else {
    // "いいえ" を選択した場合の処理（ページ遷移をキャンセル）
    event.preventDefault(); // デフォルトのページ遷移をキャンセル
  }
}

// 選択されたクイズが少なくとも1つ以上あるかどうかを確認
const hasSelectedQuizzes = computed(() => quizzes.value.some(quiz => quiz.selected));

const isAdmin = ref(null); // 管理者かどうかを管理するフラグ。初期値は false としておく

async function getQuizzes() {
  try {
    const apiUrl = isAdmin.value ? '/api/getAllQuizzes' : '/api/getQuizzes';

    const response = await axios.get(apiUrl);
    quizzes.value = response.data.quizzes;
    console.log('quizzes.value', quizzes.value);
  } catch (error) {
    console.error('クイズ一覧の取得に失敗しました', error);
  }
}

onMounted(async () => {
  // 現在のユーザーの役割を取得するAPIを呼び出す
  try {
    const response = await axios.get('/api/userRole');
    isAdmin.value = response.data.role === 'admin';

    await Promise.all([getQuizzes(), getCategories()]);
    isLoading.value = false;
  } catch (error) {
    console.error('ユーザーの役割の取得に失敗しました', error);
  }
});
</script>

<template>
  <Head title="クイズ一覧" />

  <AuthenticatedLayout>
    <template #header>
      <h2 class="font-semibold text-2xl text-gray-800 leading-tight">クイズ一覧</h2>
    </template>
    <div class="bg-gray-100 py-8">
      <div class="max-w-3xl mx-auto px-4">
        
        <!-- クイズが一つもない場合のメッセージ -->
        <div v-if="quizzes.length === 0 && !isLoading">
          <p class="text-xl font-semibold text-gray-800">あなたはまだクイズを作成していません。</p>
        </div>

        <div v-else>
          <div class="flex items-center mb-4 justify-between"> <!-- カテゴリー選択と削除ボタンのコンテナ -->
            <button @click="confirmDelete" :disabled="!hasSelectedQuizzes" class="px-4 py-2 rounded-md bg-red-500 text-white">削除</button>
            <select v-model="selectedCategory" class="block w-40 bg-white border border-gray-300 p-2 rounded shadow-sm ml-6">
              <option value="all">全て</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
            </select>
            <select v-model="selectedUsername" class="block w-40 bg-white border border-gray-300 p-2 rounded shadow-sm ml-6">
              <option value="all">全て</option>
              <option v-for="username in usernames" :key="username" :value="username">{{ username }}</option>
            </select>
          </div>


          <ul class="mt-4 space-y-4">
            <li v-for="quiz in paginatedRecords" :key="quiz.id" class="bg-white rounded shadow-md p-4 flex items-center justify-between">
              <div class="flex items-center"> 
                <input type="checkbox" :checked="quiz.selected" class="mr-6" @input="handleCheckboxChange(quiz)">
                <Link :href="'/list/' + quiz.id" class="hover:underline text-xl font-semibold mb-2">{{ quiz.title }}</Link>
              </div>
              <div class="text-right">
                <p class="text-gray-600">作成日時: {{ formatDate(quiz.created_at) }}</p>
                <p class="text-gray-600">カテゴリー名: {{ quiz.category.name }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="mt-4 flex justify-center space-x-1">
      <button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="px-3 py-1 rounded-md bg-white text-blue-500 border border-blue-500"
      >
        前へ
      </button>
      <!-- ページネーション用のリンクを生成 -->
      <button
        v-for="page in generatePaginationLinks(totalPages, currentPage)"
        :key="page"
        @click="goToPage(page)"
        :class="[
          'px-3 py-1 rounded-md',
          currentPage === page ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border border-blue-500',
        ]"
      >
        {{ page }}
      </button>
      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="px-3 py-1 rounded-md bg-white text-blue-500 border border-blue-500"
      >
        次へ
      </button>
    </div>
  </AuthenticatedLayout>
</template>

<style scoped>
/* 背景カラーを設定 */
.bg-gray-100 {
  background-color: #f7fafc;
}

/* ボックスシャドウを追加 */
.shadow-md {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* リンクのスタイルを設定 */
.hover\:underline:hover {
  text-decoration: underline;
}

/* テキストのカラーを調整 */
.text-gray-600 {
  color: #718096;
}
</style>
