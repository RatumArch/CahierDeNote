import { createApp } from 'vue'
import App from './App.vue'
import Home from './Home.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon, Icons} from './icons'
library.add(...Icons)



createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')