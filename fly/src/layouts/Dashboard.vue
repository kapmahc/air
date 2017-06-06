<template>
  <div v-if="user && (user.admin || !admin)">
    <app-header />
    <el-row>
      <el-col :md="{span: 4}">
        <el-menu unique-opened @select="handleSelect">
          <el-menu-item index="to-site.home"><fa-icon name="home" /> {{$t("header.home")}}</el-menu-item>
          <el-submenu :index="`item-${i}`" :key="i" v-for="(d, i) in dashboard">
            <template slot="title"><fa-icon :name="d.icon" /> {{$t(d.label)}}</template>
            <el-menu-item :index="`to-${l.href}`" :key="j" v-for="(l, j) in d.items">{{$t(`${l.href}.title`)}}</el-menu-item>
          </el-submenu>
          <SignOut icon />
        </el-menu>
      </el-col>
      <el-col :md="{span: 20}">
        <h2 v-if="title">{{$t(title)}}</h2>
        <el-row :gutter="20" style="padding: 16px;">
          <slot />
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <hr class="line" style="margin-top: 0;"/>
      <app-footer />
    </el-row>
  </div>

  <application-layout v-else >
    <el-col :md="{span: 8, offset: 8}" style="padding: 8px;">
      <app-error :title="$t('errors.not-allow')"/>
    </el-col>
  </application-layout>
</template>

<script>
import plugins from '@/plugins'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AppError from '@/components/Error'
import SignOut from '@/components/SignOut'

export default {
  props: ['title', 'admin'],
  data () {
    return {
    }
  },
  components: {
    'app-header': Header,
    'app-footer': Footer,
    'app-error': AppError,
    SignOut
  },
  computed: {
    user () {
      return this.$store.state.currentUser
    },
    dashboard () {
      return plugins.dashboard(this.$store.state.currentUser)
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      if (key.startsWith('to-')) {
        this.$router.push({name: key.substring(3)})
      }
    }
  }
}
</script>
