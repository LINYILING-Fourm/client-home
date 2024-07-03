
<template>
  <div class="home-page">
    <!-- 显示 AdminPosts.vue 的内容 -->
    <div class="posts-section" >
      <AdminPosts source="direct"/>
    </div>

    <!-- 访客记录部分 -->
    <div class="visitor-section" v-if="shouldDisplayVisitorSection">
      <VisitorRecord :visitors="recentVisitors" />
    </div>
  </div>
</template>

<script>
import VisitorRecord from '@/components/shared/VisitorRecord.vue';
import AdminPosts from '@/views/main/Posts.vue';

export default {
  name: 'HomePage',
  components: {
    VisitorRecord,
    AdminPosts
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      recentVisitors: [] // 假设需要初始化 recentVisitors
    };
  },
  computed: {
    shouldDisplayVisitorSection() {
      return this.windowWidth >= 700; // 根据页面宽度决定是否显示访客记录部分
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize(); // 初始化 windowWidth
  },
  unmounted() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
    }
  }
};
</script>

<style scoped>
.home-page {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap; /* 允许内容在需要时换行 */
}

.posts-section {
  flex: 1; /* 默认宽度为 100%，会占据剩余空间 */
  box-sizing: border-box; /* 计算宽度包括内边距和边框 */
  padding: 0px; /* 示例添加内边距 */
}

.visitor-section {
  width: 30%; /* 固定宽度为 300px */
  max-width: 250px; /* 固定最大宽度为 300px */
  box-sizing: border-box; /* 计算宽度包括内边距和边框 */
  padding: 5px; /* 示例添加内边距 */
}

@media screen and (max-width: 700px) {
  .home-page {
    flex-direction: column; /* 在小屏幕下，列向布局 */
  }

  .posts-section, .visitor-section {
    width: 100%; /* 在小屏幕下，两个部分均展开到整个宽度 */
  }
}
</style>
