<template>
  <dashboard-layout title="auth.attachments.index.title">
    <el-col :md="{span: 22, offset: 1}">
      <el-upload :file-list="fileList"
        :on-preview="handlePreview"
        :on-success="handleSuccess"
        :headers="headers"
        multiple
        :action="action">
        <el-button size="small" type="primary">
          {{$t("buttons.upload")}}
          <i class="el-icon-upload el-icon--right"/>
        </el-button>
        <div slot="tip"></div>
      </el-upload>
      <br/>
      <el-table :data="items" border stripe style="width: 100%">
        <el-table-column  :label="$t('attributes.name')">
          <template scope="scope">
            <a target="_blank" :href="scope.row.url">{{scope.row.title}}</a>
          </template>
        </el-table-column>
        <el-table-column width="100" :label="$t('attributes.size')">
          <template scope="scope">
            <span>{{ scope.row.length }}KB</span>
          </template>
        </el-table-column>
        <el-table-column width="240" :label="$t('buttons.manage')">
          <template scope="scope">
            <el-button-group>
              <el-button @click="handleCopy(scope.row.url)" type="info" size="mini" icon="share" />
              <el-button @click="handleRemove(scope.row.id)" type="danger" size="mini" icon="delete" />
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </dashboard-layout>
</template>

<script>
import {get, _delete, api} from '@/ajax'
import {TOKEN} from '@/constants'

export default {
  created () {
    get('/attachments').then((rst) => { this.items = rst }).catch(this.$message.error)
  },
  data () {
    return {
      items: [],
      fileList: [],
      headers: {
        // https://github.com/react-component/upload/issues/33
        'X-Requested-With': null,
        'Authorization': `BEARER ${window.sessionStorage.getItem(TOKEN)}`
      }
    }
  },
  computed: {
    action () {
      return api('/upload')
    }
  },
  methods: {
    handlePreview (info) {
      window.open(info.response.url, '_blank')
    },
    handleSuccess (response, file, fileList) {
      this.items.unshift({id: response.uid, title: response.url, url: response.url})
    },
    handleCopy (url) {
      this.$alert(url, 'URL', {
        confirmButtonText: this.$t('buttons.ok'),
        callback: action => {}
      })
    },
    handleRemove (id) {
      this.$confirm(
        this.$t('are-you-sure'),
        '',
        {
          confirmButtonText: this.$t('buttons.ok'),
          cancelButtonText: this.$t('buttons.cancel'),
          type: 'warning'
        }
      )
      .then(() => {
        _delete(`/attachments/${id}`).then(function (rst) {
          this.$message.success('success')
          this.items = this.items.filter((a) => a.id !== id)
        }.bind(this)).catch(this.$message.error)
      })
      .catch(() => {})
    }
  }
}
</script>
