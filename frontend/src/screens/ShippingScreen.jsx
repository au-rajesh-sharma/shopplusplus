import {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Form, Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer.jsx'
import CheckoutSteps from '../components/CheckoutSteps.jsx'
import { saveShippingAddress } from '../slices/cartSlice'

const ShippingScreen = () => {
    //get cart shgipping address if exists
    const cart = useSelector((state) => state.cart)
    const {shippingAddress} = cart

    //put cart shipping address (if exists) in fields , otherwise put ''
    //fields for saving shipping address
    const [address, setAddress] = useState(shippingAddress?.address || '')
    const [city, setCity] = useState(shippingAddress?.city || '')
    const [postCode, setPostCode] = useState(shippingAddress?.postCode || '')
    const [country, setCountry] = useState(shippingAddress?.country || '')

    //initialize dispatch and navigate
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, postCode, country}))
        navigate('/payment')
    }

    return <FormContainer>
        {/* to show checkout steps, passing in step 1 and 2, this is step 2 */}
        <CheckoutSteps step1 step2 />
        
        <h2>Shipping </h2>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='address' className='my-2'>
                <Form.Label>Address</Form.Label>
                <Form.Control type='text' placeholder='Enter address' 
                    value={address} onChange={(e) => setAddress(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='city' className='my-2'>
                <Form.Label>City</Form.Label>
                <Form.Control type='text' placeholder='Enter city' 
                    value={city} onChange={(e) => setCity(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='postCode' className='my-2'>
                <Form.Label>Post code</Form.Label>
                <Form.Control type='text' placeholder='Enter post code' 
                    value={postCode} onChange={(e) => setPostCode(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='country' className='my-2'>
                <Form.Label>Country</Form.Label>
                <Form.Control type='text' placeholder='Enter country' 
                    value={country} onChange={(e) => setCountry(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='my-2'>  
                Continue
            </Button>
            

        </Form>
    </FormContainer>
}

export default ShippingScreen;