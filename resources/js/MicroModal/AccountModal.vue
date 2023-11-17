<script setup>
import { ref } from 'vue'
const isShow = ref(false)
const toggleStatus = () => { isShow.value = !isShow.value}
const closeOnOverlayClick = (event) => {
    if (event.target.classList.contains('modal__overlay')) {
        toggleStatus()
    }
}
</script>

<template>
    <div v-show="isShow" class="fixed inset-0 flex items-center justify-center z-50" aria-hidden="true">
        <div class="modal fixed inset-0 flex items-center justify-center z-50">
            <div @click="closeOnOverlayClick" class="modal__overlay fixed inset-0 bg-opacity-50 bg-black"></div>
            <div class="modal__container bg-white rounded-lg shadow-lg max-w-md mx-auto p-4 z-50 relative" role="dialog" aria-modal="true" aria-labelledby="modal-1-title">
                <button @click="toggleStatus" type="button" class="modal__close absolute top-4 right-4 focus:outline-none text-gray-500 hover:text-gray-700">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                <header class="modal__header flex justify-between items-center px-4 py-2 bg-gray-100 rounded-t-lg mt-4">
                    <h2 class="modal__title text-lg font-semibold text-gray-800">
                        <span class="font-bold text-blue-700">アカウント編集画面ヘルプ</span><br>
                    </h2>
                </header>
                <main class="modal__content p-4 text-gray-700">
                    <!-- ヘルプの文章 -->
                    <p class="mb-4">
                        <span class="font-bold text-blue-700">ネーム:</span><br>
                        ネームを変更したい場合に新しいネームを入力します。
                    </p>
                    <p class="mb-4">
                        <span class="font-bold text-blue-700">メールアドレス:</span><br>
                        メールアドレスを変更したい場合に新しいメールアドレスを入力します。
                    </p>
                    <p class="mb-4">
                        <span class="font-bold text-blue-700">現在のパスワード:</span><br>
                        「現在のパスワード」欄には、ユーザーの現在のパスワードを入力します。
                        未入力や不正なパスワードの場合、保存が拒否されます。
                    </p>
                    <p class="mb-4">
                        <span class="font-bold text-blue-700">新しいパスワードの設定:</span><br>
                        「新しいパスワード」欄には、ユーザーが設定したい新しいパスワードを入力します。
                    </p>
                    <p class="mb-4">
                        <span class="font-bold text-blue-700">画像のアップロード (オプション):</span><br>
                        「新しいパスワード（確認）」欄には、先ほど入力した新しいパスワードを再度入力して確認します。
                    </p>
                    <!-- ヘルプの文章ここまで -->
                </main>
                <footer class="modal__footer px-4 py-2">
                    <button @click="toggleStatus" type="button" class="modal__btn modal__btn-primary bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none mr-2">
                        閉じる
                    </button>
                </footer>
            </div>
        </div>
    </div>
    <button @click="toggleStatus" type="button" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none">ヘルプ</button>
</template>