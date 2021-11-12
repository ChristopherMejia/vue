import { createWebHistory, createRouter } from 'vue-router';
import Home from '@/views/Home';

const history = createWebHistory();

export default new createRouter({
    history,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        }
    ]
})