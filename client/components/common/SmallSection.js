import React from 'react'

export const SmallSection = props => {
  let style = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '25%',
    border: '1px solid #fff',
    borderRadius: '5px',
    padding: '10px',
    margin: '10px',
    minWidth: '200px',
    boxShadow: '0px 2px 10px 2px rgba(0,0,0,0.4)'
  }

  style = {...style, ...props.style}

  return <div style={style}>{props.children}</div>
}
