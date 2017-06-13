<template>
  <div>
    <p>Hello</p>
    {{$t('home.title')}}
    <i class="icon ion-home"></i>
  </div>
</template>

<script>
import { XHeader, Actionsheet, TransferDom } from 'vux'

export default {
  directives: {
    TransferDom
  },
  components: {
    XHeader,
    Actionsheet
  },
  data () {
    return {
      menus: {
        menu1: 'Take Photo',
        menu2: 'Choose from photos'
      },
      showMenus: false
    }
  },
  created () {
    this.$store.commit('refresh', this.$t('home.title'))
  }
}
</script>
