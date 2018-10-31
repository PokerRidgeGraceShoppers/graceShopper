import {GET_USER, REMOVE_USER} from '../actions/users'

export default function(state = {}, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return {}
    default:
      return state
  }
}