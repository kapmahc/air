import React, { Component } from 'react'
import { Table, Row, Col, message } from 'antd'
import {FormattedMessage} from 'react-intl'

import Layout from '../../../../layouts/Dashboard'
import {get} from '../../../../ajax'

class Widget extends Component {
  state = { items: []}
  componentDidMount () {
    get('/admin/users').then(
      function (rst){
        this.setState({items: rst})
      }.bind(this)
    ).catch(message.error)
  }
  render() {
    const columns = [
      {
        title: <FormattedMessage id="site.admin.users.index.who"/>,
        key: 'who',
        render: (text, record) =>(<span>{record.name}&lt;{record.email}&gt;[{record.signInCount}]</span>)
      },
      {
        title: <FormattedMessage id="site.admin.users.index.lastSignIn"/>,
        key: 'lastSignIn',
        render: (text, record) =>(<span>{record.lastSignInAt}[{record.lastSignInIp}]</span>)
      },
      {
        title: <FormattedMessage id="site.admin.users.index.currentSignIn"/>,
        key: 'currentSignIn',
        render: (text, record) =>(<span>{record.currentSignInAt}[{record.currentSignInIp}]</span>)
      },
    ]

    return (
      <Layout admin breads={[{href: '/admin/users', label: 'site.admin.users.index.title'}]}>
        <Row>
          <Col>
            <Table bordered rowKey="id" columns={columns} dataSource={this.state.items} />
          </Col>
        </Row>
      </Layout>
    );
  }
}

export default Widget
