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
    get('/site/info').then(
      function (rst){
        setFieldsValue({name: rst.author.name, email: rst.author.email})
      }
    )
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        post('/admin/site/author', values).then((rst) => {
          message.success(i18n.t('success'));
        }).catch(message.error)
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
    <Layout  breadcrumb={[{label: 'site.admin.author.title', href: '/admin/site/author'}]}>
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
