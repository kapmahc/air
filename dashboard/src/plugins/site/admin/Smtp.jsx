import React, {Component} from 'react'
import { Form, Input, message, Select, Switch} from 'antd'
import i18n from 'i18next'

import Layout from '../../../layouts/Dashboard'
import {Submit, formItemLayout} from '../../../form'
import {post, get} from '../../../ajax'

const FormItem = Form.Item
const Option = Select.Option

class WidgetF extends Component {
  state = {
    confirmDirty: false,
    ports: [],
  };
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback(i18n.t('helpers.passwordConfirmation'));
    } else {
      callback();
    }
  }
  checkPasswordConfirmation = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['passwordConfirmation'], { force: true });
    }
    callback();
  }
  componentDidMount () {
    const {setFieldsValue} = this.props.form
    get('/admin/site/smtp').then(
      function (rst){
        setFieldsValue({
          username: rst.smtp.username,
          host: rst.smtp.host,
          port: rst.smtp.port.toString(),
          ssl: rst.smtp.ssl,
        })
        this.setState({ports: rst.ports})
      }.bind(this)
    )
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        var data = Object.assign(values, {port: parseInt(values.port, 10)})
        post('/admin/site/smtp', data).then((rst) => {
          message.success(i18n.t('success'));
        }).catch(message.error)
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
    <Layout  breadcrumb={[{label: 'site.admin.smtp.title', href: '/admin/site/smtp'}]}>
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label={i18n.t('attributes.host')}
          hasFeedback
        >
          {getFieldDecorator('host', {
            rules: [{
              required: true, message: i18n.t('helpers.not-empty'),
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={i18n.t('attributes.port')}
          hasFeedback
        >
          {getFieldDecorator('port', {
            rules: [{
              required: true, message: i18n.t('helpers.not-empty'),
            }],
          })(
            <Select>
              {this.state.ports.map((p)=><Option key={p} value={p.toString()}>{p}</Option>)}
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={i18n.t('attributes.ssl')}
        >
          {getFieldDecorator('ssl', { valuePropName: 'checked' })(
            <Switch />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={i18n.t('site.admin.smtp.sender')}
          hasFeedback
        >
          {getFieldDecorator('username', {
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
          label={i18n.t('attributes.password')}
          hasFeedback
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: i18n.t('helpers.not-empty'),
            }, {
              validator: this.checkPasswordConfirmation,
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={i18n.t('attributes.passwordConfirmation')}
          hasFeedback
        >
          {getFieldDecorator('passwordConfirmation', {
            rules: [{
              required: true, message: i18n.t('helpers.not-empty'),
            }, {
              validator: this.checkPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
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
