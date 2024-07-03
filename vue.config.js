const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true, // 自动转译 node_modules 中的依赖
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  lintOnSave: process.env.NODE_ENV === 'development', // 仅在开发环境下启用 ESLint
  pwa: {
    name: 'LINYILING'
  },

  pages: {
    index: {
      entry:'src/main.js',
    },
  },



  devServer: {
    port: 8081,
    client: {
      webSocketURL: {
        hostname: 'e960-39-110-207-167.ngrok-free.app', // ngrok 隧道地址
        port: 443,
        protocol: 'wss'
      }
    },
    allowedHosts: 'all', // 允许所有主机名访问
  },

  productionSourceMap: false, // 关闭生产环境的 source map

  chainWebpack: config => {
    config.resolve.extensions.add('.ts'); // 添加 .ts 扩展名的解析支持
    
    config.module
      .rule('typescript')
      .test(/\.ts$/)
      .use('ts-loader')
      .loader('ts-loader')
      .options({
        appendTsSuffixTo: [/\.vue$/],
      })
      .end();
  },
});
