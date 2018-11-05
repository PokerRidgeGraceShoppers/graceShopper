import React from 'react'
import {connect} from 'react-redux'
import {
  reviewSearch,
  singleReviewSearch,
  addNewReview,
  editReview,
  deleteReview
} from '../store/actions/reviews'

class ReviewForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      body: '',
      rating: 0
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    console.log('hit handleSubmit in reviewForm & evt', evt.target)
    const {productId, userId} = this.props
    this.props.makeReview({...this.state, productId, userId})
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  componentDidMount() {
    // this.props.fetchReviews()
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="title">
              <small>Title</small>
            </label>
            <input
              onChange={this.handleChange}
              name="title"
              type="text"
              placeholder="review must have a name"
            />
          </div>
          <div>
            <label htmlFor="body">
              <small>Review</small>
            </label>
            <input
              onChange={this.handleChange}
              name="body"
              type="text"
              placeholder="must be over 100 characters"
            />
          </div>

          <select onChange={this.handleChange} name="rating">
            {/* <option value="0">0 Stars</option> */}
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
          <div>
            {this.state.body.length <= 99 ? (
              <button type="submit" disabled>
                Submit
              </button>
            ) : (
              <button type="submit">Submit</button>
            )}
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  reviews: state.reviews.reviews,
  selectedReview: state.reviews.selectedReview,
  userId: state.user.id
})

const mapDispatchToProps = dispatch => {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm)
