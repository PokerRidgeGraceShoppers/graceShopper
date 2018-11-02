import React from 'react'
import {SectionRow, SectionColumn} from './common'

const Quantity = ({quantity, id, handleClickQuantity}) => {
  return (
    <SectionRow>
      <p>{quantity}</p>
      <SectionColumn>
        <button onClick={() => handleClickQuantity(1, id)}>+</button>
        <button onClick={() => handleClickQuantity(-1, id)}>-</button>
      </SectionColumn>
    </SectionRow>
  )
}

export default Quantity
