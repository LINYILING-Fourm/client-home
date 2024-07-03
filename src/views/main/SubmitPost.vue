<template>
    <form @submit.prevent="submitPost">
      <label>标题</label>
      <input type="text" v-model="post.title" required>
      <label>内容</label>
      <textarea v-model="post.content" required></textarea>
      <label>分类</label>
      <select v-model="post.category">
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>
      <button type="submit">发布</button>
    </form>
  </template>
  
  <script>
  import { mapState } from 'vuex';
  
  export default {
    computed: {
      ...mapState({
        categories: state => state.categories,
        currentCategory: state => state.category.currentCategory
      }),
      post() {
        return {
          title: '',
          content: '',
          category: this.currentCategory ? this.currentCategory.id : null
        };
      }
    },
    methods: {
      submitPost() {
        // 处理提交逻辑
        console.log('发布帖子', this.post);
      }
    }
  };
  </script>
  