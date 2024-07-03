<template>
  <div>
    <header class="nav-main">
      <div class="left-nav">
        <h1 class="site-title" v-if="windowWidth >= 560">&nbsp;LINYILING&nbsp;</h1>
        <ul class="nav-links">
          <li>
            <router-link to="/">
              <span v-if="windowWidth < 742">
                <font-awesome-icon icon="home" />
              </span>
              <span v-else>版主首页</span>
            </router-link>
          </li>
          <li v-if="windowWidth >= 742"><router-link to="/userPosts">用户互动区</router-link></li>
          <li v-if="windowWidth >= 742"><router-link to="/about">关于</router-link></li>
          <li v-if="windowWidth < 742" class="dropdown" @mouseenter="showDropdown = true" @mouseleave="showDropdown = false">
            <span class="dropdown-link">
              <i>更多</i>
            </span>
            <div class="dropdown-content" v-show="showDropdown">
              <router-link to="/userPosts">用户互动区</router-link>
              <router-link to="/about">关于</router-link>
              <router-link to="/Admin"  v-if="isAdmin">后台管理</router-link>
            </div>
          </li>
        </ul>
      </div>

      <div class="right-nav">
        <div class="search-bar">
          <input type="text" v-model="searchQuery" :style="{ width: searchWidth }" placeholder="搜索...">
          <button @click="search">搜索</button>
        </div>

        <ul class="nav-auth">
          <li v-if="isLoggedIn">
            <div class="dropdown" @mouseenter="showDropdown = true" @mouseleave="showDropdown = false">
              <span class="dropdown-link">
                <i class="el-icon-arrow-down el-icon--right">{{ userType }}</i>
              </span>
              <div class="dropdown-content" v-show="showDropdown">
                <router-link to="/Dashboard">个人中心</router-link>
                <router-link to="/Message">消息</router-link>
                <router-link to="/Setting">设置</router-link>
                <a href="#" @click.prevent="logout">退出</a>
              </div>
            </div>
          </li>
          <li v-else>
            <!-- <button @click="showLoginDialog = true">登录</button>
            <LoginDialog :showLogin="showLoginDialog" @close="showLoginDialog = false" /> -->
            <button @click="$emit('open-login')">登录</button>

          </li>
        </ul>
      </div>
    </header>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
// import LoginDialog from '@/components/shared/LoginDialog.vue';
import { useRouter } from 'vue-router';

export default {
  name: 'MainNavbar',
  components: {
    
  },
  setup() {
    const isLoggedIn = ref(false);
    const userType = ref('用户头像');
    const showDropdown = ref(false);
    const searchQuery = ref('');
    const searchWidth = ref('200px');
    const windowWidth = ref(window.innerWidth);
    const router = useRouter();

    const handleResize = () => {
      windowWidth.value = window.innerWidth;
      adjustSearchWidthInNavbar();
      if (windowWidth.value >= 742) {
        showDropdown.value = false;
      }
    };

    const adjustSearchWidthInNavbar = () => {
      searchWidth.value = windowWidth.value < 850 ? '100px' : '200px';
    };

    onMounted(() => {
      window.addEventListener('resize', handleResize);
      adjustSearchWidthInNavbar();
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleResize);
    });

    const search = () => {
      const searchUrl = `/search?query=${encodeURIComponent(searchQuery.value)}`;
      router.push(searchUrl);
    };

    const logout = () => {
      isLoggedIn.value = false;
    };

    return {
      isLoggedIn,
      userType,
      showDropdown,
      // showLoginDialog,
      searchQuery,
      searchWidth,
      windowWidth,
      search,
      handleResize,
      adjustSearchWidthInNavbar,
      logout,
    };
  }
};
</script>

<style scoped>


header {
  background-color: #4c749e;
  color: white;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header .logo {
  font-size: 24px;
}

header nav ul {
  list-style-type: none;
  display: flex;
}

header nav ul li {
  margin-right: 20px;
}

header nav ul li:last-child {
  margin-right: 0;
}

header nav ul li a {
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
}

.header-right {
  display: flex;
  align-items: center;
}








.nav-main {
  background-color: #3d86d4;
  color: white;
  width: 100%;
  position: fixed;
  top: 0;
  z-index:999;
  padding: 0px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.nav-main nav {
  display: flex;
  align-items: center;
}

.left-nav {
  display: flex;
  align-items: center;
}

.right-nav {
  display: flex;
  align-items: center;
}

.nav-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
}

.nav-links li {
  line-height: 60px;
}

.nav-links li a {
  color: white;
  text-decoration: none;
  font-size: 18px;
  display: flex;
  align-items: center;
  padding: 0px 17px;
  transition: background-color 0.3s ease;
}

.nav-links li a:hover {
  background-color: #265587;
}

.search-bar {
  display: flex;
  align-items: center;
  margin-left: auto;
}


.search-bar input[type="text"] {
  padding: 8px;
  border-radius: 5px;
  border: none;
  width: 200px;
}

.search-bar button {
  background-color: #3d86d4;
  color: white;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: background-color 0.3s;
  line-height: 60px;
  padding-left: 17px;
  padding-right: 17px;
  font-size: 16px;
  font-family: Arial, sans-serif;
}

.search-bar button:hover {
  background-color: #265587;
}

.nav-auth {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
}

.nav-auth button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
  padding: 0px 17px;
  transition: background-color 0.3s ease;
  line-height: 60px;
}

.nav-auth button:hover {
  background-color: #265587;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #77b2f0;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  top: 100%;
}

.dropdown-content a {
  color: white;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #265587;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-link {
  color: white;
  line-height: 60px;
  padding: 0px 15px;
  align-items: center;
  display: flex;
  transition: background-color 0.3s ease;
}

.dropdown-link:hover {
  background-color: #265587;
}

@media screen and (max-width: 559px) {
  .site-title {
    display: none;
  }
}

@media screen and (max-width: 830px) {
  .search-bar input[type="text"] {
    width: 100px;
  }
}

</style>
