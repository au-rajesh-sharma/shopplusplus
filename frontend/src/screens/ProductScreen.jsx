import {useState} from 'react'// for using component state
import {useDispatch, useSelector} from 'react-redux'
import { toast } from 'react-toastify'
import {useParams, useNavigate} from "react-router-dom"
import {Link} from 'react-router-dom'
import {Form, Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap'
import Rating from "../components/Rating"
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { useGetProductByIdQuery, useCreateReviewMutation } from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice'//addToCart action exported from cartSlice

const ProductScreen = () => {
// get id from url. id must be declared as object {}
const {id: productId} = useParams()

//create dispatch and navigate
const dispatch = useDispatch()
const navigate = useNavigate()

//create state variable for qty, default value 1 and setState()
const [qty, setQty] = useState(1)

//create state variables for review
const [rating, setRating] = useState(0)
const [comment, setComment] = useState('')

//get userInfo
const {userInfo} = useSelector((state) => state.auth)
  
//use productIdApiSlice get query to get products
const {data: product, isLoading, refetch, error} 
    = useGetProductByIdQuery(productId)

const [createReview, {isLoading: loadingProductReview}] 
    = useCreateReviewMutation()

  //dispatch action when handler is called
  const addToCartHandler = () => {
    dispatch(addToCart({...product, qty}))//product values spread... and qty selected
    navigate('/cart')//navigate to cart screen
  }

  //back button handler
  const backHandler = () => {
    //if user not logged in, take user to login, otherwise, go to shipping screen
    navigate(-1)
}

  //write review form submit handler
  const submitHandler = async (e) => {
    e.preventDefault()

    try {
        await createReview({
           productId, rating, comment 
        }).unwrap()
        refetch()
        toast.success('Review Submitted')
        //reset form fields
        setRating(0)
        setComment('')
    } catch (err) {
        toast.error(err?.data?.message || err.error)
    }
  }


  return (
    <>
      { isLoading ? (<Loader />) 
      : error ? (
        //variant may be 'danger', 'success' or 'info'
        <Message variant='danger'>
          <div>{error?.data?.message || error.error}</div> 
        </Message>
    ) : ( 
            //rendering of actual poroduct
            <>
            {/* show product name as title */}
            <Meta title={product.name} />
  <Link className='btn btn-dark my-3'  onClick={backHandler}>
       Back
  </Link>
  <>
    
  <Row className='product-details'>
      <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
      </Col>  
      <Col md={4}>
          <ListGroup variant='flush'>
              <ListGroup.Item>
                  <h2>{product.name}</h2>    
              </ListGroup.Item> 
              <ListGroup.Item>
                  <Rating rating={product.rating} 
                      numReviewText={`${product.numReviews} reviews`} 
                  /> 
              </ListGroup.Item> 
              {/* <ListGroup.Item>Price: ${product.price}</ListGroup.Item>    */}
              <ListGroup.Item>Description: {product.description}</ListGroup.Item>   
          </ListGroup>
      </Col> 
      <Col md={3}>
          <Card>
          <ListGroup variant='flush'>
              <ListGroup.Item>
                  <Row>
                      <Col>Price:</Col>
                      <Col><strong>${product.price}</strong></Col>
                  </Row>
              </ListGroup.Item> 
              <ListGroup.Item>
                  <Row>
                      <Col>Status:</Col>
                      <Col><strong>
                        {product.countInStock > 0 ? `In Stock: ${product.countInStock}` : 'Out of Stock'}
                        </strong></Col>
                  </Row>
              </ListGroup.Item> 
              {
                product.countInStock > 0 && (//only show if countInStock > 0
                <ListGroup.Item> 
                    <Row>
                        <Col>Qty</Col>
                        <Col>
                            <Form.Control as='select' //drop down select
                                value={qty} // value of qty, initial value 1
                                onChange={(e) => 
                                    setQty(Number(e.target.value))}>
                                {/* create drop down option having an array of values from 1 to countInStock */}
                                {[...Array(product.countInStock).keys()].map((x) => (
                                    <option key={x+1} value={x+1}>
                                        {x+1}
                                    </option>
                                
                                ))}
                            </Form.Control>
                        </Col>
                    </Row>

                </ListGroup.Item>  
               
              )}
              <ListGroup.Item>
                  <Button className='btn-block' type='button' 
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                      >Add to Cart
                  </Button>
              </ListGroup.Item> 
          </ListGroup>    
          </Card>
      </Col> 
  </Row>
  
  {/* show reviews */}
  <Row className='product-details reviews'>
    <Col md={6}>
        <br></br>
        <br></br>
        <h3>Reviews</h3>
        {product.reviews.length === 0 
            && <Message>No Reviews</Message>}
            
        <ListGroup variant='flush'>
            {product.reviews.map(review => (
                <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>  
                    <Rating rating={review.rating} 
                        numReviewText={' '} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                </ListGroup.Item>   
            ))}

           {/* area for writing a review */}
           <ListGroup.Item>
                <h3>Write a Review</h3>
                {loadingProductReview && <Loader />}

                {/* if user is logged in */}
                {userInfo ? (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='rating' className='my-2'>
                            <Form.Label>Rating</Form.Label> 
                            <Form.Control 
                                as='select' value={rating}
                                onChange={(e) => setRating(e.target.value)}
                            >
                             <option value=''>Select...</option>
                             <option value='1'>1 - Poor</option>
                             <option value='2'>2 - Fair</option>
                             <option value='3'>3 - Good</option>
                             <option value='4'>4 - Very Good</option>
                             <option value='5'>5 - Excellent</option>
                            </Form.Control>    

                        </Form.Group>
                        <Form.Group controlId='comment' className='my-2'>
                            <Form.Label>Comment</Form.Label> 
                            <Form.Control 
                                as='textarea' value={comment}
                                row='3'
                                onChange={(e) => setComment(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Button className='btn-block' 
                            disabled={loadingProductReview}
                            type='submit'
                            variant='primary'
                            >Submit
                        </Button>

                    </Form>   
                ) : (//user is not logged in
                    <Message>Please <Link to='/login'>
                        sign in </Link>
                        to write a Review
                    </Message>    
                )}
                  
            </ListGroup.Item>  
        </ListGroup>    

    </Col>

  </Row>

  </>

  </>
        )}
    </> 
  )
}

export default ProductScreen