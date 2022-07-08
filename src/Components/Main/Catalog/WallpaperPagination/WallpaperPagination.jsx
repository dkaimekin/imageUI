import React from "react";
import {Pagination} from "react-bootstrap";

import "./WallpaperPagination.css";

const WallpaperPagination = ({totalImages, imagesPerPage, currentPage, setCurrentPage}) => {
    const pageNumbers = [];
    const getNumberOfPages = () => {
        return Math.ceil(totalImages / imagesPerPage);
    };

    const numberOfPages = getNumberOfPages();
    console.log('numberOfPages ' + numberOfPages)
    pageNumbers.push(
        <Pagination className="paging">
            <Pagination.First hidden={currentPage < 3} onClick={() => setCurrentPage(1)}>1</Pagination.First>

            <Pagination.Ellipsis hidden={currentPage <= 3}/>
            <Pagination.Item hidden={currentPage <= 1} onClick={() => {
                if (currentPage > 1) {
                    setCurrentPage(currentPage - 1)
                }
            }}>
                {currentPage - 1}
            </Pagination.Item>
            <Pagination.Item active={true}>{currentPage}</Pagination.Item>
            <Pagination.Item hidden={currentPage > (numberOfPages - 2)}
                             onClick={() => setCurrentPage(currentPage + 1)}>
                {currentPage + 1}
            </Pagination.Item>

            <Pagination.Ellipsis hidden={currentPage > (numberOfPages - 3)}/>
            {/*<Pagination.Next disabled={activePage === last_page || activePage ===  last_page - 1} onClick={() => setActivePage(activePage + 1)}/>*/}
            <Pagination.Last hidden={currentPage === numberOfPages}
                             onClick={() => setCurrentPage(numberOfPages)}>{numberOfPages}</Pagination.Last>
        </Pagination>
    );
    return <>{pageNumbers}</>;
};

export default WallpaperPagination;
