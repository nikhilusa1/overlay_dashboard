import { useState, useRef, useCallback } from 'react';

function DropZone({ label, src, onFile }) {
  const ref = useRef();
  const load = useCallback(file => {
    if (!file || !file.type.startsWith('image/')) return;
    const r = new FileReader();
    r.onload = e => onFile(e.target.result);
    r.readAsDataURL(file);
  }, [onFile]);

  return (
    <div
      className={`drop-zone${src ? ' has-image' : ''}`}
      onDrop={e => { e.preventDefault(); load(e.dataTransfer.files[0]); }}
      onDragOver={e => e.preventDefault()}
      onClick={() => ref.current.click()}
    >
      {src
        ? <img src={src} alt={label} className="drop-image" />
        : <span className="drop-hint">Drop {label} here<br />or click to select</span>
      }
      <input
        ref={ref}
        type="file"
        accept="image/*"
        onChange={e => load(e.target.files[0])}
        style={{ display: 'none' }}
      />
    </div>
  );
}

export function ICATPanel() {
  const [a, setA] = useState(null);
  const [b, setB] = useState(null);
  const [la, setLa] = useState('Image A');
  const [lb, setLb] = useState('Image B');
  const [pos, setPos] = useState(50);

  if (!a || !b) {
    return (
      <div className="icat-panel">
        <div className="icat-dropzones">
          <DropZone label="Image A" src={a} onFile={setA} />
          <DropZone label="Image B" src={b} onFile={setB} />
        </div>
      </div>
    );
  }

  return (
    <div className="icat-panel">
      <div className="compare-container">
        <img src={a} alt={la} className="compare-img" />
        <div className="compare-overlay" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <img src={b} alt={lb} className="compare-img" />
        </div>
        <input
          type="range"
          className="compare-slider"
          min="0" max="100"
          value={pos}
          onChange={e => setPos(+e.target.value)}
        />
        <div className="compare-divider" style={{ left: `${pos}%` }} />
      </div>
      <div className="icat-labels">
        <input className="img-label" value={la} onChange={e => setLa(e.target.value)} />
        <span className="diff-hint">Images loaded — use the slider to compare</span>
        <input className="img-label" value={lb} onChange={e => setLb(e.target.value)} />
      </div>
      <button className="reset-btn" onClick={() => { setA(null); setB(null); }}>Reset</button>
    </div>
  );
}
