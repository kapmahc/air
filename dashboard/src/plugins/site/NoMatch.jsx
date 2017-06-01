import React from 'react'
import {Grid, Card, Image} from 'semantic-ui-react'

import fail from '../../images/fail.png'
import Layout from '../../layouts/Application'

const Widget = () => (
  <Layout>
    <Grid.Row centered columns={3}>
      <Grid.Column>
        <Card>
          <Image src={fail} />
          <Card.Content>
            <Card.Header>
              <FormattedMessage id="errors.not-found"/>
            </Card.Header>
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid.Row>
  </Layout>
)

export default Widget
