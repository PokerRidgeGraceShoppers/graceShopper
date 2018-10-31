import user from './user'
import cart from './cart'
import products from './products'
import {combineReducers} from 'redux'

export default combineReducers({user, products, cart})
