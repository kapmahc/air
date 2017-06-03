import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Layout, Menu, Modal } from 'antd'
import i18n from 'i18next'
import {Link} from 'react-router-dom'

import {signIn, signOut, toggleSideBar} from '../actions'
import {TOKEN} from '../constants'

const { Header } = Layout
const confirm = Modal.confirm

class Widget extends Component {
  onClick = (e) => {
    switch(e.key){
      case 'users.sign-out':
        const {signOut} = this.props
        confirm({
          title: i18n.t('are-you-sure'),
          onOk() {
            sessionStorage.removeItem(TOKEN)
            signOut()
          }
        });
        break
      default:
        break
    }
  }
  componentDidMount () {
    document.title = `${i18n.t('site.title')} | ${i18n.t('site.subTitle')}`
    const {user, signIn} = this.props
    if (!user.uid) {
      const token = sessionStorage.getItem(TOKEN)
      if(token){
        signIn(token)
      }
    }
  }
  render() {
    const {user} = this.props
    return (
      <Header className="header" style={{overflow: 'hidden'}}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['home']}
          style={{ lineHeight: '64px' }}
          onClick={this.onClick}
        >
          <Menu.Item key="home">
            <Link to="/">{i18n.t('site.subTitle')}</Link>
          </Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
          <Menu.Item key="4">nav 2</Menu.Item>
          <Menu.Item key="9">nav 2</Menu.Item>
          {
            user.uid ?
              <Menu.Item key="users.sign-out">{i18n.t('personal-bar.sign-out')}</Menu.Item> :
              <Menu.Item key="users.sign-in-or-up"><Link to="/users/sign-in">{i18n.t('personal-bar.sign-in-or-up')}</Link></Menu.Item>
          }
        </Menu>
      </Header>
    )
  }
}


Widget.propTypes = {
  user: PropTypes.object.isRequired,
  signOut: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
  toggleSideBar: PropTypes.func.isRequired
}


export default connect(
  state => ({user: state.currentUser}),
  {signIn, signOut, toggleSideBar},
)(Widget)
