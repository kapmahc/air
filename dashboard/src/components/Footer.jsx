import React from 'react'
import { Layout } from 'antd'
import {FormattedMessage} from 'react-intl'

const { Footer } = Layout

const Widget = () => (
  <Footer style={{ textAlign: 'center' }}>
    &copy;<FormattedMessage id="site.copyright"/>
  </Footer>
)

export default Widget
