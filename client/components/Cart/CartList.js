import React from 'react'
import CartItem from './CartItem'
import {SectionRow, SmallSection} from '../common'

const CartList = ({cart, products, handleClickQuantity, removeCartThunk}) => {
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
          />
        )
      })}
      <SectionRow style={{justifyContent: 'space-between', width: '80%'}}>
        <h2>Total</h2>
        <SectionRow style={{width: '40%'}}>
          <p>Create A total in Redux</p>
        </SectionRow>
      </SectionRow>
    </SmallSection>
  )
}

export default CartList
