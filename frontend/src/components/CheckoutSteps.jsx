import { Nav } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

const CheckoutSteps = ({step1, step2, step3, step4}) => {
  return (
    <Nav className='justify-content-center' >
        <Nav.Item>
            {step1 ? (//if it is step 1 
                <LinkContainer to='/login'>
                    <Nav.Link>Sign In</Nav.Link>
                </LinkContainer>
            ) : (
                <Nav.Link disabled>Sign In</Nav.Link>
            )}
        </Nav.Item>

        <Nav.Item>
            {step2 ? (//if it is step 2 (shipping)
                <LinkContainer to='/shipping'>
                    <Nav.Link>Shipping</Nav.Link>
                </LinkContainer>
            ) : (
                <Nav.Link disabled>Shipping</Nav.Link>
            )}
        </Nav.Item>

        <Nav.Item>
            {step3 ? (//if it is step 3 (payment)
                <LinkContainer to='/payment'>
                    <Nav.Link>Payment</Nav.Link>
                </LinkContainer>
            ) : (
                <Nav.Link disabled>Payment</Nav.Link>
            )}
        </Nav.Item>

        <Nav.Item>
            {step4 ? (//if it is step 4 (place order)
                <LinkContainer to='/placeorder'>
                    <Nav.Link>Place Order</Nav.Link>
                </LinkContainer>
            ) : (
                <Nav.Link disabled>Place Order</Nav.Link>
            )}
        </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps