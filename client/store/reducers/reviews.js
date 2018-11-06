import {
  GET_REVIEWS_FROM_DB,
  GET_SINGLE_REVIEW_FROM_DB,
  EDIT_REVIEW_IN_DB,
  GET_NEW_REVIEW_FROM_DB,
  DELETE_REVIEW_FROM_DB
} from '../actions'

const initialState = {
  reviews: [],
  selectedReview: null
}

const reviews = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEWS_FROM_DB:
      return {...state, reviews: action.reviews}
    case GET_SINGLE_REVIEW_FROM_DB:
      return {...state, selectedReview: action.review}
    case EDIT_REVIEW_IN_DB:
      return {
        ...state,
        selectedREVIEW: action.review
      }
    case GET_NEW_REVIEW_FROM_DB:
      return {...state, reviews: [...state.reviews, action.review]}
    case DELETE_REVIEW_FROM_DB:
      return {
        ...state,
        reviews: state.reviews.filter(
          review => review.id !== Number(action.reviewId)
        )
      }
    default:
      return state
  }
}

export default reviews
