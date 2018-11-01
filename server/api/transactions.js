const router = require('express').Router()
const {Review, User, Transaction, Product} = require('../db/models')
const {isLoggedIn, isAdmin} = require('./userTypeChecker')
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
    const transaction = await Transaction.findAll()
    res.json(transaction)
  } catch (err) {
    next(err)
  }
})
router.get('/:transactionId', async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.transactionId, {
      include: [{model: User}, {model: Product}]
    })
    res.json(transaction)
  } catch (err) {
    next(err)
  }
})

router.post('/', isAdmin, async (req, res, next) => {
  try {
    const transaction = await Transaction.create({
      status: req.body.status,
      price: req.body.price,
      quantity: req.body.quantity
    })
    res.json(transaction)
  } catch (err) {
    next(err)
  }
})

router.put('/:transactionId', isAdmin, async (req, res, next) => {
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

router.delete('/:transactionId', isAdmin, async (req, res, next) => {
  try {
    await Transaction.destroy({where: {id: req.params.transactionId}})
    return res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})