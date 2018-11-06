// Cart helpers
export const addToCartHelper = ({cart, id, products}) => {
  let {quantity, price} = products[id]

  quantity = cart[id] ? quantity + cart[id].quantity : quantity

  return {
    productId: id,
    quantity,
    price,
    status: 'pending',
    total: quantity * price
  }
}

export const removeCartHelper = ({cart, id}) => {
  return Object.keys(cart).reduce((acc, val) => {
    if (val !== id) acc[val] = cart[val]
    return acc
  }, {})
}

export const reduceCart = transactions => {
  return transactions.reduce((acc, val) => {
    acc[val.productId] = val
    return acc
  }, {})
}

export const mergeCarts = (userCart, guestCart, userId) => {
  Object.keys(guestCart).forEach(key => {
    userCart[key]
      ? (userCart[key].quantity += guestCart[key].quantity)
      : (userCart[key] = {...guestCart[key], userId})
  })

  return userCart
}

export const flatten = (arr, newArr = []) => {
  if (!Array.isArray(arr)) newArr.push(arr)

  arr.forEach(item => {
    if (Array.isArray(item)) flatten(item, newArr)
    else newArr.push(item)
  })

  return newArr
}

// Product helpers
export const mapProductsToObject = arr => {
  return arr.reduce((acc, val) => {
    val.quantity = 1
    acc[val.id] = val
    return acc
  }, {})
}
