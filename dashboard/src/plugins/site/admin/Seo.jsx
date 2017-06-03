import React, {Component} from 'react'
import { Form, Input, message, Card, Row, Col} from 'antd'
import i18n from 'i18next'

import Layout from '../../../layouts/Dashboard'
import {Submit, formItemLayout} from '../../../form'
import {post, get} from '../../../ajax'
import {LANGUAGES} from '../../../constants'

const FormItem = Form.Item

class WidgetF extends Component {
  state = {}
  componentDidMount () {
    const {setFieldsValue} = this.props.form
    get('/admin/site/seo').then(
      function (rst){
        setFieldsValue({
          googleVerifyCode: rst.googleVerifyCode,
          baiduVerifyCode: rst.baiduVerifyCode,
        })
        this.setState(rst)
      }.bind(this)
    )
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        post('/admin/site/seo', values).then((rst) => {
          message.success(i18n.t('success'));
        }).catch(message.error)
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
    <Layout  breadcrumb={[{label: 'site.admin.seo.title', href: '/admin/site/seo'}]}>
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label={i18n.t('site.admin.seo.googleVerifyCode')}
          hasFeedback
        >
          {getFieldDecorator('googleVerifyCode', {
            rules: [{
              required: true, message: i18n.t('helpers.not-empty'),
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={i18n.t('site.admin.seo.baiduVerifyCode')}
          hasFeedback
        >
          {getFieldDecorator('baiduVerifyCode', {
            rules: [{
              required: true, message: i18n.t('helpers.not-empty'),
            }],
          })(
            <Input />
          )}
        </FormItem>
        <Submit />
      </Form>
      <br/>
      <Row>
        <Col xs={{span: 24}} sm={{offset:4, span:16}}>
          <Card>
            {
              [
                `robots.txt`,
                `sitemap.xml.gz`,
                `google${this.state.googleVerifyCode}.html`,
                `baidu_verify_${this.state.baiduVerifyCode}.html`,
              ].concat(LANGUAGES.map((l)=>`rss-${l}.atom`)).map((n, i)=><p key={i}><a target="_blank" rel="noopener noreferrer" href={`/${n}`}>{n}</a></p>)
            }
          </Card>
        </Col>
      </Row>
    </Layout>
    );
  }
}

const Widget = Form.create()(WidgetF);

export default Widget
