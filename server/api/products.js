const router = require('express').Router()
const {Product, User, Transaction, Review} = require('../db/models')
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
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})
router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId, {
      include: [{model: Review}, {model: Transaction}]
    })
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const product = await Product.create({
      title: req.body.title,
      category: req.body.category,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image,
      availability: req.body.availability,
      inventory: req.body.inventory
    })
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.put('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId)
    if (product) {
      await product.update(
        fieldReducer(req.body, [
          'title',
          'category',
          'price',
          'description',
          'image',
          'availability',
          'inventory'
        ])
      )
    }

    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.delete('/:productId', async (req, res, next) => {
  try {
    await Product.destroy({where: {id: req.params.productId}})
    return res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})
