<template>
  <v-app class="white">
    <v-content id="mainContent">
        <section>
            <Toolbar />
        </section>
        <section>
            <KudoForm />
        </section>
        <section>
            <KudoBoard />
        </section>
    </v-content>
  </v-app>
</template>

<script>
import Toolbar from './components/Toolbar'
import KudoForm from './components/KudoForm'
import KudoBoard from './components/KudoBoard'

export default {
  name: 'App',
  components: {
    Toolbar,
    KudoForm,
    KudoBoard
  },
  data () {
    return { }
  }
}
</script>

<style>

#mainContent {
    background-image: url('assets/rockudo_background.jpg');
    background-attachment: fixed;
    background-size: cover;
}

.v-content {
    margin-top: -64px;
}

.v-textarea .v-text-field__slot {
    height: 32px;
} 

.v-textarea textarea {
    padding-bottom: 0;
} 

#kudo {
    margin-top: 100px;
    margin-bottom: 180px;
}
</style>
