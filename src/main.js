import Vue from 'vue'
import Default from './components/layouts/Default'
import routes from './routes'
import VueRouter from 'vue-router'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(VueRouter)
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')

const router = new VueRouter({
  routes,
  mode:'history'
})

new Vue({
  router: router,
  render: h => h(Default),
}).$mount('#app')
