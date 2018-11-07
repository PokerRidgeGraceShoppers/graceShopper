const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  image: {
    type: Sequelize.TEXT,
    defaultValue: 'https://image.flaticon.com/icons/svg/1170/1170628.svg',
    validate: {
      isUrl: true
    }
  },
  availability: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  inventory: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    allowNull: false,
    validate: {
      min: 0
    }
  }
})

module.exports = Product
