import React from 'react'
import i18n from 'i18next'
import {Row, Col} from 'antd'

import Layout from '../../../layouts/Dashboard'

const Widget = () => (
  <Layout breadcrumb={[{label: 'auth.users.logs.title', href: '/users/logs'}]}>
    <Row>
      <Col offset={1} span={22}>        
      </Col>
    </Row>
  </Layout>
)

export default Widget
