import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {CartList} from './Cart/CartList'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Cart', () => {
  let cart

  beforeEach(() => {
    cart = shallow(<CartList email="cody@email.com" />)
  })

  it('renders the email in an h3', () => {
    expect(cart.find('h3').text()).to.be.equal('Welcome, cody@email.com')
  })
})
