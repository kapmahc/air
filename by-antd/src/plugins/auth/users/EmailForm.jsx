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
    const {action} = this.props
    const {formatMessage} = this.props.intl
    const {push} = this.props
    this.props.form.validateFieldsAndScroll((err, values) => {
     if (!err) {
       post(`/users/${action}`, values)
        .then((rst) => {
          message.success(formatMessage({id: `auth.users.${action}.success`}))
          push('/users/sign-in')
        }).catch(message.error)
     }
    });
  }
  render() {
    const {action} = this.props
    const {formatMessage} = this.props.intl
    const { getFieldDecorator } = this.props.form;
    return (
      <Layout href={`/users/${action}`} title={`auth.users.${action}.title`}>
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

          <SubmitButton />
        </Form>
      </Layout>
    );
  }
}

WidgetF.propTypes = {
  action: PropTypes.string.isRequired,
  intl: intlShape.isRequired,
  push: PropTypes.func.isRequired,
}

const Widget = Form.create()(injectIntl(WidgetF))

export default connect(
  state => ({}),
  {push},
)(Widget)
