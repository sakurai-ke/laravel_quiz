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
                        <span class="font-bold text-blue-700">クイズ詳細画面ヘルプ</span><br>
                    </h2>
                </header>
                <main class="modal__content p-4 text-gray-700">
                    <!-- ヘルプの文章 -->
                    <p class="mb-4">
                        <span class="font-bold text-blue-700">問題文の表示:</span><br>
                        この画面では、クイズの詳細情報が表示されます。問題文や選択肢、解説など、クイズに関する詳細な情報を確認できます。
                    </p>
                    <p class="mb-4">
                        <span class="font-bold text-blue-700">選択肢の確認:</span><br>
                        問題文の下には、クイズの選択肢が表示されます。正解や誤答の選択肢を確認できます。
                    </p>
                    <p class="mb-4">
                        <span class="font-bold text-blue-700">カテゴリー情報:</span><br>
                        クイズのカテゴリー情報も表示されます。
                    </p>
                    <p class="mb-4">
                        <span class="font-bold text-blue-700">画像の確認:</span><br>
                        クイズに関連する画像がある場合、画像が表示されます。
                    </p>
                    <p class="mb-4">
                        <span class="font-bold text-blue-700">カテゴリー情報:</span><br>
                        クイズ情報の編集が必要な場合、「編集」リンクをクリックして情報を更新できます
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