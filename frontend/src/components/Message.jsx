import {Alert} from 'react-bootstrap'

const Message = ({variant, children}) => {
  return (
    // return alert dialog, errors in red 
    //(variant='danger' will be passed to it) 
    //children is the message passed
    <Alert variant={variant}>{children}</Alert>
  )
}

//make default message like 'info' style, blue
Message.defaultProps = {variant: 'info',}

export default Message;