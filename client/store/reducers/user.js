import {GET_USER, GET_USER_DATA, REMOVE_USER} from '../actions'

export default function(state = {total: 0}, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case GET_USER_DATA:
      return action.user
    case REMOVE_USER:
      return {}
    default:
      return state
  }
}
