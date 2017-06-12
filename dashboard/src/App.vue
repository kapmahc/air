<template>
  <div style="height:100%;">
    <x-header :right-options="{showMore: true}" @on-click-more="showLanguageMenus = true">with more menu</x-header>
    <div v-transfer-dom>
      <actionsheet @on-click-menu="onSwitchLanguage" :menus="languages" v-model="showLanguageMenus" />
    </div>
    <router-view class="router-view"></router-view>
  </div>
</template>

<script>
import { Actionsheet, ButtonTab, ButtonTabItem, ViewBox, XHeader, Tabbar, TabbarItem, Loading, TransferDom } from 'vux'
// import { mapState, mapActions } from 'vuex'

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
  computed: {
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
html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}

</style>
