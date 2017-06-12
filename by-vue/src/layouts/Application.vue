<template>
  <div>
    <app-header />
    <slot />
    <el-row>
      <el-col :span="24">
        <hr class="line"/>
      </el-col>
      <el-col :md="{span: 22, offset:1}">
        <app-footer />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  data () {
    return {
    }
  },
  components: {
    'app-header': Header,
    'app-footer': Footer
  }
}
</script>
