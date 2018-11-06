import React, {Fragment} from 'react'
import {connect} from 'react-redux'

import {fetchUserData} from '../../store/actions/users'
// import PropTypes from 'prop-types'

class UserPage extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log('UserPage props: ', this.props)
    // const user = fetchUserData
  }

  render() {
    const userData = this.props.user
    console.log('userData', userData)
    return (
      <div>
        <h1>
          Welcome {userData.firstName} {userData.lastName}
        </h1>

        <div>
          Pending Orders:{' '}
          {console.log('pending orders userData.orders', userData.orders)}
          {userData.orders ? (
            userData.orders.map(order => {
              const orderDate = order.createdAt

              return (
                <div key={order.id}>
                  <p>
                    Ship to: {order.firstName} {order.lastName}
                  </p>
                  <p>Address: {order.address} </p>
                  <p>Date of order: {orderDate} </p>
                  <p>------------------------------------------</p>
                </div>
              )
            })
          ) : (
            <div>Loading.....</div>
          )}
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, {fetchUserData})(UserPage)
