import Login from './components/Auth/Login'
import App from './App.vue'
const routes = [
    { 
        path : '/',
        component : Login,
        name : 'login'
     },
    { 
        path : '/products',
        component : App,
        name :  'products'
    },
]
export default routes