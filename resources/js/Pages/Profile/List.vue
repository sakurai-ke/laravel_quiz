<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { ref, onMounted, nextTick } from 'vue';
import { Head } from '@inertiajs/vue3';
import axios from 'axios'; // axiosをインポート
import { computed } from 'vue';
import MicroModal from '@/MicroModal/UsersModal.vue'

const props = defineProps({
  users: Array,
});

const editUser = (userId) => {
  // ユーザー編集アクションを実行
  // 例: this.$inertia.visit(route('user.edit', userId));
};

const saveUserRole = async (user) => {
  try {
    // ユーザーが保存を確認するかどうかを確認
    const confirmed = window.confirm('本当に権限を変更しますか？');

    if (confirmed) {
      // ユーザーの権限を保存
      await axios.post(`/api/user/${user.id}/save-role`, { role: user.role });
      // 成功した場合の処理を追加
      // 例: 成功メッセージの表示など
    } else {
      // 変更をキャンセルした場合の処理を追加
      // 例: キャンセルメッセージの表示など
    }
  } catch (error) {
    // エラーハンドリングを追加
    // 例: エラーメッセージの表示など
    console.error(error);
  }
};


onMounted(async () => {
  await nextTick();

  props.users.forEach((user) => {
    // ユーザーにロールが割り当てられている場合、最初のロールを初期値として設定
    if (user.roles.length > 0) {
      user.role = user.roles[0].name;
    } else {
      // ロールが割り当てられていない場合、デフォルトの 'user' を設定
      user.role = 'user';
    }
  });
});
</script>

<template>
  <Head title="ユーザー権限編集" />

  <AuthenticatedLayout>
    <template #header>
      <h2 class="font-semibold text-3xl text-gray-800 leading-tight">ユーザー権限編集</h2>
    </template>

    <div class="absolute top-40 right-4 z-50">
        <MicroModal />
    </div>
    
    <div class="container mx-auto mt-6">
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <table class="w-full min-w-max border-collapse">
          <thead>
            <tr>
              <th class="px-6 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-600 border-b">
                NO
              </th>
              <th class="px-6 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-600 border-b">
                Name
              </th>
              <th class="px-6 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-600 border-b">
                Email
              </th>
              <th class="px-12 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-600 border-b">
                権限
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in users" :key="user.id" :class="{ 'border-t': index !== 0 }">
              <td class="px-6 py-4 whitespace-no-wrap border-b">{{ index + 1 }}</td>
              <td class="px-6 py-4 whitespace-no-wrap border-b">{{ user.name }}</td>
              <td class="px-6 py-4 whitespace-no-wrap border-b">{{ user.email }}</td>
              <td class="px-6 py-4 whitespace-no-wrap text-right space-x-8 border-b">
                <label v-for="(role, roleIndex) in ['admin', 'user']" :key="roleIndex" class="inline-flex items-center">
                  <input
                    type="radio"
                    class="form-radio text-indigo-600 border-2 border-indigo-600 focus:ring-0"
                    :name="'role_' + user.id"
                    :value="role"
                    v-model="user.role"
                  />
                  <span class="ml-2 text-sm font-semibold text-gray-700">{{ role }}</span>
                </label>
                <button @click="saveUserRole(user)" class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                  保存
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </AuthenticatedLayout>
</template>
