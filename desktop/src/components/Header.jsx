import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Layout, Menu } from 'antd';
import {FormattedMessage} from 'react-intl'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import {signOut} from '../actions'

const { Header } = Layout;

class Widget extends Component {
  handleMenu = ({key}) => {
    const {push} = this.props
    push(key)
  }
  render() {
    const {info, user} = this.props
    return (
      <Header className="header my-nowrap">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          onClick={this.handleMenu}
          defaultSelectedKeys={[]}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="to-/">{info.subTitle}</Menu.Item>
          {info.links.filter((l)=>l.loc === 'header').map((l,i)=><Menu.Item key={l.href}><FormattedMessage id={l.label}/></Menu.Item>)}
          {
            user.uid ?
              <Menu.Item key="/dashboard"><FormattedMessage id="site.dashboard.title"/></Menu.Item> :
              <Menu.Item key="/users/sign-in"><FormattedMessage id="auth.users.sign-in.title"/></Menu.Item>
          }
        </Menu>
      </Header>
    );
  }
}


Widget.propTypes = {
  push: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  info: PropTypes.object.isRequired,
}


export default connect(
  state => ({
    user: state.currentUser,
    info: state.siteInfo,
  }),
  {push, signOut},
)(Widget)
