import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

interface ParkPaginationProps {
  pageCount: number;
  onPageChange: (selected: number) => void;
}

export function ParkPagination({ pageCount, onPageChange }: ParkPaginationProps) {
  const [isMobile, setIsMobile] = useState(false);

  // Adjust pagination display for mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="Next →"
      onPageChange={({ selected }) => onPageChange(selected)}
      pageRangeDisplayed={isMobile ? 1 : 3}
      marginPagesDisplayed={isMobile ? 1 : 2}
      pageCount={pageCount}
      previousLabel="← Previous"
      renderOnZeroPageCount={null}
      containerClassName="pagination"
      pageClassName="page-item"
      pageLinkClassName="page-number"
      previousClassName="page-item"
      previousLinkClassName="pagination-button"
      nextClassName="page-item"
      nextLinkClassName="pagination-button"
      breakClassName="page-item"
      breakLinkClassName="ellipsis"
      activeClassName="active"
    />
  );
}
