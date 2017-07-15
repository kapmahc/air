import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {Row, Col, Card, Icon} from 'antd'
import {FormattedMessage} from 'react-intl'
import {Link} from 'react-router-dom'

import Layout from '../../layouts/Dashboard'
import menus from '../../menus'

class Widget extends Component {
  render() {
    const {user} = this.props
    const rl = (l, j)=><li key={j}><Link to={l.href}><FormattedMessage id={l.label}/></Link></li>
    return (
      <Layout breads={[]}>
        <Row gutter={16}>
          {menus(user).map((m,i) => <Col key={i} md={{span:8}}><Card title={<span><Icon type={m.icon}/> <FormattedMessage id={m.label}/></span>}><ul>{m.items.map(rl)}</ul></Card><br/></Col>)}
        </Row>
      </Layout>
    );
  }
}


Widget.propTypes = {
  user: PropTypes.object.isRequired,
}

export default connect(
  state => ({
    user: state.currentUser,
  }),
  {},
)(Widget)
