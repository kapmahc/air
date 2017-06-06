import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {Card, Row, Col} from 'antd'
import i18n from 'i18next'

import fail from '../images/fail.png'
import Layout from './Application'

const Widget = ({user, breadcrumb, admin, children}) => (
  <Layout breadcrumb={[{label: 'personal-bar.dashboard', href: '/dashboard'}].concat(breadcrumb)}>
    {(user.uid && (user.admin || !admin)) ?
      children :
      (<Row><Col span={12} offset={3}>
        <Card>
          <div className="custom-image">
            <img alt="not allow" width="100%" src={fail} />
          </div>
          <div className="custom-card">
           <h3>{i18n.t('auth.errors.please-sign-in')}</h3>
           <p></p>
          </div>
        </Card>
      </Col></Row>)}
  </Layout>
)


Widget.propTypes = {
  children: PropTypes.node.isRequired,
  admin: PropTypes.bool,
  user: PropTypes.object.isRequired,
  breadcrumb: PropTypes.array.isRequired,
}


export default connect(
  state => ({user: state.currentUser}),
  {},
)(Widget)
