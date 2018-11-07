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
        email: codysEmail,
        userType: 'admin'
      })
    })

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(401)

      expect(res.body).to.be.an('object')
    })

    it('GET /api/users/', async () => {
      const res = await request(app)
        .get('/api/users/1')
        .expect(401)

      expect(res.body).to.be.an('object')
    })

    it('POST /api/users', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({
          firstName: 'Jack',
          lastName: 'tester',
          email: 'email@email.com',
          userType: 'admin',
          password: 'test',
          address: '1 testway'
        })
        .expect(200)
      expect(res.body).to.be.an('object')
      expect(res.body.firstName).to.be.equal('Jack')
    })
  })
})
