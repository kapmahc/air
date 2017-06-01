import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Layout, Row, Menu, Breadcrumb, Icon } from 'antd'
import {Link} from 'react-router-dom'
import i18n from 'i18next'

import Footer from '../components/Footer'
import Header from '../components/Header'

const { SubMenu } = Menu
const { Content, Sider } = Layout

class Widget extends Component {
  render () {
    const {children, breadcrumb} = this.props
    return (
      <Layout>
        <Header />
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '12px 0' }}>
            <Breadcrumb.Item>
              <Link to="/">{i18n.t('header.home')}</Link>
            </Breadcrumb.Item>
            {breadcrumb.map((l, i) => <Breadcrumb.Item key={i}><Link to={l.href}>{i18n.t(l.label)}</Link></Breadcrumb.Item>)}
          </Breadcrumb>
          <Layout style={{ padding: '24px 0', background: '#fff' }}>
            <Sider

              breakpoint="lg"
              collapsedWidth="0"
              style={{ background: '#fff' }}
              >
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
              >
                <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
                  <Menu.Item key="1">option1</Menu.Item>
                  <Menu.Item key="2">option2</Menu.Item>
                  <Menu.Item key="3">option3</Menu.Item>
                  <Menu.Item key="4">option4</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
                  <Menu.Item key="5">option5</Menu.Item>
                  <Menu.Item key="6">option6</Menu.Item>
                  <Menu.Item key="7">option7</Menu.Item>
                  <Menu.Item key="8">option8</Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
                  <Menu.Item key="9">option9</Menu.Item>
                  <Menu.Item key="10">option10</Menu.Item>
                  <Menu.Item key="11">option11</Menu.Item>
                  <Menu.Item key="12">option12</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <Row>{children}</Row>              
            </Content>
          </Layout>
        </Content>
        <Footer />
      </Layout>
    )
  }
}


Widget.propTypes = {
  children: PropTypes.node.isRequired,
  breadcrumb: PropTypes.array.isRequired,
}

export default Widget
