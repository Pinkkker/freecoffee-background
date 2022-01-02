import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Index from './views/Index.vue'
import Dashboard from './views/Dashboard/index.vue'
import User from './views/User/index.vue'
import Post from './views/Post/index.vue'
import Tech from './views/Tech/index.vue'
import Info from './views/Info/index.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login,
        }, {
            path: '/index',
            name: 'Index',
            component: Index,
            redirect: '/dashboard',
            children: [
                {
                    path: '/dashboard',
                    name: 'Dashboard',
                    component: Dashboard,
                }, {
                    path: '/user',
                    name: 'User',
                    component: User,
                }, {
                    path: '/post',
                    name: 'Post',
                    component: Post,
                }, {
                    path: '/tech',
                    name: 'Tech',
                    component: Tech,
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