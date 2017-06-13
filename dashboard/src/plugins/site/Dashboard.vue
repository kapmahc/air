<template>
  <div v-if="user && (user.admin || !admin)">
    dashboard
  </div>
  <div v-else>
    <group>
      <cell
        :title="$t(l + '.title')"
        :link="{name: l}"
        :key="i"
        v-for="(l, i) in ['auth.users.sign-in', 'auth.users.sign-up', 'auth.users.forgot-password', 'auth.users.confirm', 'auth.users.unlock']"
        />
    </group>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Cell, CellBox, CellFormPreview, Group, Badge } from 'vux'

export default {
  components: {
    Group,
    Cell,
    CellFormPreview,
    CellBox,
    Badge
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      user: state => state.currentUser
    })
  }
}
</script>
