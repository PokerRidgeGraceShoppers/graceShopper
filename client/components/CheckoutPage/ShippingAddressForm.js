import React, {Component} from 'react'

class ShippingAddressForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      street_address: ''
    }
    this.handleChange = this.handleChange.bind(this)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    // this.props.dispatch function
  }

  render() {
    return (
      <div>
        {' '}
        Please enter in your shipping information below:
        <form onSubmit={this.handleSubmit}>
          <input
            name={'firstName'}
            value={this.state.firstName}
            placeholder={'First Name'}
            onChange={this.handleChange}
          />
          <input
            name={'lastName'}
            value={this.state.lastName}
            placeholder={'Last Name'}
            onChange={this.handleChange}
          />
          <input
            name={'street_address'}
            value={this.state.street_address}
            placeholder={'Street Address'}
            onChange={this.handleChange}
          />
          <button onSubmit={this.handleSubmit}>Submit</button>
        </form>
      </div>
    )
  }
}

export default ShippingAddressForm
