import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import {connect} from 'react-redux'
import {fetchProducts} from './store/reducers/products'

class App extends React.Component {
  componentDidMount() {
    this.props.loadProducts()
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

const mapDispatchToProps = dispatch => ({
  loadProducts: () => dispatch(fetchProducts())
})
export default connect(null, mapDispatchToProps)(App)
