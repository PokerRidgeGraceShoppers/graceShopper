const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('product methods', () => {
    let aRock
    beforeEach(async () => {
      aRock = await Product.create({
        title: 'A rock',
        category: 'Igneous',
        price: 9.99,
        description: "it's just a rock",
        availability: false
      })
    })
  })
})
