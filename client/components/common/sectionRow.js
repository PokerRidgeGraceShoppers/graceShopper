import React from 'react'

export const SectionRow = props => {
  const style = {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  }

  return <div style={{...style, ...props.style}}>{props.children}</div>
}
