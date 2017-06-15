<template>
  <div v-if="user && (user.admin || !admin)">
    <slot />
  </div>
  <div v-else>
    please sign in
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    admin: {
      type: Boolean
    }
  },
  computed: {
    ...mapState({
      user: state => state.currentUser
    })
  }
}
</script>
