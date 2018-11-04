const router = require('express').Router()
const {Review, User, Transaction, Product} = require('../db/models')
const {isLoggedIn, isAdmin, isLoggedInAsSelf} = require('./userTypeChecker')
module.exports = router

const fieldReducer = (bodyObj, options) => {
  return options.reduce((accum, curr) => {
    if (bodyObj[curr] !== undefined) accum[curr] = bodyObj[curr]
    return accum
  }, {})
}

router.get('/', isLoggedIn, async (req, res, next) => {
  try {
    const transaction = await Transaction.findAll()
    res.json(transaction)
  } catch (err) {
    next(err)
  }
})

router.get('/:transactionId', isLoggedIn, async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.transactionId, {
      include: [{model: User}]
    })
    res.json(transaction)
  } catch (err) {
    next(err)
  }
})

router.get('/users/:userId', isLoggedInAsSelf, async (req, res, next) => {
  try {
    const transaction = await Transaction.findAll({
      where: {userId: req.params.userId},
      include: [{model: User}]
    })
    res.json(transaction)
  } catch (err) {
    next(err)
  }
})

router.post('/', isLoggedIn, async (req, res, next) => {
  const {productId, status, price, userId, quantity} = req.body
  try {
    const transaction = await Transaction.create({
      productId,
      status,
      price,
      userId,
      quantity
    })
    res.json(transaction)
  } catch (err) {
    next(err)
  }
})

router.put('/:transactionId', isLoggedIn, async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.transactionId)
    if (transaction) {
      await transaction.update(
        fieldReducer(req.body, ['status', 'price', 'quantity'])
      )
    }

    res.json(transaction)
  } catch (err) {
    next(err)
  }
})

router.delete(
  '/:transactionId/user/:userId',
  isLoggedInAsSelf,
  async (req, res, next) => {
    try {
      await Transaction.destroy({where: {id: req.params.transactionId}})
      return res.sendStatus(200)
    } catch (err) {
      next(err)
    }
  }
)

router.post('/cart/:userId', async (req, res, next) => {
  const promises = await Promise.all(
    Object.keys(req.body).map(key => {
      const item = fieldReducer(req.body[key], [
        'productId',
        'quantity',
        'price',
        'userId',
        'status'
      ])

      const id = req.body[key].id

      return id
        ? Transaction.update(item, {where: {id}, returning: true})
        : Transaction.create(item)
    })
  )

  res.json(promises)
})
