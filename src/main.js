import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import LoginDialog from './components/shared/LoginDialog.vue'; // 导入需要注册的组件
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import GlobalOverlay from './components/system/GlobalOverlay.vue';
import WebSocketPlugin from './plugins/websocket';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


import store from "./store";    // 导入 Vuex store

const app = createApp(App);




library.add(faHome);
// 在应用程序实例上注册组件
app.component('LoginDialog', LoginDialog)
   .component('GlobalOverlay', GlobalOverlay)
   .component('font-awesome-icon', FontAwesomeIcon); 



app.use(WebSocketPlugin); // 注册 WebSocket 插件
app.use(ElementPlus);
app.use(router);
app.use(store);
app.mount('#app');


