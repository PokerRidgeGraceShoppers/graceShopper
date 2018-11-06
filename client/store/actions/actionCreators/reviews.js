import axios from 'axios'
import {fetchSingleProduct} from './products'
import {
  GET_REVIEWS_FROM_DB,
  GET_SINGLE_REVIEW_FROM_DB,
  EDIT_REVIEW_IN_DB,
  DELETE_REVIEW_FROM_DB
} from '../actionTypes'

// Actions
const getReviewsFromDb = reviews => ({
  type: GET_REVIEWS_FROM_DB,
  reviews
})

const getSingleReviewFromDb = review => ({
  type: GET_SINGLE_REVIEW_FROM_DB,
  review
})

const editReviewInDb = review => ({
  type: EDIT_REVIEW_IN_DB,
  review
})

const deleteReviewFromDb = reviewId => ({
  type: DELETE_REVIEW_FROM_DB,
  reviewId
})

// Thunks
export const reviewSearch = () => {
  return async dispatch => {
    const {data: reviews} = await axios.get('/api/reviews')
    dispatch(getReviewsFromDb(reviews))
  }
}

export const singleReviewSearch = id => async dispatch => {
  const {data} = await axios.get(`/api/reviews/${id}`)
  dispatch(getSingleReviewFromDb(data))
}

export const addNewReview = review => {
  return async dispatch => {
    const {data} = await axios.post('/api/reviews', review)
    dispatch(fetchSingleProduct(data.productId))
    return data
  }
}

export const editReview = (review, id) => {
  return async dispatch => {
    const {data} = await axios.put(`/api/reviews/${id}`, review)
    dispatch(editReviewInDb(data))
    return data
  }
}

export const deleteReview = reviewId => {
  return async dispatch => {
    await axios.delete(`/api/reviews/${reviewId}`)
    dispatch(deleteReviewFromDb(reviewId))
  }
}
