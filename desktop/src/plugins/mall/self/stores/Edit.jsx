import React, { Component } from 'react'
import { Form, Input, message, Select } from 'antd';
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
  state = { addresses: [], currencies: ['usd', 'rmb']}
  componentDidMount () {
    const {setFieldsValue} = this.props.form
    const {id} = this.props.match.params
    get('/mall/addresses').then((rst)=> this.setState({addresses:rst})).catch(message.error)
    if (id) {
      get(`/mall/stores/${id}`).then((rst)=>setFieldsValue({
        name: rst.name,
        description: rst.description,
        addressId: rst.addressId.toString(),
        currency: rst.currency,
      })).catch(message.error)
    }else{
      setFieldsValue({currency:'usd'})
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const {formatMessage} = this.props.intl
    const {push, match} = this.props
    const {id} = match.params

    this.props.form.validateFieldsAndScroll((err, values) => {
     if (!err) {
       post(id ? `/mall/stores/${id}` : '/mall/stores', Object.assign({}, values, {type: 'markdown'}, {addressId: parseInt(values.addressId, 10)}))
        .then((rst) => {
          message.success(formatMessage({id: 'messages.success'}))
          push('/mall/self/stores')
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
          {href: '/mall/self/stores', label: 'mall.self.stores.index.title'},
          {href: id ? `/mall/self/stores/edit/${id}` : '/mall/self/stores/new', label: id ? 'buttons.edit': 'buttons.new'},
        ]}>
        <Form onSubmit={this.handleSubmit}>

          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="attributes.name"/>}
            hasFeedback
          >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: formatMessage({id:"errors.not-empty"})}],
          })(
            <Input/>
          )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="attributes.description"/>}
            hasFeedback
          >
          {getFieldDecorator('description', {
            rules: [{ required: true, message: formatMessage({id:"errors.not-empty"})}],
          })(
            <Input type="textaea" rows={10}/>
          )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="attributes.currency"/>}
            hasFeedback
          >
          {getFieldDecorator('currency', {
            rules:[{ required: true, message: formatMessage({id:"errors.not-empty"})}],
          })(
            <Select style={{ width: 120 }}>
              {this.state.currencies.map((c, i)=><Option key={i} value={c}><FormattedMessage id={"currencies."+c}/></Option>)}
            </Select>
          )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="attributes.address"/>}
            hasFeedback
          >
          {getFieldDecorator('addressId', {
            rules:[{ required: true, message: formatMessage({id:"errors.not-empty"})}],
          })(
            <Select>
              {this.state.addresses.map((a, i)=><Option key={i} value={a.id.toString()}>{a.username}, {a.street}, {a.city}, {a.zip}</Option>)}
            </Select>
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
