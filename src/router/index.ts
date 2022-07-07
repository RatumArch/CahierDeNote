import { createWebHistory, createRouter } from "vue-router";

import Home from '@/Home.vue'
import Document from '@/Document'
import Folder from '@/Folder.vue'
import Error from "@/Error.vue";
import Loader from '@/Loader.vue'

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
        ],
        beforeEnter: ((to, from) => {
            return { path: '/loader'}
        })
    },
    { path: '/', component: Home, alias: ['/home', '/index'] },
    {
        path: '/error',
        component: Error
    },
    { 
        path: '/:toutAutresRoutes*', component: Error,
        /* beforeEnter: async (to, from) => {
            console.log("before Enter route")
            console.log(to.params?.toutAutresRoutes);
            const params: string[] = <string[]>to.params?.toutAutresRoutes
            if(params[0]==='folder') {
                
                const folderRequest = await axios.get('/api/findFolder', { params: {folderCode: params[0]} }).then((res) => res.data)
                const firstNoteInFolder = folderRequest[0]
                console.log('\tTentative axios requête')
                const title = firstNoteInFolder?.title
                if(folderRequest) {
                    console.log(`${params[0]}/${title}`)
                    return { name: 'folder' }
                }
                else {
                    return { path: '/error'}
                }
            }
            else {
                return { path: '/error'}
            }
            
            console.log("/before Enter route")
        } */
    },
    { path: '/loader', component: Loader}
]
})

export default router