<template>
  <el-menu-item index="personal.sign-out" @click="onSignOut">
    <fa-icon name="sign-out" v-if="icon" />
    {{$t('personal-bar.sign-out')}}
  </el-menu-item>
</template>

<script>
import {_delete} from '@/ajax'

export default {
  props: {
    icon: {
      type: Boolean
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
