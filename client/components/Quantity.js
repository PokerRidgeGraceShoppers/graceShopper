import React from 'react'
import {SectionRow, SectionColumn} from './common'
import {Button} from 'semantic-ui-react'

const Quantity = ({quantity, id, handleClickQuantity}) => {
  return (
    <SectionRow>
      <p>{quantity}</p>
      <SectionColumn>
        <Button onClick={() => handleClickQuantity(1, id)}>+</Button>
        <Button onClick={() => handleClickQuantity(-1, id)}>-</Button>
      </SectionColumn>
    </SectionRow>
  )
}

export default Quantity
