import React from 'react'
import {connect} from 'react-redux'
import {SmallSection, ColumnWrap, SectionColumn} from './common'

class Category extends React.Component {
  render() {
    const products = this.props.products
    const filteredCategory = Object.keys(products).filter(productId => {
      const {category} = products[productId]
      return category === this.props.category
    })
    return (
      <SectionColumn>
        <h1> BEHOLD </h1>
        <ColumnWrap>
          {filteredCategory.map(id => (
            <SmallSection>{products[id].title}</SmallSection>
          ))}
        </ColumnWrap>
      </SectionColumn>
    )
  }
}

const mapState = state => ({
  products: state.products.products
})

export default connect(mapState)(Category)
