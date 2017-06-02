import {Component} from 'react'
import { withRouter } from 'react-router'

// https://github.com/ReactTraining/react-router/issues/2019
class Widget extends Component {
  componentDidUpdate(prevProps) {    
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return this.props.children
  }
}

export default withRouter(Widget)
