<template>
  <application-layout>
    <el-row>
      <el-col :md="{span: 12, offset:6}">
        <h2>{{$t(title)}}</h2>
        <slot />
        <ul class="list-group">
          <li v-for="l in links" key="l">
            <fa-icon :name="l.icon" />
            <router-link :to="{name: l.href}">
              {{$t(`${l.href}.title`)}}
            </router-link>
          </li>
        </ul>
      </el-col>
    </el-row>
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
