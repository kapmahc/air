import React, { Component } from 'react'
import { Form, Input, Select, message } from 'antd';
import {injectIntl, intlShape, FormattedMessage} from 'react-intl'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Layout from '../../../../layouts/Dashboard'
import {formItemLayout} from '../../../../constants'
import SubmitButton from '../../../../components/SubmitButton'
import {post, get} from '../../../../ajax'

const FormItem = Form.Item;
const Option = Select.Option;

class WidgetF extends Component {
  componentDidMount () {
    const {setFieldsValue} = this.props.form
    const {id} = this.props.match.params
    if (id) {
      get(`/cards/${id}`).then((rst)=>setFieldsValue({
        title: rst.title,
        summary: rst.summary,
        action: rst.action,
        logo: rst.logo,
        href: rst.href,
        sortOrder: rst.sortOrder.toString(),
        loc: rst.loc})).catch(message.error)
    }else{
      setFieldsValue({sortOrder: '5'})
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const {formatMessage} = this.props.intl
    const {push, match} = this.props
    const {id} = match.params

    this.props.form.validateFieldsAndScroll((err, values) => {
     if (!err) {
       post(id ? `/cards/${id}` : '/cards', Object.assign({}, values, {type: 'markdown', sortOrder:  parseInt(values.sortOrder, 10)}))
        .then((rst) => {
          message.success(formatMessage({id: 'messages.success'}))
          push('/admin/cards')
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
          {href: '/admin/cards', label: 'site.admin.cards.index.title'},
          {href: id ? `/admin/cards/edit/${id}` : '/admin/cards/new', label: id ? 'buttons.edit': 'buttons.new'},
        ]}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="attributes.loc"/>}
            hasFeedback
          >
          {getFieldDecorator('loc', {
            rules: [{ required: true, message: formatMessage({id:"errors.not-empty"})}],
          })(
            <Input />
          )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="attributes.sortOrder"/>}
          >
          {getFieldDecorator('sortOrder', {
            rules:[],
          })(
            <Select style={{ width: 120 }}>
              {Array(10).fill().map((p, i)=><Option key={i} value={i.toString()}>{i}</Option>)}
            </Select>
          )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="attributes.logo"/>}
            hasFeedback
          >
          {getFieldDecorator('logo', {
            rules: [{ required: true, message: formatMessage({id:"errors.not-empty"})}],
          })(
            <Input />
          )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="attributes.title"/>}
            hasFeedback
          >
          {getFieldDecorator('title', {
            rules: [{ required: true, message: formatMessage({id:"errors.not-empty"})}],
          })(
            <Input />
          )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="attributes.href"/>}
            hasFeedback
          >
          {getFieldDecorator('href', {
            rules: [{ required: true, message: formatMessage({id:"errors.not-empty"})}],
          })(
            <Input />
          )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="attributes.summary"/>}
            hasFeedback
          >
          {getFieldDecorator('summary', {
            rules: [{ required: true, message: formatMessage({id:"errors.not-empty"})}],
          })(
            <Input type="textarea" rows="10" />
          )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="attributes.action"/>}
            hasFeedback
          >
          {getFieldDecorator('action', {
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
  push: PropTypes.func.isRequired,
}

const Widget = Form.create()(injectIntl(WidgetF))

export default connect(
  state => ({}),
  {push},
)(Widget)
