import React from 'react'
//import {connect} from 'react-redux'
import Checkout from './Checkout'
import ShippingAddressForm from './ShippingAddressForm'
import {Elements, StripeProvider} from 'react-stripe-elements'

class CheckoutPage extends React.Component {
  constructor() {
    super()
    this.state = {
      hasOrderInfo: false,
      firstName: '',
      lastName: '',
      address: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  validateInfo() {
    const {firstName, lastName, address} = this.state
    return firstName && lastName && address
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    if (this.validateInfo()) {
      console.log(this.state)
      this.setState({hasOrderInfo: true})
    }
    // this.props.dispatch function
  }

  render() {
    return (
      <div>
        {!this.state.hasOrderInfo ? (
          <ShippingAddressForm
            {...this.state}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        ) : (
          <StripeProvider apiKey="pk_test_H4ovcpVmhZxbl2vCUQqrLIEx">
            <Elements>
              <Checkout {...this.state} />
            </Elements>
          </StripeProvider>
        )}
      </div>
    )
  }
}

export default CheckoutPage
