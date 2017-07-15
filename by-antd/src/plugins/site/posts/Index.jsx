import React, { Component } from 'react'
import {message} from 'antd'

import Layout from '../../../layouts/Application'
import {get} from '../../../ajax'
import Item from './Item'

class Widget extends Component {
  state = { items: []}
  componentDidMount () {
    get('/posts').then(
      function (rst){
        this.setState({items: rst})
      }.bind(this)
    ).catch(message.error)
  }
  render() {
    return (
      <Layout breads={[{href: '/posts', label: 'site.posts.index.title'}]}>
        {this.state.items.map((p, i)=><Item key={i} value={p}/>)}
      </Layout>
    );
  }
}

export default Widget;
