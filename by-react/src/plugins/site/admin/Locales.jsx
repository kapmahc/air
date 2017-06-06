import React, {Component} from 'react'
import i18n from 'i18next'
import {Row, Col, Table, Button, Modal, message} from 'antd'

import Layout from '../../../layouts/Dashboard'
import {get, _delete, post} from '../../../ajax'

const confirm = Modal.confirm

class Widget extends Component{
  state = { items: []}
  componentDidMount () {
    get('/admin/locales').then(
      function (rst){
        this.setState({
          items: Object.entries(rst).map(
            (v)=>{return {code:v[0], message:v[1]} }
          )},
        )
      }.bind(this)
    )
  }
  onDelete(code){
    confirm({
      title: i18n.t('are-you-sure'),
      onOk: function() {
        _delete(`/admin/locales/${code}`).then(function(rst){
          const items = [...this.state.items]
          this.setState({ items: items.filter((o)=>o.code !== code) });
        }.bind(this)).catch(message.error)        
      }.bind(this)
    });
  }
  onEdit(code){

  }
  render () {
    const columns = [
      {
        title: i18n.t('site.attributes.locale.code'),
        dataIndex: 'code',
        key: 'code',
      },
      {
        title: i18n.t('site.attributes.locale.message'),
        dataIndex: 'message',
        key: 'message',
      },
      {
        title: i18n.t('buttons.manage'),
        key: 'manage',
         render: (text, record) => (<span>
           <Button onClick={()=>this.onEdit(record.code)} size="small" shape="circle" icon="edit" />
           <Button onClick={()=>this.onDelete(record.code)} size="small" shape="circle" icon="delete" type="danger" />
         </span>)
      },
    ]

    return (
      <Layout breadcrumb={[{label: 'site.admin.locales.index.title', href: '/admin/locales'}]}>
        <Row>
          <Col xs={{span: 24}} sm={{offset:1, span:22}}>
            <Button style={{ marginBottom: '8px'}}>{i18n.t('buttons.new')}</Button>
            <Table bordered rowKey="code" columns={columns} dataSource={this.state.items} />
          </Col>
        </Row>
      </Layout>
    )
  }
}

export default Widget
