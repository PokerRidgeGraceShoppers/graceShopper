import React from 'react'
import {connect} from 'react-redux'
import {
  reviewSearch,
  singleReviewSearch,
  addNewReview,
  editReview,
  deleteReview
} from '../store/reducers/review'

class ReviewForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      body: '',
      rating: 0
    }
    // this handleSubmit will need to be bound to a parent component before it can be made to work.
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    //Submit changes to reducer, not yet written
    this.props.makeReview(evt.target.id)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  componentDidMount() {
    this.props.fetchReviews()
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="title">
              <small>Title</small>
            </label>
            <input onChange={this.handleChange} name="title" type="text" />
          </div>
          <div>
            <label htmlFor="body">
              <small>Review</small>
            </label>
            <input onChange={this.handleChange} name="body" type="text" />
          </div>
          {/* <div>
          <label htmlFor="reviewRating">
            <small>Rating</small>
          </label>
          <input name="reviewRating" type="number" />
        </div> */}
          <select onChange={this.handleChange} name="rating">
            <option value="0">0 Stars</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  // reducer does not exist yet
  return {reviews: state.reviewSubReducer.reviews}
}

const mapDispatchToProps = dispatch => {
  return {
    //reducer not yet written, these routes not yet live
    fetchReviews: () => {
      dispatch(reviewSearch())
    },
    fetchSingleReview: () => {
      dispatch(singleReviewSearch())
    },
    makeReview: review => {
      dispatch(addNewReview(review))
    },
    changeReview: review => {
      dispatch(editReview(review))
    },
    destroyReview: review => dispatch(deleteReview(review))
  }
}

const ConnectedReviewForm = connect(mapStateToProps, mapDispatchToProps)(
  ReviewForm
)

export default ConnectedReviewForm
