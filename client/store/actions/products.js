import axios from 'axios'

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS'
export const FETCH_SINGLE_PRODUCT = 'FETCH_SINGLE_PRODUCT'
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY'

const mapProductsToObject = arr => {
  return arr.reduce((acc, val) => {
    val.quantity = 1
    acc[val.id] = val
    return acc
  }, {})
}

export const updateQuantity = (id, product) => ({
  type: UPDATE_QUANTITY,
  id,
  product
})

const gotProductsFromServer = products => ({
  type: FETCH_PRODUCTS,
  products
})

const gotSingleProductFromServer = product => ({
  type: FETCH_SINGLE_PRODUCT,
  product
})

export const fetchProducts = () => async dispatch => {
  const {data: products} = await axios.get('/api/products')
  dispatch(gotProductsFromServer(mapProductsToObject(products)))
}

export const fetchSingleProduct = productId => async dispatch => {
  const {data: product} = await axios.get(`/api/products/${productId}`)
  dispatch(gotSingleProductFromServer(product))
}
