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
    <SmallSection style={{marginBottom: '40px'}}>
      <Link to={`/products/${id}`}>{title}</Link>
      <h2>{`Price: ${price}`}</h2>

      <Link to={`/products/${id}`}>
        <img className="product-list-img" src={image} />
      </Link>

      <form
        style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Input
          handleChange={handleChange}
          value={quantity}
          id={id}
          name="quantity"
          label="Quantity:"
        />
      </form>
      <button onClick={() => handleSubmit(id)}>Add To Cart</button>
    </SmallSection>
  )
}

export default ProductItem
