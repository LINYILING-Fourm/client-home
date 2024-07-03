<template>
  <div id="app">
    <Navbar />
    <main class="container">
      <router-view />
    </main>
    <GlobalOverlay :showOverlay="showOverlay" />
    
    <MainNavbar @open-login="openLoginDialog" />

  
    <LoginDialog v-if="showLogin" :showLogin="showLogin" @close="closeLoginDialog" />
 

    <Footer />
    
  </div>
</template>

<script>
import Footer from './components/shared/Footer.vue';
import GlobalOverlay from './components/system/GlobalOverlay.vue'; // 引入 GlobalOverlay 组件
import MainNavbar from './components/shared/Navbar.vue';
import LoginDialog from './components/shared/LoginDialog.vue';

export default {
  name: 'App',
  components: {
    MainNavbar,
    Footer,
    GlobalOverlay, // 注册 GlobalOverlay 组件
    LoginDialog,

  },


data() {
    return {
      showOverlay: false,
      showLogin: false,
    };
  },

  methods: {
    openLoginDialog() {
      this.showLogin = true;
      this.showOverlay = true;
    },
    closeLoginDialog() {
      this.showLogin = false;
      this.showOverlay = false;
    },

    toggleOverlay(show) {
      this.showOverlay = show;
    
  }

  }

};



</script>

<style scoped>
@import './assets/css/styles.css';



</style>
