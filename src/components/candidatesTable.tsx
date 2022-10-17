import ReactPaginate from "react-paginate";
import usePagination from "../hooks/usePagination";
import { filterCandidates } from "../utils/filter";
import { useSortableData } from "../hooks/useSortableTable";
import { useURLWithFilters } from "../hooks/useNavigatorWithSearch";
import { ReactComponent as ArrowUpIcon } from "../assets/arrow-up-solid.svg";
import { ReactComponent as ArrowDownIcon } from "../assets/arrow-down-solid.svg";
import { ReactComponent as ArrowUpDownIcon } from "../assets/arrows-up-down-solid.svg";
import { Candidate, CandidateField, SortDirection } from "../types/common.types";

interface TableColumn {
  render?: (candidate: Candidate) => React.ReactNode;
  sortable: boolean;
}

type TableFormat = {
  [field in CandidateField]: TableColumn;
};

const tableFormat: TableFormat = {
  name: { sortable: false },
  email: { sortable: false },
  birth_date: { sortable: false },
  year_of_experience: { sortable: true },
  position_applied: { sortable: true },
  application_date: { sortable: true },
  status: {
    render: ({ status }) => <span className={status}>{status}</span>,
    sortable: false,
  },
};

const ColumnIcon: React.FC<{ className?: SortDirection | string }> = ({ className }) => {
  if (className === SortDirection.desc) {
    return <ArrowDownIcon />;
  }

  if (className === SortDirection.asc) {
    return <ArrowUpIcon />;
  }

  return <ArrowUpDownIcon className="sortable-icon" />;
};

const itemsPerPage = 15;

const CandidatesTable: React.FC<{ data: Candidate[] }> = ({ data }) => {
  const { filters } = useURLWithFilters();
  const { sortBy, sortDirection } = filters;
  const items = filterCandidates(data, filters);
  const { sortedItems, sortByColumn } = useSortableData<Candidate>(items);
  const getClassName = (column: string) => (sortBy === column ? sortDirection : "");
  const { currentItems, handlePageClick, pageCount } = usePagination({ items: sortedItems, itemsPerPage });

  return (
    <>
      <table>
        <thead>
          <tr>
            {Object.entries(tableFormat).map(([column, { sortable }]) => (
              <th key={column} {...(sortable ? { onClick: () => sortByColumn(column as CandidateField) } : {})}>
                {column.replaceAll("_", " ")}
                {sortable ? <ColumnIcon className={getClassName(column)} /> : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((candidate) => (
            <tr key={candidate.id}>
              {Object.entries(tableFormat).map(([column, { render }]: [string, TableColumn]) => (
                <td key={column}>{render ? render(candidate) : candidate[column as CandidateField]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        className="pagination"
      />
    </>
  );
};

export default CandidatesTable;
