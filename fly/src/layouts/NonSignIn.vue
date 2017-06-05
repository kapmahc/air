<template>
  <application-layout>
    <div class="row">
      <div class="offset-2 col-8">
        <h2>{{$t(title)}}</h2>
        <hr />
        <slot />
        <div class="list-group block">
          <router-link v-if="l" class="list-group-item list-group-item-action" v-for="l in links" v-bind:key="l" :to="{name: l.href}">
            <fa-icon :name="l.icon" />&nbsp;{{$t(`${l.href}.title`)}}
          </router-link>
        </div>
      </div>
    </div>
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
