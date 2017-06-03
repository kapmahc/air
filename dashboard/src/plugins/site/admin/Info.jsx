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
        setFieldsValue({
          title: rst.title,
          subTitle: rst.subTitle,
          keywords: rst.keywords,
          description: rst.description,
          copyright: rst.copyright,
        })
      }
    )
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        post('/admin/site/info', values).then((rst) => {
          message.success(i18n.t('success'));
        }).catch(message.error)
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
    <Layout  breadcrumb={[{label: 'site.admin.info.title', href: '/site/admin/info'}]}>
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label={i18n.t('site.attributes.title')}
          hasFeedback
        >
          {getFieldDecorator('title', {
            rules: [{
              required: true, message: i18n.t('helpers.not-empty'),
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={i18n.t('site.attributes.subTitle')}
          hasFeedback
        >
          {getFieldDecorator('subTitle', {
            rules: [{
              required: true, message: i18n.t('helpers.not-empty'),
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={i18n.t('site.attributes.keywords')}
          hasFeedback
        >
          {getFieldDecorator('keywords', {
            rules: [{
              required: true, message: i18n.t('helpers.not-empty'),
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={i18n.t('site.attributes.description')}
          hasFeedback
        >
          {getFieldDecorator('description', {
            rules: [{
              required: true, message: i18n.t('helpers.not-empty'),
            }],
          })(
            <Input type="textarea" rows={6}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={i18n.t('site.attributes.copyright')}
          hasFeedback
        >
          {getFieldDecorator('copyright', {
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
