import React from 'react'

const ShippingAddressForm = props => {
  return (
    <div>
      {' '}
      Please enter in your shipping information below:
      <form onSubmit={props.handleSubmit}>
        <input
          name={'firstName'}
          value={props.firstName}
          placeholder={'First Name'}
          onChange={props.handleChange}
        />
        <input
          name={'lastName'}
          value={props.lastName}
          placeholder={'Last Name'}
          onChange={props.handleChange}
        />
        <input
          name={'address'}
          value={props.address}
          placeholder={'Street Address'}
          onChange={props.handleChange}
        />
        <button onSubmit={props.handleSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default ShippingAddressForm
