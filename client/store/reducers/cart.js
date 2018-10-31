import {GET_CART, ADD_CART, REMOVE_CART} from '../actions/cart'

export default (state = [], action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case ADD_CART:
      return [...state, action.item]
    case REMOVE_CART:
      console.log('remove cart')
      return state.filter(item => item.productId != action.id)
    default:
      return state
  }
}
