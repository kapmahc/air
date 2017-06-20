import React from 'react'
import PropTypes from 'prop-types'
import TimeAgo from 'timeago-react'
import Markdown from 'react-markdown'
import {Link} from 'react-router-dom'

const Widget = ({value}) => (<div style={{padding: "16px 0"}}>
    <h2><Link to={`/posts/${value.name}`}>{value.title}</Link></h2>
    <TimeAgo datetime={value.updatedAt}/>
    <Markdown source={value.body} />
  </div>)


Widget.propTypes = {
  value: PropTypes.object.isRequired,
}

export default Widget
