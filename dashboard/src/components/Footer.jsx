import React from 'react'
import PropTypes from 'prop-types'
import { Segment, Container, Divider, List, Grid, Header } from 'semantic-ui-react'

const Group = ({title, links}) => (
  <Grid.Column width={3}>
    <Header inverted as="h4">{title}</Header>
    <List inverted link>
      {links.map((l,i) => <List.Item key={i} as="a">{l.label}</List.Item>)}
    </List>
  </Grid.Column>
)

Group.propTypes = {
  title: PropTypes.string.isRequired,
  links: PropTypes.array.isRequired
}

// -----------------------------------

const Detail = ({title, description}) => (
  <Grid.Column width={7}>
    <Header inverted>{title}</Header>
    <p>{description}</p>
  </Grid.Column>
)

Detail.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

// -----------------------------------

const Bottom = ({links}) => (
  <List horizontal inverted size="small" divided link>
    {links.map((l, i) => <List.Item key={i} as="a">{l.label}</List.Item>)}
  </List>
)

Bottom.propTypes = {
  links: PropTypes.array.isRequired
}

// -----------------------------------
const Widget = () => (
  <Segment inverted vertical color="grey" style={{margin: '4em 0em 0em', padding: '4em 0em'}}>
    <Container textAlign='center'>
      <Grid stackable divided>
        <Group
          title="Group 1"
          links={[
            {href:"/", label: "Link One"},
            {href:"/", label: "Link Two"},
            {href:"/", label: "Link Three"},
            {href:"/", label: "Link Four"},
          ]}
          />
        <Group
          title="Group 2"
          links={[
            {href:"/", label: "Link One"},
            {href:"/", label: "Link Two"},
            {href:"/", label: "Link Three"},
            {href:"/", label: "Link Four"},
          ]}
          />
        <Group
          title="Group 3"
          links={[
            {href:"/", label: "Link One"},
            {href:"/", label: "Link Two"},
            {href:"/", label: "Link Three"},
            {href:"/", label: "Link Four"},
          ]}
          />
        <Detail
          title="Footer Header"
          description = "Extra space for a call to action inside the footer that could help re-engage users."
          />
      </Grid>
      <Divider section inverted/>
      <Bottom
        links = {[
          {href: "/", label: "Site Map"},
          {href: "/", label: "Contact Us"},
          {href: "/", label: "Terms and Conditions"},
          {href: "/", label: "Privacy Policy"}
        ]}
        />
    </Container>
  </Segment>
)

export default Widget
