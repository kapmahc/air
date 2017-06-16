import React, { Component } from 'react'
import { Form, Input, message } from 'antd';
import {injectIntl, intlShape, FormattedMessage} from 'react-intl'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Layout from '../../../layouts/Dashboard'
import {formItemLayout} from '../../../constants'
import SubmitButton from '../../../components/SubmitButton'
import {post, get} from '../../../ajax'

const FormItem = Form.Item;

class WidgetF extends Component {
  componentDidMount () {
    const {setFieldsValue} = this.props.form
    const {match} = this.props
    get(`/attachments/${match.params.id}`).then(
      function (rst){
        setFieldsValue({title: rst.title})
      }
    ).catch(message.error)
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const {formatMessage} = this.props.intl
    const {match, push} = this.props
    this.props.form.validateFieldsAndScroll((err, values) => {
     if (!err) {
       post(`/attachments/${match.params.id}`, values)
        .then((rst) => {
          message.success(formatMessage({id: 'messages.success'}))
          push('/attachments')
        }).catch(message.error)
     }
    });
  }
  render() {
    const {formatMessage} = this.props.intl
    const { getFieldDecorator } = this.props.form;
    const {match} = this.props
    return (
      <Layout breads={[
          {href: '/attachments', label: 'auth.attachments.index.title'},
          {href: `/attachments/edit/${match.params.id}`, label: 'buttons.edit'},
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
