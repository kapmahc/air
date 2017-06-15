<template>
  <div>
    {{$t('site.home.title')}}
    {{$t('i.select.placeholder')}}
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      items: state => state.siteInfo ? state.siteInfo.cards : []
    })
  }
}
</script>
