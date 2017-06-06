<template>
  <footer>
    &copy; {{ $t("site.copyright") }}
    &middot; <a href="#">Privacy</a>
    &middot; <a href="#">Terms</a>
    {{$t('footer.other-languages')}}:
    <el-button type="text" key="l" v-on:click="setLocale(l)" v-for="l in languages">
      {{$t(`languages.${l}`)}}
    </el-button>
  </footer>
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
