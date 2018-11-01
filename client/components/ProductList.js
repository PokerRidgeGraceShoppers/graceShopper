import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {SmallSection, ColumnWrap, SectionColumn} from './common'
import {updateQuantity} from '../store/actions/products'
import {addCartThunk} from '../store/actions/cart'

class ProductList extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(e, id) {
    const updatedProduct = {
      ...this.props.products[id],
      quantity: Number(e.target.value)
    }
    this.props.updateQuantity(id, updatedProduct)
  }

  handleSubmit(id) {
    this.props.addCartThunk(id)
  }

  render() {
    const products = this.props.products
    return (
      <SectionColumn>
        <h1> ProductList </h1>
        <ColumnWrap>
          {Object.keys(products).map(productId => {
            const {id, title, price, image, quantity} = products[productId]
            return (
              <SmallSection style={{marginBottom: '40px'}} key={id}>
                <Link to={`/products/${id}`}>{title}</Link>
                <h2>{`Price: ${price}`}</h2>
                <img className="product-list-img" src={image} />
                <form
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                >
                  <label style={{paddingRight: '10px'}} htmlFor="quantity">
                    Quantity:
                  </label>
                  <input
                    style={{width: '20px'}}
                    onChange={e => this.handleChange(e, id)}
                    value={quantity}
                    name="quantity"
                    type="number"
                    min="0"
                  />
                </form>
                <button onClick={() => this.handleSubmit(id)}>
                  Add To Cart
                </button>
              </SmallSection>
            )
          })}
        </ColumnWrap>
      </SectionColumn>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products.products
})

export default connect(mapStateToProps, {updateQuantity, addCartThunk})(
  ProductList
)
