<template>
  <application-layout>
    <el-col :md="{span: 12, offset:6}">
      <h2>{{$t(title)}}</h2>
      <slot />
      <ul style="list-style-type: none;">
        <li v-for="l in links" key="l" style="padding: 3px;">
          <router-link :to="{name: l.href}">
            <fa-icon :name="l.icon" />&nbsp;{{$t(`${l.href}.title`)}}
          </router-link>
        </li>
      </ul>
    </el-col>
  </application-layout>
</template>

<script>
import {nonSignInLinks as links} from '@/constants'

export default {
  props: ['title'],
  data () {
    return {
      links
    }
  }
}
</script>
