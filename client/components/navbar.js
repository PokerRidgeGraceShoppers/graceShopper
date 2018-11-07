import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store/actions'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div style={{position: 'relative'}} className="section-navbar">
    <h1>PokerRidgeGraceShopper</h1>
    <nav className="nav-items">
      <div className="nav-item">
        <Link to="/cart">Cart</Link>
        <Link to="/products">See all Products</Link>
      </div>
      {isLoggedIn ? (
        <div className="nav-item">
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to="/profile">Profile</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div className="nav-item">
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
