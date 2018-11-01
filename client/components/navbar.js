import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store/actions/users'
import Dropdown from './common/Dropdown'

//search term
//category term

const Navbar = ({handleClick, isLoggedIn, products}) => (
  <div style={{position: 'relative'}}>
    <h1>PokerRidgeGraceShopper</h1>
    <nav>
      <div>
        <Dropdown>
          <ul>Category 1</ul>
          <ul>Category 2</ul>
          <ul>Category 3</ul>
          <ul>Category 4</ul>
          <ul>Category 5</ul>
          <ul>Category 6</ul>
        </Dropdown>

        <input placeholder="a thing" />
      </div>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/products">See all Products</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    products: state.products.products
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

//          {Object.keys(products).map(productId => {
//   const {category} = products[productId]
//   return <li key={productId}>{category}</li>
// })}
