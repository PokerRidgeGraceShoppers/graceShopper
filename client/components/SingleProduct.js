import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct, updateQuantity} from '../store/actions/products'
import {SectionColumn, SmallSection, SectionRow, Input} from './common'
import ReviewForm from './ReviewForm'
import {addCartThunk} from '../store/actions/cart'

class SingleProduct extends React.Component {
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

  componentDidMount() {
    const productId = Number(this.props.match.params.productId)

    this.props.fetchSingleProduct(productId)
  }

  render() {
    const {singleProduct} = this.props
    console.log(singleProduct)
    return (
      <SectionColumn>
        <h1>Single Product </h1>
        <h2>{singleProduct.title}</h2>
        <SmallSection>
          <img className="product-list-img" src={singleProduct.image} />
        </SmallSection>
        <h3>{`Category: ${singleProduct.category}`}</h3>
        <SmallSection style={{marginBottom: '40px'}}>
          <h3>{`Price: $${Number.parseFloat(singleProduct.price / 100).toFixed(
            2
          )}`}</h3>
          <form
            style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Input
              handleChange={this.handleChange}
              value={singleProduct.quantity}
              id={singleProduct.id}
              name="quantity"
              label="Quantity:"
            />
          </form>
          <button onClick={() => this.handleSubmit(singleProduct.id)}>
            Add To Cart
          </button>
        </SmallSection>
        <h3>{`Inventory: ${singleProduct.inventory}`}</h3>
        <h3>Description</h3>
        <p>{singleProduct.description}</p>
        <SectionColumn>
          {singleProduct.reviews &&
            singleProduct.reviews.map(review => {
              return (
                <SmallSection key={review.id} style={{width: '50%'}}>
                  <SectionRow
                    style={{width: '80%', justifyContent: 'space-between'}}
                  >
                    <h2>{review.title}</h2>
                    <h3>
                      Rating:{' '}
                      {!review.rating ? '0*' : '*'.repeat(review.rating)}
                    </h3>
                  </SectionRow>
                  <p>{review.body}</p>
                </SmallSection>
              )
            })}
        </SectionColumn>
        <ReviewForm productId={singleProduct.id} />
      </SectionColumn>
    )
  }
}

const mapStateToProps = state => ({
  singleProduct: state.products.product,
  products: state.products.products
})

export default connect(mapStateToProps, {
  fetchSingleProduct,
  updateQuantity,
  addCartThunk
})(SingleProduct)

// product: {
//   id: 1,
//   title: 'Wine - Chardonnay South',
//   category: 'category-1',
//   price: 57.83,
//   image: 'https://image.flaticon.com/icons/svg/61/61205.svg',
//   inventory: 91
// }
