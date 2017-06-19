import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {Card, Row, Col, Button} from 'antd'
import Markdown from 'react-markdown'
import { push } from 'react-router-redux'

import Layout from '../../layouts/Application'

class Widget extends Component {
  render() {
    const {cards, push} = this.props
    return (
      <Layout breads={[]}>
        <Row gutter={16}>
          {cards.filter((o)=>o.loc === 'home').map((o, i)=>(<Col key={i} md={{span:8}}>
            <Card title={o.title}>
              <img alt="o.title" width="100%" src={o.logo} />
              <Markdown source={o.summary}/>
              <div>
                <Button onClick={()=>push(o.href)} type="primary">{o.action}</Button>
              </div>
            </Card>
            <br/>
          </Col>))}
        </Row>
      </Layout>
    );
  }
}


Widget.propTypes = {
  cards: PropTypes.array.isRequired,
  push: PropTypes.func.isRequired,
}


export default connect(
  state => ({
    cards: state.siteInfo.cards ? state.siteInfo.cards : [],
  }),
  {push},
)(Widget)
