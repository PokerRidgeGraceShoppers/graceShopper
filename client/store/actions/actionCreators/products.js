import axios from 'axios'
import {
  FETCH_PRODUCTS,
  FETCH_SINGLE_PRODUCT,
  UPDATE_QUANTITY
} from '../actionTypes'
import {mapProductsToObject} from '../helpers'

// Actions
export const updateQuantity = (id, product) => ({
  type: UPDATE_QUANTITY,
  id,
  product
})

const gotProductsFromServer = products => ({type: FETCH_PRODUCTS, products})

const gotSingleProductFromServer = product => ({
  type: FETCH_SINGLE_PRODUCT,
  product
})

// Thunks
export const fetchProducts = () => async dispatch => {
  const {data: products} = await axios.get('/api/products')
  dispatch(gotProductsFromServer(mapProductsToObject(products)))
  npm
}

export const fetchSingleProduct = productId => async dispatch => {
  const {data: product} = await axios.get(`/api/products/${productId}`)
  dispatch(gotSingleProductFromServer(product))
}
