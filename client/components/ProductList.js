import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class ProductList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const products = this.props.products
    return (
      <div>
        <h1>ProductList </h1>
        <div> Products should go here: </div>{' '}
        <div>
          {products.map(product => {
            return (
              <div key={product.id}>
                Product id: {product.id} {'  '} <br />
                <Link to={`/products/${product.id}`}>{product.title}</Link>
                <br />
                Price: {product.price}
                <br />
                {/* <img src={product.image} /> <br /> */}
                <br />
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products.products
})

export default connect(mapStateToProps, null)(ProductList)
