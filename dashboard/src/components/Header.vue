<template>
  <el-menu theme="dark" mode="horizontal" @select="handleSelect">
    <el-menu-item index="to-site.home">{{$t("site.subTitle")}}</el-menu-item>
    <el-menu-item :index="`open-${l.href}`" :key="`open-header-${i}`" v-for="(l, i) in info.links.filter((l) => l.loc==='header')">{{$t(l.label)}}</el-menu-item>
    <LanguageBar />
    <PersonalBar />
  </el-menu>
</template>

<script>
import PersonalBar from './PersonalBar'
import LanguageBar from './LanguageBar'

export default {
  data () {
    return {
    }
  },
  components: {
    PersonalBar,
    LanguageBar
  },
  methods: {
    handleSelect (key, keyPath) {
      const to = 'to-'
      if (key.startsWith(to)) {
        this.$router.push({name: key.substring(to.length)})
        return
      }
      const open = 'open-'
      if (key.startsWith(open)) {
        window.open(key.substring(open.length), '_blank')
        return
      }
    }
  },
  computed: {
    info () {
      return this.$store.state.siteInfo
    }
  }
}
</script>
