import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ProductItem from '../ProductPage/ProductItem'
import products from '../../../script/data/products.json'

const adapter = new Adapter()
enzyme.configure({adapter})

let id = 0
const productObj = products.reduce((acc, val) => {
  acc[id++] = val
  return acc
}, {})

describe('Product', () => {
  let productItem

  beforeEach(() => {
    productItem = shallow(
      <ProductItem {...productObj[1]} id={1} quantity={1} />
    )
  })
  describe('Single Product Item', () => {
    it('the product matches the info from product obj', () => {
      expect(productItem.find('h2').text()).to.equal(
        `Price: $${Number.parseFloat(productObj[1].price / 100).toFixed(2)}`
      )
    })
  })
})
