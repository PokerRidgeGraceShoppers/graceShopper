import React from 'react'
import CartItem from './CartItem'
import {SectionRow, SmallSection} from '../common'
import {withRouter} from 'react-router-dom'
import {Button} from 'semantic-ui-react'

class CartList extends React.Component {
  render() {
    const {
      cart,
      products,
      handleClickQuantity,
      removeCartThunk,
      history
    } = this.props

    return (
      <SmallSection style={{width: '90%'}}>
        <h1>Cart</h1>
        {Object.keys(cart).map(id => {
          const {title} = products[id]
          return (
            <CartItem
              key={id}
              id={id}
              title={title}
              cart={cart}
              handleClickQuantity={handleClickQuantity}
              removeCartThunk={removeCartThunk}
              image={products[id].image}
              price={products[id].price}
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
                Object.keys(cart).reduce((acc, currItem) => {
                  return acc + cart[currItem].total
                }, 0) / 100
              ).toFixed(2)}`}
            </h2>
          </SectionRow>

          {Object.keys(cart).length > 0 ? (
            <Button
              content="Checkout"
              basic
              color="red"
              type="submit"
              onClick={() => {
                history.push('/checkout')
              }}
            />
          ) : (
            <Button
              content="Checkout"
              basic
              color="red"
              type="submit"
              onClick={() => {
                history.push('/checkout')
              }}
              disabled
            />
          )}
        </SectionRow>
      </SmallSection>
    )
  }
}

export default withRouter(CartList)
