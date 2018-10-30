/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        firstName: 'Cody',
        lastName: 'Test',
        email: codysEmail
      })
    })

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })

    it('GET /api/users/', async () => {
      const res = await request(app)
        .get('/api/users/1')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.firstName).to.be.equal('Cody')
    })

    it('POST /api/users', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({firstName: 'Jack', email: 'email@email.com'})
        .expect(200)
      expect(res.body).to.be.an('object')
      expect(res.body.firstName).to.be.equal('Jack')
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
