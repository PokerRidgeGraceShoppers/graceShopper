import React from 'react'
import Checkout from './Checkout'
import ShippingAddressForm from './ShippingAddressForm'
import {Elements, StripeProvider} from 'react-stripe-elements'
import {SectionColumn} from '../common'

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
    this.changeShipping = this.changeShipping.bind(this)
  }

  validateInfo() {
    const {firstName, lastName, address} = this.state
    return firstName && lastName && address
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  changeShipping() {
    this.setState({hasOrderInfo: false})
  }

  handleSubmit(event) {
    event.preventDefault()
    if (this.validateInfo()) this.setState({hasOrderInfo: true})
  }

  render() {
    return (
      <SectionColumn>
        <div className="checkout-page">
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
      </SectionColumn>
    )
  }
}

export default CheckoutPage
