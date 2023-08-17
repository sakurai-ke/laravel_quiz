<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import { defineProps } from 'vue';

const props = defineProps({
  // resultMessage: String,
  correctPercentage: Number, // 正答率データを受け取る
});
</script>

<template>
    <Head title="クイズ結果" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-2xl text-gray-800 leading-tight">クイズ結果</h2>
        </template>
    <div class="mt-8">
        <div class="w-full max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
        <h2 class="text-xl font-semibold mb-4">クイズ結果</h2>
        <!-- <p>{{ props.resultMessage }}</p> -->
        <!-- 正答率の表示を追加 -->
        <p>正答率: {{ correctPercentage.toFixed(2) }}%</p>
        <!-- <p>{{ correctPercentage }}%</p> -->
        <p>お疲れ様です！クイズが終了しました！</p>
        
        <div class="mt-4">
            <Link :href="route('top')" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
            トップへ戻る
            </Link>
        </div>
        </div>
    </div>
</AuthenticatedLayout>
</template>