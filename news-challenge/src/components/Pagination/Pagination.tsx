import React, { FC } from 'react'
import $ from "./Pagination.module.css"
import { Link, useLocation } from 'react-router-dom';
import e from 'express';

interface PaginationProps {
    totalNumber: number,
    numberPerPage?: number,
    currentPage: number,
}

const Pagination: FC<PaginationProps> = ({ 
    totalNumber,
    numberPerPage = 10,
    currentPage = 1,
 }) => {
    const {pathname} = useLocation()

    const totalPages = Math.ceil(totalNumber / numberPerPage)

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className={$.pagination}>
            <Link
                to={`${currentPage-1}`}
                className={`${$.paginationItem} ${currentPage <= 1? $.paginationNone: ''}`}
            >Prev</Link>
            {pages && pages.map(page => {
                return (
                    <Link
                        key={`link_${pathname}_${page}`}
                        to={`${page}`}
                        className={`${$.paginationItem} ${currentPage === (page+1)?$.paginationNone: ''}`}
                    >{page}</Link>
                )
            })}
            <Link
                to={`${currentPage+1}`}
                className={`${$.paginationItem} ${currentPage >= totalPages - 1? $.paginationNone: ''}`}
            >Next</Link>
        </div>
    )
};

export default Pagination