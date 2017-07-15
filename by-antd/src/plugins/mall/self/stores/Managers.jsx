import React, { Component } from 'react'
import { Table, Row, Col, Button, Popconfirm, Form, Input, Icon, message } from 'antd'
import {injectIntl, intlShape, FormattedMessage} from 'react-intl'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'


import Layout from '../../../../layouts/Dashboard'
import {get, post} from '../../../../ajax'

const FormItem = Form.Item;


class WidgetF extends Component {
  state = { items: []}
  componentDidMount () {
    const {id} = this.props.match.params
    get(`/mall/stores/managers/${id}`).then(
      function (rst){
        this.setState({items: rst})
      }.bind(this)
    ).catch(message.error)
  }
  handleRemove = (email) => {
    const {formatMessage} = this.props.intl
    const {id} = this.props.match.params
    post(`/mall/stores/managers/${id}`, {email, allow:false})
      .then((rst)=>{
        message.success(formatMessage({id: 'messages.success'}))
        var items = this.state.items.filter((it) => it.email !== email)
        this.setState({items})
      })
      .catch(message.error)
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const {formatMessage} = this.props.intl
    const {id} = this.props.match.params
    this.props.form.validateFieldsAndScroll((err, values) => {
     if (!err) {
       post(`/mall/stores/managers/${id}`, Object.assign({}, values, {allow: true}))
        .then(function(rst) {
          var items = this.state.items.filter((it) => it.email !== rst.email)
          items.unshift(rst)
          this.setState({items})
          message.success(formatMessage({id: 'messages.success'}))
        }.bind(this)).catch(message.error)
     }
    });
  }
  render() {
    const { getFieldDecorator} = this.props.form;
    const {formatMessage} = this.props.intl
    const {id} = this.props.match.params

    const columns = [
      {
        title: <FormattedMessage id="attributes.user"/>,
        key: 'user',
        render: (text, record) => (<div>
          {record.name}&lt;{record.email}&gt;
        </div>)
      },
      {
        title: <FormattedMessage id="buttons.manage"/>,
        key: 'manage',
        render: (text, record) =>(<span>
          <Popconfirm title={<FormattedMessage id="messages.are-you-sure"/>} onConfirm={(e) => this.handleRemove(record.email)}>
            <Button type="danger" shape="circle" icon="delete" />
          </Popconfirm>
        </span>)
      },
    ]

    return (
      <Layout breads={[{href: '/mall/self/stores', label: 'mall.self.stores.index.title'}, {href: `/mall/self/stores/managers/${id}`, label: 'mall.self.stores.managers.title'}]}>
        <Row>
          <Col>
            <Form layout="inline" onSubmit={this.handleSubmit}>
              <FormItem
                hasFeedback
              >
                {getFieldDecorator('email', {
                  rules: [
                    { required: true, message: formatMessage({id: "errors.not-empty"})},
                    { type: 'email', message: formatMessage({id:"errors.not-valid-email"})},
                  ],
                })(
                  <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder={formatMessage({id: "attributes.email"})} />
                )}
              </FormItem>

              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                >
                  <FormattedMessage id="buttons.add"/>
                </Button>
              </FormItem>
            </Form>
            <br/>
          </Col>
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

const Widget = Form.create()(injectIntl(WidgetF))

export default connect(
  state => ({}),
  {push},
)(Widget)
