import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {SmallSection, ColumnWrap, SectionColumn} from './common'

class ProductList extends React.Component {
  render() {
    const products = this.props.products
    return (
      <SectionColumn>
        <h1> ProductList </h1>
        <ColumnWrap>
          {Object.keys(products).map(productId => {
            const {id, title, price, image} = products[productId]
            return (
              <SmallSection style={{marginBottom: '40px'}} key={id}>
                <Link to={`/products/${id}`}>{title}</Link>
                <h2>{`Price: ${price}`}</h2>
                <img className="product-list-img" src={image} />
                <label htmlFor>Quantity</label>
                <input name="quantity" type="number" value={this.props} />
                <button onClick={() => console.log(id)}>Att To Cart</button>
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

export default connect(mapStateToProps, null)(ProductList)
