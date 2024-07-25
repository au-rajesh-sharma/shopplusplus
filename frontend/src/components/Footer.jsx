import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';

const Footer = () => {
    const currentYear = new Date().getFullYear()
    return (
        <footer>
            <Container>
                <Row>
                    <Col className='text-center py-3'>
                        <p>Rajesh Sharma &copy; {currentYear}</p>
                        {/*&copy; is for copyright symbol*/}
                    </Col>
                </Row>
            </Container>
        </footer>
        
  )
}

export default Footer