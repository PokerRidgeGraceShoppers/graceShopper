import {FETCH_PRODUCTS, FETCH_SINGLE_PRODUCT} from '../actions/products'

const initialState = {
  products: {},
  product: {}
}

const products = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {...state, products: action.products}
    case FETCH_SINGLE_PRODUCT:
      return {...state, product: action.product}
    default:
      return state
  }
}

export default products
