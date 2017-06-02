import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Layout from './Application'

const Widget = ({user, breadcrumb, admin, children}) => (
  <Layout breadcrumb={breadcrumb}>
    <div>dashboard header</div>
    {children}
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
