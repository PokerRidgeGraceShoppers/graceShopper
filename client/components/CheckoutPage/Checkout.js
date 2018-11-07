import React, {Component} from 'react'
import {connect} from 'react-redux'
import {CardElement, injectStripe} from 'react-stripe-elements'
import axios from 'axios'
import {fetchCart, deleteCart} from '../../store/actions'
import CheckoutSuccess from './CheckoutSuccess'
import {withRouter} from 'react-router-dom'

const style = {
  base: {
    iconColor: '#8898AA',
    color: 'black',
    lineHeight: '36px',
    fontWeight: 300,
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSize: '19px',

    '::placeholder': {
      color: '#8898AA'
    }
  },
  invalid: {
    iconColor: '#e85746',
    color: '#e85746'
  }
}

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      complete: false,
      error: false,
      order: null
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
      await axios.post('/charge', {
        token: token.id,
        total
      })

      const {data} = await axios.post(
        `/api/orders/${this.props.user.id ? this.props.user.id : 'guest'}`,
        {total, address, firstName, lastName, cart}
      )

      this.setState({order: data, complete: true})

      this.props.deleteCart()
    } catch (err) {
      this.setState({error: true})
    }
  }

  render() {
    if (this.state.complete)
      return (
        <CheckoutSuccess
          products={this.props.products}
          data={this.state.order}
          history={this.props.history}
        />
      )

    return (
      <div className="checkout-container">
        <h2>Checkout Page:</h2>
        <div className="checkout">
          <p>{`Name:  ${this.props.firstName} ${this.props.lastName}`}</p>
          <p>{`Address:  ${this.props.address}`}</p>
          {this.state.error && <p>Invalid Card info - try again</p>}
          {!this.state.error && (
            <p>Please enter in your card info below to complete your order: </p>
          )}
          <CardElement style={style} />
          <button className="btn-submit" onClick={this.submit}>
            Submit
          </button>
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

export default withRouter(
  connect(mapStateToProps, {fetchCart, deleteCart})(injectStripe(Checkout))
)
