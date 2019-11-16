import Vue from 'vue'
import Vuex from 'vuex'
// import * as firebase from 'firebase/app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: null
  },
  mutations: {
    SET_LOGIN(state, payload) {
      this.isLogin = payload;
    }
  },
  actions: {
    checkLogin() {

    }
  },
  modules: {
  }
})
