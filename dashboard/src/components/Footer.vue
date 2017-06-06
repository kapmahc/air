<template>
  <footer style="text-align:center">
    &copy; {{ $t("site.copyright") }}
    <span :key="i" v-for="(l, i) in info.links.filter((l) => l.loc==='footer')">
      &middot; <a target="_blank" :href="l.href">{{$t(l.label)}}</a>
    </span>

    {{$t('footer.other-languages')}}:
    <el-button type="text" key="l" v-on:click="setLocale(l)" v-for="l in languages">
      {{$t(`languages.${l}`)}}
    </el-button>
  </footer>
</template>

<script>
import {LANGUAGES, load as setLocale} from '@/i18n'
import {get} from '@/ajax'

export default {
  data () {
    return {
      languages: LANGUAGES
    }
  },
  created () {
    if (!this.info.author) {
      get('/site/info').then((rst) => { this.$store.commit('refresh', rst) }).catch(this.$message.error)
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
