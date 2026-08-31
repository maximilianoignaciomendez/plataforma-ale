import { useEffect, useState } from "react";
import api from "../api/client.js";

// Generic table CRUD widget: fetches /api/tables/:resource, renders an add
// form based on `columns`, and lists rows with inline checkbox toggles and
// delete. Reused by every module section backed by a simple database table.
export default function CrudTable({ resource, columns, emptyMessage, idPrefix, showCreatedBy = true }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState(() => initialForm(columns));

  function initialForm(cols) {
    const f = {};
    cols
      .filter((c) => c.type !== "computed")
      .forEach((c) => (f[c.key] = c.type === "checkbox" ? false : ""));
    return f;
  }

  async function load() {
    setLoading(true);
    try {
      const { data } = await api.get(`/tables/${resource}`);
      setRows(data.rows);
      setError("");
    } catch (e) {
      setError(e.response?.data?.error || "No se pudo cargar la información");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resource]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post(`/tables/${resource}`, form);
      setForm(initialForm(columns));
      load();
    } catch (e2) {
      setError(e2.response?.data?.error || "No se pudo guardar el registro");
    }
  }

  async function toggle(row, col) {
    await api.patch(`/tables/${resource}/${row.id}`, { [col.key]: row[col.key] ? 0 : 1 });
    load();
  }

  async function remove(id) {
    if (!confirm("¿Eliminar este registro?")) return;
    await api.delete(`/tables/${resource}/${id}`);
    load();
  }

  return (
    <div className="card">
      <form className="form-row" onSubmit={handleSubmit}>
        {columns
          .filter((c) => c.type !== "computed")
          .map((c) =>
          c.type === "checkbox" ? (
            <label key={c.key} className="checkbox-label">
              <input
                type="checkbox"
                checked={!!form[c.key]}
                onChange={(e) => setForm({ ...form, [c.key]: e.target.checked })}
              />
              {c.label}
            </label>
          ) : c.type === "textarea" ? (
            <label key={c.key} className="textarea-label">
              {c.label}
              <textarea
                value={form[c.key]}
                onChange={(e) => setForm({ ...form, [c.key]: e.target.value })}
                required={c.required}
                rows={c.rows || 5}
              />
            </label>
          ) : (
            <label key={c.key}>
              {c.label}
              <input
                type={c.type === "number" ? "number" : c.type === "date" ? "date" : "text"}
                value={form[c.key]}
                onChange={(e) => setForm({ ...form, [c.key]: e.target.value })}
                required={c.required}
              />
            </label>
          )
        )}
        <button type="submit" className="btn">Agregar</button>
      </form>

      {error && <div className="login-error">{error}</div>}

      {loading ? (
        <div className="empty-state">Cargando...</div>
      ) : rows.length === 0 ? (
        <div className="empty-state">{emptyMessage || "Aún no hay registros."}</div>
      ) : (
        <div className="table-scroll">
        <table className="data-table">
          <thead>
            <tr>
              <th className="id-cell">ID</th>
              {columns.map((c) => (
                <th key={c.key}>{c.label}</th>
              ))}
              {showCreatedBy && <th>Registrado por</th>}
              <th>Fecha de ingreso</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="id-cell">{formatId(idPrefix, row.id)}</td>
                {columns.map((c) =>
                  c.type === "checkbox" ? (
                    <td key={c.key}>
                      <input type="checkbox" checked={!!row[c.key]} onChange={() => toggle(row, c)} />
                    </td>
                  ) : c.type === "textarea" ? (
                    <td key={c.key} className="cell-wrap">{row[c.key]}</td>
                  ) : c.type === "computed" ? (
                    <td key={c.key}>{c.render(row)}</td>
                  ) : (
                    <td key={c.key}>{row[c.key]}</td>
                  )
                )}
                {showCreatedBy && <td>{row.created_by || "-"}</td>}
                <td>{formatDate(row.created_at)}</td>
                <td>
                  <button className="btn danger btn-sm" onClick={() => remove(row.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
}

function formatDate(value) {
  if (!value) return "-";
  return String(value).replace("T", " ").slice(0, 16);
}

export function formatId(prefix, id) {
  return prefix ? `${prefix}-${String(id).padStart(3, "0")}` : String(id);
}
