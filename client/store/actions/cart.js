export const GET_CART = 'GET_CART'
export const ADD_CART = 'ADD_CART'
export const REMOVE_CART = 'REMOVE_CART'

export const getCart = cart => {
  return {
    type: GET_CART,
    cart
  }
}

export const addCart = item => {
  return {
    type: ADD_CART,
    item
  }
}

export const removeCart = id => {
  return {
    type: REMOVE_CART,
    id
  }
}

export const fetchCart = () => {
  return (dispatch, getState) => {
    const {user} = getState()

    if (!user.id) {
      dispatch(getCart(JSON.parse(window.localStorage.getItem('cart')) || []))
    }
  }
}

export const addCartThunk = item => {
  return (dispatch, getState) => {
    const {user} = getState()
    dispatch(addCart(item))
    if (!user.id) {
      const {cart} = getState()
      window.localStorage.setItem('cart', JSON.stringify(cart))
    }
  }
}

export const removeCartThunk = id => {
  return (dispatch, getState) => {
    const {user} = getState()
    dispatch(removeCart(id))
    if (!user.id) {
      const {cart} = getState()
      window.localStorage.setItem('cart', JSON.stringify(cart))
    }
  }
}
