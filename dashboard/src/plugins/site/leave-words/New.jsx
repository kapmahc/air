import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { Form, Input, message} from 'antd'
import i18n from 'i18next'

import Layout from '../../auth/NonSignIn'
import {Submit, formItemLayout} from '../../../form'
import {post} from '../../../ajax'

const FormItem = Form.Item

class WidgetF extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const {setFieldsValue, validateFields} = this.props.form
    validateFields((err, values) => {
      if (!err) {
        post('/leave-words', Object.assign(values, {type: 'text'})).then((rst) => {
          message.success(i18n.t('success'))
          setFieldsValue({body: ''})
        }).catch(message.error)
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Layout title="site.leave-words.new.title">
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label={i18n.t('attributes.content')}
            extra={i18n.t('site.helpers.leave-word.body')}
            hasFeedback
          >
            {getFieldDecorator('body', {
              rules: [{
                required: true, message: i18n.t('helpers.not-empty'),
              }],
            })(
              <Input type="textarea" rows={6} />
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

export default connect(
  state => ({}),
  {push},
)(Widget)
