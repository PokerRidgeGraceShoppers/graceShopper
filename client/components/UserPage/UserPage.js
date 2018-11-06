import React from 'react'
import {connect} from 'react-redux'
import {SectionColumn, SmallSection, SectionRow, Input} from '../common'
import {fetchUserData} from '../../store/actions'
// import PropTypes from 'prop-types'

const UserPage = props => {
  const userData = props.user
  console.log('props.user', props.user)
  return (
    <div>
      <h1>
        Welcome {userData.firstName} {userData.lastName}
      </h1>

      <div>
        Pending Orders:{' '}
        {userData.orders.map(order => {
          return (
            <div key={order.id}>
              Ship to: {order.firstName} {order.lastName}
            </div>
          )
        })}
      </div>
    </div>
  )
}
const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, {fetchUserData})(UserPage)
