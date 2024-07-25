import {Row, Col, Button} from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Product from '../components/ProductCard'
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { useNavigate } from 'react-router-dom';

const HomeScreen = () => {
  const navigate = useNavigate()
  
  //get pageNumber and keyword from url
  const {pageNumber, keyword} = useParams()

  //use productsApiSlice get query to get products as per search keyword
  //data has products, currpagenumber, total pages. Pass in pageNumber to query
  const {data, isLoading, error} 
    = useGetProductsQuery({keyword, pageNumber,})
  
    const backHandler = () => {
      navigate(-1)//go back to previous screen
    }

    const productHandler = () => {
       navigate('/')
    }

    //if searching, then heading is 'products found', otherwise 'Latest Products'
    const productsFound = !isLoading && data.products ? data.products.length : 0
    const heading = keyword ? `${productsFound} Products found` : 'Latest Products'
    

  return (
    
     
    <>  
      {!keyword ? (
          <Row>
            <Col>
              <h2>Top Rated Products</h2>
            </Col>
          <ProductCarousel />
          </Row>
        ) : (
        <Row>  
          <Row>
          <Col>
            <Button className='btn-md mx-2' variant='dark'
                onClick={backHandler}
                >Go Back
            </Button>
            <Button className='btn-md mx-2' variant='dark'
            title='back to previous screen'
              onClick={productHandler}
              
              >Go To Products
            </Button>
          </Col>
          </Row>
          
          {/* display empty rows for spacing down */}
          <Row> <p></p> </Row>
          <Row> <p></p> </Row>
          <Row> <p></p> </Row>
          <Row> <p></p> </Row>

      </Row>
       
        
      )}
      { isLoading ? (<Loader />) 
      : error ? 
      ( <Message variant='danger'>
          <div>{error?.data?.message || error.error}</div> 
        </Message>
      ) : ( //rendering of actual poroducts
        <>
          <Meta />
          <h2>{heading}</h2>
          <Row>
              {data.products.map((p) => (//map on products in data
                  // responsive: small screen, take 12 columns, medium - 6 col, large - 4, xl - 3  
                  <Col key={p._id} sm={12} md={6} lg={4} xl={3}>
                      <Product product={p}/>
                  </Col>
              ))}
          </Row>
          {/* use the paginate component. 
          give it curr page and total pages */}
          <Paginate pages={data.pages} 
            page={data.page}
            keyword = {keyword ? keyword : ''} />
          
        </>
      ) }
    </>
  )
};

export default HomeScreen;