import React, { Component } from 'react';
import { Form, Input, message } from 'antd';
import {injectIntl, intlShape, FormattedMessage} from 'react-intl'

import Layout from '../../../layouts/Dashboard'
import {formItemLayout} from '../../../constants'
import SubmitButton from '../../../components/SubmitButton'
import {post} from '../../../ajax'

const FormItem = Form.Item;

class WidgetF extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const {formatMessage} = this.props.intl
    const {setFieldsValue, validateFieldsAndScroll} = this.props.form
    validateFieldsAndScroll((err, values) => {
     if (!err) {
       post('/users/change-password', values)
        .then((rst) => {
          message.success(formatMessage({id: 'messages.success'}))
          setFieldsValue({currentPassword: '', newPassword: '', passwordConfirmation: ''})
        }).catch(message.error)
     }
    });
  }
  checkPasswords = (rule, value, callback) => {
    const {formatMessage} = this.props.intl
    const form = this.props.form;
    if (value && value !== form.getFieldValue('newPassword')) {
      callback(formatMessage({id: "errors.passwordConfirmation"}));
    } else {
      callback();
    }
  }
  render() {
    const {formatMessage} = this.props.intl
    const { getFieldDecorator } = this.props.form;
    return (
      <Layout breads={[{href: '/users/change-password', label: 'auth.users.change-password.title'}]}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="attributes.currentPassword"/>}
            hasFeedback
          >
          {getFieldDecorator('currentPassword', {
            rules: [
              { required: true, message: formatMessage({id:"errors.not-empty"})},
            ],
          })(
            <Input type="password" />
          )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="attributes.newPassword"/>}
            hasFeedback
          >
          {getFieldDecorator('newPassword', {
            rules: [
              { required: true, min: 6, max: 32, message: formatMessage({id:"errors.password"})},
            ],
          })(
            <Input type="password" />
          )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="attributes.passwordConfirmation"/>}
            hasFeedback
          >
          {getFieldDecorator('passwordConfirmation', {
            rules: [
              { required: true, message: formatMessage({id:"errors.not-empty"})},
              {validator: this.checkPasswords},
            ],
          })(
            <Input type="password" />
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
}

export default Form.create()(injectIntl(WidgetF))
