import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {user} = props

  return (
    <div>
      <h3>
        Welcome, {user.firstname} {user.lastName}
      </h3>
      <Link to={'/products'}>
        <h3>Click here to see our products!</h3>
      </Link>
      <Link to={'/profile'}>
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
    email: state.user.email,
    user: state.user
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
