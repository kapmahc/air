<template>
  <dashboard-layout admin>
    <group label-width="4.5em" label-margin-right="2em" label-align="right">
      <x-input
        required
        :title="$t('site.attributes.title')"
        :placeholder="$t('placeholders.not-empty')"
        v-model="form.title" />
      <x-input
        required
        :title="$t('site.attributes.subTitle')"
        :placeholder="$t('placeholders.not-empty')"
        v-model="form.subTitle" />
      <x-input
        required
        :title="$t('site.attributes.keywords')"
        :placeholder="$t('placeholders.not-empty')"
        v-model="form.keywords" />
      <x-textarea
        required
        :title="$t('site.attributes.description')"
        :placeholder="$t('placeholders.not-empty')"
        v-model="form.description" />
      <x-input
        required
        :title="$t('site.attributes.copyright')"
        :placeholder="$t('placeholders.not-empty')"
        v-model="form.copyright" />
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
  created () {
    get('/site/info').then((rst) => { this.form = rst }).catch((err) => fail(this, err))
  },
  data () {
    return {
      form: {
        title: '',
        subTitle: '',
        keywords: '',
        description: '',
        copyright: ''
      }
    }
  },
  methods: {
    submitForm () {
      post('/admin/site/info', this.form)
      .then(res => success(this))
      .catch(err => fail(this, err))
    }
  }
}
</script>
