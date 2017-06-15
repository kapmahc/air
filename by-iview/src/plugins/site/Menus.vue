<template>
  <group :title="$t('site.menus.title')">
    <cell
      :key="i"
      :link="{path: l.href}"
      :title="$t(l.label)"
      v-for="(l, i) in items"/>
  </group>
</template>

<script>
import { Cell, Group } from 'vux'
import { mapState } from 'vuex'

export default {
  components: {
    Group,
    Cell
  },
  computed: {
    ...mapState({
      items: state => state.siteInfo ? state.siteInfo.links : []
    })
  }
}
</script>
