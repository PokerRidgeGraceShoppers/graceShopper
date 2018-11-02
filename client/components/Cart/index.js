import React, {Component} from 'react'
import {connect} from 'react-redux'
import CartList from './CartList'
import {SectionColumn} from '../common'
import {
  addCartThunk,
  removeCartThunk,
  updateCartThunk
} from '../../store/actions/cart'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.handleClickQuantity = this.handleClickQuantity.bind(this)
  }
  handleClickQuantity(n, id) {
    const {cart} = this.props
    const quantity = cart[id].quantity + n
    if (quantity > 0) this.props.updateCartThunk(id, {quantity})
  }

  render() {
    const {cart, products} = this.props
    return (
      <SectionColumn style={{minWidth: '800px'}}>
        <CartList
          cart={cart}
          products={products}
          handleClickQuantity={this.handleClickQuantity}
          removeCartThunk={this.props.removeCartThunk}
        />
      </SectionColumn>
    )
  }
}

const mapStateToProps = ({cart, products}) => ({
  cart,
  products: products.products
})

export default connect(mapStateToProps, {
  addCartThunk,
  removeCartThunk,
  updateCartThunk
})(Cart)
