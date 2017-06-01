import React from 'react'
import PropTypes from 'prop-types'

import Layout from './Application'

const Widget = ({children}) => (
  <Layout>
    <div>dashboard header</div>
    {children}
  </Layout>
)

Widget.propTypes = {
  children: PropTypes.node.isRequired
}

export default Widget
