import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import Loader from '../components/Loader';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';

const PlaceOrderScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  
  //get createOrder mutation method for using it
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
 

  useEffect(() => {
    //if no shipping address, redirect to shipping screen
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
      //if no payment method, redirect to payment screen
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
    //pass in the 3 dependencies
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  //inside handler, call createOrder mutation
  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({//call api mutation method
        //get all data from cart
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.tax, 
        totalPrice: cart.totalPrice,
      }).unwrap()//unwrap because it returns a promise
      
      dispatch(clearCartItems());//dispatch action method
      toast.success('Your order is placed')
      navigate(`/order/${res._id}`);//then, navigate to this route
      
    } catch (error) {
      toast.error(error);//show error in toast
      navigate('/cart')
    }
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h5>Shipping</h5>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {' '} 
                {cart.shippingAddress.city}{' '}
                {cart.shippingAddress.postCode},{' '}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h5>Payment Method</h5>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h5>Order Items</h5>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image} alt={item.name}
                            fluid rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item._id}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = $
                          {/* for creating 2 decimal places *100 /100 */}
                          {(item.qty * (item.price * 100)) / 100}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h5>Order Summary</h5>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.tax}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {/* if error, then show error */}
                {error && (
                  <Message variant='danger'>{error.data.message}</Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                  >Place Order
                </Button>
                {/* if loading, then show loader */}
                {isLoading && <Loader />}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;


