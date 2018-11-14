<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <v-btn flat href="#kudo">
          <span>E-Kudos</span>
        </v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat href="#kudo-bord">
        <span class="mr-2">Kudo board</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <MainPage/>
    </v-content>
  </v-app>
</template>

<script>
import MainPage from './components/MainPage'

export default {
  name: 'App',
  components: {
    MainPage
  },
  data () {
    return {
      //
    }
  }
}
</script>
