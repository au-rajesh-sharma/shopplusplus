import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTrash, FaTimes, FaEdit, FaCheck } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import { useGetUsersQuery, useDeleteUserMutation } from '../../slices/usersApiSlice';

const UserListScreen = () => {
    
//get order details by calling query 
const {data: users, refetch, isLoading, error} = useGetUsersQuery()
  
//get deleteUser mutation
const [deleteUser, {isLoading: loadingDelete}] = useDeleteUserMutation()  
  
const deleteHandler = async (id) => {
    if(window.confirm('Are you sure you want to delete this user?')) {
        try {
            await deleteUser(id)
            toast.success('User deleted')
            refetch()
        } catch (err) {
            toast.error(err?.data?.message || err.error)    
        }
    }
}


  return (
            <>
            <h2>Users</h2>
            {loadingDelete && <Loader />
            }
            {isLoading ? <Loader /> : 
              error ? <Message variant='danger'>
                {/* {error} */}
                Please logout, and Sign in again to view users
                </Message> : (
                <Table striped hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>ADMIN</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    {/* create link to emailing user */}
                                    <td><a href={`mailto: ${user.email}`}>
                                        {user.email}</a></td>
                                    
                                    <td>{user.isAdmin ? (
                                        <FaCheck style={{color: 'green'}} />
                                    ) : (
                                        <FaTimes style={{color: 'red'}} />
                                    )}</td>

                                    <td>
                                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                        <Button className='btn-sm' variant='dark'>
                                            <FaEdit />
                                        </Button>
                                    </LinkContainer>
                                    </td>
                                    {/* if its not admin user, show delete button */}
                                    <td>
                                    {!user.isAdmin && 
                                        
                                        <LinkContainer to=''><Button className='btn-sm' variant='danger'
                                            onClick={() => deleteHandler(user._id)}
                                            ><FaTrash style={{color: 'white'}}/>
                                        </Button>
                                        </LinkContainer>
                                    }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

            )}
            
        </>
    )
}

export default UserListScreen;