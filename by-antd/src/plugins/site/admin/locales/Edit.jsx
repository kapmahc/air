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
    const {code} = this.props.match.params
    if (code) {      
      get(`/admin/locales/${code}`).then(setFieldsValue).catch(message.error)
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const {formatMessage} = this.props.intl
    const {push} = this.props
    this.props.form.validateFieldsAndScroll((err, values) => {
     if (!err) {
       post('/admin/locales', values)
        .then((rst) => {
          message.success(formatMessage({id: 'messages.success'}))
          push('/admin/locales')
        }).catch(message.error)
     }
    });
  }
  render() {
    const {formatMessage} = this.props.intl
    const { getFieldDecorator } = this.props.form;
    const {code} = this.props.match.params
    return (
      <Layout breads={[
          {href: '/admin/locales', label: 'site.admin.locales.index.title'},
          {href: code ? `/admin/locales/edit/${code}` : '/admin/locales/new', label: code ? 'buttons.edit': 'buttons.new'},
        ]}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="site.attributes.locale.code"/>}
            hasFeedback
          >
          {getFieldDecorator('code', {
            rules: [{ required: true, message: formatMessage({id:"errors.not-empty"})}],
          })(
            <Input />
          )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="site.attributes.locale.message"/>}
            hasFeedback
          >
          {getFieldDecorator('message', {
            rules: [{ required: true, message: formatMessage({id:"errors.not-empty"})}],
          })(
            <Input type='textarea'/>
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
