import React from 'react'
import PropTypes from 'prop-types'
import {FormattedMessage} from 'react-intl'
import {Link} from 'react-router-dom'
import { Row, Col, Icon } from 'antd'

import Layout from '../../layouts/Application'
import {NonSignInLinks} from '../../constants'

const Widget = ({title, children}) => (
  <Layout>
    <Row>
      <Col span={18} offset={3}>
        <h2 style={{margin: '16px 0'}}><FormattedMessage id={title}/></h2>
          
        {children}

        <ul style={{margin: '16px 0'}}>
          {
            NonSignInLinks.map((l, i) => <li key={i}><Icon type={l.icon} /><Link style={{margin: '6px'}} to={l.href}><FormattedMessage id={l.label} /></Link></li>)
          }
        </ul>
      </Col>
    </Row>
  </Layout>
)

Widget.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default Widget
