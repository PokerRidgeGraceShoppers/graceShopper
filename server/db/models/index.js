const User = require('./user')
const Transaction = require('./transaction')
const Product = require('./product')
const Review = require('./review')
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

User.hasMany(Transaction)
Transaction.belongsTo(User)

Product.hasMany(Transaction)
Transaction.belongsTo(Product)

Review.belongsTo(User)
Review.belongsTo(Product)

Product.hasMany(Review)
User.hasMany(Review)

module.exports = {
  User,
  Product,
  Transaction,
  Review
}
