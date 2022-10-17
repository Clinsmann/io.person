import { Candidate, UseURLWithFiltersOptions } from "../types/common.types";

export const filterCandidates = (candidates: Candidate[], filters: UseURLWithFiltersOptions): Candidate[] =>
  candidates.filter((candidate) => {
    const passedPositionFilter = candidate.position_applied.toLowerCase().includes(filters.position.toLowerCase());
    const passedNameFilter = candidate.name.toLowerCase().includes(filters?.name.toLowerCase());

    if (Array.isArray(filters.statuses)) {
      const passedStatusFilter = filters?.statuses.includes(candidate.status.toLowerCase());
      return passedStatusFilter && passedNameFilter && passedPositionFilter;
    }

    return passedNameFilter && passedPositionFilter;
  });
