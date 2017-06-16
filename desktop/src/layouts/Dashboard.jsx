import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {FormattedMessage} from 'react-intl'
import {Row, Col, Card} from 'antd'
import { connect } from 'react-redux'

import Layout from './Application'
import fail from '../assets/fail.png'

class Widget extends Component {
  render() {
    const {children, breads, user, admin} = this.props
    if (user.uid && (!admin || user.admin)) {
      return <Layout breads={breads}>{children}</Layout>
    }
    return (<Layout breads={[]}>
        <Row>
          <Col md={{offset:8, span:8}}>
            <Card title={<FormattedMessage id="errors.please-sign-in-first"/>}>
              <img alt="fail" width="100%" src={fail} />
            </Card>
          </Col>
        </Row>
    </Layout>);
  }
}


Widget.propTypes = {
  children: PropTypes.node.isRequired,
  admin: PropTypes.bool,
  breads: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
}

export default connect(
  state => ({
    user: state.currentUser,
  }),
  {},
)(Widget)
