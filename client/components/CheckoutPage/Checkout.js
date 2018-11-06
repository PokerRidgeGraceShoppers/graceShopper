import React, {Component} from 'react'
import {connect} from 'react-redux'
import {CardElement, injectStripe} from 'react-stripe-elements'
import axios from 'axios'
import {fetchCart, getCart} from '../../store/actions'

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      complete: false,
      error: false
    }
    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    this.props.fetchCart()
  }

  async submit() {
    const {address, firstName, lastName, cart} = this.props
    try {
      let {token} = await this.props.stripe.createToken({name: 'Name'})

      const total = Object.keys(cart).reduce((acc, currItem) => {
        return acc + cart[currItem].total
      }, 0)

      await axios.post('/charge', {token: token.id, total})
      this.setState({complete: true})

      await axios.post(
        `/api/orders/${this.props.user.id ? this.props.user.id : 'guest'}`,
        {total, address, firstName, lastName, cart}
      )
    } catch (err) {
      this.setState({error: true})
    }
  }

  render() {
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

export default connect(mapStateToProps, {fetchCart, getCart})(
  injectStripe(Checkout)
)
