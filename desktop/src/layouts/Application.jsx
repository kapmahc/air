import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu, Breadcrumb, Icon, Modal, message } from 'antd';
import {injectIntl, intlShape, FormattedMessage} from 'react-intl'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import {Link} from 'react-router-dom'

import Header from '../components/Header'
import Footer from '../components/Footer'
import {NonSignInLinks, TOKEN} from '../constants'
import {setLocale} from '../intl'
import {signIn, signOut, refresh} from '../actions'
import {get, _delete} from '../ajax'
import menus from '../menus'

const { SubMenu } = Menu;
const { Content, Sider} = Layout;
const confirm = Modal.confirm;

class WidgetF extends Component {
  handleMenu = ({key}) => {
    const {push, signOut} = this.props
    const {formatMessage} = this.props.intl

    const to = 'to-'
    if(key.startsWith(to)){
      push(key.substring(to.length))
      return
    }

    const lng = 'language-'
    if(key.startsWith(lng)){
      setLocale(key.substring(lng.length))
      return
    }

    switch (key) {
      case 'auth.users.sign-out':
        confirm({
          title: formatMessage({id: "messages.are-you-sure"}),
          onOk() {
            _delete('/users/sign-out').then((rst) => {
              signOut()
              sessionStorage.removeItem(TOKEN)
              push('/')
              message.success(formatMessage({id: 'messages.success'}))
            }).catch(message.error)
          }
        });
        break;
      default:
        console.error(key)
    }
  }
  componentDidMount () {
    const {info, user, signIn, refresh} = this.props
    if (!user.uid) {
      const token = sessionStorage.getItem(TOKEN)
      if(token){
        signIn(token)
      }
    }
    if (info.languages.length === 0) {
      get('/site/info')
        .then(rst => {
          refresh(rst)
          document.title = `${rst.subTitle} | ${rst.title}`
        })
        .catch(message.error)
    }
  }
  render() {
    const {children, user, info, breads} = this.props
    return (
      <Layout>
        <Header />
        <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            width={200}
            style={{ background: '#fff' }}>
            <Menu
              onClick={this.handleMenu}
              mode="inline"
              defaultSelectedKeys={[]}
              defaultOpenKeys={['nav-bar', 'language-bar', 'personal-bar']}
              style={{ height: '100%' }}
            >
              {/* language bar */}
              <SubMenu key="language-bar" title={<span><Icon type="global" /> <FormattedMessage id='sider.language-bar.title' /></span>}>
                {info.languages.map((l)=><Menu.Item key={`language-${l}`}> <FormattedMessage id={`languages.${l}`}/></Menu.Item>)}
              </SubMenu>
              {/* nav bar */}
              <SubMenu key="nav-bar" title={<span><Icon type="home" /> <FormattedMessage id="sider.nav-bar.title"/></span>}>
                {info.links.filter((l) => l.loc === 'sider').map((l) => <Menu.Item key={`to-${l.href}`}><FormattedMessage id={l.label}/></Menu.Item>)}
              </SubMenu>
              {/* personal bar */}
              { user.uid ?
                  <SubMenu key="personal-bar" title={<span><Icon type="tool" /><FormattedMessage id="sider.personal-bar.welcome" values={{name:user.name}}/></span>}>
                    {menus(user).map((m,i)=><SubMenu key={`personal-bar-${i}`} title={<span><Icon type={m.icon}/> <FormattedMessage id={m.label}/></span>}>{m.items.map((l) => <Menu.Item key={`to-${l.href}`}><FormattedMessage id={l.label}/></Menu.Item>)}</SubMenu>)}
                    <Menu.Item key={'auth.users.sign-out'}><Icon type="logout" /> <FormattedMessage id="sider.personal-bar.sign-out"/></Menu.Item>
                  </SubMenu> :
                  <SubMenu key="personal-bar" title={<span><Icon type="user" /><FormattedMessage id="sider.personal-bar.sign-in-or-up"/></span>}>
                    {NonSignInLinks.map((l) => <Menu.Item key={`to-${l.href}`}><FormattedMessage id={l.label}/></Menu.Item>)}
                  </SubMenu>
              }
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '12px 0' }}>
              <Breadcrumb.Item><Link to="/"><FormattedMessage id="site.home.title"/></Link></Breadcrumb.Item>
              {breads.map((l,i) => <Breadcrumb.Item key={i}><Link to={l.href}><FormattedMessage id={l.label}/></Link></Breadcrumb.Item>)}
            </Breadcrumb>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
              {children}
            </Content>
            <Footer />
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

WidgetF.propTypes = {
  children: PropTypes.node.isRequired,
  push: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  info: PropTypes.object.isRequired,
  breads: PropTypes.array.isRequired,
  intl: intlShape.isRequired,
}


const Widget = injectIntl(WidgetF)

export default connect(
  state => ({
    user: state.currentUser,
    info: state.siteInfo,
  }),
  {push, signIn, refresh, signOut},
)(Widget)
