import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import './pagination.css';

const PaginationComp = ({page}) => {
    let items = [];
    for (let number = 1; number <= 3; number++) {
        items.push(
            <Pagination.Item key={number} active={number === page}>
                {number}
            </Pagination.Item>,
        );
    }

    return(
        <div className="pagination-container">
            <Pagination>{items}
            </Pagination>
        </div>
)}

export default PaginationComp;