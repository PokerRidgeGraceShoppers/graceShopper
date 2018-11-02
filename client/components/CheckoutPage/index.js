import React from 'react'
//import {connect} from 'react-redux'
import Checkout from './Checkout'
import {Elements, StripeProvider} from 'react-stripe-elements'

class CheckoutPage extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div>
        <StripeProvider apiKey="pk_test_H4ovcpVmhZxbl2vCUQqrLIEx">
          <Elements>
            <Checkout />
          </Elements>
        </StripeProvider>
      </div>
    )
  }
}

export default CheckoutPage
