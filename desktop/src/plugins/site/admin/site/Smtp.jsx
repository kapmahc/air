import React, { Component } from 'react'
import { Form, Input, Switch, Select, message } from 'antd';
import {injectIntl, intlShape, FormattedMessage} from 'react-intl'

import Layout from '../../../../layouts/Dashboard'
import {formItemLayout} from '../../../../constants'
import SubmitButton from '../../../../components/SubmitButton'
import {post, get} from '../../../../ajax'

const FormItem = Form.Item;
const Option = Select.Option;

class WidgetF extends Component {
  state = { ports: []}
  componentDidMount () {
    const {setFieldsValue} = this.props.form
    get('/admin/site/smtp').then(
      function (rst){
        setFieldsValue({
          host: rst.smtp.host,
          port: rst.smtp.port.toString(),
          ssl: rst.smtp.ssl,
          username: rst.smtp.username,
        })
        this.setState({ports: rst.ports})
      }.bind(this)).catch(message.error)
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const {formatMessage} = this.props.intl
    this.props.form.validateFieldsAndScroll((err, values) => {
     if (!err) {
       post('/admin/site/smtp', Object.assign({}, values, {port: parseInt(values.port, 10)}))
        .then((rst) => {
          message.success(formatMessage({id: 'messages.success'}))
        }).catch(message.error)
     }
    });
  }
  checkPasswords = (rule, value, callback) => {
    const {formatMessage} = this.props.intl
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback(formatMessage({id: "errors.passwordConfirmation"}));
    } else {
      callback();
    }
  }
  render() {
    const {formatMessage} = this.props.intl
    const { getFieldDecorator } = this.props.form;
    return (
      <Layout admin breads={[{href: '/admin/site/smtp', label: 'site.admin.smtp.title'}]}>
        <Form onSubmit={this.handleSubmit}>

          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="attributes.host"/>}
            hasFeedback
          >
          {getFieldDecorator('host', {
            rules: [{ required: true, message: formatMessage({id:"errors.not-empty"})}],
          })(
            <Input />
          )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="attributes.port"/>}
          >
          {getFieldDecorator('port', {
            rules:[],
          })(
            <Select style={{ width: 120 }}>
              {this.state.ports.map((p, i)=><Option key={i} value={p.toString()}>{p}</Option>)}
            </Select>
          )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="attributes.ssl"/>}
          >
          {getFieldDecorator('ssl', {
            valuePropName: 'checked',
          })(
            <Switch />
          )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="site.admin.smtp.sender"/>}
            hasFeedback
          >
          {getFieldDecorator('username', {
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

          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="attributes.passwordConfirmation"/>}
            hasFeedback
          >
          {getFieldDecorator('passwordConfirmation', {
            rules: [
              { required: true, message: formatMessage({id:"errors.not-empty"})},
              {validator: this.checkPasswords},
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
}

export default Form.create()(injectIntl(WidgetF))
