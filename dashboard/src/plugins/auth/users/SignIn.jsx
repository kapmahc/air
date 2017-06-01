import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Form } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'

import Layout from '../NonSignIn'
import {Submit} from '../../../form'
import {post} from '../../../ajax'
import {signIn} from '../../../actions'
import {TOKEN} from '../../../constants'

class Widget extends Component{
  state = { email: '', password: '' }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = e => {
    e.preventDefault()
    const {push, signIn} = this.props
    var data = new URLSearchParams()
    data.append('email',this.state.email)
    data.append('password',this.state.password)
    post('/users/sign-in', data).then((rst) => {
      sessionStorage.setItem(TOKEN, rst.token)
      signIn(rst.token)
      push('/dashboard')
    }).catch(alert)
  }
  render() {
    const { email, password} = this.state;
    return (
      <Layout title="auth.users.sign-in.title">
        <Form onSubmit={this.handleSubmit}>
          <Form.Input name='email' value={email} onChange={this.handleChange} required type="email" label={<FormattedMessage id="attributes.email"/>} />
          <Form.Input name='password' value={password} onChange={this.handleChange} required type="password" label={<FormattedMessage id="attributes.password"/>} />
          <Submit />
        </Form>
      </Layout>
    )
  }
}


Widget.propTypes = {
  push: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired
}


export default connect(
  state => ({}),
  {push, signIn},
)(Widget)
