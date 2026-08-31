export default function ProgressBar({ label, value, detail }) {
  return (
    <div className="progress-block">
      <div className="progress-label">
        <span>{label}</span>
        <span>{value}%{detail ? ` · ${detail}` : ""}</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
