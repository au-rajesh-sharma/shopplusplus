import {Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Rating from './Rating'


const Product = ({ product }) => {
    //const maxRating = 5 //highest possible (stars) rating  
  return (
    // my-3 margin y axis 3, p-3 padding 3 all around, rounded 
    <Card className='product-card my-3 p-3 rounded'>
        {/* use back tik below */}
        <Link to={`/product/${product._id}`}>
            <Card.Img src={product.image} variant='top' alt={product.name} />
        </Link>

        <Card.Body>
            <Link to={`/product/${product._id}`}>
            <Card.Title as='div' className='product-title'>
                <strong>{product.name}</strong>
            </Card.Title>
            </Link> 

            <Card.Text as='div'>
                <Rating rating={product.rating}
                    numReviewText={`${product.numReviews} reviews`}
                />
            </Card.Text>

            <Card.Text as='h4' >
                ${product.price}
            </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Product