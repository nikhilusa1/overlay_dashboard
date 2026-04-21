export function LauncherBar({ panels, onToggle }) {
  return (
    <div className="launcher-bar">
      <div className="launcher-brand">
        <span className="launcher-logo">R</span>
        <span className="launcher-name">ROCKET</span>
      </div>
      <div className="launcher-buttons">
        {panels.map(({ id, label, open }) => (
          <button
            key={id}
            className={`launcher-btn${open ? ' active' : ''}`}
            onClick={() => onToggle(id)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
