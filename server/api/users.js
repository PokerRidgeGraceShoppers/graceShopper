const router = require('express').Router()
const {User, Transaction, Review} = require('../db/models')
const {isLoggedIn, isAdmin, isLoggedInAsSelf} = require('./userTypeChecker')
module.exports = router

const fieldReducer = (bodyObj, options) => {
  return options.reduce((accum, curr) => {
    if (bodyObj[curr]) {
      accum[curr] = bodyObj[curr]
    }
    return accum
  }, {})
}

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: {exclude: ['password']}
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
router.get('/:userId', isLoggedInAsSelf, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId, {
      include: [{model: Review}, {model: Transaction}],
      attributes: {exclude: ['password']}
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userType: req.body.userType,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', isLoggedInAsSelf, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
    if (user) {
      await user.update(
        fieldReducer(req.body, [
          'firstName',
          'lastName',
          'userType',
          'email',
          'password',
          'address'
        ])
      )
    }

    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId', isAdmin, async (req, res, next) => {
  try {
    await User.destroy({where: {id: req.params.userId}})
    return res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})
