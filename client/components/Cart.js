import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getCart,
  fetchCart,
  addCartThunk,
  removeCartThunk
} from '../store/actions/cart'

class Cart extends Component {
  componentDidMount() {
    this.props.fetchCart()
  }

  render() {
    return (
      <div className="cart">
        <button
          onClick={() =>
            this.props.addCartThunk({productId: 5, quantity: 5, price: 3.25})
          }
        >
          Add item
        </button>
        <button
          onClick={() =>
            this.props.removeCartThunk(this.props.cart[0].productId)
          }
        >
          Remove item
        </button>
        <h1>This is the cart</h1>
        {this.props.cart.map(({productId, quantity, price}, i) => (
          <div key={i}>
            <h2>{productId}</h2>
            <p>{quantity}</p>
            <p>{price}</p>
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = ({cart}) => ({cart})

export default connect(mapStateToProps, {
  getCart,
  fetchCart,
  addCartThunk,
  removeCartThunk
})(Cart)
