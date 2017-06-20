import React, { Component } from 'react'
import { Form, Input, message } from 'antd';
import {injectIntl, intlShape, FormattedMessage} from 'react-intl'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Layout from '../../../../layouts/Dashboard'
import {formItemLayout} from '../../../../constants'
import SubmitButton from '../../../../components/SubmitButton'
import {post, get} from '../../../../ajax'

const FormItem = Form.Item;

class WidgetF extends Component {
  componentDidMount () {
    const {setFieldsValue} = this.props.form
    const {id} = this.props.match.params
    if (id) {
      get(`/mall/addresses/${id}`).then((rst)=>setFieldsValue({
        username: rst.username,
        phone: rst.phone,
        street: rst.street,
        state: rst.state,
        country:rst.country,
        city: rst.city,
        zip: rst.zip,
      })).catch(message.error)
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const {formatMessage} = this.props.intl
    const {push, match} = this.props
    const {id} = match.params

    this.props.form.validateFieldsAndScroll((err, values) => {
     if (!err) {
       post(id ? `/mall/addresses/${id}` : '/mall/addresses', values)
        .then((rst) => {
          message.success(formatMessage({id: 'messages.success'}))
          push('/mall/self/addresses')
        }).catch(message.error)
     }
    });
  }
  render() {
    const {formatMessage} = this.props.intl
    const { getFieldDecorator } = this.props.form;
    const {id} = this.props.match.params
    return (
      <Layout breads={[
          {href: '/mall/self/addresses', label: 'mall.self.addresses.index.title'},
          {href: id ? `/mall/self/addresses/edit/${id}` : '/mall/self/addresses/new', label: id ? 'buttons.edit': 'buttons.new'},
        ]}>
        <Form onSubmit={this.handleSubmit}>

          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="attributes.username"/>}
            hasFeedback
          >
          {getFieldDecorator('username', {
            rules: [{ required: true, message: formatMessage({id:"errors.not-empty"})}],
          })(
            <Input/>
          )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="attributes.phone"/>}
            hasFeedback
          >
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: formatMessage({id:"errors.not-empty"})}],
          })(
            <Input/>
          )}
          </FormItem>


          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="mall.attributes.address.street"/>}
            hasFeedback
          >
          {getFieldDecorator('street', {
            rules: [{ required: true, message: formatMessage({id:"errors.not-empty"})}],
          })(
            <Input/>
          )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="mall.attributes.address.city"/>}
            hasFeedback
          >
          {getFieldDecorator('city', {
            rules: [{ required: true, message: formatMessage({id:"errors.not-empty"})}],
          })(
            <Input/>
          )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="mall.attributes.address.state"/>}
            hasFeedback
          >
          {getFieldDecorator('state', {
            rules: [{ required: true, message: formatMessage({id:"errors.not-empty"})}],
          })(
            <Input/>
          )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="mall.attributes.address.country"/>}
            hasFeedback
          >
          {getFieldDecorator('country', {
            rules: [{ required: true, message: formatMessage({id:"errors.not-empty"})}],
          })(
            <Input/>
          )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="mall.attributes.address.zip"/>}
            hasFeedback
          >
          {getFieldDecorator('zip', {
            rules: [{ required: true, message: formatMessage({id:"errors.not-empty"})}],
          })(
            <Input/>
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
