
import { createRouter, createWebHistory } from 'vue-router';

import MainLayout from '@/components/shared/MainLayout.vue';
import UserPosts from '@/views/main/Posts.vue';
import AboutPage from '@/views/main/AboutLINYILING.vue';
import Admin from '@/views/Admin/AdminHome.vue'; // 管理页面
import HomePage from '@/views/main/HomePage.vue';
import Setting from  '@/views/main/Setting.vue' ;
import Message from  '@/views/main/Message.vue' ;
import SearchComponent from '@/views/main/SearchComponent.vue'; // 搜索组件路



import store from "@/store/index.ts";



const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', component: HomePage },
      { path: 'userPosts', component: UserPosts,props: { source: 'route' } },
      { path: 'about', component: AboutPage },
      { path: 'search', component: SearchComponent},
    ]
  },
  {
    path: '/admin',
    component: MainLayout,
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      { path: 'Setting', component: Setting, meta: { requiresAuth: true, requiresAdmin: true } },
      { path: 'Message', component: Message, meta: { requiresAuth: true, requiresAdmin: true } },
      { path: 'admin', component: Admin, meta: { requiresAuth: true, requiresAdmin: true } }
    ]
  },
  {
    path: '/user',
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      { path: 'Setting', component: Setting, meta: { requiresAuth: true } },
      { path: 'Message', component: Message, meta: { requiresAuth: true } },
    ]
  }

];




const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// 导航守卫
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;
  const userRole = store.getters.userRole;

  // const isAuthenticated = !!localStorage.getItem('token'); // 假设token保存在localStorage中
  // const userRole = localStorage.getItem('role'); // 假设角色信息保存在localStorage中，值为 'admin' 或 'user'

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ path: '/' }); // 如果未登录，重定向到首页
    } else {
      if (to.matched.some(record => record.meta.requiresAdmin) && userRole !== 'admin') {
        alert('你没有权限访问此页面'); // 提示没有权限
        next(false); // 阻止导航
      } else {
        next();
      }
    }
  } else {
    next();
  }
});



export default router;



