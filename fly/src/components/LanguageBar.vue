<template>
  <el-submenu index="language-bar">
    <template slot="title">{{$t('language-bar.switch')}}</template>
    <el-menu-item :index="`language-bar-${l}`"  v-bind:key="l" v-on:click="setLocale(l)" v-for="l in languages">
      {{$t(`languages.${l}`)}}
    </el-menu-item>
  </el-submenu>
</template>

<script>
import {LANGUAGES, load as setLocale} from '@/i18n'
export default {
  data () {
    return {
      languages: LANGUAGES
    }
  },
  methods: {
    setLocale
  }
}
</script>
