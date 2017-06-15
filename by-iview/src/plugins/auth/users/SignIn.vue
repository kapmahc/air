<template>
  <div>
    <group label-width="4.5em" label-margin-right="2em" label-align="right">
      <x-input
        :title="$t('attributes.email')"
        :placeholder="$t('placeholders.not-empty')"
        v-model="form.email" />
      <x-input
        type="password"
        :title="$t('attributes.password')"
        :placeholder="$t('placeholders.password')"
        v-model="form.password" />
    </group>
    <box gap="10px 10px">
      <x-button type="primary" @click.native="submitForm">{{$t("buttons.submit")}}</x-button>
    </box>
  </div>
</template>

<script>
import { Group, Box, XInput, XButton } from 'vux'
import { mapActions } from 'vuex'
import { post, fail, success } from '@/ajax'
import { TOKEN } from '@/constants'

export default {
  components: {
    Group,
    XInput,
    XButton,
    Box
  },
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'signIn'
    ]),
    submitForm () {
      post('/users/sign-in', this.form)
      .then(rst => {
        var token = rst.token
        sessionStorage.setItem(TOKEN, token)
        this.signIn(token)
        this.$router.push({name: 'site.dashboard'})
        success(this)
      })
      .catch(err => fail(this, err))
    }
  }
}
</script>
