import axios from 'axios'
//初期値の設定
const state = {
    currentUser: null,
};

//computedのように変化に対応する
const getters = {
    currentUser: state => state.currentUser,
};

//呼び出しはcommit
const mutations = {
    SET_CURRENT_USER: (state, user) => {
        state.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user))
        axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
    },
    CLEAR_CURRENT_USER: () => {
        state.currentUser = null
        localStorage.removeItem('currentUser')
        location.reload()//画面の更新
    }
};

//呼び出しはdispatch
const actions = {
    async login({ commit }, sessionParams) {
        const res = await axios.post(`/api/session`, sessionParams)
        commit("SET_CURRENT_USER", res.data.user);
    },

    logout({ commit }) {
        commit("CLEAR_CURRENT_USER");
    },
    async updateProfile({ commit, state }, userParams) {
        const res = await axios.patch(`/api/me/account`, userParams)
        commit("SET_CURRENT_USER", { ...res.data.user, ...{ token: state.currentUser.token } });
    },
};

//大元のルートstore/index.jsと接続する
export default {
    namespaced: true,//フォルダー分け(module)に必要
    state,
    mutations,
    actions,
    getters
};
