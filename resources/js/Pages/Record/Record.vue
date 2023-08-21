<template>
    <div>
      <h2>クイズ履歴</h2>
      <ul>
        <li v-for="record in quizRecords" :key="record.id">
          <div>カテゴリー: {{ getCategoryName(record.category_id) }}</div>
          <div>問題数: {{ record.total_questions }}</div>
          <div>正解数: {{ record.correct_answers }}</div>
          <div>正答率: {{ record.accuracy }}%</div>
          <div>実施日時: {{ formatDate(record.created_at) }}</div>
          <div>
            <ul>
              <li v-for="result in record.results" :key="result.id">
                <div>問題: {{ getQuizTitle(result.quiz_id) }}</div>
                <div>選択した回答: {{ result.selected_choice }}</div>
                <div>正解: {{ isCorrect(result.correct) }}</div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        quizRecords: [],
        categories: [],
        quizzes: [],
      };
    },
    async mounted() {
      await this.fetchQuizRecords();
      await this.fetchCategories();
      await this.fetchQuizzes();
    },
    methods: {
      async fetchQuizRecords() {
        try {
          const response = await axios.get('/api/record'); // レコード取得エンドポイントに変更
          this.quizRecords = response.data;
        } catch (error) {
          console.error('クイズ履歴の取得に失敗しました', error);
        }
      },
      async fetchCategories() {
        try {
          const response = await axios.get('/api/categories');
          this.categories = response.data;
        } catch (error) {
          console.error('カテゴリーの取得に失敗しました', error);
        }
      },
      async fetchQuizzes() {
        try {
          const response = await axios.get('/api/quizzes'); // クイズデータ取得エンドポイントに変更
          this.quizzes = response.data;
        } catch (error) {
          console.error('クイズデータの取得に失敗しました', error);
        }
      },
      getCategoryName(categoryId) {
        const category = this.categories.find(cat => cat.id === categoryId);
        return category ? category.name : '不明';
      },
      getQuizTitle(quizId) {
        const quiz = this.quizzes.find(q => q.id === quizId);
        return quiz ? quiz.title : '不明';
      },
      formatDate(dateTime) {
        return new Date(dateTime).toLocaleDateString();
      },
      isCorrect(correct) {
        return correct ? '正解' : '不正解';
      },
    },
  };
  </script>
  