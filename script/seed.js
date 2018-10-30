'use strict'
const db = require('../server/db')
const {User, Transaction, Review, Product} = require('../server/db/models')
const userData = require('./data/users.json')
const transactionData = require('./data/transactions.json')
const reviewData = require('./data/reviews.json')
const productData = require('./data/products.json')

const getIndex = l => Math.floor(Math.random() * l)

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const data = await Promise.all([
    Promise.all(userData.map(user => User.create(user))),
    Promise.all(transactionData.map(trans => Transaction.create(trans))),
    Promise.all(reviewData.map(review => Review.create(review))),
    Promise.all(productData.map(review => Product.create(review)))
  ])

  const [users, transactions, reviews, products] = data

  await Promise.all([
    Promise.all(
      transactions.map(t => t.setUser(users[getIndex(users.length)]))
    ),
    Promise.all(
      transactions.map(t => t.setProduct(products[getIndex(products.length)]))
    ),
    Promise.all(reviews.map(r => r.setUser(users[getIndex(users.length)]))),
    Promise.all(
      reviews.map(r => r.setProduct(products[getIndex(products.length)]))
    )
  ])

  await console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
