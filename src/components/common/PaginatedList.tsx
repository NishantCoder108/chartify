import React, { useState } from "react";

// Assuming you have data in the following format
const data = Array.from({ length: 250 }, (_, i) => `Country ${i + 1}`);

const ITEMS_PER_PAGE = 10;

const PaginatedList: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const maxPage = Math.ceil(data.length / ITEMS_PER_PAGE);

    function handleNext() {
        setCurrentPage((prev) => Math.min(prev + 1, maxPage));
    }

    function handlePrev() {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    }

    const currentData = data.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div>
            {currentData?.map((item, idx) => (
                <div key={idx}>{item}</div>
            ))}
            <button onClick={handlePrev} disabled={currentPage === 1}>
                Prev
            </button>
            <button onClick={handleNext} disabled={currentPage === maxPage}>
                Next
            </button>
        </div>
    );
};

export default PaginatedList;
