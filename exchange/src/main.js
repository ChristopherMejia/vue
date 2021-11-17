import { createApp } from 'vue';
import App from './App.vue';
import "@/assets/css/tailwind.css";

import router from '@/router';
import VueChartkick from 'vue-chartkick';
import {Chart} from 'chart.js';

createApp(App)
    .use(VueChartkick.use(Chart))
    .use(router)
    .mount('#app');
