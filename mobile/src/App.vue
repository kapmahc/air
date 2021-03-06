<template>
  <div style="height:100%;">
    <div v-transfer-dom>
      <actionsheet @on-click-menu="switchLanguage" :menus="languages" v-model="showLanguageMenus" />
    </div>
    <view-box body-padding-top="46px" body-padding-bottom="55px">
      <x-header
        slot="header"
        :left-options="{backText: $t('header.back')}"
        :title="title"
        style="width:100%;position:absolute;left:0;top:0;z-index:100;"
        :right-options="{showMore: true}"
        @on-click-more="showLanguageMenus = true" />
      <transition>
        <router-view class="router-view"></router-view>
      </transition>
      <tabbar slot="bottom">
        <tabbar-item :link="{name: 'site.home'}">
          <fa-icon slot="icon" name="home"/>
          <span slot="label">{{$t('footer.home')}}</span>
        </tabbar-item>
        <tabbar-item :link="{name: 'site.menus'}">
          <fa-icon slot="icon" name="bars"/>
          <span slot="label">{{$t('footer.menus')}}</span>
        </tabbar-item>
        <tabbar-item :link="{name: 'site.dashboard'}">
          <fa-icon slot="icon" name="user"/>
          <span slot="label">{{$t('footer.me')}}</span>
        </tabbar-item>
        <tabbar-item :link="{name: 'site.about'}">
          <fa-icon slot="icon" name="comments"/>
          <span slot="label">{{$t('footer.about')}}</span>
        </tabbar-item>
      </tabbar>
    </view-box>
  </div>
</template>

<script>
import { Actionsheet, ButtonTab, ButtonTabItem, ViewBox, XHeader, Tabbar, TabbarItem, Loading, TransferDom } from 'vux'
import { mapState, mapActions } from 'vuex'

import { get, fail } from '@/ajax'
import {LOCALE, TOKEN} from '@/constants'

export default {
  directives: {
    TransferDom
  },
  components: {
    ButtonTab,
    ButtonTabItem,
    ViewBox,
    XHeader,
    Tabbar,
    TabbarItem,
    Loading,
    Actionsheet
  },
  methods: {
    ...mapActions([
      'signIn',
      'refresh'
    ]),
    switchLanguage (l) {
      let that = this
      get(`/locales/${l}`)
        .then((res) => {
          that.$i18n.add(l, res.vux)
          that.$i18n.set(l)
          localStorage.setItem(LOCALE, l)
        })
        .catch(err => fail(that, err))
    }
  },
  created () {
    var token = sessionStorage.getItem(TOKEN)
    if (!this.user && token) {
      this.signIn(token)
    }
    // ----
    var locale = localStorage.getItem(LOCALE) || 'en-US'
    this.switchLanguage(locale)
    // ----
    if (!this.info) {
      get('/site/info').then((rst) => this.refresh(rst)).catch((err) => fail(this, err))
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

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/tap.less';

body {
  background-color: #fbf9fe;
}
/* view-box needed */
html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}

// .demo-icon-22 {
//   font-family: 'vux-demo';
//   font-size: 22px;
//   color: #888;
// }
// .weui-tabbar.vux-demo-tabbar {
//   /** backdrop-filter: blur(10px);
//   background-color: none;
//   background: rgba(247, 247, 250, 0.5);**/
// }
// .vux-demo-tabbar .weui-bar__item_on .demo-icon-22 {
//   color: #F70968;
// }
// .vux-demo-tabbar .weui-tabbar_item.weui-bar__item_on .vux-demo-tabbar-icon-home {
//   color: rgb(53, 73, 94);
// }
// .demo-icon-22:before {
//   content: attr(icon);
// }
// .vux-demo-tabbar-component {
//   background-color: #F70968;
//   color: #fff;
//   border-radius: 7px;
//   padding: 0 4px;
//   line-height: 14px;
// }
// .weui-tabbar__icon + .weui-tabbar__label {
//   margin-top: 0!important;
// }
// .vux-demo-header-box {
//   z-index: 100;
//   position: absolute;
//   width: 100%;
//   left: 0;
//   top: 0;
// }
//
// @font-face {
//   font-family: 'vux-demo';  /* project id 70323 */
//   src: url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.eot');
//   src: url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.eot?#iefix') format('embedded-opentype'),
//   url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.woff') format('woff'),
//   url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.ttf') format('truetype'),
//   url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.svg#iconfont') format('svg');
// }
//
// .demo-icon {
//   font-family: 'vux-demo';
//   font-size: 20px;
//   color: #04BE02;
// }
//
// .demo-icon-big {
//   font-size: 28px;
// }
//
// .demo-icon:before {
//   content: attr(icon);
// }
//
// .router-view {
//   width: 100%;
//   top: 46px;
// }
// .vux-pop-out-enter-active,
// .vux-pop-out-leave-active,
// .vux-pop-in-enter-active,
// .vux-pop-in-leave-active {
//   will-change: transform;
//   transition: all 500ms;
//   height: 100%;
//   top: 46px;
//   position: absolute;
//   backface-visibility: hidden;
//   perspective: 1000;
// }
// .vux-pop-out-enter {
//   opacity: 0;
//   transform: translate3d(-100%, 0, 0);
// }
// .vux-pop-out-leave-active {
//   opacity: 0;
//   transform: translate3d(100%, 0, 0);
// }
// .vux-pop-in-enter {
//   opacity: 0;
//   transform: translate3d(100%, 0, 0);
// }
// .vux-pop-in-leave-active {
//   opacity: 0;
//   transform: translate3d(-100%, 0, 0);
// }
// .menu-title {
//   color: #888;
// }
</style>
