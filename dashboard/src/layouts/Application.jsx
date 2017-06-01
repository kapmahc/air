import React from 'react'
import PropTypes from 'prop-types'
import {Container, Grid} from 'semantic-ui-react'

import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import Header from '../components/Header'

const Widget = ({children}) => (
  <div>
    <Header />
    <div style={{marginTop: '2.8em'}}/>
    <Sidebar>
      <br/>
      <Container>
        <Grid>{children}</Grid>
      </Container>
      <Footer />
    </Sidebar>
  </div>
)

Widget.propTypes = {
  children: PropTypes.node.isRequired
}

export default Widget
