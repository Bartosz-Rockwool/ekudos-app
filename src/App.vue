<template>
  <v-app class="white">
    <v-toolbar app class="white">
        <v-toolbar-title>Ekudos</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
            <v-btn flat href="#kudo">Add</v-btn>
            <v-btn flat href="#kudo-bord">Board</v-btn>
        </v-toolbar-items>
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
