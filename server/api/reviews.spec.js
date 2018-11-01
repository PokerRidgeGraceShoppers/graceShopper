/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Review = db.model('review')

describe('Review routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/reviews/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        firstName: 'Cody',
        lastName: 'Test',
        email: codysEmail,
        userType: 'admin'
      })
    })

    beforeEach(() => {
      return Review.create({
        title: "Cody's Review",
        body:
          'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
        rating: 4
      })
    })

    it('GET /api/reviews', async () => {
      const res = await request(app)
        .get('/api/reviews')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].title).to.be.equal("Cody's Review")
    })

    it('GET /api/reviews/:reviewId', async () => {
      const res = await request(app)
        .get('/api/reviews/1')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.body).to.be.equal(
        'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.'
      )
    })
  })
})
