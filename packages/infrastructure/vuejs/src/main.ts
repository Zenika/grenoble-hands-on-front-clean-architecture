import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { dependencies } from '@/DependencyInjection'

createApp(App)
    .use(router)
    .use(dependencies)
    .mount('#app')
