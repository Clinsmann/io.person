import { useCallback } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { Status, UseURLWithFiltersOptions } from "../types/common.types";

export interface SetFilters {
  pathname?: string;
  search: Partial<UseURLWithFiltersOptions>;
}

export const SEARCH_FILTERS: UseURLWithFiltersOptions = {
  name: "",
  sortBy: "",
  position: "",
  sortDirection: "",
  statuses: [...Object.keys(Status)] as Status[],
};

export const useURLWithFilters = () => {
  const navigate = useNavigate();
  const { search, pathname: currentPath } = useLocation();
  const query = new URLSearchParams(search);

  const getFilters = useCallback(() => {
    let statuses: any = query.get("statuses");
    const name = query.get("name") || "",
      sortBy = query.get("sortBy") || "",
      position = query.get("position") || "",
      sortDirection = query.get("sortDirection") || "";

    try {
      statuses = JSON.parse(statuses!);
    } catch (error) {
      statuses = SEARCH_FILTERS.statuses;
    }

    return { name, position, statuses: statuses || "", sortBy, sortDirection } as UseURLWithFiltersOptions;
  }, [search, query]);

  const setFilters = useCallback(
    ({ pathname, search }: SetFilters) => {
      navigate({
        pathname: pathname || currentPath,
        search: `?${createSearchParams({
          ...search,
          statuses: JSON.stringify(search.statuses),
        })}`,
      });
    },
    [navigate]
  );

  return { filters: getFilters(), setFilters };
};
