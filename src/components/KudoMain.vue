<template>
    <div>
        <section>
            <KudoForm />
        </section>
        <section>
            <KudoBoard />
        </section>
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
  }
}
</script>

<style>
</style>