<template>
  <transition>
    <router-view class="router-view"></router-view>
  </transition>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import { get } from '@/ajax'
import {TOKEN} from '@/constants'

export default {
  methods: {
    ...mapActions([
      'signIn',
      'refresh'
    ]),
    switchLanguage (l) {
      // get(`/locales/${l}`)
      //   .then((res) => {
      //     // this.$i18n.add(l, res.vux)
      //     // this.$i18n.set(l)
      //     // localStorage.setItem(LOCALE, l)
      //   })
      //   .catch(this.$Message.error)
    }
  },
  created () {
    var token = sessionStorage.getItem(TOKEN)
    if (!this.user && token) {
      this.signIn(token)
    }
    // ----
    // var locale = localStorage.getItem(LOCALE) || 'en-US'
    // this.switchLanguage(locale)
    // ----
    if (!this.info) {
      get('/site/info').then((rst) => this.refresh(rst)).catch(this.$Message.error)
    }
  },
  computed: {
    ...mapState({
      user: state => state.currentUser,
      info: state => state.siteInfo
    }),
    title () {
      var title = this.$route.name ? this.$t(this.$route.name + '.title', this.$route.params) : ''
      document.title = title
      return title
    }
  },
  data () {
    return {
      languages: {
        'en-US': 'English',
        'zh-Hans': '简体中文',
        'zh-Hant': '正體中文'
      },
      showLanguageMenus: false
    }
  }
}
</script>
