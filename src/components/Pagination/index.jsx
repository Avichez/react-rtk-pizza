import React from 'react';
import styles from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';


const Pagination = (props) => {
    const { setCurrentPage, pageCount } = props;
    return (
        <>
            <ReactPaginate
                className={styles.pagination}
                breakLabel="..."
                nextLabel=">"
                onPageChange={(event) => setCurrentPage(event.selected + 1)}
                pageRangeDisplayed={4}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
            />
        </>
    )
}

export default Pagination;