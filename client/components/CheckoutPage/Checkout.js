import React, {Component} from 'react'
import {connect} from 'react-redux'
import {CardElement, injectStripe} from 'react-stripe-elements'
import axios from 'axios'
import ShippingAddressForm from './ShippingAddressForm'
import {fetchCart} from '../../store/actions/cart'

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      totalcost: 50,
      complete: false,
      error: false
    }
    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    this.props.fetchCart()
  }

  async submit(ev) {
    // User clicked submit
    const {address, firstName, lastName} = this.props
    try {
      let {token} = await this.props.stripe.createToken({name: 'Name'})

      let response = await axios.post('/charge', {
        token: token.id,
        totalcost: this.state.totalcost
      })
      this.setState({complete: true})

      let orderRes = await axios.post(
        `/api/orders/${this.props.user.id ? this.props.user.id : 'guest'}`,
        {
          total: this.state.totalcost,
          address,
          firstName,
          lastName,
          cart: this.props.cart
        }
      )

      console.log(orderRes)
    } catch (err) {
      this.setState({error: true})
    }
  }

  render() {
    console.log(this.props)
    if (this.state.complete)
      return <h1>Purchase Complete (go back to orders? or home )</h1>

    return (
      <div>
        Checkout Page:
        <div className="checkout">
          {this.state.error && <p>Invalid Card info</p>}
          <p>{this.props.firstName}</p>
          <p>{this.props.lastName}</p>
          <p>{this.props.street_address}</p>
          <p>Please enter in your card info below to complete your order: </p>
          <CardElement />
          <button onClick={this.submit}>Place your order</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({cart, user}) => ({cart, user})

export default connect(mapStateToProps, {fetchCart})(injectStripe(Checkout))
