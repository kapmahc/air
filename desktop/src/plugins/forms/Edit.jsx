import React, { Component } from 'react'
import { Form, Input, Select, Row, Col, DatePicker, Icon, Button, message } from 'antd';
import {injectIntl, intlShape, FormattedMessage} from 'react-intl'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment';
import uuid from 'uuid/v4'

import Layout from '../../layouts/Dashboard'
import {formItemLayout, tailFormItemLayout, DATE_FORMAT} from '../../constants'
import {post, get} from '../../ajax'

const FormItem = Form.Item;
const Option = Select.Option;

class WidgetF extends Component {
  componentDidMount () {
    const {setFieldsValue,getFieldDecorator} = this.props.form
    const {id} = this.props.match.params
    if (id) {
      get(`/forms/${id}`).then((rst)=>{
        var data = {
          title: rst.title,
          body: rst.body,
          deadline: moment(rst.deadline, DATE_FORMAT),
          fields: [],
        }
        rst.fields.forEach((f) => {
          const id = uuid()
          data.fields.push(id)

          getFieldDecorator(`names-${id}`, { initialValue: '' });
          data[`names-${id}`] = f.name
          getFieldDecorator(`labels-${id}`, { initialValue: '' });
          data[`labels-${id}`] = f.label
          getFieldDecorator(`types-${id}`, { initialValue: '' });
          data[`types-${id}`] = f.type
          getFieldDecorator(`values-${id}`, { initialValue: '' });
          data[`values-${id}`] = f.value
          getFieldDecorator(`bodys-${id}`, { initialValue: '' });
          data[`bodys-${id}`] = f.body
        })

        setFieldsValue(data)
      }).catch(message.error)
    }else{
      setFieldsValue({
        deadline: moment(new Date(), DATE_FORMAT),
      })
    }
  }
  onAppend = (e) => {
    const { form } = this.props;
    const fields = form.getFieldValue('fields');
    fields.push(uuid())
    form.setFieldsValue({fields});
  }
  onRemove = (id) => {
    const { form } = this.props;
    const fields = form.getFieldValue('fields');
    form.setFieldsValue({
      fields: fields.filter((f)=>f !== id),
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const {formatMessage} = this.props.intl
    const {push, match} = this.props
    const {id} = match.params

    this.props.form.validateFieldsAndScroll((err, values) => {
     if (!err) {
      //  console.log(values)
       var data = {
         title: values.title,
         body: values.body,
         type: 'markdown',
         deadline: values.deadline,
         fields: values.fields.map((id) => ({
           label: values[`labels-${id}`],
           name: values[`names-${id}`],
           type: values[`types-${id}`],
           value: values[`values-${id}`],
           body: values[`bodys-${id}`],
         }))
       }
      //  console.log(data)
       post(id ? `/forms/${id}` : '/forms', data)
        .then((rst) => {
          message.success(formatMessage({id: 'messages.success'}))
          push('/forms/manage')
        }).catch(message.error)
     }
    });
  }
  render() {
    const {formatMessage} = this.props.intl
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const {id} = this.props.match.params

    getFieldDecorator('fields', { initialValue: [] });


    const fields = getFieldValue('fields').map((f, i) => {
      return (
        <div key={i}>
          <Row>
            <Col sm={{offset:5}}>
              <h2>
                <FormattedMessage id="forms.edit.field_item" values={{id:i+1}}/>
                <Icon
                  className="dynamic-delete-button"
                  type="minus-circle-o"
                  onClick={() => this.onRemove(f)}
                />
            </h2>
            </Col>
          </Row>
          <FormItem
           {...formItemLayout}
           label={<FormattedMessage id="attributes.name"/>}
           hasFeedback
         >
         {getFieldDecorator(`names-${f}`, {
           rules: [{ required: true, message: formatMessage({id:"errors.not-empty"})}],
         })(
           <Input />
         )}
         </FormItem>
         <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="attributes.type"/>}
            hasFeedback
          >
          {getFieldDecorator(`types-${f}`, {
            rules:[{ required: true, message: formatMessage({id:"errors.not-empty"})}],
          })(
            <Select style={{ width: 120 }}>
              {['text', 'checkboxs', 'radios', 'select', 'textarea'].map((t, i)=><Option key={i} value={t}>{t}</Option>)}
            </Select>
          )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="attributes.value"/>}
            hasFeedback
          >
          {getFieldDecorator(`values-${f}`, {
            rules: [{ required: true, message: formatMessage({id:"errors.not-empty"})}],
          })(
            <Input />
          )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="attributes.label"/>}
            hasFeedback
          >
          {getFieldDecorator(`labels-${f}`, {
            rules: [{ required: true, message: formatMessage({id:"errors.not-empty"})}],
          })(
            <Input />
          )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="attributes.body"/>}
            hasFeedback
          >
          {getFieldDecorator(`bodys-${f}`, {
            rules: [{ required: true, message: formatMessage({id:"errors.not-empty"})}],
          })(
            <Input type="textarea" rows="10" />
          )}
          </FormItem>


        </div>
      );
    });

    return (
      <Layout breads={[
          {href: '/forms/manage', label: 'forms.manage.title'},
          {href: id ? `/forms/edit/${id}` : '/forms/new', label: id ? 'buttons.edit': 'buttons.new'},
        ]}>
        <Form onSubmit={this.handleSubmit}>
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
            label={<FormattedMessage id="attributes.body"/>}
            hasFeedback
          >
          {getFieldDecorator('body', {
            rules: [{ required: true, message: formatMessage({id:"errors.not-empty"})}],
          })(
            <Input type="textarea" rows="10" />
          )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="attributes.deadline"/>}
            hasFeedback
          >
          {getFieldDecorator('deadline', {
            rules: [{ required: true, message: formatMessage({id:"errors.not-empty"})}],
          })(
            <DatePicker />
          )}
          </FormItem>

          {fields}

          <FormItem {...tailFormItemLayout}>
            <Button onClick={this.onAppend}><FormattedMessage id="forms.edit.add_field"/></Button>
            &nbsp; &nbsp;
            <Button type="primary" htmlType="submit" size="large">
              <FormattedMessage id="buttons.submit"/>
            </Button>
          </FormItem>

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
