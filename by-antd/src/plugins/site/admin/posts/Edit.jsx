import React, { Component } from 'react'
import { Form, Input, message } from 'antd';
import {injectIntl, intlShape, FormattedMessage} from 'react-intl'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Layout from '../../../../layouts/Dashboard'
import {formItemLayout} from '../../../../constants'
import SubmitButton from '../../../../components/SubmitButton'
import {post, get} from '../../../../ajax'

const FormItem = Form.Item;

class WidgetF extends Component {
  componentDidMount () {
    const {setFieldsValue} = this.props.form
    const {id} = this.props.match.params
    if (id) {
      get(`/posts/${id}`).then((rst)=>setFieldsValue({name: rst.name, title: rst.title, body: rst.body})).catch(message.error)
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const {formatMessage} = this.props.intl
    const {push, match} = this.props
    const {id} = match.params

    this.props.form.validateFieldsAndScroll((err, values) => {
     if (!err) {
       post(id ? `/posts/${id}` : '/posts', Object.assign({}, values, {type: 'markdown'}))
        .then((rst) => {
          message.success(formatMessage({id: 'messages.success'}))
          push('/admin/posts')
        }).catch(message.error)
     }
    });
  }
  render() {
    const {formatMessage} = this.props.intl
    const { getFieldDecorator } = this.props.form;
    const {id} = this.props.match.params
    return (
      <Layout breads={[
          {href: '/admin/posts', label: 'site.admin.posts.index.title'},
          {href: id ? `/admin/posts/edit/${id}` : '/admin/posts/new', label: id ? 'buttons.edit': 'buttons.new'},
        ]}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="attributes.name"/>}
            hasFeedback
          >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: formatMessage({id:"errors.not-empty"})}],
          })(
            <Input />
          )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="attributes.title"/>}
            hasFeedback
          >
          {getFieldDecorator('title', {
            rules: [{ required: true, message: formatMessage({id:"errors.not-empty"})}],
          })(
            <Input />
          )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="attributes.body"/>}
            hasFeedback
          >
          {getFieldDecorator('body', {
            rules: [{ required: true, message: formatMessage({id:"errors.not-empty"})}],
          })(
            <Input type='textarea' rows={10}/>
          )}
          </FormItem>

          <SubmitButton />
        </Form>
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
