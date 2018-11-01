import React from 'react'

const style = {
  display: 'flex',
  justifyContent: 'space-evenly',
  flexWrap: 'wrap',
  margin: '30px',
  width: '80%'
}

export const ColumnWrap = props => {
  return <div style={style}>{props.children}</div>
}
