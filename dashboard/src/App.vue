<template>
  <div style="height:100%;">
    <div v-transfer-dom>
      <actionsheet @on-click-menu="onSwitchLanguage" :menus="languages" v-model="showLanguageMenus" />
    </div>
    <view-box body-padding-top="46px" body-padding-bottom="55px">
      <x-header
        slot="header"
        :title="title"
        style="width:100%;position:absolute;left:0;top:0;z-index:100;"
        :right-options="{showMore: true}"
        @on-click-more="showLanguageMenus = true" />
      <transition>
        <router-view class="router-view"></router-view>
      </transition>
      <tabbar slot="bottom">
        <tabbar-item :link="{name: 'site.home'}">
          <i slot="icon" class="fa fa-home"/>
          <span slot="label">Wechat</span>
        </tabbar-item>
        <tabbar-item>
          <i slot="icon" class="fa fa-bars"/>
          <span slot="label">Message</span>
        </tabbar-item>
        <tabbar-item>
          <i slot="icon" class="fa fa-user"/>
          <span slot="label">Explore</span>
        </tabbar-item>
        <tabbar-item :link="{name: 'auth.users.sign-in'}">
          <i slot="icon" class="fa fa-comments"/>
          <span slot="label">News</span>
        </tabbar-item>
      </tabbar>
    </view-box>
  </div>
</template>

<script>
import { Actionsheet, ButtonTab, ButtonTabItem, ViewBox, XHeader, Tabbar, TabbarItem, Loading, TransferDom } from 'vux'
import { mapState } from 'vuex'

const LOCALE = 'locale'

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
    onSwitchLanguage (key) {
      console.log(key)
    }
  },
  created () {
    var locale = localStorage.getItem(LOCALE) || 'en-US'
    console.log(locale)
  },
  computed: {
    ...mapState({
      title: state => state.title,
      currentUser: state => state.currentUser
    })
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
