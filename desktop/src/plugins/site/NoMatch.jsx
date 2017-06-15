import React, { Component } from 'react'
import {FormattedMessage} from 'react-intl'
import { Row, Col, Card } from 'antd'

import fail from '../../assets/fail.png'
import Layout from '../../layouts/Application'

class Widget extends Component {
  render() {
    return (
      <Layout>
        <Row>
          <Col md={{offset:8, span:8}}>
            <Card title={<FormattedMessage id="errors.no-match"/>}>
              <img alt="fail" width="100%" src={fail} />             
            </Card>
          </Col>
        </Row>
      </Layout>
    );
  }
}

export default Widget;
