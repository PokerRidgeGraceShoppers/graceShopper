import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getCart,
  fetchCart,
  addCartThunk,
  removeCartThunk
} from '../store/actions/cart'
import {SmallSection, SectionColumn} from './common'

class Cart extends Component {
  render() {
    return (
      <SectionColumn>
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
        {console.log(this.props.cart)}
        {this.props.cart.map(({price, title, description, id}) => (
          <SmallSection key={id}>
            <h2>{title}</h2>
            <p>{price}</p>
            <p>{description}</p>
          </SmallSection>
        ))}
      </SectionColumn>
    )
  }
}

const mapStateToProps = ({cart, products}) => ({
  cart,
  products: products.products
})

export default connect(mapStateToProps, {
  getCart,
  fetchCart,
  addCartThunk,
  removeCartThunk
})(Cart)
