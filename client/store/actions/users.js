import axios from 'axios'
import history from '../../history'
import {getCart} from './cart'

export const GET_USER = 'GET_USER'
export const GET_USER_DATA = 'GET_USER_DATA'
export const REMOVE_USER = 'REMOVE_USER'

export const getUser = user => ({type: GET_USER, user})
export const getUserData = user => ({type: GET_USER_DATA, user})
export const removeUser = () => ({type: REMOVE_USER})

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || {}))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const fetchUserData = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/${userId}`)
    dispatch(getUserData(data))
  } catch (error) {
    console.error(error)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    dispatch(getCart({}))
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}
