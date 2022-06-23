import React from "react";
import { Pagination } from "react-bootstrap";

import "./WallpaperPagination.css";

const WallpaperPagination = ({ totalImages, imagesPerPage, currentPage, setCurrentPage }) => {
  const pageNumbers = [];
  const getNumberOfPages = () => {
    if (totalImages > 0) return Math.ceil(totalImages / imagesPerPage);
    else return 1;
  };
  const numberOfPages = getNumberOfPages();
  pageNumbers.push(
    <Pagination className="paging">
      <Pagination.First onClick={() => setCurrentPage(1)} />
      <Pagination.Prev
        onClick={() => {
          if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
          }
        }}
      />
      <Pagination.Ellipsis />
      <Pagination.Item active={true} className="paginationItemStyle">
        {currentPage}
      </Pagination.Item>
      <Pagination.Item disabled={currentPage === numberOfPages} onClick={() => setCurrentPage(currentPage + 1)}>
        {currentPage + 1}
      </Pagination.Item>
      <Pagination.Item
        disabled={currentPage === numberOfPages || currentPage === numberOfPages - 1}
        onClick={() => setCurrentPage(currentPage + 2)}
      >
        {currentPage + 2}
      </Pagination.Item>
      <Pagination.Ellipsis />
      <Pagination.Next disabled={currentPage === numberOfPages} onClick={() => setCurrentPage(currentPage + 1)} />
      <Pagination.Last onClick={() => setCurrentPage(numberOfPages)} />
    </Pagination>
  );
  return <>{pageNumbers}</>;
};

export default WallpaperPagination;
