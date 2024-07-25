import {useState, useEffect} from "react"
import {Link, useLocation, useNavigate} from "react-router-dom"
import { Form, Button, Row, Col } from "react-bootstrap"
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from "../components/FormContainer"
import Loader from "../components/Loader"
import {useRegisterMutation} from '../slices/usersApiSlice'
import { setCredentials } from "../slices/authSlice"
import { toast } from "react-toastify"

const RegisterScreen = () => {
 
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [confirmPassword, setConfirmPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [register, {isLoading}] = useRegisterMutation()//usersApiSlice

  //get auth part from the state
  const {userInfo} = useSelector((state) => state.auth)

  //search in current url location, if it has redirect (for shipping)
  //so, get either redirect, or just / if no redirect
  const {search} = useLocation()
  const sp = new URLSearchParams(search)//pass in search
  const redirect = sp.get('redirect') || '/'

  useEffect(() => {
    //if user is logged in, redirect to redirect
    if(userInfo) { navigate(redirect)}
  }, [userInfo, redirect, navigate])//pass in the 3 dependencies
 
  
  const submitHandler = async (e) => {
    e.preventDefault()
    
    if(password !== confirmPassword){
        toast.error('Passwords do not match')
        return
    } else {
        try {
            //call login mutation with email/pw from state, unwrap the resolved value
            const res = await register({name, email, password}).unwrap();
            //setCredential will set localStorage to spread values of res as userInfo
            dispatch(setCredentials({...res, }))
            //navigate to redirect (either shipping or /)
            navigate(redirect)
        } catch (err) {
            toast.error(err?.data?.message || err.error)  
        }
      }
    }
    
    return (
    <FormContainer> 
        <h2>Sign Up</h2>
        <Form onSubmit={submitHandler}>
        <Form.Group controlId='name' className='my-2'>
                <Form.Label>Name</Form.Label>
                <Form.Control 
                    type='text' placeholder='Enter name'
                    value={name} //email in the state
                    onChange={(e) => setName(e.target.value)}
                ></Form.Control>
            </Form.Group> 

            <Form.Group controlId='email' className='my-2'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control 
                    type='email' placeholder='Enter email'
                    value={email} //email in the state
                    onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group> 
                
            <Form.Group controlId='password' className='my-2'>
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type='password' placeholder='Enter password'
                    value={password} //password in the state
                    onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword' className='my-2'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                    type='password' placeholder='Confirm password'
                    value={confirmPassword} //password in the state
                    onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>
            
            <Button type='submit' variant='primary' 
            className='mt-2' disabled={isLoading}>{/*disable if loading*/}
                Register
            </Button>
            {isLoading && <Loader />}{/*show loader if loading*/}
        </Form>

        <Row className='py-3'>
            <Col>
                Already have an account?{' '} 
                {/*if redirect exist, redirect after register. otherwise, just register*/}
                <Link to={redirect ? `/login?redirect=${redirect}`
                    : '/login'}>Login</Link>
            </Col>
        </Row>
    
    </FormContainer> 
  )
}

export default RegisterScreen;