<template>
  <dashboard-layout>
    <el-col :md="{span: 8}" :key="i" v-for="(d, i) in dashboard"  style="padding: 16px;">
      <el-card>
        <div slot="header">
          {{$t(d.label)}}
        </div>
        <ul class="list-group">
          <li :key="j" v-for="(l, j) in d.items">
            <router-link :to="{name: l.href}">
              {{$t(`${l.href}.title`)}}
            </router-link>
          </li>
        </ul>
      </el-card>
    </el-col>
  </dashboard-layout>
</template>

<script>
import plugins from '@/plugins'

export default {
  data () {
    return {
    }
  },
  computed: {
    dashboard () {
      return plugins.dashboard(this.$store.state.currentUser)
    }
  }
}
</script>
