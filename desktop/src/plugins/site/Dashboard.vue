<template>
  <dashboard-layout>
    <group
     :title="$t(d.label)"
     :key="i"
     v-for="(d, i) in dashboard">
    <cell
      :key="j"
      :link="{name: l.href}"
      :title="$t(l.href + '.title')"
      v-for="(l, j) in d.items"/>
    </group>
  </dashboard-layout>
</template>

<script>
import { mapState } from 'vuex'
import { Cell, CellBox, Group, Badge } from 'vux'
import plugins from '@/plugins'

export default {
  components: {
    Group,
    Cell,
    CellBox,
    Badge
  },
  data () {
    return {
      showPanels: {}
    }
  },
  computed: {
    ...mapState({
      user: state => state.currentUser
    }),
    dashboard () {
      return plugins.dashboard(this.user)
    }
  }
}
</script>
