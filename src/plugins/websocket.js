// // src/plugins/websocket.js

// import WebSocket from 'websocket';

// const WebSocketPlugin = {
//   install(Vue) {
//     const ws = new WebSocket.client('wss://03b7-39-110-207-167.ngrok-free.app/ws'); // 替换为你的 WebSocket 服务器地址

//     ws.on('connect', () => {
//       console.log('WebSocket connected');
//     });

//     ws.on('message', (message) => {
//       console.log('Received message:', message.utf8Data);
//       Vue.prototype.$socket.emit('message', message.utf8Data); // 将消息发送到 Vue 实例中
//     });

//     ws.on('close', () => {
//       console.log('WebSocket closed');
//     });

//     ws.on('error', (error) => {
//       console.error('WebSocket error:', error);
//     });

//     // 添加到 Vue 原型链中，使其在所有组件中可用
//     Vue.prototype.$socket = ws;
//   },
// };

// export default WebSocketPlugin;



// src/plugins/websocket.js
// src/plugins/websocket.js

const WebSocketPlugin = {
    install(app) {
      const ws = new WebSocket('wss://e960-39-110-207-167.ngrok-free.app/ws'); // 替换为你的 WebSocket 服务器地址
  
      ws.addEventListener('open', () => {
        console.log('WebSocket connected');
      });
  
      ws.addEventListener('message', (event) => {
        console.log('Received message:', event.data);
        app.config.globalProperties.$socket.dispatchEvent(new CustomEvent('message', { detail: event.data }));
      });
  
      ws.addEventListener('close', () => {
        console.log('WebSocket closed');
      });
  
      ws.addEventListener('error', (error) => {
        console.error('WebSocket error:', error);
      });
  
      // 将 WebSocket 实例设置为 Vue 应用程序的全局属性
      app.config.globalProperties.$socket = ws;
    },
  };
  
  export default WebSocketPlugin;
  
