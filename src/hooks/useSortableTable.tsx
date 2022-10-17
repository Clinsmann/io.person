import React, { useCallback } from "react";
import { SortDirection } from "../types/common.types";
import { useURLWithFilters } from "./useNavigatorWithSearch";

export const useSortableData = <T,>(items: T[]) => {
  const { filters, setFilters } = useURLWithFilters();
  const { sortBy, sortDirection } = filters;

  const sortedItems = React.useMemo(() => {
    if (!sortBy || !sortDirection) return items;

    return [...items].sort((a: any, b: any) => {
      if (a[sortBy] < b[sortBy]) {
        return sortDirection === SortDirection.asc ? -1 : 1;
      }

      if (a[sortBy] > b[sortBy]) {
        return sortDirection === SortDirection.asc ? 1 : -1;
      }

      return 0;
    });
  }, [items, sortBy, sortDirection]);

  const sortByColumn = useCallback(
    (column: string): void => {
      let direction = SortDirection.asc;
      if (sortBy === column && sortDirection === SortDirection.asc) {
        direction = SortDirection.desc;
      }

      setFilters({
        search: {
          ...filters,
          sortBy: column,
          sortDirection: direction,
        },
      });
    },
    [sortBy, sortDirection, setFilters, filters]
  );

  return { sortedItems, sortByColumn };
};
