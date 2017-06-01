import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Form } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'

import Layout from '../NonSignIn'
import {Submit} from '../../../form'
import {post} from '../../../ajax'

class Widget extends Component{
  state = { name: '', email: '', password: '', passwordConfirmation: '' }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = e => {
    e.preventDefault()
    const {push} = this.props
    var data = new URLSearchParams()
    data.append('name',this.state.name)
    data.append('email',this.state.email)
    data.append('password',this.state.password)
    data.append('passwordConfirmation',this.state.passwordConfirmation)
    post('/users/sign-up', data).then((rst) => {
      alert(rst.message)
      push('/users/sign-in')
    }).catch(alert)
  }
  render() {
    const {name, email, password, passwordConfirmation} = this.state;
    return (
      <Layout title="auth.users.sign-up.title">
        <Form onSubmit={this.handleSubmit}>
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
