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
    get('/mall/tags').then(
      function (rst){
        this.setState({items: rst})
      }.bind(this)
    ).catch(message.error)
  }
  handleRemove = (id) => {
    const {formatMessage} = this.props.intl
    _delete(`/mall/tags/${id}`)
      .then((rst)=>{
        message.success(formatMessage({id: 'messages.success'}))
        var items = this.state.items.filter((it) => it.id !== id)
        this.setState({items})
      })
      .catch(message.error)
  }
  render() {
    const {push} = this.props
    const columns = [
      {
        title: <FormattedMessage id="attributes.updatedAt"/>,
        dataIndex: 'updatedAt',
        key: 'updatedAt',
      },
      {
        title: <FormattedMessage id="attributes.content"/>,
        key: 'content',
        render: (text, record) => (<div>
          {record.name}
          <br/> {record.type}
          <br/> {record.description}
        </div>)
      },
      {
        title: <FormattedMessage id="buttons.manage"/>,
        key: 'manage',
        render: (text, record) =>(<span>
          <Button onClick={(e)=>push(`/mall/self/tags/edit/${record.id}`)} shape="circle" icon="edit" />
          <Popconfirm title={<FormattedMessage id="messages.are-you-sure"/>} onConfirm={(e) => this.handleRemove(record.id)}>
            <Button type="danger" shape="circle" icon="delete" />
          </Popconfirm>
        </span>)
      },
    ]

    return (
      <Layout breads={[{href: '/mall/self/tags', label: 'mall.self.tags.index.title'}]}>
        <Row>
          <Col>
            <Button onClick={(e)=>push('/mall/self/tags/new')} type='primary' shape="circle" icon="plus" />
            <Table bordered rowKey="id" columns={columns} dataSource={this.state.items} />
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
