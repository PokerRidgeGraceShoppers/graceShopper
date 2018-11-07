/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Transaction = db.model('transaction')

describe('Transaction routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/transactions/', () => {
    beforeEach(() => {
      return Transaction.create({
        status: 'purchased',
        price: 2701,
        quantity: 3
      })
    })

    it('GET /api/transactions', async () => {
      const res = await request(app)
        .get('/api/transactions')
        .expect(401)

      expect(res.body).to.be.an('object')
    })

    it('GET /api/transactions/', async () => {
      const res = await request(app)
        .get('/api/transactions/1')
        .expect(401)

      expect(res.body).to.be.an('object')
    })

    it('POST /api/transactions', async () => {
      const res = await request(app)
        .post('/api/transactions')
        .send({
          status: 'purchased',
          price: 2701,
          quantity: 3
        })
        .expect(401)
      expect(res.body).to.be.an('object')
    })
  })
})
