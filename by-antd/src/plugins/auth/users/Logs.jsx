import React, { Component } from 'react'
import { Table, Row, Col, message } from 'antd'
import {FormattedMessage} from 'react-intl'

import Layout from '../../../layouts/Dashboard'
import {get} from '../../../ajax'

class Widget extends Component {
  state = { items: []}
  componentDidMount () {
    get('/users/logs').then(
      function (rst){
        this.setState({items: rst})
      }.bind(this)
    ).catch(message.error)
  }
  render() {
    const columns = [
      {
        title: <FormattedMessage id="attributes.createdAt"/>,
        dataIndex: 'createdAt',
        key: 'createdAt',
      },
      {
        title: 'IP',
        dataIndex: 'ip',
        key: 'ip',
      },
      {
        title: <FormattedMessage id="attributes.content"/>,
        dataIndex: 'message',
        key: 'message',
      }
    ]

    return (
      <Layout breads={[{href: '/users/logs', label: 'auth.users.logs.title'}]}>
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
