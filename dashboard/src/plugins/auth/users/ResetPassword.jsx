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
  state = { password: '', passwordConfirmation: '' }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = e => {
    e.preventDefault()
    const {push, match} = this.props
    var data = new URLSearchParams()
    data.append('token', match.params.token)
    data.append('password', this.state.password)
    data.append('passwordConfirmation', this.state.passwordConfirmation)
    post('/users/reset-password', data).then((rst) => {
      alert(rst.message)
      push('/users/sign-in')
    }).catch(alert)
  }
  render() {
    const {password, passwordConfirmation} = this.state;
    return (
      <Layout title="auth.users.reset-password.title">
        <Form onSubmit={this.handleSubmit}>
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
