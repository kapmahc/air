import React, {Component} from 'react'
import { Form, Input, message} from 'antd'
import i18n from 'i18next'

import Layout from '../../../layouts/Dashboard'
import {Submit, formItemLayout} from '../../../form'
import {post, get} from '../../../ajax'

const FormItem = Form.Item

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
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        post('/users/info', values).then((rst) => {
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
          label={i18n.t('attributes.email')}
        >
          {getFieldDecorator('email', {
            rules: [],
          })(
            <Input readOnly disabled/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={i18n.t('attributes.fullName')}
          hasFeedback
        >
          {getFieldDecorator('name', {
            rules: [{
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

const Widget = Form.create()(WidgetF);

export default Widget
