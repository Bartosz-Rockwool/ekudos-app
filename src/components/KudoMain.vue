<template>
<div>
    <div v-if="isLoggedUser">
        <section>
            <KudoForm />
        </section>
        <section>
            <KudoBoard />
        </section>
    </div>
    <div v-else>
      <section>
            <v-layout justify-center id="kudo">
        <v-flex xs12 sm8 md6 mt-5>
            <v-card dark class="transparent" flat>
                <v-card-title class="display-2 font-weight-bold" >
                    <v-card-text>
                        <p class="text-xs-center">Please log in to use <u class="red-underline">ROCKUDO</u></p>
                    </v-card-text>
                </v-card-title>
            </v-card>
        </v-flex>
    </v-layout>
        </section>
    </div>
</div>

</template>

<script>
import KudoForm from './KudoForm'
import KudoBoard from './KudoBoard'

export default {
  name: 'KudoMain',
  components: {
    KudoForm,
    KudoBoard
  },
  data () {
    return { }
  },
  computed: {
    isLoggedUser: function() { return this.$store.getters.isAuthenticated; },
  },
}
</script>

<style>
</style>