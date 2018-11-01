import React from 'react'

const style = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap'
}

export const SectionColumn = props => {
  return <div style={style}>{props.children}</div>
}
