const db = require('../db')
const Sequelize = require('sequelize')

const Transaction = db.define('transaction', {
  isPurchased: {
    type: Sequelize.BOOLEAN
  }
})

module.exports = Transaction
