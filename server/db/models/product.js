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
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      min: 0.0
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  image: {
    type: Sequelize.STRING,
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
