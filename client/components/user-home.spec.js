// /* global describe beforeEach it */

// import {expect} from 'chai'
// import React from 'react'
// import enzyme, {shallow} from 'enzyme'
// import Adapter from 'enzyme-adapter-react-16'
// import {UserHome} from './user-home'

// const adapter = new Adapter()
// enzyme.configure({adapter})

// describe('UserHome', () => {
//   let wrapper
//   const user = {
//     firstName: 'Cody',
//     lastName: 'tester',
//     email: 'Cody@testMail.com'
//   }

//   beforeEach(() => {
//     wrapper = shallow(<UserHome {...user} />)
//   })
//   it('renders without exploding', () => {
//     expect(wrapper.length).toEqual(1)
//   })

//   it('includes 1 h2 with class userName', () => {
//     expect(wrapper.find('.userData h2')).to.have.lengthOf(1)
//   })

// it('renders the Users name in an h2', () => {
//   expect(
//     wrapper.contains([
//       <h2 className="userName">
//         Welcome,  {user.lastName}
//       </h2>
//     ])
// ).to.equal(true)
// })
// it('renders the email in an h2', () => {
// expect(userHome.find('h2').text()).to.be.equal('Welcome, cody@email.com')
// })
// })
