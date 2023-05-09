import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const getVisiblePages = () => {
    const leftLimit = Math.max(1, currentPage - 2);
    const rightLimit = Math.min(totalPages, currentPage + 2);
    return pageNumbers.filter(
      (page) => page >= leftLimit && page <= rightLimit
    );
  };

  return (
    <nav className="flex justify-end pr-7 pt-4">
      <ul className="inline-flex gap-1">
        {currentPage > 3 && (
          <>
            <li>
              <button
                className="text-gray-700 hover:bg-gray-400 flex h-8 w-8 items-center justify-center rounded-full bg-white hover:text-white dark:border-strokedark dark:bg-boxdark"
                onClick={() => onPageChange(1)}
              >
                1
              </button>
            </li>
            <li>
              <span className="text-gray-700 dark:text-white">...</span>
            </li>
          </>
        )}
        {getVisiblePages().map((number) => (
          <li key={number}>
            <button
              className={`${
                number === currentPage ? "bg-gray-500 text-success" : ""
              } hover:bg-gray-400  flex h-8 w-8 items-center justify-center rounded-full hover:text-primary dark:border-strokedark dark:bg-boxdark`}
              onClick={() => onPageChange(number)}
            >
              {number}
            </button>
          </li>
        ))}
        {currentPage < totalPages - 2 && totalPages > 5 && (
          <>
            <li>
              <span className="text-gray-700 dark:text-white">...</span>
            </li>
            <li>
              <button
                className="text-gray-700 hover:bg-gray-400 flex h-8 w-8 items-center justify-center rounded-full bg-white hover:text-white dark:border-strokedark dark:bg-boxdark"
                onClick={() => onPageChange(totalPages)}
              >
                {totalPages}
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Pagination;
