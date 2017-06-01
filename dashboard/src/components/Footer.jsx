import React from 'react'
import { Layout } from 'antd'
import i18n from 'i18next'

const { Footer } = Layout

const Widget = () => (
  <Footer style={{ textAlign: 'center' }}>
    &copy;{i18n.t('site.copyright')}
  </Footer>
)

export default Widget
