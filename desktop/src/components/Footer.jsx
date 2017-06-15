import React, { Component } from 'react';
import { Layout, BackTop } from 'antd';

const { Footer } = Layout;

class Widget extends Component {
  render() {
    return (
      <Footer>
        footer
        <BackTop />
      </Footer>
    );
  }
}

export default Widget;
