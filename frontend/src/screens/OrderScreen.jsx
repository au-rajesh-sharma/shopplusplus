
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card, ListGroupItem } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useGetOrderDetailsQuery, useGetPaypalClientIdQuery, 
    usePayOrderMutation, useDeliverOrderMutation } from '../slices/ordersApiSlice';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'

const OrderScreen = () => {
    //get id from url, name it orderId
    const {id: orderId} = useParams()

    //get order details by calling query passing order id
    const {data: order, refetch, isLoading, error} 
        = useGetOrderDetailsQuery(orderId)
    
    //initialize function for payOrder and deliverOrder
    const [payOrder, {isLoading:loadingPay}] = usePayOrderMutation()
    const [deliverOrder, {isLoading:loadingDeliver}] = useDeliverOrderMutation()

    //get paypal dispatch and isPending for use
    const [{isPending}, paypalDispatch] = usePayPalScriptReducer()
  
    //get user info from state
    const {userInfo} = useSelector((state) => state.auth)
    
    //initialize getPayPalClientId query for use
    const {data: paypal, isLoading: loadingPayPal, error: errorPayPal,} 
        = useGetPaypalClientIdQuery()
    
    //create use effect to load paypal script
    useEffect(() => {
        //check for no errors
        if(!errorPayPal && !loadingPayPal && paypal.clinetid){
           
            //create async function to load paypal script
           const loadPayPalScript = async () => {
            //use paypal dispatch
            paypalDispatch({//the arguments to dispatch 
                type: 'resetOptions',
                value: {
                    'client-id': paypal.clinetid,
                    currency: 'AUD',
                }
            })
            //dispatch with arguments
            paypalDispatch({type: 'setLoadingStatus', value: 'pending'})
           } 
           if(order && !order.isPaid) {//if order exist and not paid
                if(!window.paypal){//if script is not already loaded
                    loadPayPalScript()//load it 
                }
           }
        }//give dependencies
    }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal])

    //async function onApprove(data, actions) { 
    function onApprove(data, actions) { 
        //actions trigger paypal. after paypal is approved, 
        //capture the order pmt details, and call 
        //async function passing details
        return actions.order.capture().then(async function (details) { 
            try {
               await payOrder({orderId, details}).unwrap()//call payOrder mutation
               refetch()//refetch after marked as paid 
               toast.success('Payment successful')
            } catch (err) {
                toast.error(err?.data?.message || err.message)
            }
        })
    }
    
     
     function onError(err) {
        toast.error(err.message) 
     }
     
    function createOrder(data, actions) {
        //create order entry thru paypal actions  with total paid amount
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: order.totalPrice
                    },
                },
            ],
        })//it returns a promise, so resolve by returning orderId
        .then((orderID) => {
            return orderID
        })//end .then
     }

    //handler for deliver Order button
     const deliverOrderHandler = async () => {
        try {
            await deliverOrder(orderId) 
            refetch()
            toast.success('Order delivered')   
        } catch (err) {
            toast.error(err?.data?.message || err.message)   
        }
    } 

     //handler functions for mark as delivered
     async function payOrderHandler() {
        //call payOrder mutation, set details to empty payer object
        await payOrder({orderId, details: {payer: {} } })
        refetch()//refetch after marked as paid 
        toast.success('Payment successful')
     }

    const navigate = useNavigate()
    const backHandler = () => {
        navigate(-1)//navigate to previous screen (product page)
    }
    
    const backProductHandler = () => {
        navigate('/')//navigate to previous screen (product page)
    }


  return isLoading ?  (<Loader />) : error ? 
  (<Message variant='danger'>{error?.data?.message || error.error}</Message>) 
    : (
        <>
        {   !userInfo.isAdmin ? (
            <Button onClick={backProductHandler}
                className='btn btn-dark my-3'>
                Go To Products
            </Button>
        ) : (
            <Button onClick={backHandler}
                className='btn btn-dark my-3'>
                Go Back
            </Button>
        )}
            <h2>Order: {order._id}</h2>
            <Row>
                <Col md={8}>
                   <ListGroup variant='flush'> 
                        <ListGroupItem>
                            <h5><strong>Shipping</strong></h5>
                            <p><strong>Name:{' '}</strong>
                                {order.user.name}</p> 
                            <p><strong>Email:{' '}</strong>
                                {order.user.email}</p>  
                            <p><strong>Address:{' '}</strong>
                                {order.shippingAddress.address},{' '}
                                 {order.shippingAddress.city},{' '}
                                 {order.shippingAddress.postCode},{' '}
                                 {order.shippingAddress.country}
                            </p>
                            </ListGroupItem>
                            <ListGroupItem>
                                <h5><strong>Delivery Status:</strong></h5>
                                {order.isDelivered ? (
                                <Message variant='success'>
                                    Delivered on {order.deliveredAt}
                                </Message>
                            ) : (
                                <Message variant="danger">
                                    Not Delivered 
                                </Message>
                            )}   
                        </ListGroupItem>
                        <ListGroupItem>
                            <h5><strong>Payment Method:</strong></h5>
                            <p><strong>{order.paymentMethod}</strong></p>
                            {order.isPaid ? (
                                <Message variant='success'>
                                    Paid on {order.paidAt}
                                </Message>
                            ) : (
                                <Message variant='danger'>
                                    Not Paid 
                                </Message>
                            )}   
                        </ListGroupItem>
                        <ListGroupItem>
                            <h5><strong>Order Items</strong></h5>
                            {order.orderItems.map((item, index) => (
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
                        </ListGroupItem>
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
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            {/* PAY ORDER PAYPAL BUTTONS if order not paid */}
                            {!order.isPaid && (//if order not paid, then
                                <ListGroup.Item>
                                    {/*if loadingPay, then show loader*/}
                                    {loadingPay && <Loader />}
                                    {/*if pending, then show loader, otherwise*/}
                                    {isPending ? (<Loader />) : (
                                        <div>
                                            <PayPalButtons 
                                                createOrder={createOrder}
                                                onApprove={onApprove}
                                                onError={onError}
                                            ></PayPalButtons>
                                        </div>
                                       )
                                    }

                                </ListGroup.Item>
                            )}
                       
                            {/*if loading, then show loader, otherwise*/}
                            {loadingDeliver && <Loader />}
                            
                            {/* show button for mark as paid if admin user 
                                and order not paid*/}
                            {userInfo && userInfo.isAdmin && !order.isPaid && (
                                 <ListGroup.Item>
                                    <Button type='button' className='btn btn-block'
                                        onClick={payOrderHandler}  
                                        >Mark as Paid
                                    </Button> 
                                </ListGroup.Item>
                            )}

                            {/* show button for mark as delivered if admin user
                                and order is paid */}
                            { !order.isDelivered && order.isPaid 
                                && userInfo && userInfo.isAdmin &&  (
                                <ListGroup.Item>
                                    <Button type='button' className='btn btn-block' 
                                        onClick={deliverOrderHandler} 
                                        >Mark As Delivered
                                    </Button>
                                </ListGroup.Item> 
                            )} 
                            
                        </ListGroup>
                    </Card> 
                </Col>
            </Row>
        </>
    )
}


export default OrderScreen;