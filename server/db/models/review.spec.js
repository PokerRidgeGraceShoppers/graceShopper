const {expect} = require('chai')
const db = require('../index')
const Review = db.model('review')

describe('Review model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('review methods', () => {
    let newReview
    beforeEach(async () => {
      newReview = await Review.create({})
    })
  })
})
