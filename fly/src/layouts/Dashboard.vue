<template>
  <div class="body">
    <app-header />
    <div class="container-fluid">
      <div class="row">
        <nav class="col-md-3 bg-faded block">
          <b-nav vertical pills :key="i" v-for="(d, i) in dashboard">
            <b-nav-item disabled>{{$t(d.label)}}</b-nav-item>
            <b-nav-item v-if="l" :to="{name: l.href}" :key="j" v-for="(l, j) in d.items">
              {{$t(`${l.href}.title`)}}
            </b-nav-item>
          </b-nav>
        </nav>
        <main class="col-md-9 block">
          <slot v-if="user"/>
          <hr />
          <app-footer />
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import plugins from '@/plugins'

export default {
  data () {
    return {
    }
  },
  components: {
    'app-header': Header,
    'app-footer': Footer
  },
  computed: {
    user () {
      return this.$store.state.currentUser
    },
    dashboard () {
      return plugins.dashboard(this.$store.state.currentUser)
    }
  }
}
</script>

<style scoped>
.body {
  padding-top: 3.5rem;
}
</style>
