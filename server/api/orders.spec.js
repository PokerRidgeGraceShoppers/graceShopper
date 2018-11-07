const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Order = db.model('order')

describe('Order routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/orders/', () => {
    beforeEach(() => {
      return Order.create({
        firstName: 'Jack',
        lastName: 'Cheese',
        status: 'pending',
        total: 1500,
        address: '123 street, city, state, zip'
      })
    })

    it('POST /api/orders/guest', async () => {
      const res = await request(app)
        .post('/api/orders/guest')
        .send({
          firstName: 'Jack',
          lastName: 'Cheese',
          status: 'pending',
          total: 1500,
          address: '123 street, city, state, zip'
        })
        .expect(500)
      expect(res.body).to.be.an('object')
    })

    it('POST /api/orders/:userId', async () => {
      const res = await request(app)
        .post('/api/orders/2')
        .send({
          firstName: 'Jack',
          lastName: 'Cheese',
          status: 'pending',
          total: 1500,
          address: '123 street, city, state, zip'
        })
        .expect(401)
      expect(res.body).to.be.an('object')
    })
  })
})
