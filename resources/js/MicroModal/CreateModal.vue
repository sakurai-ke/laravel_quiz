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
                        <span class="font-bold text-blue-700">クイズ作成画面ヘルプ</span><br>
                    </h2>
                </header>
                <main class="modal__content p-4 text-gray-700">
                    <!-- ヘルプの文章 -->
                    <p class="mb-4">
                        <span class="font-bold text-blue-700">問題文の入力:</span><br>
                        クイズを作成する際に、まず画面上部の「問題文」欄に問題の内容を入力します。
                        問題文はクイズの鍵となる部分ですので、よく考えて記入しましょう。
                    </p>
                    <p class="mb-4">
                        <span class="font-bold text-blue-700">カテゴリーの選択:</span><br>
                        問題に対応するカテゴリーを選択してください。カテゴリーはクイズを分類するためのものです。
                    </p>
                    <p class="mb-4">
                        <span class="font-bold text-blue-700">選択肢の入力:</span><br>
                        問題文の下には正解と不正解の選択肢を入力します。
                        正解の選択肢は問題の答えとなり、不正解の選択肢は誤答の選択肢として表示されます。
                    </p>
                    <p class="mb-4">
                        <span class="font-bold text-blue-700">解説の入力:</span><br>
                        クイズの正解に対する詳細な解説を提供します。ユーザーがクイズに回答した際に、
                        正しい理由や補足情報を提供する場所です。
                    </p>
                    <p class="mb-4">
                        <span class="font-bold text-blue-700">画像のアップロード (オプション):</span><br>
                        もし問題に関連する画像を含めたい場合、画面下部の「画像ファイル」セクションから画像をアップロードできます。
                        画像のアップロードはオプションです。
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