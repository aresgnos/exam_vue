// 파일명 : src/routes/index.js
import { createWebHashHistory, createRouter } from "vue-router";

import Home from '@/components/Home.vue';
import Board from '@/components/ExBoard.vue';
import Write from '@/components/ExWrite.vue';
import Content from '@/components/ExContent.vue';

const routes = [
    { path : '/', name : "Home", component:Home },
    { path : '/board', name : "Board", component:Board },
    { path : '/write', name : "Write", component:Write },
    { path : '/content', name : "Content", component:Content },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes : routes
})

export default router;