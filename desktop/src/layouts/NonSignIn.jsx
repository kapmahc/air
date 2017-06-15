import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {FormattedMessage} from 'react-intl'
import {Row, Col} from 'antd'
import {Link} from 'react-router-dom'


import Application from './Application'
import {NonSignInLinks} from '../constants'

class Widget extends Component {
  render() {
    const {children, title} = this.props
    return (
      <Application>
        <Row>
          <Col md={{offset:4, span:16}}>
            <FormattedMessage tagName="h2" id={title} />
            <div style={{marginTop: '20px'}}>
              {children}
            </div>
            <ul style={{marginTop: '20px'}}>
              {NonSignInLinks.map((l, i) => <li key={i}><Link to={l.href}><FormattedMessage id={l.label}/></Link></li>)}
            </ul>
          </Col>
        </Row>
      </Application>
    );
  }
}


Widget.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
}

export default Widget;
