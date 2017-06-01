import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Layout, Menu } from 'antd'
import i18n from 'i18next'

import {signOut, toggleSideBar} from '../actions'

const { Header } = Layout

class Widget extends Component {
  render() {
    return (
      <Header className="header" >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['home']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="home">
            {i18n.t('site.subTitle')}
          </Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
    )
  }
}


Widget.propTypes = {
  user: PropTypes.object.isRequired,
  signOut: PropTypes.func.isRequired,
  toggleSideBar: PropTypes.func.isRequired
}


export default connect(
  state => ({user: state.currentUser}),
  {signOut, toggleSideBar},
)(Widget)
