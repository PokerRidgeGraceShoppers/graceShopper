import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store/actions'
import {Menu, Header, Button} from 'semantic-ui-react'

const Navbar = ({handleClick, isLoggedIn}) => (
  <Menu inverted>
    <Header as="h1" inverted color="red">
      PokerRidgeGraceShopper
    </Header>

    <Menu.Item>
      <Link to="/products">See all Products</Link>
    </Menu.Item>

    <Menu.Item>
      <Link to="/cart">Cart</Link>
    </Menu.Item>

    {isLoggedIn ? (
      <Menu.Menu position="right">
        {/* The navbar will show these links after you log in */}
        <Menu.Item>
          <Link to="/home">Home</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/profile">Profile</Link>
        </Menu.Item>
        <Menu.Item>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </Menu.Item>
      </Menu.Menu>
    ) : (
      <Menu.Menu position="right">
        {/* The navbar will show these links before you log in */}
        <Menu.Item>
          <Button primary>
            <Link to="/signup">Sign Up</Link>
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button>
            <Link to="/login">Login</Link>
          </Button>
        </Menu.Item>
      </Menu.Menu>
    )}
  </Menu>
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
