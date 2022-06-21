import { createWebHistory, createRouter } from "vue-router";

import Home from '@/Home.vue'
import Document from '@/Document'

const router = createRouter({
    history: createWebHistory(),
    routes: [{
        path: '/document/:folderCode',
        component: Document
    },
    { path: '/', component: Home, alias: ['/home', '/index'] },
]
})

export default router