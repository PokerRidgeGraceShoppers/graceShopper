const {expect} = require('chai')
const db = require('../index')
const Transaction = db.model('transaction')

describe('Transaction model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('transaction methods', () => {
    let newPurchase
    beforeEach(async () => {
      newPurchase = await Transaction.create({})
    })
  })
})
