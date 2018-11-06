import React from 'react'
import {connect} from 'react-redux'
import ReviewForm from './ReviewForm'
import {
  fetchSingleProduct,
  updateQuantity,
  addCartThunk
} from '../store/actions'
import {SectionColumn, SmallSection, SectionRow, Input} from './common'
import {Button, Card, Image, Icon, Input, ButtonGroup} from 'semantic-ui-react'

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(e, id) {
    const updatedProduct = {
      ...this.props.products[id],
      quantity: Number(e.target.value)
    }
    this.props.updateQuantity(id, updatedProduct)
  }

  handleSubmit(id) {
    this.props.addCartThunk(id)
  }

  componentDidMount() {
    const productId = Number(this.props.match.params.productId)

    this.props.fetchSingleProduct(productId)
  }

  render() {
    const {singleProduct} = this.props
    console.log(singleProduct)
    return (
      <SectionColumn>
        <h1>Single Product </h1>
        <Card>
          <Card.Content>
            <Card.Header>{singleProduct.title}</Card.Header>
          </Card.Content>
          <Image src={singleProduct.image} />
        </Card>
        <h3>{`Category: ${singleProduct.category}`}</h3>

        <Card>
          <Card.Content>
            <Card.Header>{`Price: $${Number.parseFloat(
              singleProduct.price / 100
            ).toFixed(2)}`}</Card.Header>
            <Button onClick={() => this.handleSubmit(singleProduct.id)}>
              Add To Cart
            </Button>
          </Card.Content>
          <Input
            handleChange={this.handleChange}
            value={singleProduct.quantity}
            id={singleProduct.id}
            name="quantity"
            label="Quantity:"
          />
          <Button attached="left">
            <Icon fitted name="angle up" />
          </Button>
          <Button attached="right">
            <Icon fitted name="angle down" />
          </Button>
        </Card>
        <h3>{`Inventory: ${singleProduct.inventory}`}</h3>
        <h3>Description</h3>
        <p>{singleProduct.description}</p>
        <SectionColumn>
          {singleProduct.reviews &&
            singleProduct.reviews.map(review => {
              return (
                <SmallSection key={review.id} style={{width: '50%'}}>
                  <SectionRow
                    style={{width: '80%', justifyContent: 'space-between'}}
                  >
                    <h2>{review.title}</h2>
                    <h3>
                      Rating:{' '}
                      {!review.rating ? '0*' : '*'.repeat(review.rating)}
                    </h3>
                  </SectionRow>
                  <p>{review.body}</p>
                </SmallSection>
              )
            })}
        </SectionColumn>
        <ReviewForm productId={singleProduct.id} />
      </SectionColumn>
    )
  }
}

const mapStateToProps = state => ({
  singleProduct: state.products.product,
  products: state.products.products
})

export default connect(mapStateToProps, {
  fetchSingleProduct,
  updateQuantity,
  addCartThunk
})(SingleProduct)
