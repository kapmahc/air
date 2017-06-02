import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import { Row, Col, Icon } from 'antd'
import i18n from 'i18next'

import Layout from '../../layouts/Application'
import {NonSignInLinks} from '../../constants'

const Widget = ({title, href, children}) => (
  <Layout
    breadcrumb = {[{label: title, href: href}]}
    >
    <Col span={18} offset={3}>
      <h2 style={{margin: '16px 0'}}>{i18n.t(title)}</h2>
      <Row>{children}</Row>
      <ul style={{margin: '16px 0'}}>
        {
          NonSignInLinks.map((l, i) => <li key={i}><Icon type={l.icon} /><Link style={{margin: '6px'}} to={l.href}>{i18n.t(l.label)}</Link></li>)
        }
      </ul>
    </Col>
  </Layout>
)

Widget.propTypes = {
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default Widget
