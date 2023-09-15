<template>
  <div class="container mx-auto py-6">
    <h1 class="text-2xl font-semibold text-gray-800 mb-4">User Profiles</h1>
    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <table class="min-w-full">
        <thead>
          <tr>
            <th class="px-6 py-3 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              #
            </th>
            <th class="px-6 py-3 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Name
            </th>
            <th class="px-6 py-3 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Email
            </th>
            <th class="px-6 py-3 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              権限
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="user.id">
            <td class="px-6 py-4 whitespace-no-wrap">{{ index + 1 }}</td>
            <td class="px-6 py-4 whitespace-no-wrap">{{ user.name }}</td>
            <td class="px-6 py-4 whitespace-no-wrap">{{ user.email }}</td>
            <td class="px-6 py-4 whitespace-no-wrap text-right">
              <div>
                <label class="inline-flex items-center">
                  <input
                    type="radio"
                    class="form-radio text-indigo-600 border-2 border-indigo-600"
                    :name="'role_' + user.id" 
                    value="admin"
                    v-model="user.role"
                  />
                  <span class="ml-2">Admin</span>
                </label>
              </div>
              <div>
                <label class="inline-flex items-center">
                  <input
                    type="radio"
                    class="form-radio text-green-600 border-2 border-green-600"
                    :name="'role_' + user.id" 
                    value="user"
                    v-model="user.role"
                  />
                  <span class="ml-2">User</span>
                </label>
              </div>
              <button @click="saveUserRole(user)">保存</button> <!-- 保存ボタンを追加 -->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import axios from 'axios'; // axiosをインポート

const props = defineProps({
  users: Array,
});

const editUser = (userId) => {
  // ユーザー編集アクションを実行
  // 例: this.$inertia.visit(route('user.edit', userId));
};

const saveUserRole = async (user) => {
  try {
    // ユーザーの権限を保存
    await axios.post(`/api/user/${user.id}/save-role`, { role: user.role });
    // 成功した場合の処理を追加
    // 例: 成功メッセージの表示など

    // データベースに変更を反映した後、ユーザー情報を再取得する
    // これにより、データベースからの最新の情報がクライアントに反映されます
    const updatedUser = await axios.get(route('user.get', { user: user.id }));
    Object.assign(user, updatedUser.data); // ユーザー情報を更新
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