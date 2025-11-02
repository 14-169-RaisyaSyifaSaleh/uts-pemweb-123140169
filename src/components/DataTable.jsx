import React from "react";

const DataTable = ({ facts, onRefresh, loading }) => {
  return (
    <section className="facts-section">
      <div className="facts-header">
        <h2 className="section-title">Animal Facts</h2>
        <button
          className="refresh-button"
          onClick={onRefresh}
          disabled={loading}
        >
          🔄 {loading ? "Refreshing..." : "Refresh Facts"}
        </button>
      </div>

      {facts.length === 0 ? (
        <p className="empty-state">
          No facts available yet. Click “Refresh Facts” to load!
        </p>
      ) : (
        <div className="table-container">
          <table className="facts-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Fact</th>
                <th>Length</th>
              </tr>
            </thead>
            <tbody>
              {facts.map((fact, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {fact.fact && fact.fact.trim() !== ""
                      ? fact.fact
                      : "No fact available"}
                  </td>
                  <td>{fact.length || fact.fact?.length || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <hr className="facts-divider" />
    </section>
  );
};

export default DataTable;
