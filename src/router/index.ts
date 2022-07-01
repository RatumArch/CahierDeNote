import { createWebHistory, createRouter } from "vue-router";

import Home from '@/Home.vue'
import Document from '@/Document'
import Folder from '@/Folder.vue'
import Error from "@/Error.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [{
        path: '/folder/:folderCode',
        component: Folder,
        children: [{
            path: ':document',
            component: Document,
        }
        ]
    },
    { path: '/', component: Home, alias: ['/home', '/index'] },
    {
        path: '/error',
        component: Error
    }
]
})

export default router