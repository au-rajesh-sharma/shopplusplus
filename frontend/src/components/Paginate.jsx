import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
//import constants from '../constants'

import React from 'react'

const Paginate = ({pages, page, 
        isAdmin = false, keyword = ''}) => {
  return (
    pages > 1 && (
        <Pagination className="paginate">
            {/* array of pages (each page has products). x+1 is current page */}
            {[...Array(pages).keys()].map((x) => (
                <LinkContainer key={x+1} 
                    to={
                        !isAdmin ? 
                            // implement search keyword 
                            keyword ? `/search/${keyword}/page/${x+1}`
                            : `/page/${x+1}`
                        : `/admin/productlist/${x+1}`
                    }
                >
                    <Pagination.Item 
                        active={x+1 === page}//active page will be shown as dark 
                        >{x+1}
                    </Pagination.Item>
                </LinkContainer>
            ))}
        </Pagination>
    )
  )
}

export default Paginate