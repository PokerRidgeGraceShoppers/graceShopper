import React from 'react'
import {Link} from 'react-router-dom'
import {SmallSection, Input} from '../common'

const ProductItem = ({
  handleChange,
  handleSubmit,
  price,
  title,
  id,
  image,
  quantity
}) => {
  return (
    <SmallSection
      className="product-item"
      style={{marginBottom: '40px', height: '200px'}}
    >
      <Link to={`/products/${id}`}>
        <div
          className="product-image"
          style={{backgroundImage: `url(${image})`}}
        />
      </Link>

      <Link to={`/products/${id}`}>{title}</Link>
      <h2>{`Price: $${Number.parseFloat(price / 100).toFixed(2)}`}</h2>

      <form style={{display: 'flex', justifyContent: 'space-between'}}>
        <Input
          handleChange={handleChange}
          value={quantity}
          id={id}
          name="quantity"
          label="Quantity:"
        />
      </form>
      <button className="btn-submit" onClick={() => handleSubmit(id)}>
        Add To Cart
      </button>
    </SmallSection>
  )
}

export default ProductItem
