import React from 'react'
import { Form, Button } from 'antd'
import i18n from 'i18next'

const FormItem = Form.Item

export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

export const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 14,
      offset: 6,
    },
  },
};

export const Submit = () => (
  <FormItem {...tailFormItemLayout}>
    <Button type="primary" htmlType="submit" size="large">
      {i18n.t('buttons.submit')}
    </Button>
  </FormItem>
)
