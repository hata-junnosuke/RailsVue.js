import Vue from 'vue';
import Vuex from 'vuex';
import auth from '@/store/modules/auth'//moduleのauthを受け取る
Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        auth//moduleのauthを受け取る
    }
})

export default store;
