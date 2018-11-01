const router = require('express').Router()
const {Review, User, Transaction, Product} = require('../db/models')
const {
  isLoggedIn,
  isAdmin,
  isLoggedInAsSelf
  // isLoggedInEditReview
} = require('./userTypeChecker')
module.exports = router

const fieldReducer = (bodyObj, options) => {
  return options.reduce((accum, curr) => {
    if (bodyObj[curr]) {
      accum[curr] = bodyObj[curr]
    }
    return accum
  }, {})
}

router.get('/', async (req, res, next) => {
  try {
    const reviews = await Review.findAll()
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})
router.get('/:reviewId', async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.reviewId, {
      include: [{model: User}, {model: Product}]
    })
    res.json(review)
  } catch (err) {
    next(err)
  }
})

router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const review = await Review.create({
      title: req.body.title,
      body: req.body.body,
      rating: req.body.rating
    })
    res.json(review)
  } catch (err) {
    next(err)
  }
})

router.put(
  '/:reviewId/user/:userId',
  isLoggedInAsSelf,
  async (req, res, next) => {
    try {
      const review = await Review.findById(req.params.reviewId)
      if (review) {
        // isLoggedInEditReview(review, req)
        await review.update(fieldReducer(req.body, ['title', 'body', 'rating']))
      }

      res.json(review)
    } catch (err) {
      next(err)
    }
  }
)

router.delete('/:reviewId', isLoggedInAsSelf, async (req, res, next) => {
  try {
    await Review.destroy({where: {id: req.params.reviewId}})
    return res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})
