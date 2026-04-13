import { useEffect, useState } from 'react';
import {
  buildResourceEndpoint,
  formatRecord,
  getRecordFacts,
  getRecordSummary,
  getRecordTitle,
  getSearchableText,
  normalizeApiResponse,
} from './api';

function ResourcePage({ resource, title, intro }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [reloadCount, setReloadCount] = useState(0);

  useEffect(() => {
    const endpoint = buildResourceEndpoint(resource);

    console.log(`${title} endpoint:`, endpoint);

    const loadItems = async () => {
      try {
        const response = await fetch(endpoint);
        const data = await response.json();

        console.log(`${title} REST data:`, data);

        if (!response.ok) {
          throw new Error(`${title} request failed with status ${response.status}`);
        }

        setItems(normalizeApiResponse(data));
        setError('');
      } catch (fetchError) {
        console.error(`${title} fetch error:`, fetchError);
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, [reloadCount, resource, title]);

  const filteredItems = items.filter((item) => getSearchableText(item).includes(searchTerm.toLowerCase()));

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };

  const handleRefresh = () => {
    setLoading(true);
    setReloadCount((currentCount) => currentCount + 1);
  };

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <div className="resource-card card border-0 shadow-lg">
      <div className="card-body p-4 p-lg-5">
        <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 align-items-lg-start mb-4">
          <div>
            <p className="section-kicker text-uppercase mb-2">{title}</p>
            <h2 className="display-6 fw-bold mb-2">{title}</h2>
            <p className="text-secondary mb-0">{intro}</p>
          </div>
          <div className="d-flex gap-2 flex-wrap">
            <button className="btn btn-outline-primary" type="button" onClick={handleRefresh}>
              Refresh data
            </button>
            <button className="btn btn-primary" type="button" onClick={() => setSelectedItem(filteredItems[0] ?? items[0] ?? null)} disabled={!items.length}>
              View first item
            </button>
          </div>
        </div>

        <form className="row g-3 align-items-end mb-4" onSubmit={handleSearchSubmit}>
          <div className="col-12 col-lg-8">
            <label className="form-label fw-semibold" htmlFor={`${resource}-search`}>
              Search records
            </label>
            <input
              id={`${resource}-search`}
              className="form-control form-control-lg"
              type="search"
              placeholder={`Filter ${title.toLowerCase()} by any field`}
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
          <div className="col-12 col-lg-4 d-flex gap-2">
            <button className="btn btn-dark flex-fill" type="submit">
              Search
            </button>
            <button className="btn btn-outline-secondary flex-fill" type="button" onClick={handleClear}>
              Clear
            </button>
          </div>
        </form>

        {loading ? <div className="alert alert-info">Loading {title.toLowerCase()}...</div> : null}
        {error ? <div className="alert alert-danger">{error}</div> : null}

        {!loading && !error ? (
          filteredItems.length ? (
            <div className="table-responsive resource-table-wrap">
              <table className="table table-striped table-hover align-middle mb-0">
                <thead className="table-dark">
                  <tr>
                    <th scope="col" className="text-nowrap">#</th>
                    <th scope="col">Record</th>
                    <th scope="col">Summary</th>
                    <th scope="col">Details</th>
                    <th scope="col" className="text-end text-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item, index) => {
                    const facts = getRecordFacts(item);

                    return (
                      <tr key={item?.id ?? index}>
                        <td className="fw-semibold text-secondary text-nowrap">{index + 1}</td>
                        <td>
                          <div className="fw-semibold">{getRecordTitle(item, `${title} ${index + 1}`)}</div>
                          <div className="small text-secondary text-break">{item?.id !== undefined ? `ID: ${item.id}` : 'No ID available'}</div>
                        </td>
                        <td className="text-secondary text-break">{getRecordSummary(item)}</td>
                        <td>
                          {facts.length ? (
                            <div className="d-flex flex-column gap-1">
                              {facts.map((fact) => (
                                <div className="small" key={`${index}-${fact.label}`}>
                                  <span className="badge text-bg-light border text-secondary me-2">{fact.label}</span>
                                  <span className="text-break">{fact.value}</span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <span className="text-secondary">No extra fields</span>
                          )}
                        </td>
                        <td className="text-end text-nowrap">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            type="button"
                            onClick={() => setSelectedItem(item)}
                          >
                            View details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="alert alert-warning mb-0">No records matched your search.</div>
          )
        ) : null}
      </div>

      {selectedItem ? (
        <>
          <div className="modal d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content border-0 shadow-lg">
                <div className="modal-header bg-dark text-white">
                  <div>
                    <p className="section-kicker text-uppercase mb-1 text-white-50">{title} details</p>
                    <h3 className="modal-title h5 mb-0">{getRecordTitle(selectedItem, `${title} details`)}</h3>
                  </div>
                  <button className="btn-close btn-close-white" type="button" onClick={() => setSelectedItem(null)} aria-label="Close" />
                </div>
                <div className="modal-body">
                  <div className="table-responsive mb-3">
                    <table className="table table-sm align-middle">
                      <thead>
                        <tr>
                          <th scope="col">Field</th>
                          <th scope="col">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(selectedItem && typeof selectedItem === 'object' ? selectedItem : { value: selectedItem }).map(([key, value]) => (
                          <tr key={key}>
                            <td className="text-uppercase text-secondary fw-semibold">{key.replace(/_/g, ' ')}</td>
                            <td className="text-break">{typeof value === 'object' ? formatRecord(value) : String(value)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <label className="form-label fw-semibold" htmlFor={`${resource}-json`}>
                    Raw payload
                  </label>
                  <textarea
                    id={`${resource}-json`}
                    className="form-control font-monospace"
                    rows="10"
                    readOnly
                    value={formatRecord(selectedItem)}
                  />
                </div>
                <div className="modal-footer">
                  <button className="btn btn-outline-secondary" type="button" onClick={() => setSelectedItem(null)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" onClick={() => setSelectedItem(null)} />
        </>
      ) : null}
    </div>
  );
}

export default ResourcePage;