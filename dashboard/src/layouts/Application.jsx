import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
import {Link} from 'react-router-dom'
import i18n from 'i18next'
import { connect } from 'react-redux'

import Footer from '../components/Footer'
import Header from '../components/Header'
// import ScrollToTop from '../components/ScrollToTop'
import {NonSignInLinks, LANGUAGES} from '../constants'
import plugins from '../plugins'

const { SubMenu } = Menu
const MenuItemGroup = Menu.ItemGroup
const { Content, Sider } = Layout

class Widget extends Component {
  render () {
    const {children, breadcrumb, user} = this.props
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
                  defaultOpenKeys={['quick', 'personalBar']}
                  style={{ height: '100%' }}
                >
                  {/* nav-bar */}
                  <SubMenu key="quick" title={<span><Icon type="home" />{i18n.t('nav-bar.title')}</span>}>
                    <Menu.Item key="9">option9</Menu.Item>
                    <Menu.Item key="10">option10</Menu.Item>
                    <Menu.Item key="11">option11</Menu.Item>
                    <Menu.Item key="12">option12</Menu.Item>
                  </SubMenu>
                  {/* language bar */}
                  <SubMenu key="languageBar" title={<span><Icon type="global" />{i18n.t('language-bar.switch')}</span>}>
                    {LANGUAGES.map((l)=><Menu.Item key={`language-bar.${l}`}><a href={`?locale=${l}`}>{i18n.t(`languages.${l}`)}</a></Menu.Item>)}
                  </SubMenu>
                  {/* personal bar */}
                  {
                    user.uid ?
                      <SubMenu key="personalBar" title={<span><Icon type="user" />{i18n.t('personal-bar.welcome', {name: user.name})}</span>}>
                        {plugins.dashboard(user).map((d) => {
                          return (<MenuItemGroup title={i18n.t(d.label)} key={d.label}>
                            { d.items.map((l)=> <Menu.Item key={l.href}><Link to={l.href}>{i18n.t(l.label)}</Link></Menu.Item>) }
                          </MenuItemGroup>
                          )
                        })}
                      </SubMenu> :
                      <SubMenu key="personalBar" title={<span><Icon type="user" />{i18n.t('personal-bar.sign-in-or-up')}</span>}>
                        {NonSignInLinks.map((l) => <Menu.Item key={l.href}><Link to={l.href}>{i18n.t(l.label)}</Link></Menu.Item>)}
                      </SubMenu>
                  }
                </Menu>
              </Sider>
              <Content style={{ padding: '0 24px', minHeight: 280 }}>
                {children}
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
  user: PropTypes.object.isRequired,
}


export default connect(
  state => ({user: state.currentUser}),
  {},
)(Widget)
