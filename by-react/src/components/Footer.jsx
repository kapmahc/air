import React from 'react'
import { Layout } from 'antd'
import i18n from 'i18next'

const { Footer } = Layout

const Widget = () => (
  <Footer style={{overflow: 'hidden', textAlign: 'center' }}>
    &copy;{i18n.t('site.copyright')}
    &middot; <a>nav 1</a>
    &middot; <a>nav 2</a> 
  </Footer>
)

export default Widget
