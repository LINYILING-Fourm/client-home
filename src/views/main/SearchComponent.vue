<template>
    <div class="search-component">
      <!-- 搜索框和按钮 -->
      <input type="text" v-model="searchQuery" placeholder="输入搜索关键词...">
      <button @click="searchByKeyword">搜索</button>
  
      <!-- 时间排序 -->
      <div>
        <label>时间排序：</label>
        <select v-model="sortByTime">
          <option value="asc">升序</option>
          <option value="desc">降序</option>
        </select>
      </div>
  
      <!-- 按用户搜索 -->
      <div>
        <label>按用户搜索：</label>
        <input type="text" v-model="searchByUser" placeholder="输入用户名...">
      </div>
  
      <!-- 按关键词搜索 -->
      <div>
        <label>按关键词搜索：</label>
        <input type="checkbox" v-model="searchByTitle"> 按帖子标题
        <input type="checkbox" v-model="searchByContent"> 按帖子内容
      </div>
  
      <!-- 搜索结果展示 -->
      <div class="search-results">
        <h3>搜索结果：</h3>
        <ul>
          <li v-for="(result, index) in searchResults" :key="index">
            {{ result.title }} - {{ result.content }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchQuery: '', // 搜索关键词
        sortByTime: 'asc', // 时间排序方式，默认升序
        searchByUser: '', // 用户名搜索
        searchByTitle: false, // 是否按帖子标题搜索
        searchByContent: false, // 是否按帖子内容搜索
        searchResults: [] // 搜索结果
      };
    },
    methods: {
      // 搜索功能
      searchByKeyword() {
        // 根据条件组合搜索逻辑，这里仅作示例
        // 实际情况根据具体需求进行逻辑编写
        console.log("Search Query:", this.searchQuery);
        console.log("Sort By Time:", this.sortByTime);
        console.log("Search By User:", this.searchByUser);
        console.log("Search By Title:", this.searchByTitle);
        console.log("Search By Content:", this.searchByContent);
  
        // 模拟搜索结果
        this.searchResults = [
          { title: '帖子标题1', content: '帖子内容1' },
          { title: '帖子标题2', content: '帖子内容2' }
        ];
      }
    }
  };
  </script>
  
  <style scoped>
  /* 样式可以根据实际需要进行调整 */
  .search-component {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .search-results {
    margin-top: 20px;
  }
  
  .search-results ul {
    list-style: none;
    padding: 0;
  }
  
  .search-results li {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #eee;
    border-radius: 3px;
  }
  </style>
  