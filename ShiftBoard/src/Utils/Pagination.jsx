export const renderPagination = (currentPage, totalPages, handlePageClick) => {
  const pages = [];
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <button
        key={i}
        className={(currentPage === i ? "active" : "") + " border"}
        onClick={() => handlePageClick(i)}
      >
        {i}
      </button>
    );
  }

  if (endPage < totalPages) {
    pages.push(
      <button
        key={totalPages + 1}
        onClick={() => handlePageClick(endPage + 1)}
        className="border"
      >
        <i className="fa-solid fa-arrow-right fa-xl"></i>
      </button>
    );
  }

  return pages;
};
