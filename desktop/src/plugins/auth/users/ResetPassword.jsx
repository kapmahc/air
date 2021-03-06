import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Form, Input, message } from 'antd';
import {injectIntl, intlShape, FormattedMessage} from 'react-intl'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Layout from '../../../layouts/NonSignIn'
import {formItemLayout} from '../../../constants'
import SubmitButton from '../../../components/SubmitButton'
import {post} from '../../../ajax'

const FormItem = Form.Item;

class WidgetF extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const {formatMessage} = this.props.intl
    const {push, match} = this.props
    this.props.form.validateFieldsAndScroll((err, values) => {
     if (!err) {
       post('/users/reset-password', Object.assign({}, values, {token: match.params.token}))
        .then((rst) => {
          message.success(formatMessage({id: 'auth.users.reset-password.success'}))
          push('/users/sign-in')
        }).catch(message.error)
     }
    });
  }
  checkPasswords = (rule, value, callback) => {
    const {formatMessage} = this.props.intl
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback(formatMessage({id: "errors.passwordConfirmation"}));
    } else {
      callback();
    }
  }
  render() {
    const {formatMessage} = this.props.intl
    const { getFieldDecorator } = this.props.form;
    return (
      <Layout href="/users/reset-password" title="auth.users.reset-password.title">
        <Form onSubmit={this.handleSubmit}>

          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="attributes.password"/>}
            hasFeedback
          >
          {getFieldDecorator('password', {
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
  push: PropTypes.func.isRequired,
}

const Widget = Form.create()(injectIntl(WidgetF))

export default connect(
  state => ({}),
  {push},
)(Widget)
