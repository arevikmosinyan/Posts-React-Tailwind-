import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { v4 as uuidv4 } from "uuid";

export default function Pages({
  pageNumber,
  countOfPages,
  prevPage,
  nextPage,
  changeThePage,
}) {
  let pageButtonsContent = [];
  for (let i = 1; i <= countOfPages; i++) {
    pageButtonsContent.push(i);
  }
  return (
    <>
      <nav
        className="isolate inline-flex -space-x-px rounded-lg"
        aria-label="Pagination"
      >
        <button
          onClick={prevPage}
          disabled={pageNumber === 1}
          className={`relative inline-flex bg-gray-800 posts-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
            pageNumber === 1 && "opacity-50 cursor-not-allowed"
          }`}
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        {pageButtonsContent.map((pageButton) => (
          <button
            key={uuidv4()}
            onClick={() => changeThePage(pageButton)}
            className={`relative inline-flex posts-center ${
              pageButton === pageNumber
                ? "bg-gray-800  text-white focus-visible:outline focus-visible:outline-5 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
            } bg-gray-500 px-4 py-2  text-sm font-semibold`}
          >
            {pageButton}
          </button>
        ))}
        <button
          onClick={nextPage}
          disabled={pageNumber === countOfPages}
          className={`relative inline-flex bg-gray-800 posts-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
            pageNumber === countOfPages && "opacity-50 cursor-not-allowed"
          }`}
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </nav>
    </>
  );
}
