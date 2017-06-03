import React from 'react'
import PropTypes from 'prop-types'
import {Row, Col, Card, Icon} from 'antd'
import {Link} from 'react-router-dom'
import i18n from 'i18next'
import { connect } from 'react-redux'

import plugins from '../../plugins'
import Layout from '../../layouts/Dashboard'

const Widget = ({user}) => (
  <Layout breadcrumb={[]}>
    <Row gutter={16}>
      {plugins.dashboard(user).map((d, i)=>{
        return (<Col xs={24} sm={8} key={i} className="my-gutter-box">
          <Card title={<span><Icon type={d.icon} /> {i18n.t(d.label)}</span>}>
            {d.items.map((l, j) => (<p key={j}><Link to={l.href}>{i18n.t(l.label)}</Link></p>))}
          </Card>
        </Col>)
      })}
    </Row>
  </Layout>
)


Widget.propTypes = {
  user: PropTypes.object.isRequired,
}


export default connect(
  state => ({user: state.currentUser}),
  {},
)(Widget)
