import React, { Component } from 'react'
import {FormattedMessage} from 'react-intl'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {Card, Row, Col} from 'antd'

import Layout from '../../layouts/Application'

class Widget extends Component {
  render() {
    const {donates} = this.props
    return (
      <Layout breads={[{href:'/donates', label: 'site.donates.title'}]}>
        <Row gutter={16}>
          {Object.entries(donates).map((v, i)=>(<Col key={i} md={{span:8}}>
            <Card title={<FormattedMessage id={`site.donates.by-${v[0]}`} />}>              
              <div dangerouslySetInnerHTML={{__html: v[1]}} />
            </Card>
            <br/>
          </Col>))}
        </Row>
      </Layout>
    );
  }
}


Widget.propTypes = {
  donates: PropTypes.object.isRequired,
}


export default connect(
  state => ({
    donates: state.siteInfo.donates ? state.siteInfo.donates : {},
  }),
  {},
)(Widget)
