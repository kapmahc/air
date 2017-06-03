import React, {Component} from 'react'
import PropTypes from 'prop-types'
import i18n from 'i18next'
import {Row, Col, Card} from 'antd'
// import TimeAgo from 'timeago-react'

import Layout from '../../../layouts/Dashboard'
import {get} from '../../../ajax'

const Panel = ({name, value}) => (
  <Card title={i18n.t(`site.admin.status.${name}`)}>
    {Object.entries(value).map((v,i)=><p key={i}>{v[0]}: {v[1]}</p>)}
  </Card>
)

Panel.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.object.isRequired,
}

class Widget extends Component{
  state = {
    database: {},
    os: {},
    network: {},
    jobs: {},
    routes: [],
    cache: [],
  }
  componentDidMount () {
    get('/admin/site/status').then(
      function (rst){
        this.setState(rst)
      }.bind(this)
    )
  }
  render () {
    return (
      <Layout breadcrumb={[{label: 'site.admin.status.title', href: '/admin/site/status'}]}>
        <Row gutter={16}>
          <Col span={24} className="my-gutter-box">
            <Panel name="os" value={this.state.os}/>
          </Col>
          <Col span={24} className="my-gutter-box">
            <Panel name="network" value={this.state.network}/>
          </Col>
          <Col span={24} className="my-gutter-box">
            <Panel name="database" value={this.state.database}/>
          </Col>
          <Col span={24} className="my-gutter-box">
            <Panel name="jobs" value={this.state.jobs}/>
          </Col>
          <Col xs={24} sm={12} className="my-gutter-box">
            <Card title={i18n.t('site.admin.status.cache')}>
              {this.state.cache.map((v,i)=><p key={i}>{v}</p>)}
            </Card>
          </Col>
          <Col xs={24} sm={12} className="my-gutter-box">
            <Card title={i18n.t('site.admin.status.routes')}>
              {this.state.routes.map((v,i)=><p key={i}>{v.method} {v.path}</p>)}
            </Card>
          </Col>
        </Row>
      </Layout>
    )
  }
}

export default Widget
