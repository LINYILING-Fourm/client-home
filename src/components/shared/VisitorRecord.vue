<template>
    <div class="visitor-record">
      <h2>访客记录</h2>
      <ul>
        <li v-for="visitor in visitors" :key="visitor.id">
          {{ visitor.name }} - {{ visitor.visitTime }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
  name: 'VisitorRecord',
  data() {
    return {
      visitors: [] // 初始化访客记录数据
    };
  },
  mounted() {
    // 模拟获取最近访客记录的数据，实际情况下你需要从后端获取
    this.visitors = [
      { id: 1, name: '访客1', visitTime: '2024-06-25 10:00' },
      { id: 2, name: '访客2', visitTime: '2024-06-25 11:00' },
      { id: 3, name: '访客3', visitTime: '2024-06-25 12:00' },
      // 其他访客记录...
    ].slice(0, 20); // 只显示最近的20个访客记录
  }
};
  </script>
  
  <style scoped>
  .visitor-record {
   
    border: 1px solid #ccc;
    padding: 10px;
  }
  </style>
  