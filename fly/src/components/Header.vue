<template><b-navbar toggleable toggle-breakpoint="md" type="inverse" variant="inverse" fixed="top">
    <b-nav-toggle target="navbarCollapse"></b-nav-toggle>
    <b-link class="navbar-brand" :to="{name: 'site.home'}">
      {{$t('site.subTitle')}}
    </b-link>
    <b-collapse is-nav id="navbarCollapse">
      <b-nav is-nav-bar>
        <b-nav-item>Support</b-nav-item>
        <b-nav-item>Docs</b-nav-item>
        <b-nav-item>Contact Us</b-nav-item>
      </b-nav>
      <b-nav is-nav-bar class="ml-auto">
        <LanguageBar />
        <PersonalBar />
      </b-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import PersonalBar from './PersonalBar'
import LanguageBar from './LanguageBar'
import SearchForm from './SearchForm'

export default {
  data () {
    return {
    }
  },
  components: {
    PersonalBar,
    LanguageBar,
    SearchForm
  }
}
</script>
