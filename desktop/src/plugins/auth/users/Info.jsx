import React, { Component } from 'react'
import { Form, Input, message } from 'antd';
import {injectIntl, intlShape, FormattedMessage} from 'react-intl'

import Layout from '../../../layouts/Dashboard'
import {formItemLayout} from '../../../constants'
import SubmitButton from '../../../components/SubmitButton'
import {post, get} from '../../../ajax'

const FormItem = Form.Item;

class WidgetF extends Component {
  componentDidMount () {
    const {setFieldsValue} = this.props.form
    get('/users/info').then(
      function (rst){
        setFieldsValue({name: rst.name, email: rst.email})
      }
    )
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const {formatMessage} = this.props.intl
    this.props.form.validateFieldsAndScroll((err, values) => {
     if (!err) {
       post('/users/info', values)
        .then((rst) => {
          message.success(formatMessage({id: 'messages.success'}))
        }).catch(message.error)
     }
    });
  }
  render() {
    const {formatMessage} = this.props.intl
    const { getFieldDecorator } = this.props.form;
    return (
      <Layout breads={[{href: '/users/info', label: 'auth.users.info.title'}]}>
        <Form onSubmit={this.handleSubmit}>

          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="attributes.email"/>}
          >
          {getFieldDecorator('email', {
            rules: [
            ],
          })(
            <Input disabled/>
          )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="attributes.username"/>}
            hasFeedback
          >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: formatMessage({id:"errors.not-empty"})}],
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
  intl: intlShape.isRequired,
}

export default Form.create()(injectIntl(WidgetF))
