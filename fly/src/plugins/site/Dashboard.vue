<template>
  <dashboard-layout>
    <div class="card-columns">
      <b-card no-block :header="$t(d.label)" :key="i" v-for="(d, i) in dashboard">
        <b-list-group flush>
          <b-list-group-item v-if="l" :to="{name: l.href}" :key="j" v-for="(l, j) in d.items">
            {{$t(`${l.href}.title`)}}
          </b-list-group-item>
        </b-list-group>
      </b-card>
    </div>
  </dashboard-layout>
</template>

<script>
import plugins from '@/plugins'

export default {
  data () {
    return {
    }
  },
  computed: {
    dashboard () {
      return plugins.dashboard(this.$store.state.currentUser)
    }
  }
}
</script>
