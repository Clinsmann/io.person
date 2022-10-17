import Loader from "./components/loader";
import { Status } from "./types/common.types";
import ErrorMessage from "./components/errorMessage";
import GeneratedTable from "./components/candidatesTable";
import useCandidatesForm from "./hooks/useCandidatesForm";

export default function App() {
  const form = useCandidatesForm();

  return (
    <div className="app-container">
      <div className="filter-container">
        <label>
          Search by Name
          <input
            name="name"
            type="search"
            value={form.state.name}
            className="search-input"
            onChange={form.onchange.text}
          />
        </label>

        <label>
          Search by Position applied
          <input
            type="search"
            name="position"
            className="text-input"
            value={form.state.position}
            onChange={form.onchange.text}
          />
        </label>

        {Object.keys(Status).map((status, idx) => (
          <label className="status-filter" key={status}>
            {status}
            <input
              key={status}
              name={status}
              value={status}
              type="checkbox"
              checked={form.state.statuses[idx]}
              onChange={() => form.onchange.checkbox(idx)}
            />
          </label>
        ))}

        <button className="button" onClick={form.reset}>
          Refresh
        </button>
      </div>

      {form.error ? (
        <ErrorMessage error={form.error} />
      ) : form.loading ? (
        <Loader />
      ) : (
        <GeneratedTable data={form.data} />
      )}
    </div>
  );
}
