import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Amplify from 'aws-amplify'
import aws_exports from './aws-exports'

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

Amplify.configure(aws_exports)

createApp(App).use(store).use(router).mount('#app')
