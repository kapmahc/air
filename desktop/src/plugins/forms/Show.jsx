import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {message, Input, Row, Form, Select, Radio, Col, Checkbox} from 'antd'
import TimeAgo from 'timeago-react'
import Markdown from 'react-markdown'
import { connect } from 'react-redux'
import {injectIntl, intlShape, FormattedMessage} from 'react-intl'
import { push } from 'react-router-redux'

import {get, post} from '../../ajax'
import Layout from '../../layouts/Application'
import {formItemLayout} from '../../constants'
import SubmitButton from '../../components/SubmitButton'


const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

class WidgetF extends Component {
  state = { item: {updatedAt: '', body: '', fields: []}}
  componentDidMount () {
    const {id} = this.props
    get(`/forms/${id}`).then((rst)=>this.setState({item:rst})).catch(message.error)
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const {id, action} = this.props
    const {formatMessage} = this.props.intl
    const {push} = this.props
    const {item} = this.state
    this.props.form.validateFieldsAndScroll((err, values) => {
      var data;
      switch (action) {
        case 'apply':
          data = {
            email: values.email,
            username: values.username,
            phone: values.phone,
            records: item.fields.map((f) => ({
              name: f.name,
              value: f.type === 'checkboxs' ? values[f.name].join(';') : values[f.name]
            })),
          }
          break;
        default:
          data = values
      }

     if (!err) {
       post(`/forms/${id}/${action}`, data)
        .then((rst) => {
          message.success(formatMessage({id: 'message.success'}))
          push('/forms')
        }).catch(message.error)
     }
    });
  }
  renderField = (f, i) => {
    const {formatMessage} = this.props.intl
    const { getFieldDecorator } = this.props.form;
    switch (f.type) {
      case 'checkboxs':
        return (<FormItem key={i}
          {...formItemLayout}
          label={f.label}
          hasFeedback
        >
          {getFieldDecorator(f.name, {
            rules: [
              { required: true, message: formatMessage({id:"errors.not-empty"})},
            ],
          })(
            <CheckboxGroup options={f.body.split('\n')} />
          )}
        </FormItem>)
      case 'select':
        return (<FormItem key={i}
          {...formItemLayout}
          label={f.label}
          hasFeedback
        >
        {getFieldDecorator(f.name, {
          rules:[
            { required: true, message: formatMessage({id:"errors.not-empty"})},
          ],
        })(
          <Select>
            {f.body.split('\n').map((v, i)=><Option key={i} value={v}>{v}</Option>)}
          </Select>
        )}
        </FormItem>)
      case 'radios':
        return (<FormItem key={i}
          {...formItemLayout}
          label={f.label}
          hasFeedback
        >
          {getFieldDecorator(f.name, {
            rules: [
              { required: true, message: formatMessage({id:"errors.not-empty"})},
            ],
          })(
            <RadioGroup>
              {f.body.split('\n').map((v, i)=><Radio key={i} value={v}>{v}</Radio>)}
            </RadioGroup>
          )}
        </FormItem>)
      case 'text':
        return (<FormItem key={i}
          {...formItemLayout}
          label={f.label}
          hasFeedback
        >
          {getFieldDecorator(f.name, {
            rules: [
              { required: true, message: formatMessage({id:"errors.not-empty"})},
            ],
          })(
            <Input />
          )}
        </FormItem>)
        case 'textarea':
          return (<FormItem key={i}
            {...formItemLayout}
            label={f.label}
            hasFeedback
          >
            {getFieldDecorator(f.name, {
              rules: [
                { required: true, message: formatMessage({id:"errors.not-empty"})},
              ],
            })(
              <Input type="textarea" rows={4} />
            )}
          </FormItem>)
      default:
        return (<div key={i}></div>)
    }
  }
  renderForm = () => {
    const {formatMessage} = this.props.intl
    const { getFieldDecorator } = this.props.form;
    const {item} = this.state

    switch(this.props.action) {
      case 'apply':
        return (<Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="attributes.username"/>}
            hasFeedback
          >
          {getFieldDecorator('username', {
            rules: [
              { required: true, message: formatMessage({id:"errors.not-empty"})},
            ],
          })(
            <Input />
          )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="attributes.email"/>}
            hasFeedback
          >
          {getFieldDecorator('email', {
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
            label={<FormattedMessage id="attributes.phone"/>}
            hasFeedback
          >
          {getFieldDecorator('phone', {
            rules: [
              { required: true, message: formatMessage({id:"errors.not-empty"})},
            ],
          })(
            <Input />
          )}
          </FormItem>

          {item.fields.map(this.renderField)}

          <SubmitButton />
        </Form>)
      case 'cancel':
        return (<Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="forms.cancel.who"/>}
            hasFeedback
          >
          {getFieldDecorator('who', {
            rules: [
              { required: true, message: formatMessage({id:"errors.not-empty"})},
            ],
          })(
            <Input />
          )}
          </FormItem>

          <SubmitButton />
        </Form>)
      default:
        return (<div></div>)
    }
  }
  render() {
    const {id, action} = this.props
    const {item} = this.state

    return (
      <Layout breads={[{href: '/forms', label: 'forms.index.title'}, {href: `/forms/apply/${id}`, label: `buttons.${action}`}]}>
        <Row>
          <Col>
            <h2>{item.title}</h2>
            <TimeAgo datetime={item.updatedAt}/>
            <Markdown source={item.body}/>
          </Col>
          <Col md={{span:12}}>
            {this.renderForm()}
          </Col>
        </Row>
      </Layout>
    );
  }
}


WidgetF.propTypes = {
  intl: intlShape.isRequired,
  action: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  push: PropTypes.func.isRequired,
}

const Widget = Form.create()(injectIntl(WidgetF))

export default connect(
  state => ({}),
  {push},
)(Widget)
