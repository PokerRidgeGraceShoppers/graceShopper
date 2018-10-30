const db = require('./db')
const Sequelize = require('sequelize')

const Transaction = db.define('transactions', {
  isPurchased: {
    type: Sequelize.BOOLEAN
  },
})

module.exports = Transaction


