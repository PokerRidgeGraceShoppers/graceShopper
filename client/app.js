import React from 'react'
import {withRouter} from 'react-router-dom'
import {Navbar} from './components'
import Routes from './routes'
import {connect} from 'react-redux'
import {fetchProducts} from './store/actions/products'
import {fetchCart} from './store/actions/cart'

class App extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
  }
  render() {
    return (
      <div>
        <Navbar />
        <Routes />
      </div>
    )
  }
}

export default withRouter(connect(null, {fetchProducts, fetchCart})(App))
