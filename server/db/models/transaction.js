const db = require('../db')
const Sequelize = require('sequelize')

const Transaction = db.define('transaction', {
  status: {
    type: Sequelize.ENUM,
    values: ['pending', 'purchased', 'shipped'],
    defaultValue: 'pending'
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1
    }
  },
  total: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  }
})

module.exports = Transaction
