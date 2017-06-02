import React, {Component} from 'react'
import { Form, Input, message} from 'antd'
import i18n from 'i18next'

import Layout from '../../../layouts/Dashboard'
import {Submit, formItemLayout} from '../../../form'
import {post} from '../../../ajax'

const FormItem = Form.Item

class WidgetF extends Component {
  state = {
    confirmDirty: false
  };
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('newPassword')) {
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
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        post('/users/change-password', values).then((rst) => {
          const {setFieldsValue} = this.props.form
          setFieldsValue({currentPassword: '', newPassword:'', passwordConfirmation:''})
          message.success(i18n.t('success'));
        }).catch(message.error)
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
    <Layout  breadcrumb={[{label: 'auth.users.info.title', href: '/users/info'}]}>
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label={i18n.t('attributes.currentPassword')}
          hasFeedback
        >
          {getFieldDecorator('currentPassword', {
            rules: [{
              required: true, message: i18n.t('helpers.not-empty'),
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={i18n.t('attributes.newPassword')}
          hasFeedback
        >
          {getFieldDecorator('newPassword', {
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

const Widget = Form.create()(WidgetF);

export default Widget
