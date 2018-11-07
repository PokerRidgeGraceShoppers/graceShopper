const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')
const User = db.model('user')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    beforeEach(() => {
      return (
        User.create({
          firstName: 'Cody',
          lastName: 'Test',
          email: 'cody@puppybook.com',
          userType: 'admin'
        }),
        Product.create({
          title: 'JackCheese',
          category: 'dairy',
          price: 1500,
          availability: true,
          inventory: 100
        })
      )
    })

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].id).to.be.equal(1)
    })

    it('GET /api/products/:productId', async () => {
      const res = await request(app)
        .get('/api/products/1')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.title).to.be.equal('JackCheese')
    })

    it('POST /api/products', async () => {
      const res = await request(app)
        .post('/api/products')
        .send({
          title: 'JackCheese',
          category: 'dairy',
          price: 1500,
          availability: true,
          inventory: 100
        })
        .expect(401)
      expect(res.body).to.be.an('object')
    })
  })
})
