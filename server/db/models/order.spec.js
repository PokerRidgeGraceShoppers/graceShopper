const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('order methods', () => {
    let newOrder
    beforeEach(async () => {
      newOrder = await Order.create({
        address: 'somewhere else',
        total: 9.99
      })
    })
    it('works', () => {
      expect(newOrder.address).to.equal('somewhere else')
    })
  })
})
