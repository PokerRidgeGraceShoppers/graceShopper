import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {user} = props

  console.log('props', props)

  return (
    <div id="userData">
      <h2 className="userName">
        Welcome, {user.firstName} {user.lastName}
      </h2>
      <h2 className="userEmail">Email: {user.email}</h2>
      <Link to="/products">
        <h3>Click here to see our products!</h3>
      </Link>
      <Link to="/profile">
        <h3>Click here to see your profile!</h3>
      </Link>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string
}
