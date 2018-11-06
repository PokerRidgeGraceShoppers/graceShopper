const User = require('./user')
const Transaction = require('./transaction')
const Product = require('./product')
const Review = require('./review')
const Order = require('./order')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

Transaction.belongsTo(User)
User.hasMany(Transaction)

Transaction.belongsTo(Product)
Product.hasMany(Transaction)

Review.belongsTo(User)
User.hasMany(Review)

Review.belongsTo(Product)
Product.hasMany(Review)

Transaction.belongsTo(Order)
Order.hasMany(Transaction)

Order.belongsTo(User)
User.hasMany(Order)

User.getUserData = id => {
  return User.findById(id, {
    include: [{model: Review}, {model: Order, include: [{model: Transaction}]}],
    attributes: {exclude: ['password']}
  })
}

module.exports = {
  User,
  Product,
  Transaction,
  Review,
  Order
}
