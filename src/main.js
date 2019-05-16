import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'
import router from './router/index'
import store from './store'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(require('vue-moment'));
Vue.prototype.$axios = axios;

new Vue({
    render: h => h(App),
    router,
    store,
}).$mount('#app')