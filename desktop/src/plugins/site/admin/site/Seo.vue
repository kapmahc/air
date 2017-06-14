<template>
  <dashboard-layout admin>
    <group label-width="6em" label-margin-right="2em" label-align="right">
      <x-input
        :title="$t('site.admin.seo.google.verifyCode')"
        v-model="form.googleVerifyCode" />
      <x-input
        :title="$t('site.admin.seo.baidu.verifyCode')"
        v-model="form.baiduVerifyCode" />
    </group>
    <box gap="10px 10px">
      <x-button type="primary" @click.native="submitForm">{{$t("buttons.submit")}}</x-button>
    </box>
    <group>
      <cell-box :key="i" v-for="(l, i) in links">
        <a :href="'/'+l" target="_blank">{{l}}</a>
      </cell-box>
    </group>
  </dashboard-layout>
</template>

<script>
import { Group, Box, CellBox, XInput, XTextarea, XButton } from 'vux'
import { mapState } from 'vuex'
import { get, post, fail, success } from '@/ajax'

export default {
  components: {
    Group,
    XInput,
    XButton,
    CellBox,
    Box,
    XTextarea
  },
  created () {
    get('/admin/site/seo').then((rst) => { this.form = rst }).catch((err) => fail(this, err))
  },
  data () {
    return {
      form: {
        googleVerifyCode: '',
        baiduVerifyCode: ''
      }
    }
  },
  methods: {
    submitForm () {
      post('/admin/site/seo', this.form)
      .then(res => success(this))
      .catch(err => fail(this, err))
    }
  },
  computed: {
    ...mapState({
      user: state => state.currentUser,
      info: state => state.siteInfo
    }),
    links () {
      return [
        'robots.txt',
        'sitemap.xml.gz',
        `google${this.form.googleVerifyCode}.html`,
        `baidu_verify_${this.form.baiduVerifyCode}.html`
      ].concat((this.info ? this.info.languages : []).map((l) => `rss-${l}.atom`))
    }
  }
}
</script>
