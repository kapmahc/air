import React, { Component } from 'react'
import { Collapse, message } from 'antd';
import {injectIntl, intlShape, FormattedMessage} from 'react-intl'

import Layout from '../../../../layouts/Dashboard'
import {get} from '../../../../ajax'

const Panel = Collapse.Panel;

class WidgetF extends Component {
  state = {
    database: {},
    os: {},
    jobs: {},
    network: {},
    cache: [],
    routes: []
  }
  componentDidMount () {
    get('/admin/site/status').then(
      function (rst){
        this.setState(rst)
      }.bind(this)).catch(message.error)
  }
  render() {
    const zone = (k, o) => (<Panel header={<FormattedMessage id={`site.admin.status.${k}`}/>} key={k}>
      <table width="100%">
        <tbody className="ant-table-tbody">
          {Object.entries(o).map((v, i)=><tr key={i}><td>{v[0]}</td><td>{v[1]}</td></tr>)}
        </tbody>
      </table>
    </Panel>)
    return (
      <Layout admin breads={[{href: '/admin/site/status', label: 'site.admin.status.title'}]}>
        <Collapse defaultActiveKey={['os']}>
          {zone('os', this.state.os)}
          {zone('network', this.state.network)}
          {zone('database', this.state.database)}
          {zone('jobs', this.state.jobs)}

          <Panel header={<FormattedMessage id={'site.admin.status.cache'}/>} key="cache">
            <table width="100%">
              <tbody className="ant-table-tbody">
                {this.state.cache.map((v, i)=><tr key={i}><td>{v}</td></tr>)}
              </tbody>
            </table>
          </Panel>

          <Panel header={<FormattedMessage id={'site.admin.status.routes'}/>} key="routes">
            <table width="100%">
              <thead className="ant-table-thead">
                <tr>
                  <th>METHOD</th>
                  <th>PATH</th>
                </tr>
              </thead>
              <tbody className="ant-table-tbody">
                {this.state.routes.map((r, i)=><tr key={i}><td>{r.method}</td><td>{r.path}</td></tr>)}
              </tbody>
            </table>
          </Panel>

        </Collapse>
      </Layout>
    );
  }
}


WidgetF.propTypes = {
  intl: intlShape.isRequired,
}

export default injectIntl(WidgetF)
