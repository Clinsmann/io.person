export type CandidateField =
  | "year_of_experience"
  | "application_date"
  | "position_applied"
  | "birth_date"
  | "status"
  | "email"
  | "name";

export type Candidate = {
  [fields in CandidateField | "id"]: string;
};

export enum SortDirection {
  desc = "desc",
  asc = "asc",
}

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