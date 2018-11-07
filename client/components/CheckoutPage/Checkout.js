import React, {Component} from 'react'
import {connect} from 'react-redux'
import {CardElement, injectStripe} from 'react-stripe-elements'
import axios from 'axios'
import {fetchCart, getCart} from '../../store/actions'
import CheckoutSuccess from './CheckoutSuccess'

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      complete: false,
      error: false,
      completedOrder: {},
      errorMessage: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchCart()
  }
  handleChange = ({error}) => {
    if (error) {
      this.setState({errorMessage: error.message})
    } else {
      this.setState({errorMessage: ''})
    }
  }

  async handleSubmit() {
    const {address, firstName, lastName, cart} = this.props
    try {
      let {token} = await this.props.stripe.createToken({name: 'Name'})
      const total = Object.keys(cart).reduce((acc, currItem) => {
        return acc + cart[currItem].total
      }, 0)
      await axios.post('/charge', {
        token: token.id,
        total
      })
      this.setState({complete: true})
      let order = await axios.post(
        `/api/orders/${this.props.user.id ? this.props.user.id : 'guest'}`,
        {total, address, firstName, lastName, cart}
      )
      this.setState({completedOrder: order})
    } catch (err) {
      this.setState({error: true})
    }
  }

  render() {
    if (this.state.complete)
      return (
        <CheckoutSuccess
          order={this.state.completedOrder}
          products={this.props.products}
        />
      )
    const total =
      Object.keys(this.props.cart).reduce((acc, currItem) => {
        return acc + this.props.cart[currItem].total
      }, 0) / 100
    return (
      <div>
        <h1>Checkout</h1>
        <div className="checkout">
          <h3>Shipping Address:</h3>
          <div>
            {this.props.firstName} {this.props.lastName} <br />
            {this.props.address} <br />
            <button onClick={this.props.changeShipping}>
              Edit Shipping Info
            </button>
          </div>
          <h3> Grand Total: ${total}</h3>
          {this.state.error ? (
            <p>Invalid Card info - try again</p>
          ) : (
            <p>Please enter in your card info below to complete your order: </p>
          )}
          <CardElement onChange={this.handleChange} />
          <div className="error" role="alert">
            {this.state.errorMessage}
          </div>
          <button onClick={this.handleSubmit}>Place your order</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({cart, user, products}) => ({
  cart,
  user,
  products: products.products
})

export default connect(mapStateToProps, {fetchCart, getCart})(
  injectStripe(Checkout)
)
