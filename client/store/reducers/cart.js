import {GET_CART, UPDATE_CART, REMOVE_CART, UPDATE_TOTAL} from '../actions/cart'

export default (state = {}, action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case UPDATE_CART:
      console.log('cart reducer UPDATE_CART action.item', action.item)
      return {...state, [action.id]: action.item}
    case REMOVE_CART:
      return action.cart
    case UPDATE_TOTAL:
      return {...state, total: action.total}

    default:
      return state
  }
}
