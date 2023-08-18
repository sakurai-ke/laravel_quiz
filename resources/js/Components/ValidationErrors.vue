<script setup>
import { computed } from 'vue';

// 詳細不明だがおそらくinertiaの場合どこかの親コンポーネント（Create.vurとかから？？？）errorsプロパティがわたされている？
const props = defineProps({ 
    errors: Object
})
// import { usePage } from '@inertiajs/inertia-vue3';

// const errors = computed(() => usePage().props.value.errors);

// propsとして渡されたエラーオブジェクトをprops.errorsで受け取り、const hasErrorsという計算されたプロパティを定義しています。
// hasErrorsは、エラーオブジェクトの中にエラーが存在するかどうかを判定するために使用されます。具体的には、
// Object.keys(props.errors).length > 0という式でエラーオブジェクトのプロパティの数を取得し、それが0より大きい場合はエラーが存在すると判定します。
const hasErrors = computed(() => Object.keys(props.errors).length > 0);
</script>


<template>
    <div v-if="hasErrors">
        <div class="font-medium text-red-600">問題が発生しました。</div>

        <ul class="mt-3 list-disc list-inside text-sm text-red-600">
            <!-- エラーメッセージをブロック要素にラップし、改行されるように修正 -->
            <li v-for="(error, key) in props.errors" :key="key"><span v-html="error"></span></li>
        </ul>
    </div>
</template>
