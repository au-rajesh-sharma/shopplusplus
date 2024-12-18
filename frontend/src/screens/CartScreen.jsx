import {Link, useNavigate} from 'react-router-dom'
import {Card, Button, Form, Image, Row, Col, ListGroup} from 'react-bootstrap'
import {FaTrash} from 'react-icons/fa'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import {addToCart, removeFromCart} from '../slices/cartSlice'
import { toast } from 'react-toastify';

const CartScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const cart = useSelector((state) => state.cart)//get cart from local storage
    const {cartItems} = cart//get cartItems from cart
    
    //removeFromCartHandler to dispatch removeFromCart action when item deleted in the cart
    const removeFromCartHandler = async (id) => {
        dispatch(removeFromCart(id))
    }

     //addToCartHandler to dispatch addToCart action when item qty is changed in the cart
     const addToCartHandler = async (product, qty) => {
        dispatch(addToCart({...product, qty}))
    }

     //checkoutHandler when 'proceed to checkout' is clicked 
     const checkoutHandler = () => {
        //if user not logged in, take user to login, otherwise, go to shipping screen
        toast.success('Please sign in to place your order')
        navigate('/login?redirect=/shipping')
        
    }

    //back button handler
  const backHandler = () => {
    //if user not logged in, take user to login, otherwise, go to shipping screen
    // navigate(-1)
    navigate('/')
} 

  return (
    <Row>
        {/* each row has 12 width for columns. */}
        <Col md={8}> {/* this col will take up 8 width out of 12 */}
            <h2 style={{marginBottom: '20px'}}>Shopping Cart</h2>
            {cartItems.length === 0 ? (
               <>
                {/* cart is empty */}

                <Message><p>Your cart is empty</p></Message>
               </>
          
            ) : (
                //cart has items
                
                <ListGroup variant='flush'>
                    {cartItems.map((item) => (
                        <ListGroup.Item key={item._id}>
                            <Row>
                                <Col md={2}>
                                    <Image src={item.image} alt={item.name} fluid rounded />
                                </Col>
                                <Col md={3}>
                                    <Link class='text-bold' to={`/product/${item._id}`}>{item.name}</Link> 
                                </Col>
                                <Col md={2}>
                                    <Form.Control as='select' //drop down select
                                        value={item.qty} // value of qty, initial value 1
                                        onChange={(e) => 
                                            (addToCartHandler(item, Number(e.target.value)))}>
                                        
                                        {/* create drop down option having an array of values from 1 to countInStock */}
                                        {[...Array(item.countInStock).keys()].map((x) => (
                                            <option key={x+1} value={x+1}>
                                                {x+1}
                                            </option>
                                    
                                        ))}
                                    </Form.Control>
                                </Col>
                                <Col md={2} >${item.price}</Col>
                                <Col md={2}>
                                    <Button type='button' variant='light' 
                                        onClick={() => 
                                        removeFromCartHandler(item._id)}>
                                        <FaTrash />
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </Col> {/* end of col occupying 8 width */}
        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h3>Subtotal 
                            {/* calculate and show total items */}
                            ({cartItems.reduce(
                            (acc, item) => acc + item.qty, 0)})items
                        </h3>  

                        {/* calculate and show total price */}
                        ${cartItems.reduce(
                            (acc, item) => 
                            acc + item.price*item.qty, 0).toFixed(2)}
                    </ListGroup.Item>
                    <ListGroup.Item>
                    <Button type='button'className='btn-block' 
                        disabled={cartItems.length === 0} 
                        onClick={checkoutHandler}
                        > 
                        Proceed To Checkout
                    </Button> 
                    <p></p>
                    <Button className='btn btn-dark my-3'  onClick={backHandler}>
                        Continue Shopping
                    </Button>   
                    </ListGroup.Item>    
                </ListGroup>  
            </Card>
        </Col>
        

    </Row>
  )
}

export default CartScreen