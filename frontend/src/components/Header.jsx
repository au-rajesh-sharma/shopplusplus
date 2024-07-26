import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {Badge, Navbar, Nav, Container, NavDropdown} from "react-bootstrap";
import {FaShoppingCart, FaUser} from "react-icons/fa";
import {LinkContainer} from 'react-router-bootstrap'
import logo from '../assets/logo.png';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import SearchBox from './SearchBox';
import { resetCart } from '../slices/cartSlice';



const Header = () => {

    //use useSelector to select state.cartItems (to get items count)
    const {cartItems} = useSelector((state) => state.cart)

    //get user info from state
    const {userInfo} = useSelector((state) => state.auth)
    

    //initialize dispatch and navigate
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [logoutApiCall] = useLogoutMutation()//to use it

    //logout handler
    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap//unwrap the promise result
            dispatch(logout()) 
            dispatch(resetCart())
            navigate('/login')
        } catch (err) {
            err.message(err)    
        }
    }
    
    //find items in cart, based on qty ordered for each item
    const itemsCount = cartItems.reduce((acc, item) => acc+item.qty,0)
    return (
        <header> 
            <Navbar bg="dark" expand='lg' collapseOnSelect> 
            {/* turn to hamburger when screen size gets smaller, expand='md' */}
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand to='/' >
                            <img src={logo} alt='Rajesh Online Store' />
                            <p class = "navbar-text">Rajesh Online Store</p>
                        </Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto'>
                        <div>
                            <SearchBox />
                        </div>

                        <LinkContainer to='/cart'>
                            <Nav.Link> <FaShoppingCart color='red' />Cart
                                {//if cart has items, show a badge with count
                                cartItems.length > 0  && (
                                //show badge with count
                                <Badge pill bg='success' style={{marginLeft: '5px'}}> 
                                    {/* show items count */}
                                    {itemsCount} 
                                </Badge>
                                       )
                                }
                            </Nav.Link>
                        </LinkContainer>
                            
                            {/* show spaces */}
                            {/* <pre>  </pre> */}
                            
                            
                            {userInfo && (<FaUser color='red'/>)}
                            
                            {/* if user info exist, show user details and logout option, 
                            otherwise direct to login */}
                            {userInfo ? (
                                <>
                                <NavDropdown title={userInfo.name} id='username' >
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                                </>

                            ) : (
                                <LinkContainer to='/login'>
                                    {/* <LinkContainer to='/auth'> */}
                                    <Nav.Link href='/login'> <FaUser /> Sign In</Nav.Link>
                                </LinkContainer>

                            )}
                        
                           
                            {/* if userInfo exists, and its admin user, show admin drop down */}
                            {userInfo && userInfo.isAdmin && (
                                                                
                                <NavDropdown title='Admin options' id='adminmenu' font='bold'>
                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>
                                    
                                </NavDropdown> 
                               
                            ) }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar> 
        </header>
      )
};

export default Header;