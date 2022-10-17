

export enum Status {
  approved = "approved",
  rejected = "rejected",
  waiting = "waiting",
}

export interface UseURLWithFiltersOptions {
  name: string;
  sortBy: string;
  position: string;
  sortDirection: string;
  statuses: string[] | string;
}