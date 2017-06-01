import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Sidebar, Menu, Icon } from 'semantic-ui-react'

import {signOut, toggleSideBar} from '../actions'

const Widget = ({bar, children}) => (
  <Sidebar.Pushable as="div">
    <Sidebar as={Menu} animation='push' width='thin' visible={bar.show} icon='labeled' vertical inverted>
      <Menu.Item name='home'>
        <Icon name='home' />
        Home
      </Menu.Item>
      <Menu.Item name='gamepad'>
        <Icon name='gamepad' />
        Games
      </Menu.Item>
      <Menu.Item name='camera'>
        <Icon name='camera' />
        Channels
      </Menu.Item>
      <Menu.Item name='camera'>
        <Icon name='camera' />
        Channels
      </Menu.Item>
      <Menu.Item name='camera'>
        <Icon name='camera' />
        Channels
      </Menu.Item>
      <Menu.Item name='camera'>
        <Icon name='camera' />
        Channels
      </Menu.Item>
      <Menu.Item name='camera'>
        <Icon name='camera' />
        Channels
      </Menu.Item>
    </Sidebar>
    <Sidebar.Pusher>
      {children}
    </Sidebar.Pusher>
  </Sidebar.Pushable>
)

Widget.propTypes = {
  children: PropTypes.node.isRequired,
  bar: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  signOut: PropTypes.func.isRequired,
  toggleSideBar: PropTypes.func.isRequired
}


export default connect(
  state => ({user: state.currentUser, bar: state.sideBar}),
  {signOut, toggleSideBar},
)(Widget)
