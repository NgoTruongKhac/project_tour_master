import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxVisibleButtons = 5;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
      return pageNumbers;
    }

    if (currentPage <= 4) {
      for (let i = 1; i <= 5; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push("...");
      pageNumbers.push(totalPages);
    } else if (currentPage >= totalPages - 3) {
      pageNumbers.push(1);
      pageNumbers.push("...");
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      pageNumbers.push("...");
      pageNumbers.push(currentPage - 1);
      pageNumbers.push(currentPage);
      pageNumbers.push(currentPage + 1);
      pageNumbers.push("...");
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const pages = generatePageNumbers();

  return (
    <div className="flex justify-center gap-2 pt-6 select-none">
      {/* Nút Previous */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`flex items-center justify-center w-9 h-9 transition border border-gray-300 rounded-lg ${
          currentPage === 1
            ? "opacity-50 cursor-not-allowed bg-gray-100"
            : "hover:bg-gray-50 hover:border-primary hover:text-primary"
        }`}
      >
        <ChevronLeft size={18} />
      </button>

      {/* Render danh sách số trang */}
      {pages.map((page, index) => {
        if (page === "...") {
          return (
            <div
              key={`ellipsis-${index}`}
              className="flex items-center justify-center text-gray-500 w-9 h-9"
            >
              <MoreHorizontal size={20} />
            </div>
          );
        }

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-9 h-9 text-sm font-medium transition border rounded-lg ${
              currentPage === page
                ? "text-white bg-primary border-primary hover:bg-primary/90"
                : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-primary hover:text-primary"
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* Nút Next */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`flex items-center justify-center w-9 h-9 transition border border-gray-300 rounded-lg ${
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed bg-gray-100"
            : "hover:bg-gray-50 hover:border-primary hover:text-primary"
        }`}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
