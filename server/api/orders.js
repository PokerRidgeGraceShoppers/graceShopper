const router = require('express').Router()
const {Review, User, Transaction, Product, Order} = require('../db/models')
const {isLoggedIn, isAdmin, isLoggedInAsSelf} = require('./userTypeChecker')
module.exports = router

router.post('/guest', async (req, res, next) => {
  console.log(req.body)
  const {firstName, lastName, address, total, cart} = req.body

  try {
    const order = await Order.create({
      firstName,
      lastName,
      address,
      total,
      status: 'purchased'
    })

    const promiseArr = Object.keys(cart).map(item => {
      const transaction = cart[item]
      return Transaction.create({
        ...transaction,
        orderId: order.id,
        status: 'purchased'
      }).catch(err => console.log(err))
    })

    await Promise.all(promiseArr)

    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.post('/:userId', isLoggedInAsSelf, async (req, res, next) => {
  console.log(req.body)
  const {firstName, lastName, address, total, cart} = req.body

  try {
    const order = await Order.create({
      firstName,
      lastName,
      address,
      total,
      status: 'purchased',
      userId: req.params.userId
    })

    const promiseArr = Object.keys(cart).map(item => {
      const transaction = cart[item]
      return Transaction.findById(transaction.id)
        .then(data => {
          return data.update({orderId: order.id, status: 'purchased'})
        })
        .catch(err => console.log(err))
    })

    await Promise.all(promiseArr)

    res.json(order)
  } catch (err) {
    next(err)
  }
})
