import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { Form, Input, message} from 'antd'
import i18n from 'i18next'

import Layout from '../NonSignIn'
import {Submit, formItemLayout} from '../../../form'
import {post} from '../../../ajax'
import {signIn} from '../../../actions'
import {TOKEN} from '../../../constants'

const FormItem = Form.Item

class WidgetF extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {push, signIn} = this.props
        post('/users/sign-in', values).then((rst) => {
          message.success(i18n.t('success'))
          sessionStorage.setItem(TOKEN, rst.token)
          signIn(rst.token)
          push('/dashboard')
        }).catch(message.error)
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Layout href="/users/sign-in" title="auth.users.sign-in.title">
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label={i18n.t('attributes.email')}
            hasFeedback
          >
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: i18n.t('helpers.bad-email'),
              }, {
                required: true, message: i18n.t('helpers.not-empty'),
              }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={i18n.t('attributes.password')}
            hasFeedback
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: i18n.t('helpers.not-empty'),
              }],
            })(
              <Input type="password" />
            )}
          </FormItem>
          <Submit />
        </Form>
      </Layout>
    );
  }
}

WidgetF.propTypes = {
  push: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired
}

const Widget = Form.create()(WidgetF);

export default connect(
  state => ({}),
  {push, signIn},
)(Widget)
