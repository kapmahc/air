import React, { Component } from 'react'
import { Table, Row, Col, Button, Popconfirm, message } from 'antd'
import {FormattedMessage} from 'react-intl'
import { push } from 'react-router-redux'


import Layout from '../../../../layouts/Dashboard'
import {get} from '../../../../ajax'

class Widget extends Component {
  state = { items: []}
  componentDidMount () {
    get('/admin/locales').then(
      function (rst){
        this.setState({items: Object.entries(rst).map((v)=>({code:v[0], message:v[1]}))})
      }.bind(this)
    ).catch(message.error)
  }
  render() {
    const columns = [
      {
        title: <FormattedMessage id="site.attributes.locale.code"/>,
        dataIndex: 'code',
        key: 'code',
      },
      {
        title: <FormattedMessage id="site.attributes.locale.message"/>,
        dataIndex: 'message',
        key: 'message',
      },
      {
        title: <FormattedMessage id="buttons.manage"/>,
      key: 'manage',
        render: (text, record) =>(<span>
          <Button onClick={(e)=>push(`/locales/edit/${record.code}`)} shape="circle" icon="edit" />
          <Popconfirm title={<FormattedMessage id="messages.are-you-sure"/>} onConfirm={(e) => this.handleRemove(record.code)}>
            <Button type="danger" shape="circle" icon="delete" />
          </Popconfirm>
        </span>)
      },
    ]

    return (
      <Layout admin breads={[{href: '/admin/locales', label: 'site.admin.locales.index.title'}]}>
        <Row>
          <Col>
            <Table bordered rowKey="code" columns={columns} dataSource={this.state.items} />
          </Col>
        </Row>
      </Layout>
    );
  }
}

export default Widget
