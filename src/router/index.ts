import { createWebHashHistory, createWebHistory, createRouter } from "vue-router";

import Home from '@/Home.vue'
import Document from '@/Document'
import Folder from '@/Folder.vue'
import Error from "@/Error.vue";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [{
        path: '/folder/:folderCode',
        component: Folder,
        name: 'folder',
        children: [{
            path: ':document',
            component: Document,
            name: 'document'
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