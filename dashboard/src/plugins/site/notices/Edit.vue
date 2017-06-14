<template>
  <dashboard-layout admin>
    <group label-width="4.5em" label-margin-right="2em" label-align="right">
      <x-textarea
        required
        :title="$t('attributes.body')"
        :placeholder="$t('placeholders.not-empty')"
        v-model="form.body" />
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
        body: ''
      }
    }
  },
  methods: {
    submitForm () {
      var id = this.$route.params.id
      post(id ? `/notices/${id}` : '/notices', Object.assign({}, this.form, {type: 'markdown'}))
      .then(res => {
        success(this)
        this.$router.push({name: 'site.notices.index'})
      })
      .catch(err => fail(this, err))
    }
  },
  created () {
    var id = this.$route.params.id
    if (id) {
      get(`/notices/${id}`)
        .then((rst) => { this.form = rst })
        .catch((err) => fail(this, err))
    }
  }
}
</script>
