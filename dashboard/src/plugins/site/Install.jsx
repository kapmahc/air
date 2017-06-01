import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Form } from 'antd'
import { FormattedMessage } from 'react-intl'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'

import Layout from '../auth/NonSignIn'
import {Submit} from '../../form'
import {post} from '../../ajax'

const FormItem = Form.Item

class Widget extends Component{
  state = { title: '', subTitle: '', name: '', email: '', password: '', passwordConfirmation: '' }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = e => {
    e.preventDefault()
    const {push} = this.props
    var data = new URLSearchParams()
    data.append('title',this.state.title)
    data.append('subTitle',this.state.subTitle)
    data.append('name',this.state.name)
    data.append('email',this.state.email)
    data.append('password',this.state.password)
    data.append('passwordConfirmation',this.state.passwordConfirmation)
    post('/install', data).then((rst) => {
      alert(rst.message)
      push('/users/sign-in')
    }).catch(alert)
  }
  render() {
    const {title, subTitle, name, email, password, passwordConfirmation} = this.state;
    return (
      <Layout title="site.install.title">
        <Form onSubmit={this.handleSubmit}>
          <Form.Input name='title' value={title} onChange={this.handleChange}  required label={<FormattedMessage id="site.attributes.title"/>} />
          <Form.Input name='subTitle' value={subTitle} onChange={this.handleChange} required label={<FormattedMessage id="site.attributes.subTitle"/>} />
          <Form.Input name='name' value={name} onChange={this.handleChange} required label={<FormattedMessage id="attributes.fullName"/>} />
          <Form.Input name='email' value={email} onChange={this.handleChange} required type="email" label={<FormattedMessage id="attributes.email"/>} />
          <Form.Input name='password' value={password} onChange={this.handleChange} required type="password" label={<FormattedMessage id="attributes.password"/>} />
          <Form.Input name='passwordConfirmation' value={passwordConfirmation} onChange={this.handleChange} required type="password" label={<FormattedMessage id="attributes.passwordConfirmation"/>} />
          <Submit />
        </Form>
      </Layout>
    )
  }
}


Widget.propTypes = {
  push: PropTypes.func.isRequired
}


export default connect(
  state => ({}),
  {push},
)(Widget)
