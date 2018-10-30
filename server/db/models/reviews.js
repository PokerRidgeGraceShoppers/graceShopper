const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  title: {
    type: Sequelize.STRING,
    allownull: false
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

module.exports = Review
