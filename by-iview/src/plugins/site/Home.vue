<template>
  <application-layout>
    {{title}}
  </application-layout>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      items: state => state.siteInfo ? state.siteInfo.cards : []
    }),
    title () {
      return this.$t('site.home.title')
    }
  }
}
</script>
