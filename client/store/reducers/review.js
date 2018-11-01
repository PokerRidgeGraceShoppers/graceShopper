import axios from 'axios'

const initialState = {
  reviews: [],
  selectedReview: {}
}

const GET_REVIEWS_FROM_DB = 'GET_REVIEWS_FROM_DB'

const GET_SINGLE_REVIEW_FROM_DB = 'GET_SINGLE_REVIEW_FROM_DB'

const EDIT_REVIEW_IN_DB = 'EDIT_REVIEW_IN_DB'

const GET_NEW_REVIEW_FROM_DB = 'GET_NEW_REVIEW_FROM_DB'

const DELETE_REVIEW_FROM_DB = 'DELETE_REVIEW_FROM_DB'

const getReviewsFromDb = reviews => ({
  type: GET_REVIEWS_FROM_DB,
  payload: reviews
})

const getSingleReviewFromDb = review => ({
  type: GET_SINGLE_REVIEW_FROM_DB,
  payload: review
})

const editReviewInDb = review => ({
  type: EDIT_REVIEW_IN_DB,
  payload: review
})

const getNewReviewFromDb = review => ({
  type: GET_NEW_REVIEW_FROM_DB,
  payload: review
})

const deleteReviewFromDb = reviewId => ({
  type: DELETE_REVIEW_FROM_DB,
  payload: reviewId
})

export const reviewSearch = () => {
  return async dispatch => {
    const {data} = await axios.get('/api/reviews')
    console.log('reviewSerach in reducer data: ', data)
    dispatch(getReviewsFromDb(data))
  }
}

export const singleReviewSearch = id => async dispatch => {
  const response = await axios.get(`/api/reviews/${id}`)
  const reviewData = response.data
  dispatch(getSingleReviewFromDb(reviewData))
}

export const addNewReview = review => {
  return async dispatch => {
    const {data} = await axios.post('/api/reviews', review)
    dispatch(getNewReviewFromDb(data))
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

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEWS_FROM_DB:
      console.log('reviewreducer get action: ', action)
      return {...state, reviews: action.payload}
    case GET_SINGLE_REVIEW_FROM_DB:
      return {...state, selectedReview: action.payload}
    case EDIT_REVIEW_IN_DB:
      return {
        ...state,
        selectedREVIEW: action.payload
      }
    case GET_NEW_REVIEW_FROM_DB:
      return {...state, reviews: [...state.reviews, action.payload]}
    case DELETE_REVIEW_FROM_DB:
      return {
        ...state,
        reviews: state.reviews.filter(
          review => review.id !== Number(action.payload)
        )
      }
    default:
      return state
  }
}

export default reviewReducer
