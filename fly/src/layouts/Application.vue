<template>
  <div class="body">
    <app-header />
    <div class="container">
      <slot />
      <hr />
      <app-footer />
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  data () {
    return {
    }
  },
  components: {
    'app-header': Header,
    'app-footer': Footer
  }
}
</script>

<style scoped>
.body {
  padding-top: 4rem;
  padding-bottom: 4rem;
}
</style>
