import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/actions/products'
import {SectionColumn, SmallSection} from './common'

class SingleProduct extends React.Component {
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
        <h3>{`Price: ${singleProduct.price}`}</h3>
        <h3>{`Inventory: ${singleProduct.inventory}`}</h3>
        <h3>Description</h3>
        <p>{singleProduct.description}</p>
        <SectionColumn>
          {singleProduct.reviews &&
            singleProduct.reviews.map(review => {
              return (
                <SmallSection key={review.id} style={{width: '50%'}}>
                  <h2>{review.title}</h2>
                  <p>{review.body}</p>
                </SmallSection>
              )
            })}
        </SectionColumn>
      </SectionColumn>
    )
  }
}

const mapStateToProps = state => ({
  singleProduct: state.products.product
})

export default connect(mapStateToProps, {fetchSingleProduct})(SingleProduct)

// product: {
//   id: 1,
//   title: 'Wine - Chardonnay South',
//   category: 'category-1',
//   price: 57.83,
//   image: 'https://image.flaticon.com/icons/svg/61/61205.svg',
//   inventory: 91
// }
