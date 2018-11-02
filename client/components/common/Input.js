import React, {Fragment} from 'react'

export const Input = ({handleChange, value, id, name, label}) => {
  return (
    <Fragment>
      <label style={{paddingRight: '10px'}} htmlFor={name}>
        {label}
      </label>
      <input
        style={{width: '20px'}}
        onChange={e => handleChange(e, id)}
        value={value}
        name={name}
        type="number"
        min="0"
      />
    </Fragment>
  )
}
