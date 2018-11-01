import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getCart,
  fetchCart,
  addCartThunk,
  removeCartThunk
} from '../store/actions/cart'
import {SectionRow, SectionColumn, SmallSection} from './common'

class Cart extends Component {
  render() {
    const {cart, products} = this.props
    let total = 0
    return (
      <SectionColumn>
        <SmallSection style={{width: '90%'}}>
          <h1>This is the cart</h1>
          {Object.keys(cart).map(id => {
            const {title, price} = products[id]
            total += parseFloat(price)
            return (
              <SectionRow
                style={{justifyContent: 'space-between', width: '80%'}}
                key={id}
              >
                <h2>{title}</h2>
                <SectionRow
                  style={{width: '40%', justifyContent: 'space-between'}}
                >
                  <p>{cart[id].quantity}</p>
                  <p>{price}</p>
                  <button onClick={() => this.props.removeCartThunk(id)}>
                    Remove
                  </button>
                </SectionRow>
              </SectionRow>
            )
          })}
          <SectionRow style={{justifyContent: 'space-between', width: '80%'}}>
            <h2>Total</h2>
            <SectionRow style={{width: '40%'}}>
              <p>{total.toFixed(2)}</p>
            </SectionRow>
          </SectionRow>
        </SmallSection>
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
