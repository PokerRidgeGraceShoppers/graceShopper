const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  total: {
    type: Sequelize.FLOAT,
    defaultValue: 0.0
  },
  address: {
    type: Sequelize.STRING
  }
})

module.exports = Order
