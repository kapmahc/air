import React, { Component } from 'react'
import {message} from 'antd'

import Layout from '../../../layouts/Application'
import {get} from '../../../ajax'
import Item from './Item'

class Widget extends Component {
  state = { item: {updatedAt: '', body: ''}}
  componentWillReceiveProps(newProps){
    this.loadItem(newProps.match.params.name)
  }
  componentDidMount () {
    this.loadItem(this.props.match.params.name)
  }
  loadItem = (name) => get(`/posts/0?name=${name}`).then((rst)=>this.setState({item:rst})).catch(message.error)
  render() {
    const {name} = this.props.match.params
    const {item} = this.state
    return (
      <Layout breads={[{href: '/posts', label: 'site.posts.index.title'}, {href: `/posts/${name}`, label: 'buttons.show'}]}>
        <Item value={item}/>
      </Layout>
    );
  }
}

export default Widget;
