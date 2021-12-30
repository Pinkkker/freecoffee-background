// 前后端分离开发，调试时为解决跨域问题，利用webpack配置一个简单的反向代理。见：
// https://cli.vuejs.org/guide/webpack.html
// https://webpack.js.org/configuration/dev-server/#devserverproxy
module.exports = {
  configureWebpack: {
    devServer: {
      proxy: {
        '/admin': {
          target: 'http://localhost:8080',
        }
      }
    }
  }
}
