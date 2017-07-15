import React, { Component } from 'react'
import { Table, Row, Col, Button, Popconfirm, message } from 'antd'
import {injectIntl, intlShape, FormattedMessage} from 'react-intl'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'


import Layout from '../../../../layouts/Dashboard'
import {get, _delete} from '../../../../ajax'

class WidgetF extends Component {
  state = { items: []}
  componentDidMount () {
    get('/admin/locales').then(
      function (rst){
        this.setState({items: Object.entries(rst).map((v)=>({code:v[0], message:v[1]}))})
      }.bind(this)
    ).catch(message.error)
  }
  handleRemove = (code) => {
    const {formatMessage} = this.props.intl
    _delete(`/admin/locales/${code}`)
      .then((rst)=>{
        message.success(formatMessage({id: 'messages.success'}))
        var items = this.state.items.filter((it) => it.code !== code)
        this.setState({items})
      })
      .catch(message.error)
  }
  render() {
    const {push} = this.props
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
          <Button onClick={(e)=>push(`/admin/locales/edit/${record.code}`)} shape="circle" icon="edit" />
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
            <Button onClick={(e)=>push('/admin/locales/new')} type='primary' shape="circle" icon="plus" />
            <Table bordered rowKey="code" columns={columns} dataSource={this.state.items} />
          </Col>
        </Row>
      </Layout>
    );
  }
}



WidgetF.propTypes = {
  intl: intlShape.isRequired,
  push: PropTypes.func.isRequired,
}

const Widget = injectIntl(WidgetF)

export default connect(
  state => ({}),
  {push},
)(Widget)
