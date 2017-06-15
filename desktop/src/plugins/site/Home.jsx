import React, { Component } from 'react'
import {FormattedMessage} from 'react-intl'

class Widget extends Component {
  render() {
    return (
      <div>
        <FormattedMessage id="buttons.submit"/>
      </div>
    );
  }
}

export default Widget;
