import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import CartItem from '../Cart/CartItem'
import products from '../../../script/data/products.json'

const adapter = new Adapter()
enzyme.configure({adapter})

let id = 0
const productObj = products.reduce((acc, val) => {
  acc[id++] = val
  return acc
}, {})

describe('Cart', () => {
  let cartItem

  beforeEach(() => {
    const cartData = {
      1: {
        productId: 1,
        price: productObj[1],
        quantity: 1,
        status: 'pending',
        total: 1 * productObj[1].price
      },
      2: {
        productId: 1,
        price: productObj[1],
        quantity: 1,
        status: 'pending',
        total: 1 * productObj[1].price
      }
    }

    cartItem = shallow(
      <CartItem
        id={1}
        title={productObj[1].title}
        image={productObj[1].image}
        cart={cartData}
      />
    )
  })
  describe('Single Cart Item', () => {
    it('the cart matches the info from product obj', () => {
      expect(
        cartItem
          .find('h2')
          .text()
          .trim()
      ).to.be.equal(productObj[1].title)
    })
  })
})
