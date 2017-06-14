<template>
  <dashboard-layout title="site.admin.status.title" admin>
    <group :title="$t('site.admin.status.title')">
      <cell
      is-link
      :border-intent="false"
      :arrow-direction="show.os ? 'up' : 'down'"
      @click.native="show.os = !show.os">
        <span slot="title">
          {{$t('site.admin.status.os')}}
          <badge :text="item.os.length" />
        </span>
      </cell>
      <template v-if="show.os">
        <cell-box :key="i" v-for="(v, i) in item.os">
          {{v.key}}: {{v.val}}
        </cell-box>
      </template>

      <cell
        is-link
        :border-intent="false"
        :arrow-direction="show.database ? 'up' : 'down'"
        @click.native="show.database = !show.database">
        <span slot="title">
          {{$t('site.admin.status.database')}}
          <badge :text="item.database.length" />
        </span>
      </cell>
      <template v-if="show.database">
        <cell-box :key="i" v-for="(v, i) in item.database">
          {{v.key}}: {{v.val}}
        </cell-box>
      </template>

      <cell
        is-link
        :border-intent="false"
        :arrow-direction="show.network ? 'up' : 'down'"
        @click.native="show.network = !show.network">
        <span slot="title">
          {{$t('site.admin.status.network')}}
          <badge :text="item.network.length" />
        </span>
      </cell>
      <template v-if="show.network">
        <cell-box :key="i" v-for="(v, i) in item.network">
          {{v.key}}: {{v.val}}
        </cell-box>
      </template>


      <cell
        is-link
        :border-intent="false"
        :arrow-direction="show.jobs ? 'up' : 'down'"
        @click.native="show.jobs = !show.jobs">
        <span slot="title">
          {{$t('site.admin.status.jobs')}}
          <badge :text="item.jobs.length" />
        </span>
      </cell>
      <template v-if="show.jobs">
        <cell-box :key="i" v-for="(v, i) in item.jobs">
          {{v.key}}: {{v.val}}
        </cell-box>
      </template>


      <cell
        is-link
        :border-intent="false"
        :arrow-direction="show.cache ? 'up' : 'down'"
        @click.native="show.cache = !show.cache">
        <span slot="title">
          {{$t('site.admin.status.cache')}}
          <badge :text="item.cache.length" />
        </span>
      </cell>
      <template v-if="show.cache">
        <cell-box :key="i" v-for="(v, i) in item.cache">
          {{v}}
        </cell-box>
      </template>

      <cell
        is-link
        :border-intent="false"
        :arrow-direction="show.routes ? 'up' : 'down'"
      @click.native="show.routes = !show.routes">
        <span slot="title">
          {{$t('site.admin.status.routes')}}
          <badge :text="item.routes.length" />
        </span>
      </cell>
      <template v-if="show.routes">
        <cell-box :key="i" v-for="(v, i) in item.routes">
          {{v.method}} {{v.path}}
        </cell-box>
      </template>

    </group>
  </dashboard-layout>
</template>

<script>
import { Cell, CellBox, Group, Badge } from 'vux'

import {get, fail} from '@/ajax'

export default {
  components: {
    Cell,
    CellBox,
    Group,
    Badge
  },
  created () {
    get('/admin/site/status').then((rst) => {
      this.item.os = this.parse(rst.os)
      this.item.network = this.parse(rst.network)
      this.item.database = this.parse(rst.database)
      this.item.jobs = this.parse(rst.jobs)
      this.item.cache = rst.cache
      this.item.routes = rst.routes
    }).catch((err) => fail(this, err))
  },
  data () {
    return {
      show: {
        database: false,
        os: false,
        jobs: false,
        network: false,
        cache: false,
        routes: false
      },
      item: {
        database: {},
        os: {},
        jobs: {},
        network: {},
        cache: [],
        routes: []
      }
    }
  },
  methods: {
    parse (o) {
      return Object.entries(o).map((v, k) => {
        return {key: v[0], val: v[1]}
      })
    }
  }
}
</script>
