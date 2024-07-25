import { useState, useEffect } from "react"
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {Form, Button, Col} from 'react-bootstrap'
import FormContainer from "../components/FormContainer"
import CheckoutSteps from "../components/CheckoutSteps"
import {savePaymentMethod} from '../slices/cartSlice'

const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    //initialize dispatch and navigate
    const dispatch = useDispatch()
    const navigate = useNavigate()

    //get cart shgipping address if exists
    const cart = useSelector((state) => state.cart)
    const {shippingAddress} = cart

    useEffect(() => {
    //if no shipping address, redirect to shipping
    if(!shippingAddress) { navigate('/shipping')}
  }, [shippingAddress, navigate])//pass in the 2 dependencies

  //save payment method and navigate to place order
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }

  return (
    <FormContainer>
         {/* to show checkout steps, passing in step 1 and 2, this is step 2 */}
         <CheckoutSteps step1 step2 step3 />
         
        <h2>Payment Method</h2>

        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>Select Payment Method</Form.Label>
                <Col>
                    <Form.Check type='radio' className='my-2'
                    label='PayPal or Card'
                    id='PayPal' name='paymentMethod' value='PayPal' checked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    ></Form.Check>
                </Col>
            </Form.Group>

            <Button type='submit' variant='primary'>
                Continue
            </Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen