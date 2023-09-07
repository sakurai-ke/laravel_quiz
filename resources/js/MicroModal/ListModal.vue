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
                        <span class="font-bold text-blue-700">クイズ一覧画面ヘルプ</span><br>
                    </h2>
                </header>
                <main class="modal__content p-4 text-gray-700">
                    <!-- ヘルプの文章 -->
                    <p class="mb-4">
                        <span class="font-bold text-blue-700">クイズ一覧表示:</span><br>
                        画面上部にはあなたが作成したクイズ一覧が表示されます。それぞれのクイズにはタイトル、
                        作成日時、カテゴリー名が表示されています。
                    </p>
                    <p class="mb-4">
                        <span class="font-bold text-blue-700">カテゴリーのフィルター:</span><br>
                        クイズ一覧の上にはカテゴリーのドロップダウンメニューがあります。特定のカテゴリーのクイズだけを
                        表示するには、ここからカテゴリーを選択してください。
                    </p>
                    <p class="mb-4">
                        <span class="font-bold text-blue-700">クイズの削除:</span><br>
                        削除したいクイズのチェックボックスをクリックして選択状態にしてください。
                        「削除」ボタンをクリックすると、選択されたクイズは一括削除されます。
                        実際にクイズが削除される前に、削除確認のための確認ダイアログが表示されます。
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