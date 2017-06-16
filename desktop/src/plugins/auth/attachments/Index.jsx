import React, { Component } from 'react'
import { Icon, Table, Row, Col, Button, Popconfirm, Upload, message } from 'antd'
import {injectIntl, intlShape, FormattedMessage} from 'react-intl'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Layout from '../../../layouts/Dashboard'
import {get, api, _delete} from '../../../ajax'
import {TOKEN} from '../../../constants'

class WidgetF extends Component {
  state = { items: []}
  componentDidMount () {
    get('/attachments').then(
      function (rst){
        this.setState({items: rst})
      }.bind(this)
    ).catch(message.error)
  }
  handleChange = (info) => {
    const {formatMessage} = this.props.intl
    var file = info.file
    if (file.status === 'done') {
      var resp = file.response
      var {items} = this.state
      items.unshift({id: resp.uid, url: resp.url, title: file.name, length: file.size/1024, updatedAt:new Date().toString()})
      this.setState({items})
      message.success(file.name + ' ' + formatMessage({id: 'messages.success'}));
    } else if (file.status === 'error') {
      message.error(file.name + ' ' + formatMessage({id: 'messages.fail'}));
    }
  }
  handleRemove = (id) => {
    const {formatMessage} = this.props.intl
    _delete(`/attachments/${id}`)
      .then((rst)=>{
        message.success(formatMessage({id: 'messages.success'}))
        var items = this.state.items.filter((it) => it.id !== id)
        this.setState({items})
      })
      .catch(message.error)
  }
  render() {
    const {push} = this.props
    const props = {
      action: api('/upload'),
      onChange: this.handleChange,
      multiple: true,
      withCredentials: true,
      headers: {
        // https://github.com/react-component/upload/issues/33
        'X-Requested-With': null,
        'Authorization': `BEARER ${window.sessionStorage.getItem(TOKEN)}`
      },
    };
    const columns = [
      {
        title: <FormattedMessage id="attributes.updatedAt"/>,
        dataIndex: 'updatedAt',
        key: 'updatedAt',
      },
      {
        title: <FormattedMessage id="attributes.name"/>,
        key: 'name',
        render: (text, record) => (<span><a rel="noopener noreferrer" href={record.url} target='_blank'>{record.title}</a></span>),
      },
      {
        title: <FormattedMessage id="attributes.size"/>,
        dataIndex: 'length',
        key: 'length',
        render: (text) => (<span>{text}KB</span>)
      },
      {
        title: <FormattedMessage id="buttons.manage"/>,
        key: 'manage',
        render: (text, record) => (<span>
            <Button onClick={(e)=>push(`/attachments/edit/${record.id}`)} shape="circle" icon="edit" />
            <Popconfirm title={<FormattedMessage id="messages.are-you-sure"/>} onConfirm={(e) => this.handleRemove(record.id)}>
              <Button type="danger" shape="circle" icon="delete" />
            </Popconfirm>
          </span>),
      }
    ]

    return (
      <Layout breads={[{href: '/attachments', label: 'auth.attachments.index.title'}]}>
        <Row>
          <Col>
            <Upload {...props}>
              <Button>
                <Icon type="upload" /> <FormattedMessage id="buttons.upload"/>
              </Button>
            </Upload>
          </Col>
          <br/>
          <Col>
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
