import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Form, Input, message } from 'antd';
import {injectIntl, intlShape, FormattedMessage} from 'react-intl'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Layout from '../../../layouts/NonSignIn'
import {formItemLayout, TOKEN} from '../../../constants'
import SubmitButton from '../../../components/SubmitButton'
import {post} from '../../../ajax'
import {signIn} from '../../../actions'

const FormItem = Form.Item;

class WidgetF extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const {formatMessage} = this.props.intl
    const {push, signIn} = this.props
    this.props.form.validateFieldsAndScroll((err, values) => {
     if (!err) {
       post('/users/sign-in', values)
        .then((rst) => {
          signIn(rst.token)
          sessionStorage.setItem(TOKEN, rst.token)
          push('/dashboard')
          message.success(formatMessage({id: 'messages.success'}))
        }).catch(message.error)
     }
    });
  }
  render() {
    const {formatMessage} = this.props.intl
    const { getFieldDecorator } = this.props.form;
    return (
      <Layout href="/users/sign-in" title="auth.users.sign-in.title">
        <Form onSubmit={this.handleSubmit}>

          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="attributes.email"/>}
            hasFeedback
          >
          {getFieldDecorator('email', {
            rules: [
              { required: true, message: formatMessage({id:"errors.not-empty"})},
              { type: 'email', message: formatMessage({id:"errors.not-valid-email"})},
            ],
          })(
            <Input />
          )}
          </FormItem>

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

          <SubmitButton />
        </Form>
      </Layout>
    );
  }
}

WidgetF.propTypes = {
  intl: intlShape.isRequired,
  push: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
}

const Widget = Form.create()(injectIntl(WidgetF))

export default connect(
  state => ({}),
  {push, signIn},
)(Widget)
