import {FaStar, FaStarHalfAlt, FaRegStar} from 'react-icons/fa'


//numeric value of rating and text (total num reviews) that is to be displayed
//rating is rating, 
//text is the text to be displayed (total number of reviews)
const Rating = ({ rating, text }) => { 
    let maxStars = 5 //max number of possible stars
    let count=0
    let half =  rating % 1 > 0 ? true : false //if there is a half star
    let maxValue = half ? rating-1 : rating //if half star, max value is less 1
    // array  of jsx elements to be returned
    let ratingStar = [] 

    //fill in whole stars
    for (; count < maxValue; count++) { 
        ratingStar.push(<span><FaStar /></span>) 
    } 

    //fill in a half star, if there is one
    if (half) { 
        ratingStar.push(<span><FaStarHalfAlt /></span>)
        count++
    }

    //fill in blank stars (in remaining spaces)
    for(;count<maxStars;count++) {
        ratingStar.push(<span><FaRegStar /></span>)
    }
    
    //fil in the text (total number of reviews)
    ratingStar.push(<span className='rating-text'>
        { text && text }</span>)

    return ( <div className='rating'> {ratingStar} </div> )
}  

export default Rating