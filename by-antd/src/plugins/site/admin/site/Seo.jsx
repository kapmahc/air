import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Input, message, Card } from 'antd';
import {injectIntl, intlShape, FormattedMessage} from 'react-intl'
import { connect } from 'react-redux'

import Layout from '../../../../layouts/Dashboard'
import {formItemLayout} from '../../../../constants'
import SubmitButton from '../../../../components/SubmitButton'
import {post, get} from '../../../../ajax'

const FormItem = Form.Item;

class WidgetF extends Component {
  state = { googleVerifyCode:'', baiduVerifyCode: ''}
  componentDidMount () {
    const {setFieldsValue} = this.props.form
    get('/admin/site/seo').then(
      function (rst){
        setFieldsValue({
          googleVerifyCode: rst.googleVerifyCode,
          baiduVerifyCode: rst.baiduVerifyCode,
        })
        this.setState(rst)
      }.bind(this)).catch(message.error)
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const {formatMessage} = this.props.intl
    this.props.form.validateFieldsAndScroll((err, values) => {
     if (!err) {
       post('/admin/site/seo', values)
        .then((rst) => {
          message.success(formatMessage({id: 'messages.success'}))
        }).catch(message.error)
     }
    });
  }
  render() {
    const {formatMessage} = this.props.intl
    const { getFieldDecorator } = this.props.form;
    const {googleVerifyCode, baiduVerifyCode} = this.state
    const {languages} = this.props
    return (
      <Layout admin breads={[{href: '/admin/site/seo', label: 'site.admin.seo.title'}]}>
        <Row>
          <Col>
            <Form onSubmit={this.handleSubmit}>

              <FormItem
                {...formItemLayout}
                label={<FormattedMessage id="site.admin.seo.google.verifyCode"/>}
                hasFeedback
              >
              {getFieldDecorator('googleVerifyCode', {
                rules: [{ required: true, message: formatMessage({id:"errors.not-empty"})}],
              })(
                <Input />
              )}
              </FormItem>

              <FormItem
                {...formItemLayout}
                label={<FormattedMessage id="site.admin.seo.baidu.verifyCode"/>}
                hasFeedback
              >
              {getFieldDecorator('baiduVerifyCode', {
                rules: [{ required: true, message: formatMessage({id:"errors.not-empty"})}],
              })(
                <Input />
              )}
              </FormItem>

              <SubmitButton />
            </Form>
          </Col>
          <Col md={{offset:4, span:8}}>
            <Card>
              <ul>
                {(languages.map((l)=>`rss-${l}.atom`).concat(['robots.txt', 'sitemap.xml.gz', `google${googleVerifyCode}.html`, `baidu_verify_${baiduVerifyCode}.html`])).map((l,i)=><li key={i}><a rel="noopener noreferrer" target="_blank" href={`/${l}`}>{l}</a></li>)}
              </ul>
            </Card>
          </Col>
        </Row>
      </Layout>
    );
  }
}


WidgetF.propTypes = {
  intl: intlShape.isRequired,
  languages: PropTypes.array.isRequired,
}

const Widget = Form.create()(injectIntl(WidgetF))


export default connect(
  state => ({
    languages: state.siteInfo ? state.siteInfo.languages : [],
  }),
  {},
)(Widget)
