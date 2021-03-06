import React from 'react'

export const SectionColumn = props => {
  const style = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }

  return <div style={{...style, ...props.style}}>{props.children}</div>
}
