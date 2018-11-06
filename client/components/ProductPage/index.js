import React from 'react'
import {connect} from 'react-redux'
import {SectionColumn} from '../common'
import {addCartThunk, updateQuantity} from '../../store/actions'
import ProductList from './ProductList'

class ProductPage extends React.Component {
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

    console.log(updatedProduct.quantity)

    if (updatedProduct.quantity > 0 && updatedProduct.quantity < 11) {
      this.props.updateQuantity(id, updatedProduct)
    }
  }

  handleSubmit(id) {
    this.props.addCartThunk(id)
  }

  render() {
    return (
      <SectionColumn>
        <h1> ProductList </h1>
        <ProductList
          products={this.props.products}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </SectionColumn>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products.products
})

export default connect(mapStateToProps, {updateQuantity, addCartThunk})(
  ProductPage
)
