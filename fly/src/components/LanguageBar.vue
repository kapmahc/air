<template>
  <b-nav-item-dropdown right>
    <template slot="text">
      {{$t('language-bar.switch')}}
    </template>
    <b-dropdown-item v-bind:key="l" v-on:click="setLocale(l)" v-for="l in languages">
      {{$t(`languages.${l}`)}}
    </b-dropdown-item>
  </b-nav-item-dropdown>
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
