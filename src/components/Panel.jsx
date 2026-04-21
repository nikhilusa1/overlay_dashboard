import { useState, useCallback } from 'react';

function useDrag(initial) {
  const [pos, setPos] = useState(initial);
  const onMouseDown = useCallback((e) => {
    e.preventDefault();
    const sx = e.clientX - pos.x;
    const sy = e.clientY - pos.y;
    const move = (mv) => setPos({ x: mv.clientX - sx, y: mv.clientY - sy });
    const up = () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
    };
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  }, [pos]);
  return { pos, onMouseDown };
}

export function Panel({ title, children, onClose, initialPos }) {
  const { pos, onMouseDown } = useDrag(initialPos);
  return (
    <div className="panel" style={{ left: pos.x, top: pos.y }}>
      <div className="panel-header" onMouseDown={onMouseDown}>
        <span className="panel-title">{title}</span>
        <button className="panel-close" onClick={onClose}>×</button>
      </div>
      <div className="panel-body">{children}</div>
    </div>
  );
}
