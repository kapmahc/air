<template>
  <footer>
    <p class="float-right">
      {{$t('footer.other-languages')}}:
      <button class="btn btn-sm btn-link" v-bind:key="l" v-on:click="setLocale(l)" v-for="l in languages">
        {{$t(`languages.${l}`)}}
      </button>
    </p>
    <p>
      &copy; {{ $t("site.copyright") }}
      &middot; <a href="#">Privacy</a>
      &middot; <a href="#">Terms</a>
    </p>
  </footer>
</template>

<script>
import {LANGUAGES, load as setLocale} from '@/i18n'

export default {
  data () {
    return {
      languages: LANGUAGES
    }
  },
  methods: {
    setLocale
  }
}
</script>
