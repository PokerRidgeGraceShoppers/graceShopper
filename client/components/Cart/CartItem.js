import React from 'react'
import {SectionRow} from '../common'
import QuantityButton from '../Quantity'
import {Link} from 'react-router-dom'

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
      <Link to={`/products/${id}`}>
        <h2>{title}</h2>
      </Link>
      <SectionRow style={{width: '40%', justifyContent: 'space-between'}}>
        <img src={image} height="42" width="42" />
        <QuantityButton
          id={id}
          handleClickQuantity={handleClickQuantity}
          quantity={cart[id].quantity}
        />
        <p>{`$${Number.parseFloat(
          cart[id].quantity * cart[id].price / 100
        ).toFixed(2)}`}</p>
        <button className="btn-remove" onClick={() => removeCartThunk(id)}>
          Remove
        </button>
      </SectionRow>
    </SectionRow>
  )
}

export default CartItem
