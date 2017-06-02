import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'

import { Form, Input, message} from 'antd'
import i18n from 'i18next'

import Layout from '../NonSignIn'
import {Submit, formItemLayout} from '../../../form'
import {post} from '../../../ajax'

const FormItem = Form.Item

class WidgetF extends Component {
  state = {
    confirmDirty: false
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const {push, match} = this.props
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        post('/users/reset-password', Object.assign(values, {token: match.params.token})).then((rst) => {
          message.success(i18n.t('auth.messages.email-for-confirm'));
          push('/users/sign-in')
        }).catch(message.error)
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback(i18n.t('helpers.passwordConfirmation'));
    } else {
      callback();
    }
  }
  checkPasswordConfirmation = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['passwordConfirmation'], { force: true });
    }
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
    <Layout href="/users/reset-password" title="auth.users.reset-password.title">
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label={i18n.t('attributes.password')}
          hasFeedback
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: i18n.t('helpers.not-empty'),
            }, {
              validator: this.checkPasswordConfirmation,
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={i18n.t('attributes.passwordConfirmation')}
          hasFeedback
        >
          {getFieldDecorator('passwordConfirmation', {
            rules: [{
              required: true, message: i18n.t('helpers.not-empty'),
            }, {
              validator: this.checkPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>
        <Submit />
      </Form>
    </Layout>
    );
  }
}

WidgetF.propTypes = {
  push: PropTypes.func.isRequired
}

const Widget = Form.create()(WidgetF);


// class Widget extends Component{
//   state = { password: '', passwordConfirmation: '' }
//
//   handleChange = (e, { name, value }) => this.setState({ [name]: value })
//
//   handleSubmit = e => {
//     e.preventDefault()
//     const {push, match} = this.props
//     var data = new URLSearchParams()
//     data.append('token', match.params.token)
//     data.append('password', this.state.password)
//     data.append('passwordConfirmation', this.state.passwordConfirmation)
//     post('/users/reset-password', data).then((rst) => {
//       alert(rst.message)
//       push('/users/sign-in')
//     }).catch(alert)
//   }
//   render() {
//     const {password, passwordConfirmation} = this.state;
//     return (
//       <Layout title="auth.users.reset-password.title">
//         <Form onSubmit={this.handleSubmit}>
//           <Form.Input name='password' value={password} onChange={this.handleChange} required type="password" label={<FormattedMessage id="attributes.password"/>} />
//           <Form.Input name='passwordConfirmation' value={passwordConfirmation} onChange={this.handleChange} required type="password" label={<FormattedMessage id="attributes.passwordConfirmation"/>} />
//           <Submit />
//         </Form>
//       </Layout>
//     )
//   }
// }

export default connect(
  state => ({}),
  {push},
)(Widget)
