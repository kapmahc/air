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
    const {validateFieldsAndScroll, setFieldsValue} = this.props.form
    validateFieldsAndScroll((err, values) => {
     if (!err) {
       post('/leave-words', Object.assign({}, values, {type: 'text'}))
        .then((rst) => {
          message.success(formatMessage({id: 'messages.success'}))
          setFieldsValue({body: ''})
        }).catch(message.error)
     }
    });
  }
  render() {
    const {formatMessage} = this.props.intl
    const { getFieldDecorator } = this.props.form;
    return (
      <Layout title="site.leave-words.new.title">
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="attributes.content"/>}
            help={<FormattedMessage id="site.leave-words.new.please-leave-contact" />}
            hasFeedback
          >
          {getFieldDecorator('body', {
            rules: [{ required: true, message: formatMessage({id:"errors.not-empty"})}],
          })(
            <Input type="textarea" rows={6} />
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
