import React, { Component } from 'react'
import {message} from 'antd'

import Layout from '../../../layouts/Application'
import {get} from '../../../ajax'
import Item from './Item'

class Widget extends Component {
  state = { item: {updatedAt: '', body: ''}}
  componentDidMount () {
    const {id} = this.props.match.params
    get(`/posts/${id}`).then((rst)=>this.setState({item:rst})).catch(message.error)
  }
  render() {
    const {id} = this.props.match.params
    const {item} = this.state
    return (
      <Layout breads={[{href: '/posts', label: 'site.posts.index.title'}, {href: `/posts/${id}`, label: 'buttons.show'}]}>
        <Item value={item}/>
      </Layout>
    );
  }
}

export default Widget;
