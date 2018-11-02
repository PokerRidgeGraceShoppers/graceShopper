import {GET_CART, UPDATE_CART, REMOVE_CART} from '../actions/cart'

export default (state = {}, action) => {
  console.log(action)
  switch (action.type) {
    case GET_CART:
      return action.cart
    case UPDATE_CART:
      return {...state, [action.id]: action.item}
    case REMOVE_CART:
      return action.cart
    default:
      return state
  }
}
