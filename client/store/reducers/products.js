import {
  FETCH_PRODUCTS,
  FETCH_SINGLE_PRODUCT,
  UPDATE_QUANTITY
} from '../actions/products'

const initialState = {
  products: {},
  product: {}
}

const products = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_QUANTITY:
      return {
        ...state,
        products: {...state.products, [action.id]: action.product}
      }
    case FETCH_PRODUCTS:
      return {...state, products: action.products}
    case FETCH_SINGLE_PRODUCT:
      return {...state, product: action.product}
    default:
      return state
  }
}

export default products
