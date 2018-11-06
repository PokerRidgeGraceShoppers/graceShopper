import React, {Component} from 'react'
import {connect} from 'react-redux'
import CartList from './CartList'
import {SectionColumn, SmallSection} from '../common'
import {
  addCartThunk,
  removeCartThunk,
  updateCartThunk,
  updateTotal,
  fetchCart,
  me
} from '../../store/actions'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.handleClickQuantity = this.handleClickQuantity.bind(this)
  }

  componentDidMount() {
    if (!this.props.user.id) {
      this.props.me().then(() => this.props.fetchCart())
    } else {
      this.props.fetchCart()
    }
  }

  handleClickQuantity(n, id) {
    const {cart} = this.props
    const quantity = cart[id].quantity + n
    if (quantity > 0 && quantity < 11) {
      this.props.updateCartThunk(id, {...cart[id], quantity})
    }
  }

  render() {
    const {cart, products} = this.props
    return (
      <SectionColumn style={{minWidth: '800px'}}>
        {!Object.keys(products).length ? (
          <SmallSection>loading...</SmallSection>
        ) : (
          <CartList
            cart={cart}
            products={products}
            handleClickQuantity={this.handleClickQuantity}
            removeCartThunk={this.props.removeCartThunk}
            updateTotal={this.props.updateTotal}
          />
        )}
      </SectionColumn>
    )
  }
}

const mapStateToProps = ({cart, products, user}) => ({
  cart,
  products: products.products,
  user
})

export default connect(mapStateToProps, {
  addCartThunk,
  removeCartThunk,
  updateCartThunk,
  updateTotal,
  fetchCart,
  me
})(Cart)
