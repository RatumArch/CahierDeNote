import { createApp } from 'vue'
import App from './App.vue'
import Home from './Home.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon, Icons} from './icons'
library.add(...Icons)

import '@fontsource/raleway/600.css'
import '@fontsource/roboto/400.css'
import '@fontsource/fira-code/400.css'
import '@fontsource/courgette/400.css'
import '@fontsource/kalam'

createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')