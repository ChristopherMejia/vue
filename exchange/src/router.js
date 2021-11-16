import { createWebHistory, createRouter } from 'vue-router';
import Home from '@/views/Home';
import About from '@/views/About';
import Error from '@/views/Error';


const history = createWebHistory();

export default new createRouter({
    history,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },

        {
            path: '/about',
            name: 'about',
            component: About,
        },

        {
            path: '/:catchAll(.*)',
            name: 'error',
            component: Error,
        }
    ]
})