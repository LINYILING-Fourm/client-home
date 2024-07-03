<template>
  <div>
    <h1>User Set 页面</h1>
    <p v-if="isAdmin">管理员权限内容</p>
    <p v-else>普通用户权限内容</p>
  </div>
</template>

<script>
export default {
  name: 'UserSet',
  computed: {
    isAdmin() {
      return localStorage.getItem('role') === 'admin';
    }
  }
}
</script>