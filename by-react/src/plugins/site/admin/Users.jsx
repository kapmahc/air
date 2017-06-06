import React, {Component} from 'react'
import i18n from 'i18next'
import {Row, Col, Table} from 'antd'

import Layout from '../../../layouts/Dashboard'
import {get} from '../../../ajax'

class Widget extends Component{
  state = { items: []}
  componentDidMount () {
    get('/admin/users').then(
      function (rst){
        this.setState({items: rst})
      }.bind(this)
    )
  }
  render () {
    const columns = [
      {
        title: i18n.t('auth.attributes.user.info'),
        key: 'info',
        render: (text, record) => <span>{record.name}&lt;{record.email}&gt;</span>,
      },
      {
        title: i18n.t('auth.attributes.user.currentSignIn'),
        key: 'currentSignIn',
        render: (text, record) => <span>{record.currentSignInAt} [{record.currentSignInIp}]</span>,
      },
      {
        title: i18n.t('auth.attributes.user.lastSignIn'),
        key: 'lastSignIn',
        render: (text, record) => <span>{record.lastSignInAt} [{record.lastSignInIp}]</span>,
      },
    ]

    return (
      <Layout breadcrumb={[{label: 'site.admin.users.index.title', href: '/admin/users'}]}>
        <Row>
          <Col xs={{span: 24}} sm={{offset:1, span:22}}>
            <Table bordered rowKey="id" columns={columns} dataSource={this.state.items} />
          </Col>
        </Row>
      </Layout>
    )
  }
}

export default Widget
