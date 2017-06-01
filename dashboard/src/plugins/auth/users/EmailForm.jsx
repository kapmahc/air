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
    const {push, action} = this.props
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        post(`/users/${action}`, values).then((rst) => {
          message.success(i18n.t(`auth.messages.email-for-${action}`));
          push('/users/sign-in')
        }).catch(message.error)
      }
    });
  }

  render() {
    const { action } = this.props
    const { getFieldDecorator } = this.props.form;

    return (
    <Layout title={`auth.users.${action}.title`}>
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
        <Submit />
      </Form>
    </Layout>
    );
  }
}

WidgetF.propTypes = {
  push: PropTypes.func.isRequired,
  action: PropTypes.string.isRequired,
}

const Widget = Form.create()(WidgetF);

export default connect(
  state => ({}),
  {push},
)(Widget)
