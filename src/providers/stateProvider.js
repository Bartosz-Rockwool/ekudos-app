import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { VueAuthenticate } from 'vue-authenticate'
import logger from '../providers/logProvider';

Vue.use(VueAxios, axios)

const vueAuth = new VueAuthenticate(Vue.prototype.$http, {
    baseUrl: 'http://localhost:8080', // Your API domain
    
    providers: {
      live: {
        url: "/live",  
        clientId: '96b137cd-68f0-4104-afc6-1d252e4be5fd', // Microsoft office Client ID
        //redirectUri: 'http://localhost:5000/api/OAuth2' , // Your client app URL
        redirectUri: 'http://localhost:8080' , // Your client app URL
        authorizationEndpoint : "https://login.microsoftonline.com/0a3a9199-117f-4551-be5b-0e3957a58d2a/oauth2/v2.0/authorize/",
        scope: ["openid","profile","offline_access","User.Read"],
        scopeDelimiter: ' ',
        oauthType: '2.0'
      }
    }
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
          return vueAuth.isAuthenticated()
        },
        user(state) {
          return state.user;
        }
    },
    actions: {
        login() {
         
           return new Promise((resolve) => {
                vueAuth.authenticate("live").then((response)=>{
                    logger.LogData(response);
                    resolve(response.data);
                })
           })
        }
    }
});