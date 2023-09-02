<script setup>
import { ref } from 'vue'
const isShow = ref(false)
const toggleStatus = () => { isShow.value = !isShow.value}
</script>

<template>
    <div v-show="isShow" class="fixed inset-0 flex items-center justify-center z-50" aria-hidden="true">
        <div class="modal fixed inset-0 flex items-center justify-center z-50">
            <div class="modal__overlay fixed inset-0 bg-opacity-50 bg-black"></div>
            <div class="modal__container bg-white rounded-lg shadow-lg max-w-md mx-auto p-4 z-50 relative" role="dialog" aria-modal="true" aria-labelledby="modal-1-title">
                <button @click="toggleStatus" type="button" class="modal__close absolute top-4 right-4 focus:outline-none text-gray-500 hover:text-gray-700">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                <header class="modal__header flex justify-between items-center px-4 py-2 bg-gray-100 rounded-t-lg mt-4">
                    <h2 class="modal__title text-lg font-semibold text-gray-800">
                        <span class="font-bold text-blue-700">クイズ画面ヘルプ</span><br>
                    </h2>
                </header>
                <main class="modal__content p-4 text-gray-700">
                    <p class="mb-4">
                        <span class="font-bold text-blue-700">問題の表示:</span><br>
                        画面上部に問題文が表示されます。問題文をよく読み、正しい答えを選んでください。
                    </p>
                    <p class="mb-4">
                        <span class="font-bold text-blue-700">選択肢の選択:</span><br>
                        問題文の下には選択肢が表示されます。正しい選択肢を選んでください。クイズには1つの正解があります。
                    </p>
                    <p class="mb-4">
                        <span class="font-bold text-blue-700">回答ボタン:</span><br>
                        選択肢を選んだら、「回答」ボタンをクリックして回答を提出してください。正解か不正解かが表示されます。
                    </p>
                    <p class="mb-4">
                        <span class="font-bold text-blue-700">クイズ番号のリスト:</span><br>
                        画面上側にはクイズ番号のリストが表示されます。クイズを飛び越えて選択することができます。
                    </p>
                    <p class="mb-4">
                        <span class="font-bold text-blue-700">前のクイズへ / 次のクイズへ:</span><br>
                        「前のクイズへ」ボタンと「次のクイズへ」ボタンを使用して、前後の問題に移動できます。
                    </p>
                    <p class="mb-4">
                        <span class="font-bold text-blue-700">結果を見る:</span><br>
                        すべてのクイズに回答した後、結果（クイズの正解率）を確認するためのボタンが表示されます。
                    </p>
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
