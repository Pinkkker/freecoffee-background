import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Index from './views/Index.vue'
import Dashboard from './views/Dashboard/index.vue'
import Review from './views/Review/index.vue'
import Info from './views/Info/index.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login,   // `/login`路径访问Login组件
        }, {
            path: '/index',
            name: 'Index',
            component: Index,   // `/balance`路径访问Balance组件
            children: [
                {
                    path: '/dashboard',
                    name: 'Dashboard',
                    component: Dashboard,
                }, {
                    path: '/review',
                    name: 'Review',
                    component: Review,
                }, {
                    path: '/info',
                    name: 'Info',
                    component: Info,
                }
            ]
        }, {
            path: '*',
            redirect: '/login'  // 所有路径都重定向到`/login`
        }
    ]
});