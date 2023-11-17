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
                        <span class="font-bold text-blue-700">ランキング画面ヘルプ</span><br>
                    </h2>
                </header>
                <main class="modal__content p-4 text-gray-700">
                    <p class="mb-4">
                        <span class="font-bold text-blue-700">ランキングデータの表示:</span><br>
                        選択した期間およびカテゴリーに基づいてユーザーのランキングデータが表示されます。
                        ユーザー名と正答率のバーグラフがランク順に表示され、各ユーザーのクイズ成績が一覧できます。
                    </p>
                    <p class="mb-4">
                        <span class="font-bold text-blue-700">期間の指定:</span><br>
                        ランキング画面では、特定の期間内のユーザーランキングを表示できます。
                        画面上部の「From」および「To」欄に開始日と終了日を入力し、検索ボタンをクリックすることで指定期間のランキングを表示します。
                        期間を指定せずに検索すると、全期間のランキングが表示されます。
                    </p>
                    <p class="mb-4">
                        <span class="font-bold text-blue-700">カテゴリーの選択:</span><br>
                        表示するランキングのカテゴリーを選択できます。画面下部の「カテゴリー」ボックスからカテゴリーを選択し、検索ボタンをクリックすることで指定したカテゴリーのランキングが表示されます。
                        全てのカテゴリーを表示する場合は「全て」を選択してください。
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
