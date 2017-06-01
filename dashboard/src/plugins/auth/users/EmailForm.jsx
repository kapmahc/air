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
  state = { email: '' }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = e => {
    e.preventDefault()
    const {push, action} = this.props
    var data = new URLSearchParams()
    data.append('email',this.state.email)
    post(`/users/${action}`, data).then((rst) => {
      alert(rst.message)
      push('/users/sign-in')
    }).catch(alert)
  }
  render() {
    const {email} = this.state;
    const {action} = this.props;
    return (
      <Layout title={`auth.users.${action}.title`}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input name='email' value={email} onChange={this.handleChange} required type="email" label={<FormattedMessage id="attributes.email"/>} />
          <Submit />
        </Form>
      </Layout>
    )
  }
}


Widget.propTypes = {
  push: PropTypes.func.isRequired,
  action: PropTypes.string.isRequired,
}


export default connect(
  state => ({}),
  {push},
)(Widget)
