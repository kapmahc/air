<template>
  <div>
    <group label-width="4.5em" label-margin-right="2em" label-align="right">
      <x-textarea
        required
        :title="$t('attributes.body')"
        :placeholder="$t('site.leave-words.new.please-leave-contact')"
        v-model="form.body" />
    </group>
    <box gap="10px 10px">
      <x-button type="primary" @click.native="submitForm">{{$t("buttons.submit")}}</x-button>
    </box>
  </div>
</template>

<script>
import { Group, Box, XInput, XTextarea, XButton } from 'vux'
import { post, fail, success } from '@/ajax'

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
      post(id ? `/leave-words/${id}` : '/leave-words', Object.assign({}, this.form, {type: 'text'}))
      .then(res => {
        success(this)
        this.form.body = ''
      })
      .catch(err => fail(this, err))
    }
  }
}
</script>
