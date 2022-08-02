import { createWebHistory, createRouter } from "vue-router";

import Home from '@/Home.vue'
const Document = () => import('@/Document')
const Folder = () => import('@/Folder.vue')
import Error from "@/Error.vue";
import Loader from '@/Loader.vue'
import Feedback from '@/Feedback.vue'

import axios from "axios";

const router = createRouter({
    history: createWebHistory(),
    routes: [{
        path: '/folder/:folderCode',
        component: Folder,
        name: 'folder',
        children: [{
            path: ':document?',
            component: Document,
            name: 'document'
        }
        ]
    },
    { path: '/', component: Home, alias: ['/home', '/index'] },
    {
        path: '/error',
        component: Error
    },
    { 
        path: '/:toutAutresRoutes*', component: Error,
    },
    { path: '/feedback', component: Feedback }
]
})

export default router