import { FC, useMemo } from 'react'
import $ from "./Pagination.module.css"
import { Link, useLocation } from 'react-router-dom';

interface PaginationProps {
    totalNumber: number,
    numberPerPage?: number,
    shownPageNum?: number,
    currentPage: number,
}

const Pagination: FC<PaginationProps> = ({ 
    totalNumber,
    numberPerPage = 10,
    shownPageNum = 3,
    currentPage = 1,
 }) => {

    // get current pathname
    const {pathname} = useLocation()

    // get totalPages by calculating
    const totalPages = Math.ceil(totalNumber / numberPerPage)

    // return shown pagers
    const pages = useMemo(() => {
        // genereate whole pagers for all pages
        const totalNumPage = Array.from({ length: Math.max(totalPages, shownPageNum)}, (_, i) => i+1);
        // get offset for shown pagers by currentPage - (shownPage / 2)
        const offset = Math.min(Math.max(currentPage - 1 - Math.floor(shownPageNum / 2), 0), totalPages - shownPageNum)
        // get the window for shownPages by offset
        const rs = totalNumPage.slice(offset, shownPageNum + offset);
        // if currentPage is larger than showPageNum, put a default pager 1
        if (currentPage >= shownPageNum) {
            rs.unshift(1)
        }
        return rs
    }, [totalPages, shownPageNum, currentPage])

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
                        className={`${$.paginationItem} ${currentPage === page?$.paginationNone: ''}`}
                    >{page}{page === 1 && (currentPage - shownPageNum) >= 0? '...':''}</Link>
                )
            })}
            <Link
                to={`${currentPage+1}`}
                className={`${$.paginationItem} ${currentPage > totalPages - 1? $.paginationNone: ''}`}
            >Next</Link>
        </div>
    )
};

export default Pagination