import axios from 'axios'

const GOT_PRODUCTS_FROM_SERVER = 'GOT_PRODUCTS_FROM_SERVER'

const GOT_SINGLE_PRODUCT_FROM_SERVER = 'GOT_SINGLE_PRODUCT_FROM_SERVER'

const initialState = {
  products: [],
  product: {}
}

const gotProductsFromServer = products => ({
  type: GOT_PRODUCTS_FROM_SERVER,
  products
})

const gotSingleProductFromServer = product => ({
  type: GOT_SINGLE_PRODUCT_FROM_SERVER,
  product
})

export const fetchProducts = () => async dispatch => {
  const {data: products} = await axios.get('/api/products')
  dispatch(gotProductsFromServer(products))
}

export const fetchSingleProduct = productId => async dispatch => {
  const {data: product} = await axios.get(`/api/products/${productId}`)
  dispatch(gotSingleProductFromServer(product))
}

const products = (state = initialState, action) => {
  switch (action.type) {
    case GOT_PRODUCTS_FROM_SERVER:
      return {...state, products: action.products}
    case GOT_SINGLE_PRODUCT_FROM_SERVER:
      return {...state, product: action.product}
    default:
      return state
  }
}

export default products
