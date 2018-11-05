import React from 'react'
import CartItem from './CartItem'
import {SectionRow, SmallSection} from '../common'
import {withRouter} from 'react-router-dom'

class CartList extends React.Component {
  constructor({cart, products, handleClickQuantity, removeCartThunk}) {
    super({cart, products, handleClickQuantity, removeCartThunk})
  }
  render() {
    return (
      <SmallSection style={{width: '90%'}}>
        <h1>This is the cart</h1>
        {Object.keys(this.props.cart).map(id => {
          const {title} = this.props.products[id]
          return (
            <CartItem
              key={id}
              id={id}
              title={title}
              cart={this.props.cart}
              handleClickQuantity={this.props.handleClickQuantity}
              removeCartThunk={this.props.removeCartThunk}
              image={this.props.products[id].image}
              price={this.props.products[id].price}
            />
          )
        })}
        <SectionRow style={{justifyContent: 'space-between', width: '80%'}}>
          <h2>Total</h2>
          <SectionRow
            style={{
              alignItems: 'flex-end',
              paddingRight: '13%',
              justifyContent: 'space-between'
            }}
          >
            <h2>
              {`$${Number.parseFloat(
                Object.keys(this.props.cart).reduce((acc, currItem) => {
                  return acc + this.props.cart[currItem].total
                }, 0) / 100
              ).toFixed(2)}`}
            </h2>
          </SectionRow>
          <button
            type="submit"
            onClick={() => {
              this.props.history.push('/checkout')
            }}
          >
            Checkout
          </button>
        </SectionRow>
      </SmallSection>
    )
  }
}

export default withRouter(CartList)
