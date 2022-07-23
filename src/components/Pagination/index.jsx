import React from 'react';
import styles from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';
import { setCurrentPage } from '../../redux/slices/paginationSlice';
import { useDispatch } from 'react-redux';


const Pagination = (props) => {
    const { pagesCount } = props;
    const dispatch = useDispatch();
    return (
        <>
            <ReactPaginate
                className={styles.pagination}
                breakLabel="..."
                nextLabel=">"
                onPageChange={(event) => dispatch(setCurrentPage(event.selected + 1))}
                pageRangeDisplayed={4}
                pageCount={pagesCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
            />
        </>
    )
}

export default Pagination;