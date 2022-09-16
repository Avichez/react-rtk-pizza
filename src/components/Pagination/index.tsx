import React from "react";
import styles from "./Pagination.module.scss";
import ReactPaginate from "react-paginate";
import { setCurrentPage, filterSelector } from "../../redux/slices/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useWhyDidYouUpdate } from "ahooks";

const Pagination: React.FC = () => {
    const pagesCount = useSelector((state: RootState) => state.pizzas.pagesCount);
    const { currentPage } = useSelector(filterSelector);
    const dispatch = useDispatch();

    useWhyDidYouUpdate("Pagination", { pagesCount, currentPage });
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
