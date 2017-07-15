import React, { Component } from 'react'
import {message, Card} from 'antd'
import TimeAgo from 'timeago-react'
import Markdown from 'react-markdown'

import Layout from '../../../layouts/Application'
import {get} from '../../../ajax'

class Widget extends Component {
  state = { items: []}
  componentDidMount () {
    get('/notices').then(
      function (rst){
        this.setState({items: rst})
      }.bind(this)
    ).catch(message.error)
  }
  render() {
    return (
      <Layout breads={[{href: '/posts', label: 'site.posts.index.title'}]}>
        {this.state.items.map((n, i)=><Card title={<TimeAgo datetime={n.updatedAt}/>} style={{margin: '16px'}} key={i}><Markdown source={n.body} /></Card>)}
      </Layout>
    );
  }
}

export default Widget;
