import { LinkContainer } from 'react-router-bootstrap';
//import { Link, useNavigate } from 'react-router-dom';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';//X, edit, trash
import { useNavigate, useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import Paginate from '../../components/Paginate';
import { useGetProductsQuery, 
    useCreateProductMutation,
    useDeleteProductMutation,
    } from '../../slices/productsApiSlice';

const ProductListScreen = () => {
  
  //get page number from url
  const {pageNumber} = useParams()

  const navigate = useNavigate()

  //get order details by calling query 
  const {data, isLoading, error, refetch} 
    = useGetProductsQuery({pageNumber})
  
  //get create product mutation 
  const [createProduct, {isLoading: loadingCreate}] = useCreateProductMutation()

   //get delete product mutation 
   const [deleteProduct, {isLoading: loadingDelete}] = useDeleteProductMutation()
  
  //createProductHandler
  const createProductHandler = async () => {
    if(window.confirm('Are you sure you want to create a new product?')) {
        try {
            await createProduct()
            toast.success('Product created')
            refetch()
            navigate(`/admin/productlist/${data.pages}`)
        } catch (err) {
            toast.error(err?.data?.message || err.error)    
        }
    }
  }

   //delete handler
   const deleteHandler = async (id) => {
    if(window.confirm('Are you sure you want to delete this product?')) {
        try {
            await deleteProduct(id)
            toast.success('Product deleted')
            refetch()
            navigate(`/admin/productlist/${pageNumber}`)
           
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }
  }

   
  return (
        <>
            <Row className='align-items-center'>
                <Col><h2>Products</h2></Col>
                <Col className='text-end'>
                    <Button className='btn-md m-4'
                        onClick={createProductHandler}>
                        <FaEdit />New 
                    </Button>
                </Col>
            </Row>

            {loadingCreate && <Loader />}
            {loadingDelete && <Loader />}
            
            {isLoading ? <Loader /> : 
              error ? <Message variant='danger'>{error.data.message}</Message> 
              : (
                    // use fragment for pagination
                <>
                    <Table striped hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>

                                    <td>
                                    {/* edit button with link*/}
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button className='btn-sm mx-2' variant='dark'>
                                            <FaEdit />
                                        </Button>
                                    </LinkContainer>
                                    </td>

                                    <td>
                                    {/* delete button with handler*/}
                                    <LinkContainer to=''>
                                    <Button className='btn-sm' variant='danger'
                                        onClick={() => deleteHandler(product._id)}>
                                            <FaTrash />
                                    </Button>
                                    </LinkContainer>
                                    
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                     {/* use the paginate component. 
                        give it curr page, total pages, isAdmin as true */}
                        <Paginate pages={data.pages} 
                            page={data.page}
                            isAdmin={true} />
                            
                        
                </>
            )}
        </>
    )  
}

export default ProductListScreen;