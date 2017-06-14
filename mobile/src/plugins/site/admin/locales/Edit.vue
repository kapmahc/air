<template>
  <dashboard-layout admin>
    <group label-width="4.5em" label-margin-right="2em" label-align="right">
      <x-input
        required
        :title="$t('site.attributes.locale.code')"
        :placeholder="$t('placeholders.not-empty')"
        v-model="form.code" />
      <x-textarea
        required
        :title="$t('site.attributes.locale.message')"
        :placeholder="$t('placeholders.not-empty')"
        v-model="form.message" />
    </group>
    <box gap="10px 10px">
      <x-button type="primary" @click.native="submitForm">{{$t("buttons.submit")}}</x-button>
    </box>
  </dashboard-layout>
</template>

<script>
import { Group, Box, XInput, XTextarea, XButton } from 'vux'
import { get, post, fail, success } from '@/ajax'

export default {
  components: {
    Group,
    XInput,
    XButton,
    Box,
    XTextarea
  },
  data () {
    return {
      form: {
        code: '',
        message: ''
      }
    }
  },
  methods: {
    submitForm () {
      post('/admin/locales', this.form)
      .then(res => {
        success(this)
        this.$router.push({name: 'site.admin.locales.index'})
      })
      .catch(err => fail(this, err))
    }
  },
  created () {
    var code = this.$route.params.code
    if (code) {
      get(`/admin/locales/${code}`)
        .then((rst) => { this.form = rst })
        .catch((err) => fail(this, err))
    }
  }
}
</script>
