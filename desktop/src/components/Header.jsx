import React, { Component } from 'react';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

class Widget extends Component {
  render() {
    return (
      <Header className="header my-nowrap">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
          <Menu.Item key="4">nav 1</Menu.Item>
          <Menu.Item key="5">nav 2</Menu.Item>
          <Menu.Item key="6">nav 3</Menu.Item>
          <Menu.Item key="7">nav 1</Menu.Item>
          <Menu.Item key="8">nav 2</Menu.Item>
          <Menu.Item key="9">nav 3</Menu.Item>
        </Menu>
      </Header>
    );
  }
}

export default Widget;
