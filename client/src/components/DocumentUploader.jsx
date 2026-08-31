import { useEffect, useState } from "react";
import api from "../api/client.js";
import { formatId } from "./CrudTable.jsx";

// Generic "carga de documentos" widget: upload, list, download, delete.
// Optionally scoped to a `subtipo` (e.g. Trazabilidad: Cotización / OC / ...).
export default function DocumentUploader({ modulo, seccion, subtipos, idPrefix }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeSubtipo, setActiveSubtipo] = useState(subtipos ? subtipos[0] : null);
  const [file, setFile] = useState(null);
  const [descripcion, setDescripcion] = useState("");
  const [search, setSearch] = useState("");

  async function load() {
    setLoading(true);
    try {
      const { data } = await api.get("/documentos", { params: { modulo, seccion } });
      setRows(data.rows);
      setError("");
    } catch (e) {
      setError(e.response?.data?.error || "No se pudo cargar la lista de documentos");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modulo, seccion]);

  const visibleRows = subtipos ? rows.filter((r) => r.subtipo === activeSubtipo) : rows;
  const q = search.trim().toLowerCase();
  const filteredRows = q
    ? visibleRows.filter(
        (doc) =>
          formatId(idPrefix, doc.id).toLowerCase().includes(q) ||
          doc.nombre_original.toLowerCase().includes(q)
      )
    : visibleRows;

  async function handleUpload(e) {
    e.preventDefault();
    if (!file) return;
    // Text fields must precede the file in the multipart stream so multer
    // has already parsed req.body.modulo/seccion by the time its
    // destination callback runs for the file part.
    const body = new FormData();
    body.append("modulo", modulo);
    body.append("seccion", seccion);
    if (activeSubtipo) body.append("subtipo", activeSubtipo);
    if (descripcion) body.append("descripcion", descripcion);
    body.append("archivo", file);
    try {
      await api.post("/documentos", body, { headers: { "Content-Type": "multipart/form-data" } });
      setFile(null);
      setDescripcion("");
      document.getElementById(`file-input-${seccion}`).value = "";
      load();
    } catch (e2) {
      setError(e2.response?.data?.error || "No se pudo subir el documento");
    }
  }

  async function remove(id) {
    if (!confirm("¿Eliminar este documento?")) return;
    await api.delete(`/documentos/${id}`);
    load();
  }

  async function download(doc) {
    const res = await api.get(`/documentos/${doc.id}/download`, { responseType: "blob" });
    const url = URL.createObjectURL(res.data);
    const a = document.createElement("a");
    a.href = url;
    a.download = doc.nombre_original;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="card">
      {subtipos && (
        <div className="subtype-tabs">
          {subtipos.map((s) => (
            <button
              key={s}
              type="button"
              className={`subtype-tab ${activeSubtipo === s ? "active" : ""}`}
              onClick={() => setActiveSubtipo(s)}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <form className="form-row" onSubmit={handleUpload}>
        <label>
          Archivo
          <input
            id={`file-input-${seccion}`}
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </label>
        <label>
          Descripción (opcional)
          <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        </label>
        <button type="submit" className="btn">Subir documento</button>
      </form>

      {error && <div className="login-error">{error}</div>}

      {visibleRows.length > 0 && (
        <div className="doc-search">
          <input
            type="text"
            placeholder="Buscar por nombre o ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}

      {loading ? (
        <div className="empty-state">Cargando...</div>
      ) : visibleRows.length === 0 ? (
        <div className="empty-state">Aún no hay documentos cargados{activeSubtipo ? ` en "${activeSubtipo}"` : ""}.</div>
      ) : filteredRows.length === 0 ? (
        <div className="empty-state">Ningún documento coincide con "{search}".</div>
      ) : (
        <table className="data-table doc-table">
          <thead>
            <tr>
              <th>Nombre Documento</th>
              <th className="id-cell">ID</th>
              <th>Detalle</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((doc) => (
              <tr key={doc.id}>
                <td className="doc-name">{doc.nombre_original}</td>
                <td className="id-cell">{formatId(idPrefix, doc.id)}</td>
                <td className="doc-meta">
                  {doc.descripcion ? `${doc.descripcion} · ` : ""}
                  {doc.uploaded_by} · {formatDate(doc.uploaded_at)}
                </td>
                <td>
                  <div className="doc-actions">
                    <button type="button" className="btn btn-sm secondary" onClick={() => download(doc)}>
                      Descargar
                    </button>
                    <button className="btn danger btn-sm" onClick={() => remove(doc.id)}>Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function formatDate(value) {
  if (!value) return "-";
  return String(value).replace("T", " ").slice(0, 16);
}
