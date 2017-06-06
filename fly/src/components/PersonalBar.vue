<template>
  <el-submenu index="personal-bar" v-if="user">
    <template slot="title">{{$t('personal-bar.welcome', {name: user.name})}}</template>
    <el-menu-item index="to-site.dashboard">{{$t('personal-bar.dashboard')}}</el-menu-item>
    <el-menu-item index="personal.sign-out" @click="onSignOut">
      {{$t('personal-bar.sign-out')}}
    </el-menu-item>
  </el-submenu>
  <el-submenu index="personal-bar" v-else>
    <template slot="title">{{$t('personal-bar.sign-in-or-up')}}</template>
    <el-menu-item :index="`to-${l.href}`" :route="{name: l.href}" v-for="(l, i) in links" :key="i">
      {{$t(`${l.href}.title`)}}
    </el-menu-item>
  </el-submenu>
</template>

<script>
import {nonSignInLinks as links, TOKEN} from '@/constants'
import {_delete} from '@/ajax'

export default {
  data () {
    return {
      links
    }
  },
  beforeCreate () {
    var token = sessionStorage.getItem(TOKEN)
    if (token) {
      this.$store.commit('signIn', token)
    }
  },
  computed: {
    user () {
      return this.$store.state.currentUser
    }
  },
  methods: {
    onSignOut () {
      this.$confirm(
        this.$t('are-you-sure'),
        '',
        {
          confirmButtonText: this.$t('buttons.ok'),
          cancelButtonText: this.$t('buttons.cancel'),
          type: 'warning'
        }
      )
      .then(() => {
        _delete('/users/sign-out').then(function (rst) {
          sessionStorage.clear()
          this.$store.commit('signOut')
          this.$router.push({name: 'site.home'})
          this.$message.success('success')
        }.bind(this)).catch(this.$message.error)
      })
      .catch(() => {})
    }
  }
}
</script>
