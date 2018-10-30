const db = require('../db')
const Sequelize = require('sequelize')

const Transaction = db.define('transaction', {
  status: {
    type: Sequelize.ENUM,
    values: ['pending', 'purchased', 'shipped'],
    defaultValue: 'pending'
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0.0
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1
    }
  }
})

module.exports = Transaction
