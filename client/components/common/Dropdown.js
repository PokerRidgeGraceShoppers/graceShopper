import React from 'react'

const style = {
  display: 'flex',
  position: 'absolute',
  top: '44px',
  background: 'white',
  border: '1px solid #fff',
  borderRadius: '5px',
  boxShadow: '0px 2px 10px 2px rgba(0,0,0,0.4)'
}

class Dropdown extends React.Component {
  constructor(props) {
    super(props)
    this.state = {displayMenu: false}
    this.showDropdownMenu = this.showDropdownMenu.bind(this)
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this)
  }

  showDropdownMenu(event) {
    event.preventDefault()
    this.setState({displayMenu: true}, () => {
      document.addEventListener('click', this.hideDropdownMenu)
    })
  }

  hideDropdownMenu() {
    this.setState({displayMenu: false}, () => {
      document.removeEventListener('click', this.hideDropdownMenu)
    })
  }

  render() {
    return (
      <div>
        <div
          className="button"
          onClick={this.showDropdownMenu}
          style={{...style, background: 'red'}}
        >
          CATEGORIES
        </div>
        <div style={style}>
          {this.state.displayMenu ? <ul>{this.props.children}</ul> : null}
        </div>
      </div>
    )
  }
}

export default Dropdown
