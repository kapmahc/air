import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { Form, Icon, Input, Button, Checkbox } from 'antd'

import Layout from '../NonSignIn'
import {post} from '../../../ajax'
import {signIn} from '../../../actions'
import {TOKEN} from '../../../constants'

const FormItem = Form.Item

class WidgetF extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Layout title="auth.users.sign-in.title">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Remember me</Checkbox>
            )}
            <a className="login-form-forgot" href="">Forgot password</a>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <a href="">register now!</a>
          </FormItem>
        </Form>
      </Layout>
    );
  }
}


// class Widget1 extends Component{
//   state = { email: '', password: '' }
//
//   handleChange = (e, { name, value }) => this.setState({ [name]: value })
//
//   handleSubmit = e => {
//     e.preventDefault()
//     const {push, signIn} = this.props
//     var data = new URLSearchParams()
//     data.append('email',this.state.email)
//     data.append('password',this.state.password)
//     post('/users/sign-in', data).then((rst) => {
//       sessionStorage.setItem(TOKEN, rst.token)
//       signIn(rst.token)
//       push('/dashboard')
//     }).catch(alert)
//   }
//   render() {
//     const { email, password} = this.state;
//     return (
//       <Layout title="auth.users.sign-in.title">
//         <Form onSubmit={this.handleSubmit}>
//           <Form.Input name='email' value={email} onChange={this.handleChange} required type="email" label={<FormattedMessage id="attributes.email"/>} />
//           <Form.Input name='password' value={password} onChange={this.handleChange} required type="password" label={<FormattedMessage id="attributes.password"/>} />
//         </Form>
//       </Layout>
//     )
//   }
// }


WidgetF.propTypes = {
  push: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired
}

const Widget = Form.create()(WidgetF);

export default connect(
  state => ({}),
  {push, signIn},
)(Widget)
