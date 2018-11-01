export const GET_CART = 'GET_CART'
export const ADD_CART = 'ADD_CART'
export const REMOVE_CART = 'REMOVE_CART'

const addToCartHelper = ({cart, id, quantity}) => {
  quantity = cart[id] ? quantity + cart[id].quantity : quantity
  return {quantity}
}

const removeCartHelper = ({cart, id}) => {
  return Object.keys(cart).reduce((acc, val) => {
    if (val != id) {
      acc[val] = cart[val]
    }
    return acc
  }, {})
}

export const getCart = cart => {
  return {
    type: GET_CART,
    cart
  }
}

export const addCart = (id, item) => {
  return {
    type: ADD_CART,
    item,
    id
  }
}

export const removeCart = cart => {
  return {
    type: REMOVE_CART,
    cart
  }
}

export const fetchCart = () => {
  return (dispatch, getState) => {
    const {user} = getState()
    if (!user.id) {
      let cart = JSON.parse(window.localStorage.getItem('cart')) || {}
      dispatch(getCart(cart))
    }
  }
}

export const addCartThunk = id => {
  return (dispatch, getState) => {
    const {user, products: {products}, cart} = getState()
    const quantity = products[id].quantity
    dispatch(addCart(id, addToCartHelper({id, cart, quantity})))
    if (!user.id) {
      window.localStorage.setItem('cart', JSON.stringify(getState().cart))
    }
  }
}

export const removeCartThunk = id => {
  return (dispatch, getState) => {
    const {user, cart} = getState()
    let newCart = removeCartHelper({cart, id})
    console.log('new cart object', newCart)
    dispatch(removeCart(newCart))
    if (!user.id) {
      window.localStorage.setItem('cart', JSON.stringify(getState().cart))
    }
  }
}
