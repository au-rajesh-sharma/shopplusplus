import { useState, useEffect } from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom'
import FormContainer from '../../components/FormContainer.jsx'
import { Form, Button} from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import { useGetUserDetailsQuery, 
          useUpdateUserMutation, 
       } from '../../slices/usersApiSlice';


const UserEditScreen = () => {

  // get id from url. id must be declared as object {}
  const { id: userId } = useParams();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const {data: user, isLoading, error, refetch} 
    = useGetUserDetailsQuery(userId);

  const [updateUser, { isLoading: loadingUpdate }] 
    = useUpdateUserMutation();

  const navigate = useNavigate();

  // const submitHandler = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await updateUser({ userId, name, email, isAdmin });
  //     toast.success('user updated successfully');
  //     refetch();
  //     navigate('/admin/userlist');//navigate to user list
  //     window.location.reload();//reload the user list after navigating
          
  //   } catch (err) {
  //     toast.error(err?.data?.message || err.error);
  //   }
  // };

 const submitHandler = async (e) => {
    e.preventDefault();
    const result = await updateUser({ userId, name, email, isAdmin })
    if(result.error) {toast.error(result.error)}
    else {
      //toast.success('User updated successfully')
      window.confirm('User updated')
      refetch()
      navigate('/admin/userlist')
      window.location.reload()
      
      //navigate(-1)//navigate to previous screen (product page)
    }
  };


  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  return (
    <>
    <Link to='/admin/userlist' className='btn btn-dark my-3'>
      Go Back
    </Link>
    <FormContainer>
      <h2>Edit User</h2>  
      {loadingUpdate && <Loader />}

      {isLoading ? <Loader /> : error ? <Message variant='danger'>
        {error} </Message> : (
          <Form onSubmit={submitHandler}>
            {/* className='my-2' for margin 2 */}
            <Form.Group controlId='name' className='my-2'>
              <Form.Label>Name</Form.Label> 
              <Form.Control 
                type='text' placeholder='Enter name'
                value={name} onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email' className='my-2'>
              <Form.Label>Email</Form.Label> 
              <Form.Control 
                type='email' placeholder='Enter email'
                value={email} onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='isAdmin' className='my-2'>
              <Form.Check 
                type='checkbox' 
                label='Is Admin'
                checked={isAdmin}
                // onChange={(e) => setIsAdmin( e.target.checked ? true : false )}
                onChange={(e) => setIsAdmin(e.target.checked)}
             ></Form.Check>
            </Form.Group>

            <Button type='submit' variant='primary' className='my-2'>
              Update
            </Button>
          </Form>

        )}
    </FormContainer>
   </>
  )
}

export default UserEditScreen;
