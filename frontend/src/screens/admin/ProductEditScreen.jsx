import { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom'
//import { FormContainer } from '../../../components/FormContainer.jsx';
import FormContainer from '../../components/FormContainer.jsx'
import { Form, Button} from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import { useGetProductDetailsQuery, 
          useUpdateProductMutation, 
          useUploadProductImageMutation,
        } from '../../slices/productsApiSlice';


const ProductEditScreen = () => {

  // get id from url. id must be declared as object {}
  const {id: productId} = useParams()
 

  //create dispatch and navigate
  //const dispatch = useDispatch()
  const navigate = useNavigate()

  //create state variables for product data
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)

  const {data: product, isLoading, refetch, error} 
    = useGetProductDetailsQuery(productId)
  
  const [updateProduct, {isLoading: loadingUpdate}] 
    = useUpdateProductMutation()

  //get action method for product image upload
  const [uploadProductImage, {isLoading: loadingUpload}] 
    = useUploadProductImageMutation()

  useEffect(() => {
    if(product) {
      //set the state from variables
    setName(product.name)
    setPrice(product.price)
    setImage(product.image)
    setDescription(product.description)
    setBrand(product.brand)
    setCategory(product.category)
    setCountInStock(product.countInStock)
     
    }
  }, [product])

  const submitHandler = async (e) => {
    e.preventDefault()
    const updatedProduct = {
      productId, name, price, image, brand, category, 
      countInStock, description, 
    }  

    const result = await updateProduct(updatedProduct)
    if(result.error) {toast.error(result.error)}
    else {
      toast.success('Product updated')
      refetch()
      //navigate('/admin/productlist')
      navigate(-1)//navigate to previous screen (product page)
    }
  }

  const backHandler = () => {
    navigate(-1)//navigate to previous screen (product page)
  }

  const uploadFileHandler = async (e) => {
    //e has files[], upload of single file means files[0]
    //console.log(e.target.files[0])

    const formData = new FormData()
    formData.append('image', e.target.files[0])
    try {
      //upload file from url or chosen file
      const res = await uploadProductImage(formData).unwrap() //mutation
      toast.success(res.message) //message from route
      setImage(res.image) //set method of state
    } catch (err) {
      toast.error(err?.data?.message || err.error) 
    }
  }

  return (
   <>
    <Button onClick={backHandler}
     className='btn btn-dark my-3'>
      Go Back
    </Button>

        
    <FormContainer>
      <h2>Edit Product</h2>  
      {loadingUpdate && <Loader />}

      {isLoading ? <Loader /> : error ? <Message variant='danger'>
        {error.data.message}</Message> : (
          <Form onSubmit={submitHandler}>
            {/* className='my-2' for margin 2 */}
            <Form.Group controlId='name' className='my-2'>
              <Form.Label>Name</Form.Label> 
              <Form.Control 
                type='text' placeholder='Enter name'
                value={name} onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price' className='my-2'>
              <Form.Label>Price</Form.Label> 
              <Form.Control 
                type='number' placeholder='Enter price'
                value={price} onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* IMAGE INPUT FIELD: the image url */}
            <Form.Group controlId='image' className='my-2'>
              <Form.Label>Image</Form.Label> 
              <Form.Control 
                type='text' placeholder='Enter image url'
                value={image} onChange={(e) => setImage}
              ></Form.Control>
               {/* IMAGE INPUT FIELD: the image file */}
              <Form.Control 
                type='file' label='or, Chose file'
                onChange={uploadFileHandler}
              ></Form.Control>
              
            </Form.Group>

            {loadingUpload && <Loader />}

            <Form.Group controlId='brand' className='my-2'>
              <Form.Label>Brand</Form.Label> 
              <Form.Control 
                type='text' placeholder='Enter brand'
                value={brand} onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock' className='my-2'>
              <Form.Label>Count In Stock</Form.Label> 
              <Form.Control 
                type='number' placeholder='Enter countInStock'
                value={countInStock} onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category' className='my-2'>
              <Form.Label>Category</Form.Label> 
              <Form.Control 
                type='text' placeholder='Enter category'
                value={category} onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description' className='my-2'>
              <Form.Label>Description</Form.Label> 
              <Form.Control 
                type='text' placeholder='Enter description'
                value={description} onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='my-2'>
              Update
            </Button>
          </Form>

          

          
        )
      }

    </FormContainer>
   </>
    
  )
}

export default ProductEditScreen