import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import Adal from 'vue-adal'

Vue.use(Adal, {
      config: {
        tenant: '0a3a9199-117f-4551-be5b-0e3957a58d2a',
        clientId: '96b137cd-68f0-4104-afc6-1d252e4be5fd',
        redirectUri: 'http://localhost:8080/live',
        cacheLocation: 'localStorage'
      },
      requireAuthOnInitialize: false,
      router
});


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('token') || '',
        isAuthenthicated : false,
        user : null
    },
    mutations: {
        add_token(state , token) {
            localStorage.setItem("token",token);
            state.token = token;
        },
        isAuthenticated(state, payload) {
            state.isAuthenticated = payload;
        },
        set_user(state, user) {
            state.user = user;
        }
    },
    getters: {
        isAuthenticated() {
          return true;
        },
        user(state) {
          return state.user;
        }
    },
    actions: {
        login() {
            //AuthenticationContext.login();
        }
    }
});