import React from 'react'

const CheckoutSuccess = ({data, products, history}) => {
  console.log(data)
  const {order, transactions} = data
  return (
    <div className="checkout-order">
      <div>
        <h1>Congrats, your order was placed!</h1>
        <p>{`Name: ${order.firstName} ${order.lastName}`}</p>
        <p>{`Address: ${order.address}`}</p>
        <p>{`Order ID: ${order.id}`}</p>
      </div>

      <table>
        <tbody>
          <tr>
            <td className="header">Product</td>
            <td className="header">Price</td>
            <td className="header">quantity</td>
            <td className="header">total</td>
          </tr>
          {transactions.map(item => (
            <tr key={item.id}>
              <td>{products[item.productId].title}</td>
              <td>{`$${(products[item.productId].price / 100).toFixed(2)}`}</td>
              <td>{item.quantity}</td>
              <td>{`$${(item.total / 100).toFixed(2)}`}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div
          style={{
            display: 'flex',
            width: '300px',
            justifyContent: 'space-evenly'
          }}
        >
          <button
            className="btn-submit"
            onClick={() => history.push('/products')}
          >
            Continue Shopping
          </button>
          <button className="btn-submit" onClick={() => history.push('/home')}>
            Return Home
          </button>
        </div>
        <p style={{alignSelf: 'flex-end'}}>{`Order total: $${(
          order.total / 100
        ).toFixed(2)}`}</p>
      </div>
    </div>
  )
}

export default CheckoutSuccess
