import axios from 'axios'

export const GET_CART = 'GET_CART'
export const UPDATE_CART = 'UPDATE_CART'
export const REMOVE_CART = 'REMOVE_CART'
export const UPDATE_TOTAL = 'UPDATE_TOTAL'

const addToCartHelper = ({cart, id, products}) => {
  let {quantity, price} = products[id]

  quantity = cart[id] ? quantity + cart[id].quantity : quantity

  return {productId: id, quantity, price, status: 'pending'}
}

const removeCartHelper = ({cart, id}) => {
  return Object.keys(cart).reduce((acc, val) => {
    if (val !== id) acc[val] = cart[val]
    return acc
  }, {})
}

const reduceCart = transactions => {
  return transactions.reduce((acc, val) => {
    acc[val.productId] = val
    return acc
  }, {})
}

const mergeCarts = (userCart, guestCart, userId) => {
  Object.keys(guestCart).forEach(key => {
    userCart[key]
      ? (userCart[key].quantity += guestCart[key].quantity)
      : (userCart[key] = {...guestCart[key], userId})
  })

  return userCart
}

const flatten = (arr, newArr = []) => {
  if (!Array.isArray(arr)) {
    newArr.push(arr)
  }

  arr.forEach(item => {
    if (Array.isArray(item)) flatten(item, newArr)
    else newArr.push(item)
  })

  return newArr
}

export const getCart = cart => ({type: GET_CART, cart})

export const updateCart = (id, item) => ({type: UPDATE_CART, item, id})

export const removeCart = cart => ({type: REMOVE_CART, cart})

export const updateTotal = total => ({type: UPDATE_TOTAL, total})

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
    let guestCart = JSON.parse(window.localStorage.getItem('cart')) || {}

    if (!user.id) {
      dispatch(getCart(guestCart))
    } else {
      let {data} = await axios.get(`/api/users/cart/${user.id}`)
      let userCart = reduceCart(data ? data.transactions : [])

      if (Object.keys(guestCart).length) {
        dispatch(mergeCartThunk(userCart, guestCart))
      }

      dispatch(getCart(userCart))
    }
  }
}

export const updateCartThunk = (id, item) => {
  return async (dispatch, getState) => {
    const {user} = getState()

    if (user.id) {
      const {data} = await axios.put(`/api/transactions/${item.id}`, item)
      item = data
    }

    dispatch(updateCart(id, item))

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
