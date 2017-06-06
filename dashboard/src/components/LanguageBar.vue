<template>
  <el-submenu index="language-bar">
    <template slot="title">{{$t('language-bar.switch')}}</template>
    <el-menu-item :index="`language-bar-${l}`"  v-bind:key="l" v-on:click="setLocale(l)" v-for="l in info.languages">
      {{$t(`languages.${l}`)}}
    </el-menu-item>
  </el-submenu>
</template>

<script>
import {load as setLocale} from '@/i18n'
export default {
  data () {
    return {
    }
  },
  methods: {
    setLocale
  },
  computed: {
    info () {
      return this.$store.state.siteInfo
    }
  }
}
</script>
