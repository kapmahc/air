import React from 'react'
import { Card, Col } from 'antd'
import i18n from 'i18next'

import fail from '../../images/fail.png'
import Layout from '../../layouts/Application'

const Widget = () => (
  <Layout breadcrumb={[]}>
    <Col span={8} offset={3}>
      <Card>
        <div className="custom-image">
          <img alt="not found" width="100%" src={fail} />
        </div>
        <div className="custom-card">
         <h3>{i18n.t('errors.not-found')}</h3>
         <p></p>
        </div>
      </Card>
    </Col>
  </Layout>
)

export default Widget
