import { useState } from 'react';

export const usePagination = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	const changePage = (page: number) => setCurrentPage(page);

	const changeRowsPerPage = (rowsCount: number) => {
		setItemsPerPage(rowsCount);
		setCurrentPage(1);
	};

	return { currentPage, itemsPerPage, changePage, changeRowsPerPage };
};
