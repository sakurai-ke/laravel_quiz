<!-- resources/js/Pages/ProfileEdit.vue -->

<template>
  <div>
    <h1>プロフィール編集</h1>
    
    <!-- 成功メッセージの表示 -->
    <div v-if="successMessage" class="text-green-500">{{ successMessage }}</div>

    <!-- プロフィール編集フォーム -->
    <form @submit.prevent="updateProfile">
      <label for="name">ユーザー名</label>
      <input v-model="formData.name" type="text" id="name" name="name">

      <label for="email">メールアドレス</label>
      <input v-model="formData.email" type="email" id="email" name="email">

      <!-- 他のプロフィール情報についても同様に追加 -->

      <button type="submit">保存</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useInertia } from '@inertiajs/inertia';

const formData = ref({
  name: $page.props.user.name,
  email: $page.props.user.email,
  // 他のプロフィール情報についても同様に追加
});

const { put } = useInertia();
const successMessage = ref('');

const updateProfile = async () => {
  // APIを使用してバックエンドにユーザー情報を送信するロジックを追加
  const response = await put(route('profile.update'), formData);
  
  if (response.ok) {
    successMessage.value = 'プロフィールが更新されました。';
  }
};
</script>
