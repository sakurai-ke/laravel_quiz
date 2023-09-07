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
                        <span class="font-bold text-blue-700">クイズ編集ヘルプ</span><br>
                    </h2>
                </header>
                <main class="modal__content p-4 text-gray-700">
                    <!-- ヘルプの文章 -->
                    <p class="mb-4">
                        <span class="font-bold text-blue-700">カテゴリーの選択:</span><br>
                        編集するクイズのカテゴリーを選択します。変更する場合、適切なカテゴリーを選んでください。
                    </p>
                    <p class="mb-4">
                        <span class="font-bold text-blue-700">問題文の編集:</span><br>
                        「問題文」のテキストボックスに、新しい問題文を入力します。ユーザーに提示するクイズの問題文をここで編集します。
                    </p>
                    <p class="mb-4">
                        <span class="font-bold text-blue-700">正解の設定:</span><br>
                        「正解」のテキストボックスに、クイズの正しい答えを入力します。
                    </p>
                    <p class="mb-4">
                        <span class="font-bold text-blue-700">正解以外の選択肢の設定:</span><br>
                        正解以外の「選択肢1」「選択肢2」「選択肢3」のテキストボックスに、クイズの選択肢を入力します。
                    </p>
                    <p class="mb-4">
                        <span class="font-bold text-blue-700">解説の編集:</span><br>
                        「解説」のテキストエリアに、クイズの解説文を入力します。ユーザーがクイズに回答した後に
                        提供する追加情報や説明をここで編集します。
                    </p>
                    <p class="mb-4">
                        <span class="font-bold text-blue-700">画像のアップロード:</span><br>
                        「画像ファイル」セクションで、クイズに関連付けたい画像をアップロードできます。選択した
                        画像はクイズの一部として表示されます。
                        アップロード済みの画像を削除する場合は「画像を削除」ボタンをクリックします。
                    </p>
                    <p class="mb-4">
                        <span class="font-bold text-blue-700">クイズの更新:</span><br>
                        全ての情報を入力し、クイズを更新する場合は「更新」ボタンをクリックします。
                    </p>
                    <p class="mb-4">
                        <span class="font-bold text-blue-700">クイズの削除:</span><br>
                        クイズを完全に削除するために「削除」ボタンをクリックします。実際に削除される前に削除確認のための
                        ダイアログが表示されます。
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