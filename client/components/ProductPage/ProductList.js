import React from 'react'
import {ColumnWrap} from '../common'
import ProductItem from './ProductItem'

const ProductList = ({products, handleSubmit, handleChange}) => {
  return (
    <ColumnWrap>
      {Object.keys(products).map(id => (
        <ProductItem
          key={id}
          {...products[id]}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      ))}
    </ColumnWrap>
  )
}

export default ProductList
