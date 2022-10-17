import { useEffect, useState } from "react";

interface UsePagination<T> {
  itemsPerPage: number;
  items: T[];
}

const usePagination = <T,>({ items, itemsPerPage }: UsePagination<T>) => {
  const [currentItems, setCurrentItems] = useState<T[]>([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, items]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return { pageCount, currentItems, handlePageClick,  };
};

export default usePagination;
