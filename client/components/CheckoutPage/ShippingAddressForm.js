import React from 'react'

const ShippingAddressForm = props => {
  return (
    <div className="checkout-form-container">
      <h3>Please enter in your shipping information below:</h3>
      <form className="checkout-form" onSubmit={props.handleSubmit}>
        <input
          name="firstName"
          value={props.firstName}
          placeholder="First Name"
          onChange={props.handleChange}
        />
        <input
          name="lastName"
          value={props.lastName}
          placeholder="Last Name"
          onChange={props.handleChange}
        />
        <input
          name="address"
          value={props.address}
          placeholder="Street Address"
          onChange={props.handleChange}
        />
        <button className="btn-submit" onSubmit={props.handleSubmit}>
          Cherckout
        </button>
      </form>
    </div>
  )
}

export default ShippingAddressForm
