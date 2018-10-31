import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchSingleProduct} from '../store/reducers/products'

class SingleProduct extends React.Component {
  // constructor() {
  //   super()
  //   this.state = {}
  // }

  componentDidMount() {
    const productId = Number(this.props.match.params.productId)

    this.props.loadSingleProduct(productId)
  }

  render() {
    //const productId = Number(this.props.match.params.productId)
    return (
      <div>
        <h1>Single Product </h1>
        <div> Single Product should go here ----- </div>
        ProdID: {this.props.singleProduct.id}
        <br />
        ProdTitle: {this.props.singleProduct.title}
        <br />
        category: {this.props.singleProduct.category}
        <br />
        Price: {this.props.singleProduct.price}
        <br />
        {/* <img src={this.state.product.image} /> <br /> */}
        inventory: {this.props.singleProduct.inventory}
        <br />
        <div />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  singleProduct: state.products.product
})

const mapDispatchToProps = dispatch => ({
  loadSingleProduct: productId => dispatch(fetchSingleProduct(productId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)

// product: {
//   id: 1,
//   title: 'Wine - Chardonnay South',
//   category: 'category-1',
//   price: 57.83,
//   image: 'https://image.flaticon.com/icons/svg/61/61205.svg',
//   inventory: 91
// }
