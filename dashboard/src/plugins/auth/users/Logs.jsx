import React, {Component} from 'react'
import i18n from 'i18next'
import {Row, Col, Table} from 'antd'
// import TimeAgo from 'timeago-react'

import Layout from '../../../layouts/Dashboard'
import {get} from '../../../ajax'

class Widget extends Component{
  state = { items: []}
  componentDidMount () {
    get('/users/logs').then(
      function (rst){
        this.setState({items: rst})
      }.bind(this)
    )
  }
  render () {
    const columns = [
      {
        title: i18n.t('attributes.createdAt'),
        dataIndex: 'createdAt',
        key: 'createdAt',
        // render: (text, record) => <TimeAgo datetime={record.createdAt} />,
      },
      {
        title: 'IP',
        dataIndex: 'ip',
        key: 'ip',
      },
      {
        title: i18n.t('auth.attributes.log.message'),
        dataIndex: 'message',
        key: 'message',
      }
    ]

    return (
      <Layout breadcrumb={[{label: 'auth.users.logs.title', href: '/users/logs'}]}>
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
