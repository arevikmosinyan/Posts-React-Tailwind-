import React from "react";
import { useState } from "react";

export default function ButtonsToNavigateBetweenPages() {
  function nextPage() {
    setPageNumber(pageNumber + 1);
  }
  function prevPage() {
    setPageNumber(pageNumber - 1);
  }

  return (
    <div className="flex flex-1 justify-between sm:hidden">
      <button
        onClick={prevPage}
        disabled={pageNumber === 1}
        className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${
          pageNumber === 1 && "opacity-50 cursor-not-allowed"
        }`}
      >
        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        onClick={nextPage}
        disabled={indexOfTheLastPostOfThePage >= posts.length}
        className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${
          indexOfTheLastPostOfThePage >= posts.length &&
          "opacity-50 cursor-not-allowed"
        }`}
      >
        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}
