import React, { Component } from 'react'
import {FormattedMessage} from 'react-intl'

import Layout from '../../layouts/Application'

class Widget extends Component {
  render() {
    return (
      <Layout>
        <div>
          home
          <FormattedMessage id="buttons.submit"/>
        </div>
      </Layout>
    );
  }
}

export default Widget;
