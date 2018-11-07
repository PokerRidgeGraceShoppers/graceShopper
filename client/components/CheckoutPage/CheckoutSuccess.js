import React from 'react'
import {Link} from 'react-router-dom'

const CheckoutSuccess = props => {
  if (props.order.data) {
    const cart = props.order.data.cart
    const order = props.order.data.order
    const products = props.products
    return (
      <div>
        <div>
          <h1>Congrats, your order was placed!</h1>
          <p>Order Details</p>
          <p>Order Id: {order.id}</p>
          {Object.keys(cart).map(id => {
            const {title} = products[id]
            return (
              <div key={id}>
                <ol>
                  <li>
                    {' '}
                    {title} <br />{' '}
                    <pre>
                      {'  '}${cart[id].price / 100} x QTY: {cart[id].quantity} =
                      ${cart[id].total / 100}
                    </pre>
                  </li>
                </ol>
              </div>
            )
          })}
          Order Total: ${order.total / 100}
        </div>
        <Link to="/"> Go Home </Link>
      </div>
    )
  } else {
    return ''
  }
}

export default CheckoutSuccess
