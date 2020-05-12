import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import Adal from 'vue-adal'
import { AuthenticationContext } from 'vue-adal'

Vue.use(Adal, {
      config: {
        // ROCKWOOL
        tenant: 'ec85c1f0-148f-4d0f-b9f5-bfd62a99ed8c',
        // DEVELOPER
        //tenant: '0a3a9199-117f-4551-be5b-0e3957a58d2a',
        // ROCKWOOL
        clientId: 'a0d257d2-594a-49bb-8527-893d9399dc2d',
        // DEVELOPER
        // clientId: '96b137cd-68f0-4104-afc6-1d252e4be5fd',
        redirectUri: 'https://rockudo.rockwool.com/',
        cacheLocation: 'localStorage'
      },
      requireAuthOnInitialize: false,
      router
});

Vue.use(Vuex);

const store = new Vuex.Store({
    state: { },
    mutations: { },
    getters: {
        apiTokenHeader(){
            let apiToken;
            AuthenticationContext.acquireToken(AuthenticationContext.config.clientId, (err, token) => {
                if (err) {
                    let errCode = err.split(':')[0]
                    switch (errCode) {
                      case 'AADSTS50058': // Need to prompt for user sign in
                        AuthenticationContext.login()
                        break
                      case 'AADSTS65001': // Token is invalid; grab a new one
                        AuthenticationContext.acquireTokenRedirect(AuthenticationContext.config.clientId)
                        break
                      case 'AADSTS16000': // No Access
                      default:
                        // Need a pop-up forcing a login
                        AuthenticationContext.login()
                        break
                    }
                    return
                  }
                 apiToken = token;
                  return 
            });

            return {'headers': {'Authorization': `BEARER ${apiToken}`}}
        },
        apiUrlBase() {
            return "ekudosapi.azurewebsites.net/api/ekudos";
        },
        isAuthenticated() {
            return !!AuthenticationContext.user;
        },
        user() {
            let user = AuthenticationContext.user;
            if(user && user.profile)
            {
                return AuthenticationContext.user.profile;
            }
            return null;
        }
    },
    actions: {
        login() {
            AuthenticationContext.login();
        },
        logout() {
            AuthenticationContext.logout();
        }
    }
});

export default store;