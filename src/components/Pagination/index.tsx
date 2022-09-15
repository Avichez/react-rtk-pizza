import React from "react";
import styles from "./Pagination.module.scss";
import ReactPaginate from "react-paginate";
import { setCurrentPage, filterSelector } from "../../redux/slices/filterSlice";
import { useDispatch, useSelector } from "react-redux";

const Pagination: React.FC = () => {
    const pagesCount = useSelector((state: any) => state.pizzas.pagesCount); // to fix it later on;
    const { currentPage } = useSelector(filterSelector);
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
                forcePage={currentPage - 1}
                previousLabel="<"
            />
        </>
    );
};

export default Pagination;
