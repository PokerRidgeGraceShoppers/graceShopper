import React from 'react'
import {SectionRow} from '../common'
import QuantityButton from '../Quantity'

const CartItem = ({
  id,
  title,
  cart,
  handleClickQuantity,
  removeCartThunk,
  image
}) => {
  return (
    <SectionRow style={{justifyContent: 'space-between', width: '80%'}}>
      <h2>{title}</h2>
      <SectionRow style={{width: '40%', justifyContent: 'space-between'}}>
        <img src={image} height="42" width="42" />
        <QuantityButton
          id={id}
          handleClickQuantity={handleClickQuantity}
          quantity={cart[id].quantity}
        />
        <p>{cart[id].price}</p>
        <button onClick={() => removeCartThunk(id)}>Remove</button>
      </SectionRow>
    </SectionRow>
  )
}

export default CartItem
