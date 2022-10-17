import { useCallback, useEffect, useState } from "react";

import { getCandidates } from "../api/candidates";
import { Candidate, Status } from "../types/common.types";
import { SEARCH_FILTERS, useURLWithFilters } from "./useNavigatorWithSearch";

const DEFAULT_STATUSES = [true, true, true];

const useCandidatesForm = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [statuses, setStatuses] = useState([...DEFAULT_STATUSES]);
  const { filters, setFilters } = useURLWithFilters();

  const fetchCandidate = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await getCandidates();
      if (data.error) {
        setError(data.error.message);
        setCandidates([]);
      } else {
        setCandidates(data.data);
      }
    } catch (error: any) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCheckboxChange = useCallback(
    (index: number) => {
      var checkBoxes = [...statuses];
      checkBoxes[index] = !checkBoxes[index];
      setStatuses(checkBoxes);

      setFilters({
        search: {
          ...filters,
          statuses: Object.keys(Status).filter((_: string, idx: number) => checkBoxes[idx]),
        },
      });
    },
    [filters.statuses]
  );

  const handleSearchFieldChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.currentTarget;
      setFilters({ search: { ...filters, [name]: value } });
    },
    [setFilters, filters]
  );

  const reset = useCallback(() => {
    setStatuses([...DEFAULT_STATUSES]);
    setFilters({ search: { ...SEARCH_FILTERS } });
  }, []);

  useEffect(() => {
    Object.keys(Status).forEach(
      (status, index) => (statuses[index] = Array.isArray(filters.statuses) ? filters.statuses.includes(status) : true)
    );
  }, [filters]);

  useEffect(() => {
    fetchCandidate();
  }, []);

  return {
    reset,
    error,
    loading,
    data: candidates,
    state: {
      statuses,
      name: filters.name,
      position: filters.position,
    },
    onchange: {
      text: handleSearchFieldChange,
      checkbox: handleCheckboxChange,
    },
  };
};

export default useCandidatesForm;
