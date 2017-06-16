import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Layout, BackTop } from 'antd';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'
import {FormattedMessage} from 'react-intl'

const { Footer } = Layout;

class Widget extends Component {
  render() {
    const {info} = this.props
    return (
      <Footer>
        {info.copyright} &nbsp;
        {info.links.filter((l) => l.loc === 'footer').map((l, i) => <span key={i}>&nbsp; &middot; &nbsp;<Link to={l.href}><FormattedMessage id={l.label}/></Link></span> )}
        <BackTop />
      </Footer>
    );
  }
}


Widget.propTypes = {
  push: PropTypes.func.isRequired,
  info: PropTypes.object.isRequired,
}


export default connect(
  state => ({
    info: state.siteInfo,
  }),
  {push},
)(Widget)
