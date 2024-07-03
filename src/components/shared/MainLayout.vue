<template>
  <div class="main-layout">
    <div class="page-content">
      <router-view />
    </div>
  </div>
</template>

<script>

export default {
  name: 'MainLayout',
  components: {
   
  }
};
</script>
<style>
.page-content {
  /* 样式示例 */
  margin-top: 60px;
  padding: 0px;
}

</style>


