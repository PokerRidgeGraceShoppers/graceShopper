import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {
  reviewSearch,
  singleReviewSearch,
  addNewReview,
  editReview,
  deleteReview
} from '../store/actions/reviews'

class Review extends React.Component {
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
    return console.log(this.props)
  }
}

const mapStateToProps = state => ({
  reviews: state.reviews.reviews
  // selectedReview: state.reviews.selectedReview
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

export default connect(mapStateToProps, mapDispatchToProps)(Review)
