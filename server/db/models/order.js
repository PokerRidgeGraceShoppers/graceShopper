const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM,
    values: ['pending', 'purchased']
  },
  total: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  address: {
    type: Sequelize.STRING
  }
})

module.exports = Order
