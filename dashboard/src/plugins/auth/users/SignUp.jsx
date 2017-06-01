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
    const {push} = this.props
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        var data = new URLSearchParams()
        data.append('name',values.name)
        data.append('email',values.email)
        data.append('password',values.password)
        data.append('passwordConfirmation', values.passwordConfirmation)
        post('/users/sign-up', data).then((rst) => {
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
    <Layout title="auth.users.sign-up.title">
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label={i18n.t('attributes.fullName')}
          hasFeedback
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: i18n.t('helpers.not-empty') }],
          })(
            <Input />
          )}
        </FormItem>
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

// class Widget extends Component{
//   state = { name: '', email: '', password: '', passwordConfirmation: '' }
//
//   handleChange = (e, { name, value }) => this.setState({ [name]: value })
//
//   handleSubmit = e => {
//     e.preventDefault()

//   }
//   render() {
//     const {name, email, password, passwordConfirmation} = this.state;
//     return (
//       <Layout title="auth.users.sign-up.title">
//         <Form onSubmit={this.handleSubmit}>
//           <Form.Input name='name' value={name} onChange={this.handleChange} required label={<FormattedMessage id="attributes.fullName"/>} />
//           <Form.Input name='email' value={email} onChange={this.handleChange} required type="email" label={<FormattedMessage id="attributes.email"/>} />
//           <Form.Input name='password' value={password} onChange={this.handleChange} required type="password" label={<FormattedMessage id="attributes.password"/>} />
//           <Form.Input name='passwordConfirmation' value={passwordConfirmation} onChange={this.handleChange} required type="password" label={<FormattedMessage id="attributes.passwordConfirmation"/>} />
//           <Submit />
//         </Form>
//       </Layout>
//     )
//   }
// }


WidgetF.propTypes = {
  push: PropTypes.func.isRequired
}

const Widget = Form.create()(WidgetF);


export default connect(
  state => ({}),
  {push},
)(Widget)
