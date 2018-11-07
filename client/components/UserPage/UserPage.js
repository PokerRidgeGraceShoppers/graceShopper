import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchUserData} from '../../store/actions/actionCreators/users'
// import PropTypes from 'prop-types'

class UserPage extends React.Component {
  componentDidMount() {
    // console.log('UserPage props: ', this.props)
    // const user = fetchUserData
  }

  render() {
    const userData = this.props.user
    const products = this.props.products

    return (
      <div>
        {userData ? (
          <div>
            <h1>
              Welcome {userData.firstName} {userData.lastName}{' '}
              <img src={userData.image} />
            </h1>

            <div>
              <h2>Orders:</h2>{' '}
              {userData.orders ? (
                userData.orders.map(order => {
                  const orderDate = order.createdAt

                  return (
                    <div key={order.id}>
                      <h3>
                        Ship to: {order.firstName} {order.lastName}
                      </h3>
                      <h4>Address: {order.address} </h4>
                      <h4>Date of order: {orderDate} </h4>
                      <h4>Status: {order.status} </h4>
                      <div>Items in Order: </div>
                      <div>
                        {order.transactions ? (
                          order.transactions.map(element => {
                            return (
                              <div key={element.productId}>
                                <Link to={`/products/${element.productId}`}>
                                  <h4>
                                    {products[element.productId] &&
                                      products[element.productId].title}
                                    {'  '}
                                  </h4>
                                </Link>

                                <div>
                                  <h4>
                                    Price: ${products[element.productId] &&
                                      Number.parseFloat(
                                        products[element.productId].price / 100
                                      ).toFixed(2)}{' '}
                                  </h4>
                                  <h4>
                                    Quantity Ordered:{' '}
                                    {products[element.productId] &&
                                      products[element.productId].quantity}
                                  </h4>
                                  <p>
                                    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                  </p>
                                </div>
                              </div>
                            )
                          })
                        ) : (
                          <p>Loading...</p>
                        )}
                      </div>
                      <div>
                        <h3>
                          Total: ${order.transactions ? (
                            (
                              order.transactions.reduce((accum, curr) => {
                                let total = curr.price * curr.quantity

                                return accum + total
                              }, 0) / 100
                            ).toFixed(2)
                          ) : (
                            <p>Loading...</p>
                          )}{' '}
                        </h3>
                      </div>
                      <p>***************************************************</p>
                      <p>***************************************************</p>
                    </div>
                  )
                })
              ) : (
                <div>Loading.....</div>
              )}
            </div>
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  user: state.user,
  products: state.products.products
})

export default connect(mapStateToProps, {fetchUserData})(UserPage)
