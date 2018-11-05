import React from 'react'
import CartItem from './CartItem'
import {SectionRow, SmallSection} from '../common'

const CartList = ({
  cart,
  products,
  handleClickQuantity,
  removeCartThunk,
  updateTotal
}) => {
  let total = 0
  return (
    <SmallSection style={{width: '90%'}}>
      <h1>This is the cart</h1>

      {Object.keys(cart).map(id => {
        const {title} = products[id]
        total = products[id].price * cart[id].quantity + total
        return (
          <CartItem
            key={id}
            id={id}
            title={title}
            cart={cart}
            handleClickQuantity={handleClickQuantity}
            removeCartThunk={removeCartThunk}
            products={products}
            image={products[id].image}
            price={products[id].price}
          />
        )
      })}
      {/* {updateTotal(total)} */}
      <SectionRow style={{justifyContent: 'space-between', width: '80%'}}>
        <h2>Total</h2>
        {total}
        <SectionRow style={{width: '40%'}}>
          <p>Create A total in Redux</p>
        </SectionRow>
      </SectionRow>
    </SmallSection>
  )
}

export default CartList
