import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI, { size: 'middle', zIndex: 3000 });
import router from './router'
import cookie from './cookie'
Vue.prototype.cookie = cookie;

Vue.config.productionTip = false
// router.beforeEach((to, from, next) => {
//   if (to.name == 'Balance') {
//     if (!cookie.getCookie('session_id')) {
//       next('/login');
//     }
//   }
//   if (to.name !== 'Balance') {
//     if (cookie.getCookie('session_id')) {
//       next('/balance');
//     }
//   }
//   next();
// });

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
