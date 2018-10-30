const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('testing product', () => {
    let aRock
    beforeEach(async () => {
      aRock = await Product.create({
        title: 'A rock',
        category: 'Igneous',
        price: 9.99,
        description: "it's a hecking rock",
        availability: false,
        inventory: 25
      })
    })
    it('works', () => {
      expect(aRock.availability).to.be.false
    })
  })
})
