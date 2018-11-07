import React, {Component} from 'react'
import CartItem from './CartItem'
import {SectionRow, SmallSection} from '../common'
import {withRouter} from 'react-router-dom'

class CartList extends Component {
  render() {
    console.log('creating wrapper for cartList')

    const {
      cart,
      products,
      handleClickQuantity,
      removeCartThunk,
      history
    } = this.props

    return (
      <SmallSection style={{width: '90%'}}>
        <h1>This is the cart</h1>
        {Object.keys(cart).map(id => {
          const {title} = products[id]
          return (
            <CartItem
              key={id}
              id={id}
              title={title}
              cart={cart}
              handleClickQuantity={handleClickQuantity}
              removeCartThunk={removeCartThunk}
              image={products[id].image}
              price={products[id].price}
            />
          )
        })}
        <SectionRow style={{justifyContent: 'space-between', width: '80%'}}>
          <h2>Total</h2>
          <SectionRow
            style={{
              alignItems: 'flex-end',
              paddingRight: '13%',
              justifyContent: 'space-between'
            }}
          >
            <h2>
              {`$${Number.parseFloat(
                Object.keys(cart).reduce((acc, currItem) => {
                  return acc + cart[currItem].total
                }, 0) / 100
              ).toFixed(2)}`}
            </h2>
          </SectionRow>

          <button
            className="btn-submit"
            onClick={() => {
              history.push('/checkout')
            }}
          >
            Checkout
          </button>
        </SectionRow>
      </SmallSection>
    )
  }
}

export default withRouter(CartList)
