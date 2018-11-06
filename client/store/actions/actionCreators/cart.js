import axios from 'axios'
import {REMOVE_CART, UPDATE_TOTAL, GET_CART, UPDATE_CART} from '../actionTypes'
import {
  mergeCarts,
  reduceCart,
  flatten,
  addToCartHelper,
  removeCartHelper
} from '../helpers'

// Actions
export const getCart = cart => ({type: GET_CART, cart})
export const updateCart = (id, item) => ({type: UPDATE_CART, item, id})
export const removeCart = cart => ({type: REMOVE_CART, cart})
export const updateTotal = total => ({type: UPDATE_TOTAL, total})

// Thunks
const mergeCartThunk = (userCart, guestCart) => {
  return async (dispatch, getState) => {
    const {user} = getState()
    const {data} = await axios.post(
      `/api/transactions/cart/${user.id}`,
      mergeCarts(userCart, guestCart, user.id)
    )
    const cart = reduceCart(
      flatten(data).filter(item => typeof item === 'object')
    )

    dispatch(getCart(cart))
    window.localStorage.removeItem('cart')
  }
}

export const fetchCart = () => {
  return async (dispatch, getState) => {
    const {user} = getState()
    const guestCart = JSON.parse(window.localStorage.getItem('cart')) || {}

    if (!user.id) {
      dispatch(getCart(guestCart))
    } else {
      const {data} = await axios.get(`/api/users/cart/${user.id}`)
      const userCart = reduceCart(data ? data.transactions : [])

      Object.keys(guestCart).length
        ? dispatch(mergeCartThunk(userCart, guestCart))
        : dispatch(getCart(userCart))
    }
  }
}

export const updateCartThunk = (id, item) => {
  return async (dispatch, getState) => {
    const {user} = getState()

    if (user.id) {
      const {data} = await axios.put(`/api/transactions/${item.id}`, {
        ...item,
        total: item.quantity * item.price
      })
      item = data
    }

    dispatch(updateCart(id, {...item, total: item.quantity * item.price}))

    if (!user.id) {
      window.localStorage.setItem('cart', JSON.stringify(getState().cart))
    }
  }
}

export const addCartThunk = id => {
  return async (dispatch, getState) => {
    const {user, products: {products}, cart} = getState()
    let item = addToCartHelper({id, cart, products})

    if (cart[id]) {
      dispatch(updateCartThunk(id, {...cart[id], ...item}))
    } else if (user.id) {
      const {data} = await axios.post('/api/transactions', {
        ...item,
        userId: user.id
      })
      item = data
    }

    dispatch(updateCart(id, item))

    if (!user.id) {
      window.localStorage.setItem('cart', JSON.stringify(getState().cart))
    }
  }
}

export const removeCartThunk = id => {
  return async (dispatch, getState) => {
    const {user, cart} = getState()
    const item = cart[id]

    if (user.id) {
      await axios.delete(`/api/transactions/${item.id}/user/${user.id}`)
    }

    let newCart = removeCartHelper({cart, id})
    dispatch(removeCart(newCart))

    if (!user.id) {
      window.localStorage.setItem('cart', JSON.stringify(getState().cart))
    }
  }
}
