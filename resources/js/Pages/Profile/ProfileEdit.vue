<template>
  <div>
    <h1>プロファイル編集</h1>
    <form @submit="updateProfile">
      <div>
        <label for="name">ユーザ名</label>
        <input v-model="form.name" type="text" id="name" name="name" />
      </div>
      <div>
        <label for="email">メールアドレス</label>
        <input v-model="form.email" type="email" id="email" name="email" />
      </div>
      <!-- 他のプロファイル情報の編集フォームをここに追加 -->

      <button type="submit">更新</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '', // ユーザ名
        email: '', // メールアドレス
        // 他のプロファイル情報のフォームデータをここに追加
      }
    };
  },
  methods: {
    async updateProfile() {
      try {
        const response = await this.$inertia.put('/profile', this.form);
        // プロファイルが更新されたら、適切な処理を追加
      } catch (error) {
        // エラーハンドリングを行う場合の処理を追加
      }
    }
  },
  mounted() {
    // ユーザー情報をフォームにプリロード
    this.form.name = this.$page.props.user.name;
    this.form.email = this.$page.props.user.email;
  }
};
</script>
