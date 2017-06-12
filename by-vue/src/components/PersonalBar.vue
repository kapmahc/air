<template>
  <el-submenu index="personal-bar" v-if="user">
    <template slot="title">{{$t('personal-bar.welcome', {name: user.name})}}</template>
    <el-menu-item index="to-site.dashboard">{{$t('personal-bar.dashboard')}}</el-menu-item>
    <SignOut />
  </el-submenu>
  <el-submenu index="personal-bar" v-else>
    <template slot="title">{{$t('personal-bar.sign-in-or-up')}}</template>
    <el-menu-item :index="`to-${l.href}`" v-for="(l, i) in links" :key="i">
      {{$t(`${l.href}.title`)}}
    </el-menu-item>
  </el-submenu>
</template>

<script>
import {nonSignInLinks as links, TOKEN} from '@/constants'
import SignOut from './SignOut'

export default {
  data () {
    return {
      links
    }
  },
  created () {
    var token = sessionStorage.getItem(TOKEN)
    if (!this.user && token) {
      this.$store.commit('signIn', token)
    }
  },
  computed: {
    user () {
      return this.$store.state.currentUser
    }
  },
  components: {
    SignOut
  }
}
</script>
