import React from 'react'
import {SectionRow, SectionColumn} from './common'
import {Button} from 'semantic-ui-react'

const Quantity = ({quantity, id, handleClickQuantity}) => {
  return (
    <SectionRow>
      <p>{quantity}</p>
      <SectionColumn>
        <button className="btn-inc" onClick={() => handleClickQuantity(1, id)}>
          +
        </button>
        <button className="btn-inc" onClick={() => handleClickQuantity(-1, id)}>
          -
        </button>
      </SectionColumn>
    </SectionRow>
  )
}

export default Quantity
