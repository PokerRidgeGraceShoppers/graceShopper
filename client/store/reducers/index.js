import user from './user'
import cart from './cart'
import products from './products'
import reviews from './reviews'
import {combineReducers} from 'redux'

export default combineReducers({user, cart, products, reviews})
